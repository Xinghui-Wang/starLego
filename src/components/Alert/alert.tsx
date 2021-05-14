import React, { useState } from 'react';
import ClassNames from 'classnames';

export enum AlertType {
  Default = 'default',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
}

export interface AlertProps {
  title: string;
  description?: string;
  type?: AlertType;
  onClose?: () => void;
  closeable?: boolean;
}

export const Alert: React.FC<AlertProps> = (props) => {
  const [hide, setHide] = useState(false);
  const {
    title,
    description,
    type,
    onClose,
    closeable,
  } = props
  const classes = ClassNames('sl-alert', {
    [`sl-alert-${type}`]: type,
    'sl-alert-hide': hide,
  });
  const titleClasses = ClassNames('sl-alert-title', {
    'bold-title': description,
  })
  const handleClose = (e: React.MouseEvent) => {
    if(onClose) {
      onClose();
    }
    setHide(true);
  }
  return (
    <div className={classes}>
      <span className={titleClasses}>{title}</span>
      {description && <p className="sl-alert-desc">{description}</p>}
      {closeable && <span className="sl-alert-close" onClick={handleClose}>关闭</span>}
    </div>
  );
}

Alert.defaultProps = {
  type: AlertType.Default,
  closeable: false,
}

export default Alert;