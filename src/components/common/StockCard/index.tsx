import { IcLike } from '@/assets/icons';
import Chart from '@/components/common/Chart';
import DirectionToneText from '@/components/common/DirectionToneText';

import { STOCK_CARD_LABELS } from './constants';
import type { StockCardProps } from './types';

function StockCard({
  name,
  market,
  symbol,
  price,
  changeRate,
  change,
  direction: directionProp,
  chartPoints,
  liked = false,
  onLikeToggle,
  isLikePending = false,
  detailsLabel = STOCK_CARD_LABELS.details,
  showChart = false,
}: StockCardProps) {
  const direction =
    directionProp ?? (changeRate > 0 ? 'UP' : changeRate < 0 ? 'DOWN' : 'FLAT');
  const signedPercent = `${changeRate > 0 ? '+' : changeRate < 0 ? '-' : ''}${Math.abs(changeRate).toLocaleString('ko-KR')}%`;
  const signedWon = `${changeRate > 0 ? '+' : changeRate < 0 ? '-' : ''}${Math.abs(change).toLocaleString('ko-KR')}원`;
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

  const chartColor =
    direction === 'UP'
      ? '#EF4444'
      : direction === 'DOWN'
        ? '#3B82F6'
        : '#EF4444';
  const chart = (
    <Chart
      points={chartPoints}
      className="h-8 w-28 shrink-0 md:h-16 md:-translate-y-8"
      strokeColor={chartColor}
    />
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
          disabled={isLikePending}
          onClick={onLikeToggle}
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
