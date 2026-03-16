export type QuoteData = {
  price: number;
  change: number;
  changeRate: number;
  direction: 'UP' | 'DOWN' | 'FLAT';
  asOf?: string;
};

export type QuoteUpdate = {
  type: 'QUOTE_UPDATED';
  symbol: string;
  data: QuoteData;
};
