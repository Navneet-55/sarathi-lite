import React from 'react';

/**
 * Direct 4-Step Text-Based Progress Bar
 * Strictly adheres to public-service text-based workflow:
 * Step 1: Application & OCR → Step 2: Traffic Rules Practice → Step 3: Fee Payment → Step 4: Slot Booking
 */
export default function ProgressBar({ currentStep, onStepClick }) {
  const steps = [
    { num: 1, title: 'Application & OCR' },
    { num: 2, title: 'Traffic Rules Practice' },
    { num: 3, title: 'Fee Payment' },
    { num: 4, title: 'Slot Booking' },
  ];

  return (
    <nav aria-label="Application Progress" className="bg-white border-b border-slate-200 px-4 py-2.5 shadow-xs">
      <div className="max-w-5xl mx-auto">
        {/* Desktop / Tablet View */}
        <div className="hidden md:flex items-center justify-between text-xs font-semibold">
          {steps.map((step, idx) => {
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;

            return (
              <React.Fragment key={step.num}>
                <button
                  type="button"
                  onClick={() => onStepClick && onStepClick(step.num)}
                  disabled={step.num > currentStep}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded transition-all text-left ${
                    isActive
                      ? 'bg-[#0f2a4a] text-white shadow-xs font-bold'
                      : isCompleted
                      ? 'text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200 cursor-pointer'
                      : 'text-slate-400 bg-slate-50 border border-slate-200 cursor-not-allowed opacity-75'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                      isActive
                        ? 'bg-amber-400 text-slate-900'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isCompleted ? '✓' : step.num}
                  </span>
                  <span>
                    Step {step.num}: {step.title}
                  </span>
                </button>

                {idx < steps.length - 1 && (
                  <span className="text-slate-300 font-bold px-1 select-none" aria-hidden="true">
                    →
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex flex-col gap-1.5 text-xs">
          <div className="flex items-center justify-between font-bold text-[#0f2a4a]">
            <span>Active: Step {currentStep} of 4 — {steps[currentStep - 1]?.title}</span>
            <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono">
              {Math.round((currentStep / 4) * 100)}% Complete
            </span>
          </div>
          <div className="text-[11px] text-slate-600 leading-tight">
            Step 1: Application & OCR → Step 2: Traffic Rules Practice → Step 3: Fee Payment → Step 4: Slot Booking
          </div>
        </div>
      </div>
    </nav>
  );
}
