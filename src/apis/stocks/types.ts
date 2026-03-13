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

type FavoriteChartPoint = {
  time: string;
  close: number;
};

type FavoriteChart = {
  interval: string;
  points: FavoriteChartPoint[];
  asOf: string;
};

type FavoriteStockItem = {
  symbol: string;
  quote: QuoteData & {
    name: string;
    market: string;
  };
  chart: FavoriteChart;
};

type FavoriteStocksResponse = {
  items: FavoriteStockItem[];
};

export type {
  AllStocksItem,
  AllStocksResponse,
  FavoriteChart,
  FavoriteChartPoint,
  FavoriteStockItem,
  FavoriteStocksResponse,
};
