import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import Tabs, { TabsProps }  from './tabs';
import TabItem from './tabItem';

const testProps: TabsProps = {
  defaultIndex: 1,
  onSelect: jest.fn()
}

let wrapper: RenderResult;
describe('test Tabs Component', () => {
  beforeEach(() => {
    wrapper = render(
      <Tabs {...testProps}>
          <TabItem label="tab1">
            This is tab1 content.
          </TabItem>
          <TabItem label="tab2">
            This is tab2 content.
          </TabItem>
          <TabItem label="disabled" disabled>
            This is disabled content.
          </TabItem>
        </Tabs>
    );
  });
  it('should render the correct default Tabs', () => {
    const { queryByText, container } = wrapper;
    expect(container.querySelector('.sl-tabs-nav')).toHaveClass('sl-nav-line');
    const activeElement = queryByText('tab2');
    expect(activeElement).toBeInTheDocument();
    expect(activeElement).toHaveClass('sl-tabs-nav-active');
    expect(queryByText('tab1')).not.toHaveClass('sl-tabs-nav-active');
    expect(queryByText('This is tab2 content.')).toBeInTheDocument();
    expect(queryByText('This is tab1 content.')).not.toBeInTheDocument();
  });
  it('click tabItem should switch to content', () => {
    const { queryByText, getByText } = wrapper;
    const clickedElement = getByText('tab1');
    fireEvent.click(clickedElement);
    expect(clickedElement).toHaveClass('sl-tabs-nav-active');
    expect(queryByText('tab2')).not.toHaveClass('sl-tabs-nav-active');
    expect(queryByText('This is tab1 content.')).toBeInTheDocument();
    expect(queryByText('This is tab2 content.')).not.toBeInTheDocument();
    expect(testProps.onSelect).toHaveBeenCalledWith(0)
  });
  it('click disabled tabItem should not works', () => {
    const { getByText, queryByText } = wrapper;
    const disableElement = getByText('disabled');
    expect(disableElement).toHaveClass('sl-tabs-nav-disabled');
    fireEvent.click(disableElement);
    expect(disableElement).not.toHaveClass('sl-tabs-nav-active');
    expect(queryByText('This is disabled content.')).not.toBeInTheDocument();
    expect(testProps.onSelect).not.toHaveBeenCalled();
  });
})