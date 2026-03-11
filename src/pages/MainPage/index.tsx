import { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getMarketIndices } from '@/apis/main/market';
import StockIndexCard from '@/components/main/MarketIndexCard';
import type {
  MarketIndexCardProps,
  MarketIndexType,
} from '@/components/main/MarketIndexCard/types';
import RankingCard from '@/components/main/RankingCard';

const marketNameMap: Record<string, MarketIndexType> = {
  KOSPI: 'KOSPI',
  NASDAQ: 'NASDAQ',
  SNP500: 'SNP500',
  'S&P500': 'SNP500',
  USDKRW: 'USDKRW',
  'USD/KRW': 'USDKRW',
};

function MainPage() {
  const [marketIndices, setMarketIndices] = useState<MarketIndexCardProps[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetchMarketIndices = async () => {
      try {
        const data = await getMarketIndices();
        if (!mounted) {
          return;
        }

        const normalized = data.markets
          .map((market) => {
            const normalizedName = marketNameMap[market.name];
            if (!normalizedName) {
              return null;
            }

            return {
              name: normalizedName,
              value: market.value,
              change: market.change,
              changeRate: market.changeRate,
              direction: market.direction,
            } satisfies MarketIndexCardProps;
          })
          .filter((market): market is MarketIndexCardProps => market !== null);

        if (normalized.length > 0) {
          setMarketIndices(normalized);
        }
      } catch {
        // API 실패 시 시장 지수 카드는 빈 상태 유지
      }
    };

    fetchMarketIndices();

    return () => {
      mounted = false;
    };
  }, []);

  const orderedMarketIndices = useMemo(() => {
    const order: MarketIndexType[] = ['KOSPI', 'NASDAQ', 'SNP500', 'USDKRW'];
    const byName = new Map(
      marketIndices.map((market) => [market.name, market])
    );
    return order
      .map((name) => byName.get(name))
      .filter((market): market is MarketIndexCardProps => Boolean(market));
  }, [marketIndices]);

  return (
    <section className="py-6">
      <div className="hidden gap-5 lg:flex">
        {orderedMarketIndices.map((indexData) => (
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
          {orderedMarketIndices.map((indexData) => (
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
