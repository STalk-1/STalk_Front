import type { IMessage, StompSubscription } from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

import type {
  ChatCountPayload,
  ChatMessagePayload,
  ChatSendPayload,
} from '@/types/chat';

const CHAT_WS_BROKER = import.meta.env.VITE_STOCK_WS_BROKER;
const RECONNECT_DELAY = 5000;
const HEARTBEAT_OUTGOING_INTERVAL = 20000;

type OnChatMessage = (payload: ChatMessagePayload) => void;
type OnChatCount = (payload: ChatCountPayload) => void;

const isChatCountPayload = (payload: unknown): payload is ChatCountPayload => {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const candidate = payload as Partial<ChatCountPayload>;
  return (
    typeof candidate.symbol === 'string' && typeof candidate.count === 'number'
  );
};

const parseChatCountPayload = (
  body: string,
  symbol: string
): ChatCountPayload | null => {
  try {
    const parsed = JSON.parse(body) as unknown;

    if (typeof parsed === 'number') {
      return { symbol, count: parsed };
    }

    if (isChatCountPayload(parsed)) {
      return parsed;
    }

    if (
      parsed &&
      typeof parsed === 'object' &&
      'count' in parsed &&
      typeof (parsed as { count?: unknown }).count === 'number'
    ) {
      return {
        symbol,
        count: (parsed as { count: number }).count,
      };
    }
  } catch {
    const numericCount = Number(body);
    if (Number.isFinite(numericCount)) {
      return { symbol, count: numericCount };
    }
  }

  return null;
};

function useChatSocket(
  symbol: string,
  onMessage: OnChatMessage,
  onCount?: OnChatCount
) {
  const clientRef = useRef<Client | null>(null);
  const messageSubscriptionRef = useRef<StompSubscription | null>(null);
  const countSubscriptionRef = useRef<StompSubscription | null>(null);
  const onMessageRef = useRef(onMessage);
  const onCountRef = useRef(onCount);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    onCountRef.current = onCount;
  }, [onCount]);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(CHAT_WS_BROKER),
      reconnectDelay: RECONNECT_DELAY,
      heartbeatIncoming: 0,
      heartbeatOutgoing: HEARTBEAT_OUTGOING_INTERVAL,
      debug: undefined,
    });

    const subscribeToRoom = () => {
      messageSubscriptionRef.current?.unsubscribe();
      countSubscriptionRef.current?.unsubscribe();

      messageSubscriptionRef.current = client.subscribe(
        `/sub/chat.${symbol}`,
        (message: IMessage) => {
          try {
            const payload = JSON.parse(message.body) as ChatMessagePayload;
            if (
              !payload ||
              !payload.messageId ||
              !payload.symbol ||
              !payload.sender ||
              !payload.content ||
              !payload.sentAt
            ) {
              return;
            }

            onMessageRef.current(payload);
          } catch {
            // 잘못된 채팅 payload는 무시
          }
        }
      );

      countSubscriptionRef.current = client.subscribe(
        `/sub/chat.${symbol}.count`,
        (message: IMessage) => {
          const payload = parseChatCountPayload(message.body, symbol);
          if (!payload) {
            return;
          }

          onCountRef.current?.(payload);
        }
      );
    };

    client.onConnect = () => {
      setIsConnected(true);
      subscribeToRoom();
    };

    client.onDisconnect = () => {
      setIsConnected(false);
    };

    client.onStompError = () => {
      setIsConnected(false);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      messageSubscriptionRef.current?.unsubscribe();
      countSubscriptionRef.current?.unsubscribe();
      messageSubscriptionRef.current = null;
      countSubscriptionRef.current = null;
      setIsConnected(false);
      client.deactivate();
    };
  }, [symbol]);

  const sendMessage = (payload: ChatSendPayload) => {
    const client = clientRef.current;
    if (!client?.connected) {
      return false;
    }

    client.publish({
      destination: '/pub/chat.send',
      body: JSON.stringify(payload),
    });

    return true;
  };

  return { isConnected, sendMessage };
}

export { useChatSocket };
