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
];

function RankingCard() {
  return (
    <section className="mt-10 w-full">
      <h2 className="typo-20-regular mb-8 flex items-center gap-4 leading-none font-semibold text-black">
        <IcGraph className="h-4.5 w-4.5 text-green-500" aria-hidden="true" />
        <span>거래량 급등 TOP 5</span>
      </h2>

      <article className="w-full rounded-xl bg-white px-5 py-8 shadow-xl md:px-14 md:py-12">
        <ul className="flex flex-col gap-11">
          {rankingItems.map((item) => (
            <RankingItem key={item.rank} item={item} />
          ))}
        </ul>
      </article>
    </section>
  );
}

export default RankingCard;
