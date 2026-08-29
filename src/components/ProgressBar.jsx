import React from 'react';
import { TRANSLATIONS } from '../data/translations';

/**
 * Natural Continuous Progress Tracker (Bilingual Support)
 */
export default function ProgressBar({ currentStep, onStepClick, lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const steps = [
    { num: 1, title: t.step1Short },
    { num: 2, title: t.step2Short },
    { num: 3, title: t.step3Short },
    { num: 4, title: t.step4Short },
  ];

  return (
    <nav aria-label="Application Progress" className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs border-b border-slate-200/80 dark:border-slate-800 px-4 py-3 sticky top-[57px] z-10 shadow-xs">
      <div className="max-w-4xl mx-auto">
        {/* Desktop Step Flow */}
        <div className="hidden sm:flex items-center justify-between relative">
          {/* Background Connecting Rail Line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />

          {steps.map((step) => {
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;

            return (
              <button
                key={step.num}
                type="button"
                onClick={() => onStepClick && onStepClick(step.num)}
                disabled={step.num > currentStep}
                className="relative z-10 flex items-center gap-2 group cursor-pointer disabled:cursor-not-allowed bg-white dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 transition-all text-left"
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-transform ${
                    isActive
                      ? 'bg-blue-800 text-white ring-4 ring-blue-100 dark:ring-blue-950 scale-105'
                      : isCompleted
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {isCompleted ? '✓' : step.num}
                </span>
                <span
                  className={`text-xs transition-colors ${
                    isActive
                      ? 'font-bold text-blue-900 dark:text-blue-200'
                      : isCompleted
                      ? 'font-semibold text-slate-700 dark:text-slate-300'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile View */}
        <div className="sm:hidden flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-800 text-white flex items-center justify-center text-[10px] font-bold">
              {currentStep}
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {steps[currentStep - 1]?.title}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {t.stepOf(currentStep, 4)}
          </span>
        </div>
      </div>
    </nav>
  );
}
