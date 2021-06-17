import React, { FC } from 'react';
import ClassNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps,
}

export const Icon: FC<IconProps> = (props) => {
  const { theme, className, ...restProps } = props;
  const classes = ClassNames('sl-icon', className, {
    [`sl-icon-${theme}`]: theme,
  })
  
  return (
    <FontAwesomeIcon {...restProps} className={classes} />
  )
}

export default Icon;
