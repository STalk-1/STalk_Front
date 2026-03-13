import type { QuoteData } from '@/types/quote';

type AllStocksItem = {
  symbol: string;
  quote: QuoteData & {
    name: string;
    market: string;
  };
};

type AllStocksResponse = {
  items: AllStocksItem[];
  count: number;
};

export type { AllStocksItem, AllStocksResponse };
