import { useMemo, useState } from 'react';

import {
  addInterestStock,
  removeInterestStock,
} from '@/apis/stocks/interest';
import StockCard from '@/components/common/StockCard';
import type { StockCardProps } from '@/components/common/StockCard/types';

type StockListSectionProps = {
  items: StockCardProps[];
  showChart?: boolean;
};

function StockListSection({ items, showChart = false }: StockListSectionProps) {
  const [likedBySymbol, setLikedBySymbol] = useState<Record<string, boolean>>(
    {}
  );
  const [pendingBySymbol, setPendingBySymbol] = useState<
    Record<string, boolean>
  >({});

  const mergedItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        liked: likedBySymbol[item.symbol] ?? item.liked ?? false,
        isLikePending: pendingBySymbol[item.symbol] ?? false,
      })),
    [items, likedBySymbol, pendingBySymbol]
  );

  const handleLikeToggle = async (stock: StockCardProps) => {
    if (pendingBySymbol[stock.symbol]) {
      return;
    }

    setPendingBySymbol((prev) => ({ ...prev, [stock.symbol]: true }));

    try {
      if (stock.liked) {
        await removeInterestStock(stock.symbol);
      } else {
        await addInterestStock(stock.symbol);
      }

      setLikedBySymbol((prev) => ({
        ...prev,
        [stock.symbol]: !stock.liked,
      }));
    } catch (error) {
      console.error(
        stock.liked ? '관심 종목 해제 실패' : '관심 종목 등록 실패',
        error
      );
    } finally {
      setPendingBySymbol((prev) => ({ ...prev, [stock.symbol]: false }));
    }
  };

  return (
    <section className="py-6">
      <div className="mx-auto grid w-full grid-cols-1 gap-3 md:max-w-none lg:grid-cols-2">
        {mergedItems.map((stock) => (
          <StockCard
            key={stock.symbol}
            {...stock}
            showChart={showChart}
            onLikeToggle={() => {
              void handleLikeToggle(stock);
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default StockListSection;
