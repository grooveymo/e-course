import React, { ComponentProps } from 'react';
import './Input.css';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  const inputId = props.id || `input-${props.name}`;

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <input
        {...props}
        id={inputId}
        className={`input-field ${error ? 'input-error' : ''} ${className}`}
      />
      {error && (
        <span id={`${inputId}-error`} className="input-error-text" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
Input.displayName = 'Input';
