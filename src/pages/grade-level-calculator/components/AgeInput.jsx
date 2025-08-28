import React from 'react';
import Input from '../../../components/ui/Input';

const AgeInput = ({ value, onChange, error, label, description }) => {
  const handleAgeChange = (e) => {
    const inputValue = e?.target?.value;
    // Only allow numbers and limit to reasonable age range
    if (inputValue === '' || (parseInt(inputValue) >= 2 && parseInt(inputValue) <= 15)) {
      onChange(inputValue);
    }
  };

  return (
    <Input
      type="number"
      label={label}
      description={description}
      value={value}
      onChange={handleAgeChange}
      error={error}
      min="2"
      max="15"
      placeholder="Ej: 5"
      className="w-full"
    />
  );
};

export default AgeInput;