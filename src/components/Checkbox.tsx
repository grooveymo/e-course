import React from 'react';
import './Checkbox.css';
export interface CheckboxProps {
  label: string;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}
const Checkbox = ({
  label,
  isChecked = false,
  setIsChecked,
}: CheckboxProps) => {
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="checkbox-input"
      />
      <label className="checkbox-label">{label}</label>
    </div>
  );
};

export default Checkbox;
