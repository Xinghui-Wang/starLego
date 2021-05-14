import Alert, { AlertType, AlertProps } from './alert'
import { render, fireEvent } from '@testing-library/react';

const testProps: AlertProps = {
  title: 'title',
  closeable: true,
  onClose: jest.fn()
}

const typeProps: AlertProps = {
  title: 'title',
  type: AlertType.Success,
  description: 'hello',
}

describe('test Alert component', () => {
  it('should render the correct default Alert', () => {
    const { getByText, container, queryByText } = render(<Alert {...testProps} />);
    expect(queryByText('title')).toBeInTheDocument();
    expect(container.querySelector('.sl-alert')).toHaveClass('sl-alert-default');
    fireEvent.click(getByText('关闭'));
    expect(testProps.onClose).toHaveBeenCalled();
    expect(container.querySelector('.sl-alert')).toHaveClass('sl-alert-hide');
  });
  it('should render the correct Alert based on different type and description', () => {
    const { container, queryByText } = render(<Alert {...typeProps}/>);
    expect(queryByText('title')).toHaveClass('bold-title');
    expect(container.querySelector('.sl-alert')).toHaveClass('sl-alert-success');
    expect(queryByText('hello')).toBeInTheDocument();
    expect(queryByText('关闭')).not.toBeInTheDocument();
  })
})