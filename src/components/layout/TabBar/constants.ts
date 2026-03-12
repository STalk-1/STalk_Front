import type { TabBarItem, TabClassName } from './types';

const TAB_BAR_ITEMS: Record<string, TabBarItem> = {
  REAL_TIME_CHART: {
    label: '실시간 차트',
    path: '/',
    end: true,
  },
  ALL_STOCKS: {
    label: '전체 종목',
    path: '/all-stocks',
  },
  INTEREST_STOCKS: {
    label: '관심 종목',
    path: '/interest',
  },
};

const TAB_CLASS_NAMES: Record<TabClassName, string> = {
  base: 'typo-16-medium md:typo-20-medium lg:typo-20-medium relative flex h-20 items-center',
  active:
    "text-green-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-green-500 after:content-['']",
  inactive: 'text-grey-500',
};

export { TAB_BAR_ITEMS, TAB_CLASS_NAMES };
