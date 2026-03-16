import type { IMessage, StompSubscription } from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';

import type {
  ChartPointAddedUpdate,
  StockChartPoint,
  StockChartSocketUpdate,
} from '@/types/chart';

const STOCK_WS_BROKER = import.meta.env.VITE_STOCK_WS_BROKER;
const RECONNECT_DELAY = 5000;
const HEARTBEAT_OUTGOING_INTERVAL = 20000;

type OnChartPointAdded = (symbol: string, point: StockChartPoint) => void;

function isChartPointAddedUpdate(
  payload: StockChartSocketUpdate
): payload is ChartPointAddedUpdate {
  return (
    payload.type === 'CHART_POINT_ADDED' && typeof payload.data === 'object'
  );
}

export function useStockChartSocket(
  symbols: string[],
  onChartPointAdded: OnChartPointAdded
) {
  const clientRef = useRef<Client | null>(null);
  const subscriptionsRef = useRef<Map<string, StompSubscription>>(new Map());
  const onChartPointAddedRef = useRef(onChartPointAdded);
  const symbolsRef = useRef(symbols);

  useEffect(() => {
    onChartPointAddedRef.current = onChartPointAdded;
  }, [onChartPointAdded]);

  useEffect(() => {
    symbolsRef.current = symbols;
  }, [symbols]);

  const parsePayload = (message: IMessage) => {
    try {
      const payload = JSON.parse(message.body) as StockChartSocketUpdate;
      if (!payload || !payload.symbol || !payload.data) {
        return;
      }

      if (isChartPointAddedUpdate(payload)) {
        onChartPointAddedRef.current(payload.symbol, payload.data.point);
      }
    } catch {
      // Ignore parse errors.
    }
  };

  useEffect(() => {
    const subscriptions = subscriptionsRef.current;

    const client = new Client({
      webSocketFactory: () => new SockJS(STOCK_WS_BROKER),
      reconnectDelay: RECONNECT_DELAY,
      heartbeatIncoming: 0,
      heartbeatOutgoing: HEARTBEAT_OUTGOING_INTERVAL,
    });

    client.onConnect = () => {
      symbolsRef.current.forEach((symbol) => {
        const topic = `/sub/stocks/chart/${symbol}`;
        const key = `${symbol}:${topic}`;
        if (!subscriptions.has(key)) {
          const sub = client.subscribe(topic, (message: IMessage) => {
            parsePayload(message);
          });
          subscriptions.set(key, sub);
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

    subscriptionsRef.current.forEach((sub, key) => {
      const [symbol] = key.split(':');
      if (!currentSymbols.has(symbol)) {
        sub.unsubscribe();
        subscriptionsRef.current.delete(key);
      }
    });

    symbols.forEach((symbol) => {
      const topic = `/sub/stocks/chart/${symbol}`;
      const key = `${symbol}:${topic}`;
      if (!subscriptionsRef.current.has(key)) {
        const sub = client.subscribe(topic, (message: IMessage) => {
          parsePayload(message);
        });
        subscriptionsRef.current.set(key, sub);
      }
    });
  }, [symbols]);
}
