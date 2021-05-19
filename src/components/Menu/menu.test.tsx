import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test-mode',
}

const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical',
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>active item</MenuItem>
      <MenuItem index={1} disabled>disabled item</MenuItem>
      <MenuItem index={2}>menu item</MenuItem>
    </Menu>
  );
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe('test Menu and MenuItem component in default(horizontal) mode', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active item');
    disabledElement = wrapper.getByText('disabled item');
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('sl-menu test-mode');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(activeElement).toHaveClass('sl-menu-item sl-active-menu-item');
    expect(disabledElement).toHaveClass('sl-menu-item sl-disabled-menu-item');
  });
  // 每一个测试任务it结束后都会执行cleanup()把创建的东西清掉
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('menu item');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('sl-active-menu-item');
    expect(activeElement).not.toHaveClass('sl-active-menu-item');
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
    fireEvent.click(disabledElement);
    expect(thirdItem).toHaveClass('sl-active-menu-item');
    expect(disabledElement).not.toHaveClass('sl-active-menu-item');
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    const verWrapper = render(generateMenu(testVerProps));
    const verMenuElement = verWrapper.getByTestId('test-menu');
    expect(verMenuElement).toBeInTheDocument();
    expect(verMenuElement).toHaveClass('sl-menu sl-menu-vertical')
  })
})
