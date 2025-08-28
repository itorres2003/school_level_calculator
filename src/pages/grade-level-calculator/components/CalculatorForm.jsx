import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import DateInput from './DateInput';
import CurpInput from './CurpInput';
import AgeInput from './AgeInput';
import GradeLevelDisplay from './GradeLevelDisplay';
import Icon from '../../../components/AppIcon';

const CalculatorForm = () => {
  const [birthDate, setBirthDate] = useState('');
  const [curp, setCurp] = useState('');
  const [ageInYears, setAgeInYears] = useState('');
  const [errors, setErrors] = useState({});
  const [age, setAge] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const validateCurp = (curpValue) => {
    if (!curpValue) return true; // Optional field
    const curpPattern = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{2}[A-Z0-9]{3}$/;
    return curpPattern?.test(curpValue);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!birthDate && !curp && !ageInYears) {
      newErrors.general = 'Debe proporcionar al menos la fecha de nacimiento, el CURP o la edad en años cumplidos';
    }

    if (birthDate) {
      const selectedDate = new Date(birthDate);
      const today = new Date();
      const minDate = new Date();
      minDate?.setFullYear(today?.getFullYear() - 15); // Max 15 years ago
      
      if (selectedDate > today) {
        newErrors.birthDate = 'La fecha de nacimiento no puede ser futura';
      } else if (selectedDate < minDate) {
        newErrors.birthDate = 'La fecha de nacimiento debe ser de los últimos 15 años';
      }
    }

    if (curp && !validateCurp(curp)) {
      newErrors.curp = 'Formato de CURP inválido. Debe tener 18 caracteres (ej: ABCD123456HDFGHI123)';
    }

    if (ageInYears && (parseInt(ageInYears) < 2 || parseInt(ageInYears) > 15)) {
      newErrors.ageInYears = 'La edad debe estar entre 2 y 15 años';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const calculateAge = () => {
    // Priority: Direct age input > Birth date > CURP
    if (ageInYears && ageInYears !== '') {
      let years = parseInt(ageInYears);
      return { years, months: 0 };
    }
    
    let dateToUse = null;

    if (birthDate) {
      dateToUse = new Date(birthDate);
    } else if (curp && curp?.length >= 10) {
      const year = parseInt(curp?.substring(4, 6));
      const month = parseInt(curp?.substring(6, 8)) - 1;
      const day = parseInt(curp?.substring(8, 10));
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
      if (months < 0) {
        months = 11;
        years--;
      }
    }

    return { years, months };
  };

  const handleCalculate = () => {
    if (!validateForm()) return;

    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      const calculatedAge = calculateAge();
      setAge(calculatedAge);
      setIsCalculating(false);
    }, 500);
  };

  const handleReset = () => {
    setBirthDate('');
    setCurp('');
    setAgeInYears('');
    setErrors({});
    setAge(null);
  };

  // Auto-calculate when inputs change and are valid
  useEffect(() => {
    if ((birthDate || (curp && curp?.length >= 10) || ageInYears) && Object.keys(errors)?.length === 0) {
      const timer = setTimeout(() => {
        const calculatedAge = calculateAge();
        setAge(calculatedAge);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [birthDate, curp, ageInYears]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-12">
      {/* Form Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-light text-slate-900 mb-3">Calculadora</h2>
            <p className="text-slate-600 text-base font-light leading-relaxed max-w-lg mx-auto">
              Ingrese cualquiera de los siguientes datos para determinar el nivel escolar apropiado
            </p>
          </div>

          {errors?.general && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Icon name="AlertCircle" size={18} className="text-red-500" />
                <p className="text-sm text-red-700">{errors?.general}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DateInput
              label="Fecha de Nacimiento"
              description="Seleccione la fecha de nacimiento"
              value={birthDate}
              onChange={setBirthDate}
              error={errors?.birthDate}
            />

            <CurpInput
              label="CURP"
              description="Clave Única de Registro"
              value={curp}
              onChange={setCurp}
              error={errors?.curp}
            />

            <AgeInput
              label="Edad en Años"
              description="Edad actual en años completos"
              value={ageInYears}
              onChange={setAgeInYears}
              error={errors?.ageInYears}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              variant="default"
              onClick={handleCalculate}
              loading={isCalculating}
              iconName="Calculator"
              iconPosition="left"
              className="flex-1 h-12 text-base font-medium"
              disabled={!birthDate && !curp && !ageInYears}
            >
              {isCalculating ? 'Calculando...' : 'Calcular Nivel'}
            </Button>

            <Button
              variant="outline"
              onClick={handleReset}
              iconName="RotateCcw"
              iconPosition="left"
              className="h-12 px-6"
              disabled={!birthDate && !curp && !ageInYears && !age}
            >
              Limpiar
            </Button>
          </div>
        </div>
      </div>
      {/* Results */}
      {age && <GradeLevelDisplay age={age} />}
      {/* Educational System Info */}
      <div className="bg-slate-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-light text-slate-900 mb-2">Niveles del Sistema Educativo</h3>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { age: '2 años', level: 'Toddlers' },
            { age: '3 años', level: 'Nursery' },
            { age: '4 años', level: 'Junior Kinder' },
            { age: '5 años', level: 'Senior Kinder' },
            { age: '6 años', level: 'Grade 1' },
            { age: '7 años', level: 'Grade 2' },
            { age: '8 años', level: 'Grade 3' },
            { age: '9 años', level: 'Grade 4' }
          ]?.map((item, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto border border-gray-100">
                <span className="text-sm font-medium text-slate-700">{item?.age?.split(' ')?.[0]}</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-900">{item?.age}</p>
                <p className="text-xs text-slate-500">{item?.level}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorForm;