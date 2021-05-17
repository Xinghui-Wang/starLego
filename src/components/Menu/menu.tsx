import React, { createContext, useState } from 'react';
import ClassNames from 'classnames';

type MenuMode = 'vertical' | 'horizontal';
type SelectCallback = (selectedIndex: number) => void;

interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({index: 0});

export const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, onSelect, children } = props;
  const [currActiveIndex, setActive] = useState(defaultIndex);
  const handleSelect = (index: number) => {
    setActive(index);
    if(onSelect) {
      onSelect(index);
    }
  }
  const passedContext: IMenuContext = {
    index: currActiveIndex ? currActiveIndex : 0,
    onSelect: handleSelect,
  }
  const classes = ClassNames('sl-menu', className, {
    'sl-menu-vertical': mode === 'vertical',
  });
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
}

export default Menu;