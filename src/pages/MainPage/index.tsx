import { Swiper, SwiperSlide } from 'swiper/react';

import StockIndexCard from '@/components/main/MarketIndexCard';
import type { MarketIndexCardProps } from '@/components/main/MarketIndexCard/types';
import RankingCard from '@/components/main/RankingCard';

const marketIndices: MarketIndexCardProps[] = [
  {
    name: 'KOSPI',
    value: 2507.01,
    change: 15.21,
    changeRate: 0.61,
    direction: 'UP',
  },
  {
    name: 'NASDAQ',
    value: 16234.55,
    change: -120.12,
    changeRate: -0.74,
    direction: 'DOWN',
  },
  {
    name: 'SNP500',
    value: 5123.44,
    change: 10.12,
    changeRate: 0.2,
    direction: 'UP',
  },
  {
    name: 'USDKRW',
    value: 1320.55,
    change: 0,
    changeRate: 0,
    direction: 'FLAT',
  },
];

function MainPage() {
  return (
    <section className="py-6">
      <div className="hidden gap-5 lg:flex">
        {marketIndices.map((indexData) => (
          <StockIndexCard key={indexData.name} {...indexData} />
        ))}
      </div>

      <div className="lg:hidden">
        <Swiper
          className="market-index-swiper px-2 py-2"
          spaceBetween={28}
          slidesPerView="auto"
          slidesOffsetBefore={8}
          slidesOffsetAfter={8}
        >
          {marketIndices.map((indexData) => (
            <SwiperSlide key={indexData.name} className="w-70!">
              <StockIndexCard {...indexData} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <RankingCard />
    </section>
  );
}

export default MainPage;
