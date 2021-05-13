import Button, { ButtonProps, ButtonType, ButtonSize } from './button';
import { fireEvent, render } from '@testing-library/react';

const defaultProps = {
  onClick: jest.fn(),
}

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'test-class'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

describe('test button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Test</Button>);
    const element = wrapper.getByText('Test');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('sl-btn sl-btn-default');
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Test</Button>);
    const element = wrapper.getByText('Test');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('sl-btn-primary sl-btn-large test-class');
  });
  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(<Button btnType={ButtonType.Link} href="http://www.baidu.com">Link</Button>);
    const element = wrapper.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('sl-btn sl-btn-link');
  });
  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Test</Button>);
    const element = wrapper.getByText('Test') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toBeCalled();
  });
})
