import React from 'react';
import Icon from '../../../components/AppIcon';

const GradeLevelDisplay = ({ age }) => {
  const getGradeLevel = (years) => {
    const gradeLevels = {
      2: { level: "Toddlers", color: "bg-pink-100 text-pink-800 border-pink-200", icon: "Baby" },
      3: { level: "Nursery", color: "bg-purple-100 text-purple-800 border-purple-200", icon: "Heart" },
      4: { level: "Junior Kinder", color: "bg-blue-100 text-blue-800 border-blue-200", icon: "Star" },
      5: { level: "Senior Kinder", color: "bg-green-100 text-green-800 border-green-200", icon: "Award" },
      6: { level: "Grade 1", color: "bg-orange-100 text-orange-800 border-orange-200", icon: "BookOpen" },
      7: { level: "Grade 2", color: "bg-red-100 text-red-800 border-red-200", icon: "BookOpen" },
      8: { level: "Grade 3", color: "bg-indigo-100 text-indigo-800 border-indigo-200", icon: "BookOpen" },
      9: { level: "Grade 4", color: "bg-teal-100 text-teal-800 border-teal-200", icon: "BookOpen" }
    };

    return gradeLevels?.[years] || { 
      level: "Consultar con institución educativa", 
      color: "bg-gray-100 text-gray-800 border-gray-200", 
      icon: "HelpCircle" 
    };
  };

  if (!age) return null;

  const gradeInfo = getGradeLevel(age?.years);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Calendar" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Edad Calculada</h3>
        </div>
        
        <div className="bg-muted rounded-lg p-4">
          <p className="text-2xl font-bold text-foreground">
            {age?.years} años {age?.months > 0 && `y ${age?.months} ${age?.months === 1 ? 'mes' : 'meses'}`}
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2 mt-4">
          <Icon name="GraduationCap" size={20} className="text-muted-foreground" />
          <h4 className="text-md font-medium text-foreground">Nivel Escolar Recomendado</h4>
        </div>

        <div className={`inline-flex items-center space-x-2 px-4 py-3 rounded-lg border-2 ${gradeInfo?.color}`}>
          <Icon name={gradeInfo?.icon} size={24} />
          <span className="text-lg font-semibold">{gradeInfo?.level}</span>
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              Esta herramienta es solo una guía. Consulte con la institución educativa para requisitos específicos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeLevelDisplay;