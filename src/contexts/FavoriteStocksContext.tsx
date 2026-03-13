import axios from 'axios';
import {
  createContext,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  addInterestStock,
  getInterestStocks,
  removeInterestStock,
} from '@/apis/stocks/interest';
import type { StockCardProps } from '@/components/common/StockCard/types';

type FavoriteStocksContextValue = {
  favoriteItems: StockCardProps[];
  favoriteSymbols: Set<string>;
  pendingBySymbol: Record<string, boolean>;
  toggleFavorite: (stock: StockCardProps) => Promise<void>;
};

const FavoriteStocksContext = createContext<FavoriteStocksContextValue | null>(
  null
);

const toStockCardItem = (
  item: Awaited<ReturnType<typeof getInterestStocks>>['items'][number]
): StockCardProps => ({
  symbol: item.symbol,
  name: item.quote.name,
  market: item.quote.market,
  price: item.quote.price,
  changeRate: item.quote.changeRate,
  change: item.quote.change,
  liked: true,
});

function FavoriteStocksProvider({ children }: { children: ReactNode }) {
  const [favoriteItems, setFavoriteItems] = useState<StockCardProps[]>([]);
  const [pendingBySymbol, setPendingBySymbol] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const controller = new AbortController();

    const fetchFavorites = async () => {
      try {
        const data = await getInterestStocks(controller.signal);
        setFavoriteItems(data.items.map(toStockCardItem));
      } catch (error) {
        if (axios.isCancel(error) || controller.signal.aborted) {
          return;
        }

        console.error('관심 종목 조회 실패', error);
        setFavoriteItems([]);
      }
    };

    void fetchFavorites();

    return () => {
      controller.abort();
    };
  }, []);

  const favoriteSymbols = useMemo(
    () => new Set(favoriteItems.map((item) => item.symbol)),
    [favoriteItems]
  );

  const toggleFavorite = async (stock: StockCardProps) => {
    if (pendingBySymbol[stock.symbol]) {
      return;
    }

    setPendingBySymbol((prev) => ({ ...prev, [stock.symbol]: true }));

    try {
      if (favoriteSymbols.has(stock.symbol)) {
        await removeInterestStock(stock.symbol);
        setFavoriteItems((prev) =>
          prev.filter((item) => item.symbol !== stock.symbol)
        );
      } else {
        await addInterestStock(stock.symbol);
        setFavoriteItems((prev) => [...prev, { ...stock, liked: true }]);
      }
    } catch (error) {
      console.error(
        favoriteSymbols.has(stock.symbol)
          ? '관심 종목 해제 실패'
          : '관심 종목 등록 실패',
        error
      );
    } finally {
      setPendingBySymbol((prev) => ({ ...prev, [stock.symbol]: false }));
    }
  };

  return (
    <FavoriteStocksContext.Provider
      value={{
        favoriteItems,
        favoriteSymbols,
        pendingBySymbol,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteStocksContext.Provider>
  );
}

export { FavoriteStocksContext, FavoriteStocksProvider };
export type { FavoriteStocksContextValue };
