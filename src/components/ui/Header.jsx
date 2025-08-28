import React, { useState } from 'react';
import Icon from '../AppIcon';

const Header = () => {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  
  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const languages = {
    es: {
      title: 'Calculadora de Nivel Escolar',
      subtitle: 'Sistema Educativo Mexicano'
    },
    en: {
      title: 'School Level Calculator',
      subtitle: 'Mexican Education System'
    }
  };

  return (
    <header className="w-full bg-card border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary-foreground"
              >
                <path
                  d="M12 2L3 7V17C3 17.55 3.45 18 4 18H9V12H15V18H20C20.55 18 21 17.55 21 17V7L12 2Z"
                  fill="currentColor"
                />
                <path
                  d="M9 12V18H15V12H9ZM11 14H13V16H11V14Z"
                  fill="currentColor"
                  fillOpacity="0.7"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-foreground leading-tight">
                {languages?.[currentLanguage]?.title}
              </h1>
              <p className="text-xs text-muted-foreground leading-tight">
                {languages?.[currentLanguage]?.subtitle}
              </p>
            </div>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200 ease-out"
              aria-label={currentLanguage === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Icon name="Globe" size={16} />
              <span className="hidden sm:inline">
                {currentLanguage === 'es' ? 'English' : 'Español'}
              </span>
              <span className="sm:hidden">
                {currentLanguage === 'es' ? 'EN' : 'ES'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;