import { IcCaretDown, IcCaretUp } from '@/assets/icons';

import type { RankingItem as RankingItemData } from './types';

type RankingItemProps = {
  item: RankingItemData;
};

function RankingItem({ item }: RankingItemProps) {
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

      <p className="text-red typo-16-medium justify-self-end leading-none">
        {item.price.toLocaleString('en-US')}
      </p>

      <div className="text-red flex items-center gap-5 justify-self-end text-right">
        {item.direction === 'UP' ? (
          <IcCaretUp className="text-red h-3 w-3 shrink-0" aria-hidden="true" />
        ) : item.direction === 'DOWN' ? (
          <IcCaretDown
            className="text-blue h-3 w-3 shrink-0"
            aria-hidden="true"
          />
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
