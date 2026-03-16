import { useMemo } from 'react';

import StockCard from '@/components/common/StockCard';
import type { StockCardProps } from '@/components/common/StockCard/types';
import { useFavoriteStocks } from '@/contexts/useFavoriteStocks';

type StockListSectionProps = {
  items: StockCardProps[];
  showChart?: boolean;
  removeOnUnlike?: boolean;
};

function StockListSection({
  items,
  showChart = false,
  removeOnUnlike = false,
}: StockListSectionProps) {
  const { favoriteSymbols, pendingBySymbol, toggleFavorite } = useFavoriteStocks();

  const mergedItems = useMemo(
    () =>
      items
        .map((item) => ({
          ...item,
          liked: favoriteSymbols.has(item.symbol),
          isLikePending: pendingBySymbol[item.symbol] ?? false,
        }))
        .filter((item) => (removeOnUnlike ? item.liked : true)),
    [items, favoriteSymbols, pendingBySymbol, removeOnUnlike]
  );

  return (
    <section className="py-6">
      <div className="mx-auto grid w-full grid-cols-1 gap-3 md:max-w-none lg:grid-cols-2">
        {mergedItems.map((stock) => (
          <StockCard
            key={stock.symbol}
            {...stock}
            showChart={showChart}
            onLikeToggle={() => {
              void toggleFavorite(stock);
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default StockListSection;
