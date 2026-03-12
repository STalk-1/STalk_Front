import { useMemo, useState } from 'react';

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

  const mergedItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        liked: likedBySymbol[item.symbol] ?? item.liked ?? false,
      })),
    [items, likedBySymbol]
  );

  return (
    <section className="py-6">
      <div className="mx-auto grid w-full grid-cols-1 gap-3 md:max-w-none lg:grid-cols-2">
        {mergedItems.map((stock) => (
          <StockCard
            key={stock.symbol}
            {...stock}
            showChart={showChart}
            onLikeToggle={() =>
              setLikedBySymbol((prev) => ({
                ...prev,
                [stock.symbol]: !stock.liked,
              }))
            }
          />
        ))}
      </div>
    </section>
  );
}

export default StockListSection;
