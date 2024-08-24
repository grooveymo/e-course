import React, { ComponentProps } from 'react';
import './LinkButton.css';

export interface LinkButtonProps extends ComponentProps<'button'> {
  variant: 'primary' | 'secondary';
}

const LinkButton = ({ variant, children, ...props }: LinkButtonProps) => {
  return (
    <button className={`link link-${variant}`} {...props}>
      {children}
    </button>
  );
};

export default LinkButton;
