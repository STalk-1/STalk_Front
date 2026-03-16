import type { StockChartPoint } from '@/types/chart';

type StockCardProps = {
  name: string;
  market: string;
  symbol: string;
  price: number;
  changeRate: number;
  change: number;
  direction?: 'UP' | 'DOWN' | 'FLAT';
  chartPoints?: StockChartPoint[];
  liked?: boolean;
  onLikeToggle?: () => void;
  isLikePending?: boolean;
  detailsLabel?: string;
  showChart?: boolean;
};

export type { StockCardProps, StockChartPoint };
