import { IcGraph } from '@/assets/icons';
import RankingItem from '@/components/main/RankingCard/RankingItem';
import type { RankingItem as RankingItemData } from '@/components/main/RankingCard/RankingItem/types';

const rankingItems: RankingItemData[] = [
  {
    rank: 1,
    name: '삼성전자',
    market: 'KOSPI',
    symbol: '005930',
    price: 182400,
    change: 3800,
    changeRate: 2.13,
    direction: 'UP',
  },
  {
    rank: 2,
    name: '삼성전자',
    market: 'KOSPI',
    symbol: '005930',
    price: 182400,
    change: 3800,
    changeRate: 2.13,
    direction: 'UP',
  },
  {
    rank: 3,
    name: '삼성전자',
    market: 'KOSPI',
    symbol: '005930',
    price: 182400,
    change: 3800,
    changeRate: 2.13,
    direction: 'UP',
  },
  {
    rank: 4,
    name: '삼성전자',
    market: 'KOSPI',
    symbol: '005930',
    price: 182400,
    change: 3800,
    changeRate: 2.13,
    direction: 'UP',
  },
  {
    rank: 5,
    name: '삼성전자',
    market: 'KOSPI',
    symbol: '005930',
    price: 182400,
    change: 3800,
    changeRate: 2.13,
    direction: 'UP',
  },
  {
    rank: 6,
    name: '삼성전자',
    market: 'KOSPI',
    symbol: '005930',
    price: 182400,
    change: 3800,
    changeRate: 2.13,
    direction: 'UP',
  },
  {
    rank: 7,
    name: '삼성전자',
    market: 'KOSPI',
    symbol: '005930',
    price: 182400,
    change: 3800,
    changeRate: 2.13,
    direction: 'UP',
  },
  {
    rank: 8,
    name: '삼성전자',
    market: 'KOSPI',
    symbol: '005930',
    price: 182400,
    change: 3800,
    changeRate: 2.13,
    direction: 'UP',
  },
  {
    rank: 9,
    name: '삼성전자',
    market: 'KOSPI',
    symbol: '005930',
    price: 182400,
    change: 3800,
    changeRate: 2.13,
    direction: 'UP',
  },
  {
    rank: 10,
    name: '삼성전자',
    market: 'KOSPI',
    symbol: '005930',
    price: 182400,
    change: 3800,
    changeRate: 2.13,
    direction: 'UP',
  },
];

type RankingListProps = {
  items: RankingItemData[];
};

function RankingList({ items }: RankingListProps) {
  return (
    <ul className="flex flex-col gap-11">
      {items.map((item) => (
        <RankingItem key={item.rank} item={item} />
      ))}
    </ul>
  );
}

function RankingCard() {
  const leftRankingItems = rankingItems.slice(0, 5);
  const rightRankingItems = rankingItems.slice(5, 10);

  return (
    <section className="mt-10 w-full">
      <h2 className="typo-20-regular mb-8 flex items-center gap-4 leading-none font-semibold text-black">
        <IcGraph className="h-4.5 w-4.5 text-green-500" aria-hidden="true" />
        <span className="lg:hidden">거래량 급등 TOP 5</span>
        <span className="hidden lg:inline">거래량 급등 TOP 10</span>
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
