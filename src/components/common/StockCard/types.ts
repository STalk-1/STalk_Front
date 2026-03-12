type StockCardProps = {
  name: string;
  market: string;
  symbol: string;
  price: number;
  changeRate: number;
  changeAmount: number;
  isLiked?: boolean;
  detailsLabel?: string;
  showChart?: boolean;
};

export type { StockCardProps };
