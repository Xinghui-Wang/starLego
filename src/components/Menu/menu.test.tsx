import React from 'react';
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test-mode',
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4'],
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active item</MenuItem>
      <MenuItem disabled>disabled item</MenuItem>
      <MenuItem>menu item</MenuItem> 
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>opened1</MenuItem>
      </SubMenu>
    </Menu>
  );
}

const createStyleFile = () => {
  const cssFile: string = `
    .sl-sub-menu {
      display: none;
    }
    .sl-sub-menu.sl-sub-menu-opened {
      display: block;
    }
  `;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe('test Menu and MenuItem component in default(horizontal) mode', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active item');
    disabledElement = wrapper.getByText('disabled item');
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('sl-menu test-mode');
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5);
    expect(activeElement).toHaveClass('sl-menu-item sl-active-menu-item');
    expect(disabledElement).toHaveClass('sl-menu-item sl-disabled-menu-item');
  });
  // 每一个测试任务it结束后都会执行cleanup()把创建的东西清掉
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('menu item');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('sl-active-menu-item');
    expect(activeElement).not.toHaveClass('sl-active-menu-item');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(thirdItem).toHaveClass('sl-active-menu-item');
    expect(disabledElement).not.toHaveClass('sl-active-menu-item');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });
  // it('should render vertical mode when mode is set to vertical', () => {
  //   cleanup();
  //   const verWrapper = render(generateMenu(testVerProps));
  //   const verMenuElement = verWrapper.getByTestId('test-menu');
  //   expect(verMenuElement).toBeInTheDocument();
  //   expect(verMenuElement).toHaveClass('sl-menu sl-menu-vertical')
  // });
  it('should show dropdown items when hover on subMenu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible();
    })
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible();
    });
  });
});

let verWrapper: RenderResult, verMenuElement: HTMLElement;

describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    verWrapper = render(generateMenu(testVerProps));
    verWrapper.container.append(createStyleFile());
    verMenuElement = verWrapper.getByTestId('test-menu');
  })
  it('should render vertical mode when mode is set to vertical', () => {
    expect(verMenuElement).toBeInTheDocument();
    expect(verMenuElement).toHaveClass('sl-menu sl-menu-vertical')
  });
  it('should show dropdown items when click on subMenu for vertical mode', () => {
    const dropDownItem = verWrapper.queryByText('drop1');
    expect(dropDownItem).not.toBeVisible();
    fireEvent.click(verWrapper.getByText('dropdown'));
    expect(dropDownItem).toBeVisible();
  });
  it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    expect(verWrapper.queryByText('opened1')).toBeVisible();
  });
});