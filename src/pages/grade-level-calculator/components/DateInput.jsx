import React from 'react';
import Input from '../../../components/ui/Input';

const DateInput = ({ value, onChange, error, label, description }) => {
  const handleDateChange = (e) => {
    onChange(e?.target?.value);
  };

  return (
    <Input
      type="date"
      label={label}
      description={description}
      value={value}
      onChange={handleDateChange}
      error={error}
      required
      max={new Date()?.toISOString()?.split('T')?.[0]}
      className="w-full"
    />
  );
};

export default DateInput;