import { useState } from 'react';

import { IcLike } from '@/assets/icons';
import DirectionToneText from '@/components/common/DirectionToneText';

import { STOCK_CARD_LABELS } from './constants';
import type { StockCardProps } from './types';

function StockCard({
  name,
  market,
  symbol,
  price,
  changeRate,
  changeAmount,
  isLiked = false,
  detailsLabel = STOCK_CARD_LABELS.details,
  showChart = false,
}: StockCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const direction =
    changeRate > 0 ? 'UP' : changeRate < 0 ? 'DOWN' : 'FLAT';
  const signedPercent = `${changeRate > 0 ? '+' : changeRate < 0 ? '-' : ''}${Math.abs(changeRate).toLocaleString('ko-KR')}%`;
  const signedWon = `${changeRate > 0 ? '+' : changeRate < 0 ? '-' : ''}${Math.abs(changeAmount).toLocaleString('ko-KR')}원`;
  const changeItems = [
    { value: signedPercent, label: STOCK_CARD_LABELS.monthChangeRate },
    { value: signedWon, label: STOCK_CARD_LABELS.dayChangeAmount },
  ];

  const priceBlock = (
    <div>
      <DirectionToneText
        direction={direction}
        as="p"
        className="typo-20-semibold leading-none"
      >
        {price.toLocaleString('ko-KR')}원
      </DirectionToneText>
      <p className="typo-10-regular text-grey-500 mt-1">
        {STOCK_CARD_LABELS.currentPrice}
      </p>
    </div>
  );

  const changeItemsBlock = (
    <>
      {changeItems.map((item) => (
        <div key={item.label}>
          <DirectionToneText
            direction={direction}
            as="p"
            className="typo-12-medium leading-none"
          >
            {item.value}
          </DirectionToneText>
          <p className="typo-10-regular text-grey-500 mt-1">{item.label}</p>
        </div>
      ))}
    </>
  );

  const chart = (
    <svg
      className="h-8 w-28 shrink-0 md:-translate-y-8 md:h-16"
      viewBox="0 0 112 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1 20.5C11.214 20.5 14.93 22.13 24.376 23.5C38.892 25.604 47.694 25.468 59 20.5C68.07 16.514 74.542 10.171 85.188 8.19C90.323 7.235 95.125 7 111 7"
        stroke="#EF4444"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <article className="w-full rounded-xl bg-white px-5 py-5 shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="typo-20-medium leading-none text-black">{name}</p>
          <p className="typo-10-regular text-grey-500 mt-2 leading-none">
            {market} {symbol}
          </p>
        </div>
        <button
          type="button"
          aria-label="관심 종목 토글"
          aria-pressed={liked}
          onClick={() => setLiked((prev) => !prev)}
        >
          <IcLike
            className={`h-4.5 w-4.5 shrink-0 ${
              liked
                ? '[&>path]:fill-red [&>path]:stroke-red'
                : '[&>path]:stroke-red [&>path]:fill-transparent'
            }`}
          />
        </button>
      </div>

      <div className="mt-3 md:hidden">
        <div className="flex items-end justify-between gap-4">
          {priceBlock}
          {showChart ? chart : null}
        </div>

        <div className="mt-3 flex items-end justify-between gap-4">
          <div className="flex items-end gap-5">{changeItemsBlock}</div>
          <button className="typo-10-regular text-grey-500 pb-1" type="button">
            {detailsLabel}
          </button>
        </div>
      </div>

      <div className="mt-3 hidden items-end justify-between gap-4 md:flex">
        <div className="flex items-end gap-8">
          {priceBlock}
          {changeItemsBlock}
        </div>

        <div className="flex items-end gap-3">
          {showChart ? chart : null}
          <button className="typo-10-regular text-grey-500 pb-1" type="button">
            {detailsLabel}
          </button>
        </div>
      </div>
    </article>
  );
}

export default StockCard;
