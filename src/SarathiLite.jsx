import React, { useState } from 'react';
import AccessibilityBar from './components/AccessibilityBar';
import ProgressBar from './components/ProgressBar';
import StepApplicationOcr from './components/StepApplicationOcr';
import StepTrafficPractice from './components/StepTrafficPractice';
import StepFeePayment from './components/StepFeePayment';
import StepSlotBooking from './components/StepSlotBooking';
import { fetchOcrData } from './services/apiService';

const INITIAL_PROFILE = {
  name: 'Rahul Sharma',
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

  // Application State
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

  // Slot State
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booked, setBooked] = useState(false);

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
        const data = await fetchOcrData(base64, 'aadhaar');
        setOcrResult(data);
        // Dynamically auto-populate/verify profile fields from OCR result
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

  const getTextSizeClass = () => {
    switch (textSize) {
      case 'small':
        return 'text-xs';
      case 'large':
        return 'text-base';
      default:
        return 'text-sm';
    }
  };

  // Render Landing Screen
  if (screen === 'landing') {
    return (
      <div className={`min-h-screen bg-[#f8fafc] flex flex-col font-sans ${getTextSizeClass()}`}>
        {/* Main Header Banner */}
        <header className="bg-[#0f2a4a] text-white px-4 py-3 border-b-2 border-amber-500 shadow-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-base sm:text-lg font-bold tracking-tight">
              Sarathi Parivahan - Learner's License Portal (Lite)
            </h1>
            <AccessibilityBar textSize={textSize} setTextSize={setTextSize} />
          </div>
        </header>

        {/* Landing Content */}
        <main className="flex-1 max-w-xl w-full mx-auto px-4 py-12 flex flex-col justify-center">
          <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-xs space-y-6 text-center">
            <div className="inline-block bg-blue-50 text-[#0f2a4a] px-3 py-1 rounded text-xs font-bold border border-blue-200 uppercase tracking-wider">
              Ministry of Road Transport & Highways — Citizen Service
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#0f2a4a]">
                Online Learner's License Application System
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm">
                Streamlined citizen workflow for application filing, document OCR verification, mandatory traffic sign practice, fee settlement, and RTO test slot booking.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-4 bg-blue-700 hover:bg-blue-800 text-white font-bold text-base rounded shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>⚡</span>
                <span>1-Click Demo Login</span>
              </button>
              <p className="text-[11px] text-slate-500 mt-2">
                Pre-filled mock citizen profile • Instant Aadhaar eKYC simulation
              </p>
            </div>
          </div>
        </main>

        <footer className="bg-slate-100 border-t border-slate-200 py-3 text-center text-xs text-slate-500">
          Sarathi Parivahan Lite Portal • Public Service Interface
        </footer>
      </div>
    );
  }

  // Render Portal Workflow
  return (
    <div className={`min-h-screen bg-[#f8fafc] flex flex-col font-sans ${getTextSizeClass()}`}>
      {/* Top Navigation Bar */}
      <header className="bg-[#0f2a4a] text-white px-4 py-3 border-b-2 border-amber-500 shadow-sm sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-sm sm:text-base font-bold tracking-tight">
              Sarathi Parivahan - Learner's License Portal (Lite)
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <AccessibilityBar textSize={textSize} setTextSize={setTextSize} />
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-blue-200 hover:text-white underline font-semibold"
            >
              Exit Demo
            </button>
          </div>
        </div>
      </header>

      {/* Applicant Meta Header */}
      <section className="bg-slate-100 border-b border-slate-200 px-4 py-2 text-xs text-slate-700">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-slate-500">Applicant ID: </span>
            <strong className="text-[#0f2a4a] font-mono">{profile?.applicationId}</strong>
            <span className="mx-2 text-slate-300">|</span>
            <span className="text-slate-500">Name: </span>
            <strong className="text-slate-900">{profile?.name}</strong>
          </div>
          <div>
            <span className="text-slate-500">RTO: </span>
            <span className="font-semibold text-slate-800">{profile?.rto}</span>
          </div>
        </div>
      </section>

      {/* 4-Step Direct Text Progress Bar */}
      <ProgressBar currentStep={currentStep} />

      {/* Main Step Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 pb-24">
        {currentStep === 1 && (
          <StepApplicationOcr
            profile={profile}
            setProfile={setProfile}
            docPreview={docPreview}
            ocrResult={ocrResult}
            ocrLoading={ocrLoading}
            handleDocUpload={handleDocUpload}
          />
        )}

        {currentStep === 2 && (
          <StepTrafficPractice
            onPassed={() => setPracticePassed(true)}
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
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 z-10 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
            disabled={currentStep === 1}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 font-bold text-xs sm:text-sm rounded border border-slate-300 transition-colors"
          >
            ← Previous Step
          </button>

          <span className="text-xs text-slate-500 hidden sm:inline">
            Step {currentStep} of 4
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
            className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm rounded transition-colors shadow-xs"
          >
            {currentStep === 4 ? 'Form Completed' : 'Proceed to Next Step →'}
          </button>
        </div>
      </footer>
    </div>
  );
}
