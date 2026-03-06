import {
  IcArrowDown,
  IcArrowUp,
  IcKospi,
  IcNasdaq,
  IcSNP,
  IcUsd,
} from '@/assets/icons';

import type { MarketIndexCardProps, MarketIndexType } from './types';

function MarketIndexCard({
  name = 'KOSPI',
  value = 5507.01,
  change = 15.26,
  changeRate = -0.28,
  direction = 'DOWN',
}: MarketIndexCardProps) {
  const isUp = direction === 'UP';
  const isDown = direction === 'DOWN';
  const ChangeIcon = isUp ? IcArrowUp : isDown ? IcArrowDown : null;
  const changeColorClass = isUp
    ? 'text-red'
    : isDown
      ? 'text-blue'
      : 'text-grey-500';

  const formattedValue =
    typeof value === 'number' ? value.toLocaleString('en-US') : value;
  const formattedChange =
    typeof change === 'number' ? `${change.toLocaleString('en-US')}` : change;
  const formattedChangeRate =
    typeof changeRate === 'number'
      ? `${changeRate.toLocaleString('en-US')}%`
      : changeRate;

  const indexIconMap: Record<MarketIndexType, typeof IcKospi> = {
    KOSPI: IcKospi,
    NASDAQ: IcNasdaq,
    SNP500: IcSNP,
    USDKRW: IcUsd,
  };
  const IndexIcon = indexIconMap[name];

  return (
    <article className="w-full max-w-70 rounded-xl bg-white px-9 py-8 shadow-xl">
      <div className="mb-3 flex items-start justify-between">
        <p className="typo-16-medium text-grey-500">{name}</p>
        <IndexIcon className="mt-1 h-5 w-5" aria-hidden="true" />
      </div>

      <p className="typo-32-semibold mb-3 leading-none tracking-[-0.02em] text-black">
        {formattedValue}
      </p>

      <p
        className={`typo-16-regular inline-flex items-center gap-2 ${changeColorClass}`}
      >
        {ChangeIcon ? (
          <ChangeIcon className="h-3 w-3" aria-hidden="true" />
        ) : (
          <span
            className="bg-grey-300 h-2 w-2 rounded-full"
            aria-hidden="true"
          />
        )}
        <span>
          {formattedChange} ({formattedChangeRate})
        </span>
      </p>
    </article>
  );
}

export default MarketIndexCard;
