import { IcArrowDown, IcArrowUp } from '@/assets/icons';
import DirectionToneText from '@/components/common/DirectionToneText';

import { INDEX_ICON_MAP, INDEX_LABEL_MAP } from './constants';
import type { MarketIndexCardProps } from './types';

function MarketIndexCard({
  name,
  value,
  change,
  changeRate,
  direction,
}: MarketIndexCardProps) {
  const isUp = direction === 'UP';
  const isDown = direction === 'DOWN';
  const ChangeIcon = isUp ? IcArrowUp : isDown ? IcArrowDown : null;

  const formattedValue =
    typeof value === 'number' ? value.toLocaleString('en-US') : value;
  const formattedChange =
    typeof change === 'number' ? `${change.toLocaleString('en-US')}` : change;
  const formattedChangeRate =
    typeof changeRate === 'number'
      ? `${isDown ? '-' : ''}${Math.abs(changeRate).toLocaleString('en-US')}%`
      : changeRate;

  const IndexIcon = INDEX_ICON_MAP[name];
  const indexLabel = INDEX_LABEL_MAP[name];

  return (
    <article className="w-70 rounded-xl bg-white px-9 py-8 shadow-xl">
      <div className="mb-3 flex items-start justify-between">
        <p className="typo-16-medium text-grey-500">{indexLabel}</p>
        <IndexIcon className="mt-1 h-5 w-5" aria-hidden="true" />
      </div>

      <p className="typo-32-semibold mb-3 leading-none tracking-[-0.02em] text-black">
        {formattedValue}
      </p>

      <DirectionToneText
        direction={direction}
        as="p"
        className="typo-16-regular inline-flex items-center gap-2"
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
      </DirectionToneText>
    </article>
  );
}

export default MarketIndexCard;
