import { useEffect, useState } from 'react';

import { getAllStocks } from '@/apis/stocks/allStocks';
import type { StockCardProps } from '@/components/common/StockCard/types';
import StockListSection from '@/components/common/StockListSection';

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

  return <StockListSection items={stocks} />;
}

export default AllStocksPage;
