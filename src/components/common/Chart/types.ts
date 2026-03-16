import type { StockChartPoint } from '@/types/chart';

type ChartProps = {
  points?: StockChartPoint[];
  className?: string;
  strokeColor?: string;
};

export type { ChartProps };
