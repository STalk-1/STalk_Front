import type { QuoteData } from '@/types/quote';

type RankingItem = QuoteData & {
  rank: number;
  name: string;
  market: string;
  symbol: string;
};

type RankingItemProps = {
  item: RankingItem;
};

export type { RankingItem, RankingItemProps };
