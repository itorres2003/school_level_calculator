import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import CalculatorForm from './components/CalculatorForm';

const GradeLevelCalculator = () => {
  const [currentLanguage, setCurrentLanguage] = useState('es');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'es';
    setCurrentLanguage(savedLanguage);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'es' ? 'en' : 'es';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const content = {
    es: {
      title: 'Calculadora de Nivel Escolar',
      subtitle: 'Sistema Educativo',
      description: 'Determine el nivel escolar apropiado para niños de 2-9 años',
      keywords: 'calculadora, nivel escolar, educación, CURP, edad, primaria, kinder'
    },
    en: {
      title: 'School Level Calculator',
      subtitle: 'Education System',
      description: 'Determine appropriate school level for children aged 2-9 years',
      keywords: 'calculator, school level, education, CURP, age, primary, kindergarten'
    }
  };

  return (
    <>
      <Helmet>
        <title>{content?.[currentLanguage]?.title} | {content?.[currentLanguage]?.subtitle}</title>
        <meta name="description" content={content?.[currentLanguage]?.description} />
        <meta name="keywords" content={content?.[currentLanguage]?.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={content?.[currentLanguage]?.title} />
        <meta property="og:description" content={content?.[currentLanguage]?.description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/grade-level-calculator" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between h-16 px-6">
              {/* Logo and Brand */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-slate-900 rounded-md">
                  <Icon name="GraduationCap" size={20} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg font-medium text-slate-900 leading-tight">
                    {content?.[currentLanguage]?.title}
                  </h1>
                </div>
              </div>

              {/* Language Toggle */}
              <div className="flex items-center">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors duration-150"
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

        {/* Main Content */}
        <main className="flex-1 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-slate-900 mb-4 tracking-tight">
                {content?.[currentLanguage]?.title}
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
                {content?.[currentLanguage]?.description}
              </p>
            </div>

            {/* Calculator Form */}
            <CalculatorForm />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 mt-24">
          <div className="max-w-6xl mx-auto py-8 px-6">
            <p className="text-sm text-slate-500">
              © {new Date()?.getFullYear()} Calculadora de Nivel Escolar. 
              Herramienta educativa.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default GradeLevelCalculator;