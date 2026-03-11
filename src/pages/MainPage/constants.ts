import type { MarketIndexType } from '@/components/main/MarketIndexCard/types';

const MARKET_NAME_MAP: Record<string, MarketIndexType> = {
  KOSPI: 'KOSPI',
  NASDAQ: 'NASDAQ',
  SNP500: 'SNP500',
  'S&P500': 'SNP500',
  USDKRW: 'USDKRW',
  'USD/KRW': 'USDKRW',
};

const MARKET_INDEX_ORDER: MarketIndexType[] = [
  'KOSPI',
  'NASDAQ',
  'SNP500',
  'USDKRW',
];

export { MARKET_INDEX_ORDER, MARKET_NAME_MAP };
