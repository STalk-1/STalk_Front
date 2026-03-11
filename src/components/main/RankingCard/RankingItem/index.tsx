import { IcCaretDown, IcCaretUp } from '@/assets/icons';

import type { RankingItemProps } from './types';

function RankingItem({ item }: RankingItemProps) {
  const isUp = item.direction === 'UP';
  const isDown = item.direction === 'DOWN';
  const changeColorClass = isUp
    ? 'text-red'
    : isDown
      ? 'text-blue'
      : 'text-grey-500';

  return (
    <li className="grid grid-cols-[32px_1fr_auto_auto] items-center gap-x-5 md:grid-cols-[44px_1fr_auto_auto] md:gap-x-5">
      <p className="typo-24-semibold leading-none text-green-500">
        {item.rank}
      </p>

      <div>
        <p className="typo-16-regular leading-none text-black">{item.name}</p>
        <p className="text-grey-500 typo-10-regular mt-2 leading-none">
          {item.market} {item.symbol}
        </p>
      </div>

      <p
        className={`typo-16-medium justify-self-end leading-none ${changeColorClass}`}
      >
        {item.price.toLocaleString('en-US')}
      </p>

      <div
        className={`flex items-center gap-5 justify-self-end text-right ${changeColorClass}`}
      >
        {isUp ? (
          <IcCaretUp className="h-3 w-3 shrink-0" aria-hidden="true" />
        ) : isDown ? (
          <IcCaretDown className="h-3 w-3 shrink-0" aria-hidden="true" />
        ) : (
          <span
            className="bg-grey-300 h-2 w-2 rounded-full"
            aria-hidden="true"
          />
        )}
        <div>
          <p className="typo-10-regular leading-none">
            {item.change.toLocaleString('en-US')}
          </p>
          <p className="typo-10-regular mt-1 leading-none">
            {item.changeRate}%
          </p>
        </div>
      </div>
    </li>
  );
}

export default RankingItem;
