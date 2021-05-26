import React, { createContext, useState } from 'react';
import ClassNames from 'classnames';
import { MenuItemProps } from './menuItem'

type MenuMode = 'vertical' | 'horizontal';
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({index: '0'});

export const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, onSelect, children, defaultOpenSubMenus } = props;
  const [currActiveIndex, setActive] = useState(defaultIndex);
  const handleSelect = (index: string) => {
    setActive(index);
    console.log(index);   
    if(onSelect) {
      onSelect(index);
    }
  }
  const passedContext: IMenuContext = {
    index: currActiveIndex ? currActiveIndex : '0',
    onSelect: handleSelect,
    mode,
    defaultOpenSubMenus,
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { 
          index: index.toString(),
        });
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component');
      }
    })
  }
  const classes = ClassNames('sl-menu', className, {
    'sl-menu-vertical': mode === 'vertical',
    'sl-menu-horizontal': mode !== 'vertical'
  });
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}

export default Menu;