import React, { useState, useEffect } from 'react';
import AccessibilityBar from './components/AccessibilityBar';
import ProgressBar from './components/ProgressBar';
import StepApplicationOcr from './components/StepApplicationOcr';
import StepTrafficPractice from './components/StepTrafficPractice';
import StepFeePayment from './components/StepFeePayment';
import StepSlotBooking from './components/StepSlotBooking';
import { fetchOcrData } from './services/apiService';

const INITIAL_PROFILE = {
  name: 'Navneet',
  aadhaar: 'XXXX-XXXX-4521',
  mobile: '+91 98765 43210',
  dob: '15/03/1998',
  address: 'HSR Layout, Sector 3, Bengaluru, Karnataka 560102',
  applicationId: 'KA-2026-LL-88421',
  rto: 'RTO Bengaluru South (KA-05)',
};

export default function SarathiLite() {
  const [screen, setScreen] = useState('landing');
  const [currentStep, setCurrentStep] = useState(1);
  const [textSize, setTextSize] = useState('normal');
  const [contrast, setContrast] = useState('standard');

  // Application Form & OCR State
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [docPreview, setDocPreview] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [ocrLoading, setOcrLoading] = useState(false);

  // Practice Test State
  const [practicePassed, setPracticePassed] = useState(false);

  // Payment State
  const [paid, setPaid] = useState(false);
  const [paying, setPaying] = useState(false);
  const [paymentRef, setPaymentRef] = useState(null);

  // Slot Booking State
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booked, setBooked] = useState(false);

  // Dynamic Root Font Size Controller for Accessibility (A- | A | A+)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (textSize === 'small') {
        document.documentElement.style.fontSize = '14px';
      } else if (textSize === 'large') {
        document.documentElement.style.fontSize = '19px';
      } else {
        document.documentElement.style.fontSize = '16px';
      }
    }
  }, [textSize]);

  const handleDemoLogin = () => {
    setProfile({ ...INITIAL_PROFILE });
    setScreen('app');
    setCurrentStep(1);
  };

  const handleReset = () => {
    setScreen('landing');
    setCurrentStep(1);
    setProfile(INITIAL_PROFILE);
    setDocPreview(null);
    setOcrResult(null);
    setPracticePassed(false);
    setPaid(false);
    setPaying(false);
    setPaymentRef(null);
    setSelectedSlot(null);
    setBooked(false);
  };

  const handleDocUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;
      setDocPreview(base64);
      setOcrLoading(true);
      setOcrResult(null);

      try {
        const data = await fetchOcrData(base64, 'aadhaar', profile);
        setOcrResult(data);
        if (data.name) {
          setProfile((prev) => ({
            ...prev,
            name: data.name,
            dob: data.dob || prev.dob,
            address: data.address || prev.address,
            aadhaar: data.docNumber || prev.aadhaar,
          }));
        }
      } catch (err) {
        console.error('OCR processing error:', err);
      } finally {
        setOcrLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerSampleOcr = async () => {
    setOcrLoading(true);
    setOcrResult(null);
    const sampleCanvas = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'><rect width='100%' height='100%' fill='%23ffffff' stroke='%23cbd5e1' stroke-width='2'/><rect x='20' y='20' width='360' height='30' fill='%230f2a4a'/><text x='200' y='40' fill='%23ffffff' font-size='14' font-family='sans-serif' font-weight='bold' text-anchor='middle'>GOVERNMENT OF INDIA - AADHAAR</text><circle cx='60' cy='120' r='30' fill='%23e2e8f0'/><text x='110' y='105' font-size='14' font-family='sans-serif' font-weight='bold' fill='%231e293b'>Navneet</text><text x='110' y='125' font-size='12' font-family='sans-serif' fill='%2364748b'>DOB: 15/03/1998</text><text x='110' y='145' font-size='12' font-family='sans-serif' fill='%2364748b'>Male / Purush</text><text x='200' y='210' font-size='16' font-family='monospace' font-weight='bold' fill='%230f2a4a' text-anchor='middle'>XXXX XXXX 4521</text></svg>";
    setDocPreview(sampleCanvas);

    setTimeout(async () => {
      const data = await fetchOcrData(sampleCanvas, 'aadhaar', profile);
      setOcrResult(data);
      if (data.name) {
        setProfile((prev) => ({
          ...prev,
          name: data.name,
          dob: data.dob || prev.dob,
          address: data.address || prev.address,
          aadhaar: data.docNumber || prev.aadhaar,
        }));
      }
      setOcrLoading(false);
    }, 850);
  };

  const getContrastClass = () => {
    return contrast === 'high' ? 'contrast-125 brightness-95 bg-amber-50/30' : '';
  };

  // Render Landing Page
  if (screen === 'landing') {
    return (
      <div className={`min-h-screen bg-[#f8fafc] flex flex-col font-sans ${getContrastClass()}`}>
        {/* National Tri-Color Accent Bar */}
        <div className="h-1 w-full flex" aria-hidden="true">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#138808]" />
        </div>

        {/* Official Header Banner */}
        <header className="bg-[#0f2a4a] text-white px-4 py-3.5 border-b-2 border-amber-500 shadow-xs">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                Government of India • Ministry of Road Transport & Highways
              </p>
              <h1 className="text-base sm:text-xl font-bold tracking-tight">
                Sarathi Parivahan - Learner's License Portal (Lite)
              </h1>
            </div>
            <AccessibilityBar
              textSize={textSize}
              setTextSize={setTextSize}
              contrast={contrast}
              setContrast={setContrast}
            />
          </div>
        </header>

        {/* Landing Page Main Content */}
        <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 flex flex-col justify-center">
          <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-200 pb-4 text-center space-y-2">
              <span className="text-[11px] font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded border border-blue-200 uppercase tracking-wider">
                Online Driving License Services
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f2a4a]">
                Learner's License Application Portal
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                Official public service portal for Learner's Driving License applications under the Motor Vehicles Act (1988). Complete document verification, traffic rules preparation, challan settlement, and appointment slot booking.
              </p>
            </div>

            {/* Simple Linear Workflow Bar (No Box Cards) */}
            <div className="bg-slate-50 border border-slate-200 rounded p-4">
              <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-3">
                Sequential Application Procedure:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-semibold text-slate-800">
                <div className="flex items-center gap-2 p-2 bg-white rounded border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-[#0f2a4a] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    1
                  </span>
                  <span>Application & OCR</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white rounded border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-[#0f2a4a] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    2
                  </span>
                  <span>Traffic Rules Test</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white rounded border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-[#0f2a4a] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    3
                  </span>
                  <span>Fee Payment (₹150)</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white rounded border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-[#0f2a4a] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    4
                  </span>
                  <span>Slot Reservation</span>
                </div>
              </div>
            </div>

            {/* Login Action Bar */}
            <div className="pt-2 text-center max-w-sm mx-auto space-y-2">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold text-sm sm:text-base rounded shadow-xs transition-colors"
              >
                Access Portal (1-Click Demo Login)
              </button>
              <p className="text-[11px] text-slate-500">
                Pre-filled citizen profile for testing • Instant eKYC simulation
              </p>
            </div>
          </div>
        </main>

        {/* Official Footer */}
        <footer className="bg-slate-100 border-t border-slate-200 py-3.5 px-4 text-center text-xs text-slate-600">
          <p className="font-semibold text-slate-800">
            Sarathi Parivahan • Ministry of Road Transport and Highways • Government of India
          </p>
        </footer>
      </div>
    );
  }

  // Render Portal Workflow (Steps 1 to 4)
  return (
    <div className={`min-h-screen bg-[#f8fafc] flex flex-col font-sans ${getContrastClass()}`}>
      {/* National Tri-Color Accent Bar */}
      <div className="h-1 w-full flex no-print" aria-hidden="true">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Official Top Navigation Bar */}
      <header className="bg-[#0f2a4a] text-white px-4 py-3 border-b-2 border-amber-500 shadow-xs sticky top-0 z-20 no-print">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider hidden sm:block">
              Ministry of Road Transport & Highways
            </p>
            <h1 className="text-sm sm:text-base font-bold tracking-tight">
              Sarathi Parivahan - Learner's License Portal (Lite)
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <AccessibilityBar
              textSize={textSize}
              setTextSize={setTextSize}
              contrast={contrast}
              setContrast={setContrast}
            />
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-blue-200 hover:text-white underline font-semibold px-1"
            >
              Exit Demo
            </button>
          </div>
        </div>
      </header>

      {/* Applicant Meta Status Bar */}
      <section className="bg-slate-100 border-b border-slate-200 px-4 py-2 text-xs text-slate-700 no-print">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-slate-500 font-medium">Application ID:</span>
            <strong className="text-[#0f2a4a] font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
              {profile?.applicationId}
            </strong>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-medium">Applicant:</span>
            <strong className="text-slate-900 font-semibold">{profile?.name}</strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Jurisdiction:</span>
            <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {profile?.rto}
            </span>
          </div>
        </div>
      </section>

      {/* 4-Step Direct Text-Based Progress Bar */}
      <div className="no-print">
        <ProgressBar
          currentStep={currentStep}
          onStepClick={(stepNum) => {
            if (stepNum <= currentStep) {
              setCurrentStep(stepNum);
            }
          }}
        />
      </div>

      {/* Main Form Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 pb-28">
        {currentStep === 1 && (
          <StepApplicationOcr
            profile={profile}
            setProfile={setProfile}
            docPreview={docPreview}
            ocrResult={ocrResult}
            ocrLoading={ocrLoading}
            handleDocUpload={handleDocUpload}
            triggerSampleOcr={triggerSampleOcr}
          />
        )}

        {currentStep === 2 && (
          <StepTrafficPractice
            onPassed={() => setPracticePassed(true)}
            practicePassed={practicePassed}
          />
        )}

        {currentStep === 3 && (
          <StepFeePayment
            profile={profile}
            paid={paid}
            setPaid={setPaid}
            paymentRef={paymentRef}
            setPaymentRef={setPaymentRef}
            paying={paying}
            setPaying={setPaying}
          />
        )}

        {currentStep === 4 && (
          <StepSlotBooking
            profile={profile}
            paid={paid}
            paymentRef={paymentRef}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            booked={booked}
            setBooked={setBooked}
          />
        )}
      </main>

      {/* Bottom Step Navigation Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 z-10 shadow-lg no-print">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-800 font-bold text-xs sm:text-sm rounded border border-slate-300 transition-colors"
          >
            ← Previous Step
          </button>

          <span className="text-xs font-semibold text-slate-600 hidden sm:inline">
            Step {currentStep} of 4 — {
              currentStep === 1
                ? 'Application & OCR'
                : currentStep === 2
                ? 'Traffic Rules Practice'
                : currentStep === 3
                ? 'Fee Payment'
                : 'Slot Booking'
            }
          </span>

          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 4))}
            disabled={
              (currentStep === 1 && !profile?.name) ||
              (currentStep === 2 && !practicePassed) ||
              (currentStep === 3 && !paid) ||
              currentStep === 4
            }
            className="px-5 py-2 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm rounded shadow-xs transition-colors"
          >
            {currentStep === 4 ? (booked ? 'Process Completed ✓' : 'Select Slot to Finish') : 'Proceed to Next Step →'}
          </button>
        </div>
      </footer>
    </div>
  );
}
