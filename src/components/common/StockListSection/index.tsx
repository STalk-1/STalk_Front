import StockCard from '@/components/common/StockCard';
import type { StockCardProps } from '@/components/common/StockCard/types';

type StockListSectionProps = {
  items: StockCardProps[];
  showChart?: boolean;
};

function StockListSection({ items, showChart = false }: StockListSectionProps) {
  return (
    <section className="py-6">
      <div className="mx-auto grid w-full grid-cols-1 gap-3 md:max-w-none lg:grid-cols-2">
        {items.map((stock) => (
          <StockCard
            key={stock.symbol}
            {...stock}
            showChart={showChart}
          />
        ))}
      </div>
    </section>
  );
}

export default StockListSection;
