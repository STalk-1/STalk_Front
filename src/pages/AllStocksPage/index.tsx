import { useEffect, useMemo, useState } from 'react';

import { getAllStocks } from '@/apis/stocks/allStocks';
import type { StockCardProps } from '@/components/common/StockCard/types';
import StockListSection from '@/components/common/StockListSection';
import { useStockSocket } from '@/hooks/useStockSocket';

function AllStocksPage() {
  const [stocks, setStocks] = useState<StockCardProps[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetchAllStocks = async () => {
      try {
        const data = await getAllStocks();
        if (!mounted) {
          return;
        }

        setStocks(
          data.items.map((item) => ({
            symbol: item.symbol,
            name: item.quote.name,
            market: item.quote.market,
            price: item.quote.price,
            changeRate: item.quote.changeRate,
            change: item.quote.change,
            direction: item.quote.direction,
          }))
        );
      } catch {
        if (!mounted) {
          return;
        }

        setStocks([]);
      }
    };

    fetchAllStocks();

    return () => {
      mounted = false;
    };
  }, []);

  const symbols = useMemo(() => stocks.map((stock) => stock.symbol), [stocks]);

  useStockSocket(symbols, (symbol, quote) => {
    setStocks((prev) =>
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

  return <StockListSection items={stocks} />;
}

export default AllStocksPage;
