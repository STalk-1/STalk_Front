type TabBarItem = {
  label: string;
  path: string;
  end?: boolean;
};

type TabClassName = 'base' | 'active' | 'inactive';

export type { TabBarItem, TabClassName };
