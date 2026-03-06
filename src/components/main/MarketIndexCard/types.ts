type MarketIndexType = 'KOSPI' | 'NASDAQ' | 'SNP500' | 'USDKRW';

type MarketIndexCardProps = {
  name: MarketIndexType;
  value: number;
  change: number;
  changeRate: number;
  direction: 'UP' | 'DOWN' | 'FLAT';
};

export type { MarketIndexCardProps, MarketIndexType };
