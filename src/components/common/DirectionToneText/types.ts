import type { ElementType, ReactNode } from 'react';

import type { QuoteData } from '@/types/quote';

type DirectionToneTextProps = {
  direction?: QuoteData['direction'];
  changeRate?: number;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export type { DirectionToneTextProps };
