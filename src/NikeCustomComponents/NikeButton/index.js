/**
 * Date of Creation: Feb, 2020
 * Description : This file defines a custom button to be used across application.
 *
 * @flow
 */
import * as React from 'react';
import styles from './styles.scss';

type Props = {
  fullWidth?: boolean,
  children: string | React.Node,
  className?: string,
  theme?: string
};

const Button = ({
  theme,
  fullWidth,
  children,
  ...props
}: Props) => {
  const customClass = theme === 'black' ? styles.customBlackButton : styles.customWhiteButton;
  const fullWidthClass = fullWidth ? styles.fullWidthClass : '';
  return (
    <button type="button" className={`${customClass} ${fullWidthClass}`} {...props}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  fullWidth: false,
  theme: 'black',
  className: ''
};

export default Button;
