import { isCancel } from 'axios';
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
import { useStockChartSocket } from '@/hooks/useStockChartSocket';
import { useStockSocket } from '@/hooks/useStockSocket';
import type { QuoteData } from '@/types/quote';

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
  direction: item.quote.direction,
  chartPoints: item.chart?.points,
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
        setFavoriteItems(data.items.map((item) => toStockCardItem(item)));
      } catch (error) {
        if (isCancel(error) || controller.signal.aborted) {
          return;
        }

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

  const favoriteSymbolsList = useMemo(
    () => favoriteItems.map((item) => item.symbol),
    [favoriteItems]
  );

  useStockSocket(favoriteSymbolsList, (symbol, quote: QuoteData) => {
    setFavoriteItems((prev) =>
      prev.map((item) =>
        item.symbol === symbol
          ? {
              ...item,
              price: quote.price,
              change: quote.change,
              changeRate: quote.changeRate,
              direction: quote.direction,
            }
          : item
      )
    );
  });

  useStockChartSocket(favoriteSymbolsList, (symbol, point) => {
    setFavoriteItems((prev) =>
      prev.map((item) =>
        item.symbol === symbol
          ? {
              ...item,
              chartPoints: [...(item.chartPoints ?? []), point],
            }
          : item
      )
    );
  });

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
        const data = await getInterestStocks();
        setFavoriteItems(data.items.map((item) => toStockCardItem(item)));
      }
    } catch {
      // ignore toggle errors
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
