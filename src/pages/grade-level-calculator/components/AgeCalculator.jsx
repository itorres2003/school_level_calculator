import React from 'react';

const AgeCalculator = ({ birthDate, curp }) => {
  const calculateAge = () => {
    let dateToUse = null;

    // Try to use birth date first
    if (birthDate) {
      dateToUse = new Date(birthDate);
    } else if (curp && curp?.length >= 10) {
      // Extract date from CURP (positions 4-9: YYMMDD)
      const year = parseInt(curp?.substring(4, 6));
      const month = parseInt(curp?.substring(6, 8)) - 1; // Month is 0-indexed
      const day = parseInt(curp?.substring(8, 10));
      
      // Determine century (assume 00-30 is 2000s, 31-99 is 1900s)
      const fullYear = year <= 30 ? 2000 + year : 1900 + year;
      
      dateToUse = new Date(fullYear, month, day);
    }

    if (!dateToUse || isNaN(dateToUse?.getTime())) {
      return null;
    }

    const today = new Date();
    const birthYear = dateToUse?.getFullYear();
    const birthMonth = dateToUse?.getMonth();
    const birthDay = dateToUse?.getDate();

    let years = today?.getFullYear() - birthYear;
    let months = today?.getMonth() - birthMonth;

    if (months < 0 || (months === 0 && today?.getDate() < birthDay)) {
      years--;
      months += 12;
    }

    if (today?.getDate() < birthDay) {
      months--;
    }

    return { years, months };
  };

  const age = calculateAge();
  
  if (!age) return null;

  return { age };
};

export default AgeCalculator;