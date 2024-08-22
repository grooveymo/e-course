import React from 'react';
import './ErrorMessage.css';

export interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="error-layout">
      <div className="error-container">
        <h1 className="error-heading">Error: </h1>
        <div className="error-message">{message}</div>
      </div>
    </div>
  );
};

export default ErrorMessage;
