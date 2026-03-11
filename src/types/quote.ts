export type QuoteData = {
  price: number;
  change: number;
  changeRate: number;
  direction: 'UP' | 'DOWN' | 'FLAT';
  asOf?: string;
};

export type QuoteUpdate = {
  type: string;
  symbol: string;
  data: QuoteData;
};
