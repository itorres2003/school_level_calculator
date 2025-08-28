import React from 'react';
import Input from '../../../components/ui/Input';

const CurpInput = ({ value, onChange, error, label, description }) => {
  const validateCurp = (curp) => {
    // CURP format: 4 letters + 6 digits + 1 letter + 1 digit + 1 letter + 5 alphanumeric
    const curpPattern = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{2}[A-Z0-9]{3}$/;
    return curpPattern?.test(curp?.toUpperCase());
  };

  const handleCurpChange = (e) => {
    const curpValue = e?.target?.value?.toUpperCase()?.replace(/[^A-Z0-9]/g, '');
    if (curpValue?.length <= 18) {
      onChange(curpValue);
    }
  };

  return (
    <Input
      type="text"
      label={label}
      description={description}
      value={value}
      onChange={handleCurpChange}
      error={error}
      placeholder="ABCD123456HDFGHI123"
      maxLength={18}
      className="w-full font-mono tracking-wider"
    />
  );
};

export default CurpInput;