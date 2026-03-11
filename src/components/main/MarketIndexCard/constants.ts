import { IcKospi, IcNasdaq, IcSNP, IcUsd } from '@/assets/icons';

import type { MarketIndexType } from './types';

const INDEX_ICON_MAP: Record<MarketIndexType, typeof IcKospi> = {
  KOSPI: IcKospi,
  NASDAQ: IcNasdaq,
  SNP500: IcSNP,
  USDKRW: IcUsd,
};

const INDEX_LABEL_MAP: Record<MarketIndexType, string> = {
  KOSPI: 'KOSPI',
  NASDAQ: 'NASDAQ',
  SNP500: 'S&P500',
  USDKRW: 'USD/KRW',
};

export { INDEX_ICON_MAP, INDEX_LABEL_MAP };
