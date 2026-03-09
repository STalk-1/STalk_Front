type RankingItem = {
  rank: number;
  name: string;
  market: string;
  symbol: string;
  price: number;
  change: number;
  changeRate: number;
  direction: 'UP' | 'DOWN' | 'FLAT';
};

export type { RankingItem };
