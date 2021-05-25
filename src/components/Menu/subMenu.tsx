import React, { FunctionComponentElement, useContext, useState } from 'react';
import ClassNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

export const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children }) => {
  const [menuOpen, setOpen] = useState(false);
  const context = useContext(MenuContext);
  const classes = ClassNames('sl-menu-item sl-sub-menu-item', className, {
    'sl-active-menu-item': context.index === index,
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault();
    clearTimeout(timer);
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };
  const clickEvents = context.mode === 'vertical' ? {
    onClick: (e: React.MouseEvent) => { handleClick(e) },
  } : {};
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) },
  } : {};
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if(childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        });
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component');
      }
    });
    const subMenuClasses = ClassNames('sl-sub-menu', {
      'sl-sub-menu-opened': menuOpen,
    });
    return (
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    );
  };
  return (
    <li className={classes} {...hoverEvents}>
      <div className="sl-sub-menu-title" {...clickEvents}>{title}</div>
      {renderChildren()}
    </li>
  )
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;