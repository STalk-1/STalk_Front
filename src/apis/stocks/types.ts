import type { StockChartPoint } from '@/types/chart';
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

type FavoriteChart = {
  interval: string;
  points: StockChartPoint[];
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
  FavoriteStockItem,
  FavoriteStocksResponse,
};
