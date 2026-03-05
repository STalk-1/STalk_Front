import { NavLink } from 'react-router-dom';

import { TAB_BAR_ITEMS } from './constants';

function TabBar() {
  return (
    <ul className="flex h-full items-center gap-10">
      <li className="flex h-full items-center">
        <NavLink
          to={TAB_BAR_ITEMS.REAL_TIME_CHART.path}
          end
          className={({ isActive }) =>
            `typo-12-medium md:typo-20-medium lg:typo-20-medium relative flex h-16 items-center ${
              isActive
                ? "text-green-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-green-500 after:content-['']"
                : 'text-grey-500'
            }`
          }
        >
          {TAB_BAR_ITEMS.REAL_TIME_CHART.label}
        </NavLink>
      </li>
      <li className="flex h-full items-center">
        <NavLink
          to={TAB_BAR_ITEMS.INTEREST_STOCKS.path}
          className={({ isActive }) =>
            `typo-12-medium md:typo-20-medium lg:typo-20-medium relative flex h-16 items-center ${
              isActive
                ? "text-green-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-green-500 after:content-['']"
                : 'text-grey-500'
            }`
          }
        >
          {TAB_BAR_ITEMS.INTEREST_STOCKS.label}
        </NavLink>
      </li>
    </ul>
  );
}

export default TabBar;
