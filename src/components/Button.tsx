import React, { ComponentProps } from 'react';
import './Button.css';

export interface ButtonProps extends ComponentProps<'button'> {
  variant: 'primary' | 'secondary';
}

const Button = ({ variant, children, ...props }: ButtonProps) => {
  return (
    <button className={`base ${variant}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
