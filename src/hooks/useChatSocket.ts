import type { IMessage, StompSubscription } from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

import type { ChatMessagePayload, ChatSendPayload } from '@/types/chat';

const CHAT_WS_BROKER = import.meta.env.VITE_STOCK_WS_BROKER;
const RECONNECT_DELAY = 5000;
const HEARTBEAT_OUTGOING_INTERVAL = 20000;

type OnChatMessage = (payload: ChatMessagePayload) => void;

function useChatSocket(symbol: string, onMessage: OnChatMessage) {
  const clientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<StompSubscription | null>(null);
  const onMessageRef = useRef(onMessage);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(CHAT_WS_BROKER),
      reconnectDelay: RECONNECT_DELAY,
      heartbeatIncoming: 0,
      heartbeatOutgoing: HEARTBEAT_OUTGOING_INTERVAL,
    });

    const subscribeToRoom = () => {
      subscriptionRef.current?.unsubscribe();
      subscriptionRef.current = client.subscribe(
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
      subscriptionRef.current?.unsubscribe();
      subscriptionRef.current = null;
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
