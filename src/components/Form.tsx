import React, { FormEvent, ReactNode } from 'react';
import './Form.css';

interface FormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
}

const Form: React.FC<FormProps> = ({ onSubmit, children, className = '' }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit} className={`form-container ${className}`}>
      {children}
    </form>
  );
};

export default Form;

Form.displayName = 'Form';
