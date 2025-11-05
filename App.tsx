import React, { useState, useRef, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { sections, initialFormData } from './constants';
import type { FormData, FormErrors } from './types';
import AccordionItem from './components/AccordionItem';
import { CheckCircleIcon, ExclamationCircleIcon, TelegramIcon } from './components/Icons';
import { useLanguage } from './context/LanguageContext';

const App: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  // Supabase client
  const supabaseUrl = 'https://yfgsxhzihffeyzkzohll.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmZ3N4aHppaGZmZXl6a3pvaGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyODc4NDYsImV4cCI6MjA3NTg2Mzg0Nn0.cewl4AWD7n8c12DM13M6ilkhtwsp1dNFZbf_ysNXTmY';
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [activeSection, setActiveSection] = useState<number | null>(0); // Start with the first section open
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const questionnaireRef = useRef<HTMLDivElement>(null);

  const handleScrollToQuestionnaire = () => {
    questionnaireRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(0); // Ensure the first section is open when scrolling
  };

  const toggleSection = (index: number) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const handleChange = useCallback((sectionKey: keyof FormData, field: string, value: string | string[] | boolean) => {
    setFormData(prev => {
      const section = prev[sectionKey];
      // Type guard to ensure section is an object and not an array or null
      if (typeof section === 'object' && section !== null && !Array.isArray(section)) {
        return {
          ...prev,
          [sectionKey]: {
            ...section,
            [field]: value,
          },
        };
      }
      return prev;
    });
    // Clear error for the field when user starts typing
    if (errors[field]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    }
  }, [errors]);
  
  const validateAndGetErrors = (): FormErrors => {
    const newErrors: FormErrors = {};
    sections.forEach(section => {
        section.questions.forEach(q => {
            if (q.required) {
                const sectionData = formData[section.key as keyof FormData];
                 if (typeof sectionData === 'object' && sectionData !== null && q.id in sectionData) {
                    // FIX: Cast sectionData to a generic record to allow dynamic property access.
                    // This prevents TypeScript from inferring `value` as `never` because `sectionData` is a union type with no common keys.
                    // FIX: Cast to 'unknown' first to resolve the TypeScript conversion error.
                    const value = (sectionData as unknown as Record<string, unknown>)[q.id];
                    if (typeof value === 'string' && !value.trim()) {
                        newErrors[q.id] = t.requiredField;
                    } else if (Array.isArray(value) && value.length === 0) {
                         newErrors[q.id] = t.requiredCheckbox;
                    }
                 }
            }
        });
    });
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const newErrors = validateAndGetErrors();
    
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        const firstErrorKey = Object.keys(newErrors)[0];
        const errorSectionIndex = sections.findIndex(s => s.questions.some(q => q.id === firstErrorKey));

        if (errorSectionIndex !== -1) {
            setActiveSection(errorSectionIndex);
            setTimeout(() => {
                const element = document.getElementById(`${sections[errorSectionIndex].key}-${firstErrorKey}`);
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element?.focus();
            }, 300); // Delay to allow accordion to open
        }
        return;
    }

    setIsSubmitting(true);
    try {
      // Отправка данных в таблицу 'forms' Supabase
      const { error } = await supabase
        .from('forms')
        .insert([{ data: formData, language }]);
      if (error) {
        setSubmitError(t.submitError);
      } else {
        setIsSubmitted(true);
      }
    } catch (error) {
      setSubmitError(t.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-8 md:p-12 text-center max-w-2xl mx-auto">
          <CheckCircleIcon className="w-16 h-16 text-teal-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.thankYouTitle}</h1>
          <p className="text-gray-600 text-lg">{t.thankYouText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-gray-800 min-h-screen">
      <header className="h-screen min-h-[700px] flex items-center justify-center p-6 bg-white/70 backdrop-blur-md shadow-md">
        <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="flex-shrink-0">
            <img 
              src="https://yfgsxhzihffeyzkzohll.supabase.co/storage/v1/object/public/images_MuiNe/unnamed.jpg" 
              alt={t.headerAuthor}
              className="w-48 md:w-64 rounded-2xl shadow-2xl shadow-pink-400/50 ring-4 ring-white/70"
            />
          </div>
          <div className="text-center md:text-left max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text animated-gradient-text">
              {t.headerTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              {t.headerSubtitle}
            </p>
            <p className="text-md text-gray-500 mb-8">{t.headerAuthor}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <button
                  onClick={handleScrollToQuestionnaire}
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg transform hover:scale-105 w-full sm:w-auto"
                >
                  {t.goToQuestionnaireBtn}
                </button>
        <a
          href="https://t.me/neopsyhea"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-blue-500 text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition-colors duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                    <TelegramIcon className="w-5 h-5" />
                    <span>{t.telegramChannelBtn}</span>
                </a>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setLanguage('ru')}
                        aria-label="Switch to Russian"
                        className={`font-bold py-2 px-4 rounded-full transition-colors duration-300 ${language === 'ru' ? 'bg-blue-600 text-white shadow' : 'bg-transparent text-blue-600 hover:bg-blue-50'}`}
                    >
                        RU
                    </button>
                    <button
                        onClick={() => setLanguage('ua')}
                        aria-label="Switch to Ukrainian"
                        className={`font-bold py-2 px-4 rounded-full transition-colors duration-300 ${language === 'ua' ? 'bg-blue-600 text-white shadow' : 'bg-transparent text-blue-600 hover:bg-blue-50'}`}
                    >
                        UA
                    </button>
                    <button
                        onClick={() => setLanguage('en')}
                        aria-label="Switch to English"
                        className={`font-bold py-2 px-4 rounded-full transition-colors duration-300 ${language === 'en' ? 'bg-blue-600 text-white shadow' : 'bg-transparent text-blue-600 hover:bg-blue-50'}`}
                    >
                        EN
                    </button>
                </div>
            </div>
          </div>
        </div>
      </header>
      
      <main ref={questionnaireRef} className="py-16 px-4 md:px-8 scroll-mt-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} noValidate>
            {sections.map((section, index) => {
               const sectionData = formData[section.key as keyof FormData];
               return (
                  <React.Fragment key={section.id}>
                    {section.id === 6 && (
                      <div className="my-8 flex justify-center p-4">
                        <img 
                          src="https://yfgsxhzihffeyzkzohll.supabase.co/storage/v1/object/public/images_MuiNe/unnamed1.png" 
                          alt="Двигательная активность иллюстрация"
                          className="max-w-full h-auto rounded-2xl shadow-2xl shadow-blue-400/50"
                        />
                      </div>
                    )}
                    <AccordionItem
                      title={t[section.titleKey as keyof typeof t] || section.titleKey}
                      sectionNumber={index + 1}
                      isOpen={activeSection === index}
                      onToggle={() => toggleSection(index)}
                    >
                      <div className="space-y-6">
                        {section.questions.map((q) => {
                          const error = errors[q.id];
                           if (typeof sectionData !== 'object' || sectionData === null) return null;
                           // FIX: Cast sectionData to a generic record to allow dynamic property access.
                           // This prevents TypeScript from inferring `value` as `never` because `sectionData` is a union type with no common keys.
                           // FIX: Cast to 'unknown' first to resolve the TypeScript conversion error.
                           const value = (sectionData as unknown as Record<string, unknown>)[q.id];
                          const inputId = `${section.key}-${q.id}`;

                          return (
                              <div key={q.id}>
                                  <label htmlFor={inputId} className="block text-md font-medium text-gray-700 mb-2">
                                      {t[q.labelKey as keyof typeof t] || q.labelKey} {q.required && <span className="text-red-500">*</span>}
                                  </label>
                                  {q.type === 'text' || q.type === 'email' || q.type === 'date' || q.type === 'time' || q.type === 'tel' ? (
                                      <input
                                          type={q.type}
                                          id={inputId}
                                          value={(value as string) || ''}
                                          onChange={(e) => handleChange(section.key as keyof FormData, q.id, e.target.value)}
                                          className={`w-full p-3 border rounded-md transition-colors text-gray-900 ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:border-blue-500 focus:ring-2`}
                                          aria-invalid={!!error}
                                          aria-describedby={error ? `${inputId}-error` : undefined}
                                      />
                                  ) : q.type === 'textarea' ? (
                                      <textarea
                                          id={inputId}
                                          rows={4}
                                          value={(value as string) || ''}
                                          onChange={(e) => handleChange(section.key as keyof FormData, q.id, e.target.value)}
                                          className={`w-full p-3 border rounded-md transition-colors text-gray-900 ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:border-blue-500 focus:ring-2`}
                                          aria-invalid={!!error}
                                          aria-describedby={error ? `${inputId}-error` : undefined}
                                      />
                                  ) : q.type === 'radio' ? (
                                      <fieldset id={inputId} className="space-y-2">
                                          <legend className="sr-only">{t[q.labelKey as keyof typeof t] || q.labelKey}</legend>
                                          {q.optionsKeys?.map(optionKey => {
                                              const optionText = t[optionKey as keyof typeof t] || optionKey;
                                              return (
                                                  <label key={optionKey} className="flex items-center space-x-3 cursor-pointer">
                                                      <input
                                                          type="radio"
                                                          name={q.id}
                                                          value={optionText}
                                                          checked={value === optionText}
                                                          onChange={(e) => handleChange(section.key as keyof FormData, q.id, e.target.value)}
                                                          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                      />
                                                      <span className="text-gray-800">{optionText}</span>
                                                  </label>
                                              );
                                          })}
                                      </fieldset>
                                  ) : q.type === 'checkbox' ? (
                                      <fieldset id={inputId} className="space-y-2">
                                          <legend className="sr-only">{t[q.labelKey as keyof typeof t] || q.labelKey}</legend>
                                          {q.optionsKeys?.map(optionKey => {
                                               const optionText = t[optionKey as keyof typeof t] || optionKey;
                                               return (
                                                  <label key={optionKey} className="flex items-center space-x-3 cursor-pointer">
                                                      <input
                                                          type="checkbox"
                                                          value={optionText}
                                                          checked={(value as string[])?.includes(optionText)}
                                                          onChange={(e) => {
                                                              const currentValues = (value as string[]) || [];
                                                              const newValues = e.target.checked
                                                                  ? [...currentValues, optionText]
                                                                  : currentValues.filter(item => item !== optionText);
                                                              handleChange(section.key as keyof FormData, q.id, newValues);
                                                          }}
                                                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                      />
                                                      <span className="text-gray-800">{optionText}</span>
                                                  </label>
                                               );
                                          })}
                                      </fieldset>
                                  ) : null}
                                  {error && <p id={`${inputId}-error`} className="text-red-600 text-sm mt-1">{error}</p>}
                              </div>
                          );
                        })}
                      </div>
                    </AccordionItem>
                    {section.id === 10 && (
                      <div className="my-8 flex justify-center p-4">
                        <img 
                          src="https://yfgsxhzihffeyzkzohll.supabase.co/storage/v1/object/public/images_MuiNe/unnamed2.png" 
                          alt="Завершающий блок иллюстрация"
                          className="max-w-full h-auto rounded-2xl shadow-2xl shadow-blue-400/50"
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            <div className="mt-8 text-center">
                {submitError && (
                    <div role="alert" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-6 flex items-center justify-center">
                        <ExclamationCircleIcon className="w-5 h-5 mr-2" />
                        <span className="block sm:inline">{submitError}</span>
                    </div>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-teal-600 text-white font-bold py-4 px-10 rounded-full hover:bg-teal-700 transition-all duration-300 shadow-lg transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                >
                    {isSubmitting ? t.submittingBtn : t.submitBtn}
                </button>
                <p className="text-xs text-gray-500 mt-4">
                    {t.privacyPolicy} <a href="#" className="underline hover:text-blue-700">{t.privacyPolicyLink}</a>.
                </p>
            </div>
          </form>
        </div>
      </main>
      <footer className="text-center py-6 bg-white/70 backdrop-blur-md border-t border-gray-200">
          <p className="text-gray-600">{t.footerText.replace('{year}', new Date().getFullYear().toString())}</p>
      </footer>
    </div>
  );
};

export default App;
