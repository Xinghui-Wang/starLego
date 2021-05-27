import React from 'react';

export interface TabItemProps {
  label: string | React.ReactElement;
  disabled?: boolean;
}

export const TabItem: React.FC<TabItemProps> = ({ children }) => {
  return (
    <div className="sl-tab-panel">
      { children }
    </div>
  );
}

TabItem.displayName = 'TabItem';

export default TabItem;
