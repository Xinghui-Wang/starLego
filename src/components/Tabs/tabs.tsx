import React, { useState } from 'react';
import ClassNames from 'classnames';
import { FunctionComponentElement } from 'react';
import { TabItemProps } from './tabItem';

type TabsType = 'line' | 'card';

export interface TabsProps {
  defaultIndex ?: number;
  className?: string;
  onSelect?: (selecedIndex: number) => void;
  type?: TabsType;
}

export const Tabs: React.FC<TabsProps> = (props) => {
  const {
    defaultIndex,
    className,
    onSelect,
    type,
    children,
  } = props;
  const [ activeIndex, setActiveIndex ] = useState(defaultIndex);
  const handleClick = (e: React.MouseEvent, index: number, disabled: boolean | undefined) => {
    if(disabled) return;
    setActiveIndex(index);
    if(onSelect) {
      onSelect(index);
    }
  }
  const navClasses = ClassNames('sl-tabs-nav', {
    'sl-nav-line': type === 'line',
    'sl-nav-card': type === 'card',
  })
  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>;
      const { label, disabled } = childElement.props;
      const { displayName } = childElement.type;
      const navItemClasses = ClassNames('sl-tabs-nav-item', {
        'sl-tabs-nav-active': activeIndex === index,
        'sl-tabs-nav-disabled': disabled,
      })
      if(displayName === 'TabItem') {
        return (
          <li 
            className={navItemClasses} 
            key={`nav-item-${index}`}
            onClick={(e) => {handleClick(e, index, disabled)}}
          >
            { label }
          </li>
        );
      } else {
        console.error('Warning: Tabs has a child which is not a TabItem component');
      }
    });
  }
  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>;
      const { displayName } = childElement.type;
      if(displayName === 'TabItem' && index === activeIndex) {
        return childElement;
      }
    })
  }
  return (
    <div className={`sl-tabs ${className?className:''}`}>
      <ul className={navClasses}>
        {renderNavLinks()}
      </ul>
      <div className="sl-tabs-content">
        {renderContent()}
      </div>
    </div>
  )
}

Tabs.defaultProps = {
  defaultIndex: 0,
  type: 'line',
}

export default Tabs;
