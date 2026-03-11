import type { MarketIndexType } from '@/components/main/MarketIndexCard/types';
import type { RankingItem as RankingItemData } from '@/components/main/RankingCard/RankingItem/types';

type TopStocksResponse = {
  title: string;
  lastPolledAt: string;
  items: RankingItemData[];
  count: number;
};

type MarketItem = {
  name: MarketIndexType | 'S&P500' | 'USD/KRW' | string;
  value: number;
  change: number;
  changeRate: number;
  direction: 'UP' | 'DOWN' | 'FLAT';
};

type MarketResponse = {
  updatedAt: string;
  markets: MarketItem[];
};

export type { MarketResponse, TopStocksResponse };
