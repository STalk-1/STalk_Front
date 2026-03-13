import { useContext } from 'react';

import {
  FavoriteStocksContext,
  type FavoriteStocksContextValue,
} from '@/contexts/FavoriteStocksContext';

const useFavoriteStocks = (): FavoriteStocksContextValue => {
  const context = useContext(FavoriteStocksContext);

  if (!context) {
    throw new Error(
      'useFavoriteStocks must be used within FavoriteStocksProvider'
    );
  }

  return context;
};

export { useFavoriteStocks };
