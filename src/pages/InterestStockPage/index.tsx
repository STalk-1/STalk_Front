import { useEffect, useState } from 'react';

import { getInterestStocks } from '@/apis/stocks/interest';
import type { StockCardProps } from '@/components/common/StockCard/types';
import StockListSection from '@/components/common/StockListSection';

function InterestStockPage() {
  const [stocks, setStocks] = useState<StockCardProps[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetchInterestStocks = async () => {
      try {
        const data = await getInterestStocks();
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
            liked: true,
          }))
        );
      } catch (error) {
        if (!mounted) {
          return;
        }

        console.error('관심 종목 조회 실패', error);
        setStocks([]);
      }
    };

    fetchInterestStocks();

    return () => {
      mounted = false;
    };
  }, []);

  return <StockListSection items={stocks} showChart />;
}

export default InterestStockPage;
