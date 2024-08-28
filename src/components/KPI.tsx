import React, { ComponentProps } from 'react';
import './KPI.css';
export interface KPIProps extends ComponentProps<'div'> {
  title: string;
  value: number;
}

const KPI = ({ title, value }: KPIProps) => {
  return (
    <div className="kpi-container">
      <div className="kpi-title">{title}</div>
      <div className="kpi-value">{value}</div>
    </div>
  );
};

export default KPI;
