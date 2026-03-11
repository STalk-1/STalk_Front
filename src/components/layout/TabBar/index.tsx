import { NavLink } from 'react-router-dom';

import { TAB_BAR_ITEMS, TAB_CLASS_NAMES } from './constants';

function TabBar() {
  return (
    <ul className="flex h-full items-center gap-10">
      {Object.values(TAB_BAR_ITEMS).map((item) => (
        <li key={item.path} className="flex h-full items-center">
          <NavLink
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `${TAB_CLASS_NAMES.base} ${
                isActive ? TAB_CLASS_NAMES.active : TAB_CLASS_NAMES.inactive
              }`
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default TabBar;
