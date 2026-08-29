import React from 'react';

/**
 * Direct 4-Step Text-Based Progress Bar
 * Strictly adheres to standard public-service linear flow
 */
export default function ProgressBar({ currentStep }) {
  const steps = [
    { num: 1, id: 'application', title: 'Application & OCR' },
    { num: 2, id: 'practice', title: 'Traffic Rules Practice' },
    { num: 3, id: 'payment', title: 'Fee Payment' },
    { num: 4, id: 'booking', title: 'Slot Booking' },
  ];

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-3 shadow-xs">
      <div className="max-w-4xl mx-auto">
        <div className="hidden md:flex items-center justify-between text-xs font-semibold text-slate-700">
          {steps.map((step, idx) => {
            const isActive = currentStep === step.num;
            const isDone = currentStep > step.num;
            return (
              <React.Fragment key={step.id}>
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${
                    isActive
                      ? 'bg-[#0f2a4a] text-white'
                      : isDone
                      ? 'text-emerald-700 font-bold'
                      : 'text-slate-500'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      isActive
                        ? 'bg-white text-[#0f2a4a]'
                        : isDone
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isDone ? '✓' : step.num}
                  </span>
                  <span>Step {step.num}: {step.title}</span>
                </div>
                {idx < steps.length - 1 && (
                  <span className="text-slate-300 font-bold">→</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile Text View */}
        <div className="md:hidden text-xs font-bold text-[#0f2a4a] flex items-center justify-between">
          <span>Step {currentStep} of 4: {steps[currentStep - 1]?.title}</span>
          <span className="text-slate-500 font-normal">
            Step 1: Application & OCR → Step 2: Practice → Step 3: Payment → Step 4: Booking
          </span>
        </div>
      </div>
    </div>
  );
}
