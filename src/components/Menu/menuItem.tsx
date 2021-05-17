import React, { useContext } from 'react';
import ClassNames from 'classnames';
import { MenuContext } from './menu';

interface MenuItemProps {
  index: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const handleClick = () => {
    if(context.onSelect && !disabled) {
      context.onSelect(index);
    }
  }
  const classes = ClassNames('sl-menu-item', className, {
    'sl-disabled-menu-item': disabled,
    'sl-active-menu-item': context.index === index,
  })
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

export default MenuItem;