import type { RankingItem as RankingItemData } from '@/components/main/RankingCard/RankingItem/types';

type TopStocksResponse = {
  title: string;
  lastPolledAt: string;
  items: RankingItemData[];
  count: number;
};

export type { TopStocksResponse };
