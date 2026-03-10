import { useEffect, useState } from 'react';

import { getTopStocks } from '@/apis/main/ranking';
import type { TopStocksResponse } from '@/apis/main/types';
import { IcGraph } from '@/assets/icons';
import RankingItem from '@/components/main/RankingCard/RankingItem';
import type { RankingItem as RankingItemData } from '@/components/main/RankingCard/RankingItem/types';

type RankingListProps = {
  items: RankingItemData[];
};

function RankingList({ items }: RankingListProps) {
  return (
    <ul className="flex flex-col gap-11">
      {items.map((item) => (
        <RankingItem key={`${item.rank}-${item.symbol}`} item={item} />
      ))}
    </ul>
  );
}

function RankingCard() {
  const [rankingData, setRankingData] = useState<TopStocksResponse | null>(
    null
  );

  useEffect(() => {
    let mounted = true;

    const fetchTopStocks = async () => {
      try {
        const data = await getTopStocks();
        if (mounted) {
          setRankingData(data);
        }
      } catch {
        if (mounted) {
          setRankingData(null);
        }
      }
    };

    fetchTopStocks();

    return () => {
      mounted = false;
    };
  }, []);

  const rankingItems = rankingData?.items ?? [];
  const leftRankingItems = rankingItems.slice(0, 5);
  const rightRankingItems = rankingItems.slice(5, 10);

  const desktopCount = rankingData?.count ?? 10;
  const mobileCount = Math.min(5, desktopCount);
  const desktopTitle = rankingData?.title ?? `거래량 급등 TOP ${desktopCount}`;
  const mobileTitle = desktopTitle.match(/TOP\s*\d+/i)
    ? desktopTitle.replace(/TOP\s*\d+/i, `TOP ${mobileCount}`)
    : `거래량 급등 TOP ${mobileCount}`;

  return (
    <section className="mt-10 w-full">
      <h2 className="typo-20-regular mb-8 flex items-center gap-4 leading-none font-semibold text-black">
        <IcGraph className="h-4.5 w-4.5 text-green-500" aria-hidden="true" />
        <span className="lg:hidden">{mobileTitle}</span>
        <span className="hidden lg:inline">{desktopTitle}</span>
      </h2>

      <article className="w-full rounded-xl bg-white px-5 py-8 shadow-xl md:px-14 md:py-12">
        <div className="lg:hidden">
          <RankingList items={leftRankingItems} />
        </div>

        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-x-14">
          <RankingList items={leftRankingItems} />

          <div className="w-px bg-gray-100" aria-hidden="true" />

          <RankingList items={rightRankingItems} />
        </div>
      </article>
    </section>
  );
}

export default RankingCard;
