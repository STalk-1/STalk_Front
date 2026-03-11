import type { IMessage, StompSubscription } from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';

import type { QuoteData, QuoteUpdate } from '@/types/quote';

const STOCK_WS_BROKER = import.meta.env.VITE_STOCK_WS_BROKER;

export function useStockSocket(
  symbols: string[],
  onUpdate: (symbol: string, data: QuoteData) => void
) {
  const clientRef = useRef<Client | null>(null);
  const subscriptionsRef = useRef<Map<string, StompSubscription>>(new Map());
  const onUpdateRef = useRef(onUpdate);
  const symbolsRef = useRef(symbols);

  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    symbolsRef.current = symbols;
  }, [symbols]);

  useEffect(() => {
    const subscriptions = subscriptionsRef.current;

    const client = new Client({
      webSocketFactory: () => new SockJS(STOCK_WS_BROKER),
      reconnectDelay: 5000,
      // SockJS 사용 시 stompjs는 ping/pong을 재설정해야 함
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
    });

    client.onConnect = () => {
      const currentSymbols = symbolsRef.current;

      currentSymbols.forEach((symbol) => {
        if (!subscriptions.has(symbol)) {
          const sub = client.subscribe(
            `/sub/stocks/${symbol}`,
            (message: IMessage) => {
              try {
                const payload: QuoteUpdate = JSON.parse(message.body);
                onUpdateRef.current(payload.symbol ?? symbol, payload.data);
              } catch {
                // 형식이 잘못된 payload는 무시
              }
            }
          );

          subscriptions.set(symbol, sub);
        }
      });
    };

    client.activate();
    clientRef.current = client;

    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe());
      subscriptions.clear();
      client.deactivate();
    };
  }, []);

  useEffect(() => {
    const client = clientRef.current;
    if (!client || !client.connected) {
      return;
    }

    const currentSymbols = new Set(symbols);

    // 제거된 심볼 구독 해제
    subscriptionsRef.current.forEach((sub, symbol) => {
      if (!currentSymbols.has(symbol)) {
        sub.unsubscribe();
        subscriptionsRef.current.delete(symbol);
      }
    });

    // 새 심볼 구독 추가
    symbols.forEach((symbol) => {
      if (!subscriptionsRef.current.has(symbol)) {
        const sub = client.subscribe(
          `/sub/stocks/${symbol}`,
          (message: IMessage) => {
            try {
              const payload: QuoteUpdate = JSON.parse(message.body);
              onUpdateRef.current(payload.symbol ?? symbol, payload.data);
            } catch {
              // 형식이 잘못된 payload는 무시
            }
          }
        );

        subscriptionsRef.current.set(symbol, sub);
      }
    });
  }, [symbols]);
}
