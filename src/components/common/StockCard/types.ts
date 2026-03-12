type StockCardProps = {
  name: string;
  market: string;
  symbol: string;
  price: number;
  changeRate: number;
  changeAmount: number;
  liked?: boolean;
  onLikeToggle?: () => void;
  detailsLabel?: string;
  showChart?: boolean;
};

export type { StockCardProps };
