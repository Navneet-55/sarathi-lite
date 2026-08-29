import React, { useState, useEffect } from 'react';
import AccessibilityBar from './components/AccessibilityBar';
import ProgressBar from './components/ProgressBar';
import StepApplicationOcr from './components/StepApplicationOcr';
import TrafficRulesGuide from './components/TrafficRulesGuide';
import StepTrafficPractice from './components/StepTrafficPractice';
import StepFeePayment from './components/StepFeePayment';
import StepSlotBooking from './components/StepSlotBooking';
import MyProfileModal from './components/MyProfileModal';
import { fetchOcrData } from './services/apiService';

// Initial Fresh Blank Profile
const BLANK_PROFILE = {
  name: '',
  aadhaar: '',
  mobile: '',
  dob: '',
  address: '',
  applicationId: '',
  rto: 'RTO Bengaluru South (KA-05)',
};

export default function SarathiLite() {
  const [screen, setScreen] = useState('landing');
  const [currentStep, setCurrentStep] = useState(1);
  const [trafficPhase, setTrafficPhase] = useState('guide');
  const [textSize, setTextSize] = useState('normal');
  const [contrast, setContrast] = useState('standard');
  const [darkMode, setDarkMode] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Application Form & OCR State (Separate Front and Back)
  const [profile, setProfile] = useState(BLANK_PROFILE);
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [frontLoading, setFrontLoading] = useState(false);
  const [backLoading, setBackLoading] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);

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

  // Dark Mode Class Sync on HTML document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode]);

  const handleStartApplication = () => {
    setProfile({
      ...BLANK_PROFILE,
      applicationId: `KA-2026-LL-${Math.floor(10000 + Math.random() * 90000)}`,
    });
    setScreen('app');
    setCurrentStep(1);
    setTrafficPhase('guide');
  };

  const handleReset = () => {
    setScreen('landing');
    setCurrentStep(1);
    setTrafficPhase('guide');
    setProfile(BLANK_PROFILE);
    setFrontPreview(null);
    setBackPreview(null);
    setFrontLoading(false);
    setBackLoading(false);
    setOcrResult(null);
    setPracticePassed(false);
    setPaid(false);
    setPaying(false);
    setPaymentRef(null);
    setSelectedSlot(null);
    setBooked(false);
    setProfileModalOpen(false);
  };

  // Dedicated Front-Side Upload Handler
  const handleFrontUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;
      setFrontPreview(base64);
      setFrontLoading(true);

      try {
        const data = await fetchOcrData(base64, 'aadhaar', 'front');
        setOcrResult((prev) => ({ ...prev, ...data, frontScanned: true }));
        if (data) {
          setProfile((prev) => ({
            ...prev,
            name: data.name || prev.name,
            dob: data.dob || prev.dob,
            mobile: data.mobile || prev.mobile,
            aadhaar: data.docNumber || prev.aadhaar,
            applicationId: prev.applicationId || `KA-2026-LL-${Math.floor(10000 + Math.random() * 90000)}`,
          }));
        }
      } catch (err) {
        console.error('Front OCR error:', err);
      } finally {
        setFrontLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Dedicated Back-Side Upload Handler
  const handleBackUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;
      setBackPreview(base64);
      setBackLoading(true);

      try {
        const data = await fetchOcrData(base64, 'aadhaar', 'back');
        setOcrResult((prev) => ({ ...prev, ...data, backScanned: true }));
        if (data) {
          setProfile((prev) => ({
            ...prev,
            address: data.address || prev.address,
            aadhaar: data.docNumber || prev.aadhaar,
            applicationId: prev.applicationId || `KA-2026-LL-${Math.floor(10000 + Math.random() * 90000)}`,
          }));
        }
      } catch (err) {
        console.error('Back OCR error:', err);
      } finally {
        setBackLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Sample Front Page Loader
  const triggerSampleFront = async () => {
    setFrontLoading(true);
    const sampleFront = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'><rect width='100%' height='100%' fill='%23ffffff' stroke='%23cbd5e1' stroke-width='2'/><rect x='20' y='20' width='360' height='30' fill='%230f2a4a'/><text x='200' y='40' fill='%23ffffff' font-size='14' font-family='sans-serif' font-weight='bold' text-anchor='middle'>GOVERNMENT OF INDIA - AADHAAR</text><circle cx='60' cy='120' r='30' fill='%23e2e8f0'/><text x='110' y='105' font-size='14' font-family='sans-serif' font-weight='bold' fill='%231e293b'>Navneet</text><text x='110' y='125' font-size='12' font-family='sans-serif' fill='%2364748b'>DOB: 15/03/1998</text><text x='110' y='145' font-size='12' font-family='sans-serif' fill='%2364748b'>Mobile: 9876543210</text><text x='200' y='210' font-size='16' font-family='monospace' font-weight='bold' fill='%230f2a4a' text-anchor='middle'>8938 3111 6226</text></svg>";
    setFrontPreview(sampleFront);

    setTimeout(async () => {
      const data = await fetchOcrData(sampleFront, 'aadhaar', 'front');
      setOcrResult((prev) => ({ ...prev, ...data, frontScanned: true }));
      if (data) {
        setProfile((prev) => ({
          ...prev,
          name: data.name || prev.name,
          dob: data.dob || prev.dob,
          mobile: data.mobile || prev.mobile,
          aadhaar: data.docNumber || prev.aadhaar,
          applicationId: prev.applicationId || `KA-2026-LL-${Math.floor(10000 + Math.random() * 90000)}`,
        }));
      }
      setFrontLoading(false);
    }, 750);
  };

  // Sample Back Page Loader
  const triggerSampleBack = async () => {
    setBackLoading(true);
    const sampleBack = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'><rect width='100%' height='100%' fill='%23ffffff' stroke='%23cbd5e1' stroke-width='2'/><rect x='20' y='20' width='360' height='30' fill='%230f2a4a'/><text x='200' y='40' fill='%23ffffff' font-size='13' font-family='sans-serif' font-weight='bold' text-anchor='middle'>UNIQUE IDENTIFICATION AUTHORITY OF INDIA</text><text x='30' y='85' font-size='12' font-family='sans-serif' font-weight='bold' fill='%231e293b'>Address:</text><text x='30' y='105' font-size='11' font-family='sans-serif' fill='%23475569'>HSR Layout, Sector 3</text><text x='30' y='125' font-size='11' font-family='sans-serif' fill='%23475569'>Bengaluru, Karnataka - 560102</text><rect x='260' y='75' width='100' height='100' fill='%23e2e8f0' stroke='%2394a3b8'/><text x='310' y='130' font-size='10' font-family='sans-serif' fill='%2364748b' text-anchor='middle'>[QR CODE]</text><text x='200' y='215' font-size='15' font-family='monospace' font-weight='bold' fill='%230f2a4a' text-anchor='middle'>8938 3111 6226</text></svg>";
    setBackPreview(sampleBack);

    setTimeout(async () => {
      const data = await fetchOcrData(sampleBack, 'aadhaar', 'back');
      setOcrResult((prev) => ({ ...prev, ...data, backScanned: true }));
      if (data) {
        setProfile((prev) => ({
          ...prev,
          address: data.address || prev.address,
          aadhaar: data.docNumber || prev.aadhaar,
          applicationId: prev.applicationId || `KA-2026-LL-${Math.floor(10000 + Math.random() * 90000)}`,
        }));
      }
      setBackLoading(false);
    }, 750);
  };

  const getContrastClass = () => {
    return contrast === 'high' ? 'contrast-125 brightness-95 bg-amber-50/30' : '';
  };

  // Render Landing Page
  if (screen === 'landing') {
    return (
      <div className={`min-h-screen bg-[#f8fafc] dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans ${getContrastClass()}`}>
        {/* National Tri-Color Accent Bar */}
        <div className="h-1 w-full flex" aria-hidden="true">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#138808]" />
        </div>

        {/* Official Header Banner */}
        <header className="bg-[#0b2545] text-white px-4 py-3.5 border-b-2 border-amber-500 shadow-sm">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* National Emblem Seal */}
              <div className="w-9 h-9 rounded-full bg-white/10 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                  <path d="M12,2 L12,22 M2,12 L22,12 M5,5 L19,19 M5,19 L19,5" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span>सड़क परिवहन और राजमार्ग मंत्रालय</span>
                  <span className="text-white/40">•</span>
                  <span>Ministry of Road Transport & Highways</span>
                </p>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold tracking-tight">
                    Sarathi Parivahan
                  </h1>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 font-mono font-bold px-1.5 py-0.5 rounded border border-amber-400/30">
                    v1.2
                  </span>
                </div>
              </div>
            </div>
            <AccessibilityBar
              textSize={textSize}
              setTextSize={setTextSize}
              contrast={contrast}
              setContrast={setContrast}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </div>
        </header>

        {/* Landing Page Main Content */}
        <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-12 flex flex-col justify-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 p-8 sm:p-10 shadow-sm space-y-8">
            <div className="text-center space-y-3">
              <span className="text-[11px] font-bold text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-3.5 py-1 rounded-full uppercase tracking-wider">
                Online Driving License Services
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f2a4a] dark:text-blue-100 tracking-tight">
                Learner's License Application Portal
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
                Streamlined public portal simulating the official end-to-end Learner's License process: Aadhaar OCR verification, traffic regulations training, 5-question test, fee settlement, and RTO slot allotment.
              </p>
            </div>

            {/* Sequential Flow Steps */}
            <div className="pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <span className="w-6 h-6 rounded-full bg-blue-800 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    1
                  </span>
                  <span>Application & OCR</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <span className="w-6 h-6 rounded-full bg-blue-800 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    2
                  </span>
                  <span>Rules Guide & Test</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <span className="w-6 h-6 rounded-full bg-blue-800 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    3
                  </span>
                  <span>Fee Payment (₹150)</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <span className="w-6 h-6 rounded-full bg-blue-800 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    4
                  </span>
                  <span>Slot Reservation</span>
                </div>
              </div>
            </div>

            {/* Start Fresh Application Action */}
            <div className="pt-2 text-center max-w-sm mx-auto space-y-2">
              <button
                type="button"
                onClick={handleStartApplication}
                className="w-full py-4 bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm sm:text-base rounded-full shadow-xs transition-colors"
              >
                Start Fresh Application Form →
              </button>
              <p className="text-[11px] text-slate-400">
                Fresh form • Step-by-step entry or automated document scan
              </p>
            </div>
          </div>
        </main>

        {/* Official Footer */}
        <footer className="py-4 px-4 text-center text-xs text-slate-500 dark:text-slate-400">
          <p className="font-medium">
            Sarathi Parivahan • Ministry of Road Transport and Highways • Government of India
          </p>
        </footer>
      </div>
    );
  }

  // Render Portal Workflow (Steps 1 to 4)
  return (
    <div className={`min-h-screen bg-[#f8fafc] dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans ${getContrastClass()}`}>
      {/* National Tri-Color Accent Bar */}
      <div className="h-1 w-full flex no-print" aria-hidden="true">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Official Top Navigation Bar */}
      <header className="bg-[#0b2545] text-white px-4 py-3 border-b-2 border-amber-500 shadow-sm sticky top-0 z-20 no-print">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <path d="M12,2 L12,22 M2,12 L22,12 M5,5 L19,19 M5,19 L19,5" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <div>
              <p className="text-[9px] text-amber-400 font-bold uppercase tracking-widest hidden sm:block">
                Ministry of Road Transport & Highways
              </p>
              <div className="flex items-center gap-2">
                <h1 className="text-xs sm:text-sm font-bold tracking-tight">
                  Sarathi Parivahan
                </h1>
                <span className="text-[9px] bg-amber-400/20 text-amber-300 font-mono font-bold px-1.5 py-0.2 rounded border border-amber-400/30">
                  v1.2
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {profile?.name && (
              <button
                type="button"
                onClick={() => setProfileModalOpen(true)}
                className="px-3.5 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-full border border-white/20 transition-colors"
                title="View your citizen profile record"
              >
                My Profile
              </button>
            )}

            <AccessibilityBar
              textSize={textSize}
              setTextSize={setTextSize}
              contrast={contrast}
              setContrast={setContrast}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-blue-200 hover:text-white underline font-semibold px-1"
            >
              Exit / Reset
            </button>
          </div>
        </div>
      </header>

      {/* Applicant Meta Status Bar */}
      <section className="bg-slate-100/70 dark:bg-slate-800/70 border-b border-slate-200/80 dark:border-slate-700 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 no-print">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-slate-500 font-medium">Application ID:</span>
            <strong className="text-[#0f2a4a] dark:text-blue-300 font-mono font-bold">
              {profile?.applicationId || 'New Draft'}
            </strong>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-slate-500 font-medium">Applicant:</span>
            <strong className="text-slate-900 dark:text-slate-100 font-semibold">
              {profile?.name || 'Pending Registration'}
            </strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Jurisdiction:</span>
            <span className="font-semibold text-blue-900 dark:text-blue-300">
              {profile?.rto}
            </span>
          </div>
        </div>
      </section>

      {/* Progress Status Bar */}
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

      {/* Main Content Sheet Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 pb-32">
        {/* Step 1: Application Form & Distinct Front/Back OCR */}
        {currentStep === 1 && (
          <StepApplicationOcr
            profile={profile}
            setProfile={setProfile}
            frontPreview={frontPreview}
            backPreview={backPreview}
            frontLoading={frontLoading}
            backLoading={backLoading}
            ocrResult={ocrResult}
            handleFrontUpload={handleFrontUpload}
            handleBackUpload={handleBackUpload}
            triggerSampleFront={triggerSampleFront}
            triggerSampleBack={triggerSampleBack}
          />
        )}

        {/* Step 2: Traffic Rules Guide & Mandatory 5-Question Test */}
        {currentStep === 2 && (
          <div>
            {trafficPhase === 'guide' ? (
              <TrafficRulesGuide onStartTest={() => setTrafficPhase('test')} />
            ) : (
              <StepTrafficPractice
                onPassed={() => setPracticePassed(true)}
                practicePassed={practicePassed}
                onProceedToPayment={() => setCurrentStep(3)}
                onBackToGuide={() => setTrafficPhase('guide')}
              />
            )}
          </div>
        )}

        {/* Step 3: Statutory Fee Payment */}
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

        {/* Step 4: Slot Booking */}
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

      {/* My Profile Citizen Record Modal */}
      <MyProfileModal
        profile={profile}
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        currentStep={currentStep}
        paid={paid}
        paymentRef={paymentRef}
        selectedSlot={selectedSlot}
      />

      {/* Bottom Step Navigation Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-t border-slate-200/80 dark:border-slate-800 px-4 py-3 z-20 shadow-lg no-print">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              if (currentStep === 2 && trafficPhase === 'test') {
                setTrafficPhase('guide');
              } else {
                setCurrentStep((prev) => Math.max(prev - 1, 1));
              }
            }}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm rounded-full transition-colors"
          >
            ← Previous Step
          </button>

          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">
            Step {currentStep} of 4 — {
              currentStep === 1
                ? 'Application & OCR'
                : currentStep === 2
                ? (trafficPhase === 'guide' ? 'Traffic Rules Guide' : '5-Question Test')
                : currentStep === 3
                ? 'Fee Payment'
                : 'Slot Booking'
            }
          </span>

          <button
            type="button"
            onClick={() => {
              if (currentStep === 2 && trafficPhase === 'guide') {
                setTrafficPhase('test');
              } else {
                setCurrentStep((prev) => Math.min(prev + 1, 4));
              }
            }}
            disabled={
              (currentStep === 1 && !profile?.name) ||
              (currentStep === 2 && trafficPhase === 'test' && !practicePassed) ||
              (currentStep === 3 && !paid) ||
              currentStep === 4
            }
            className="px-6 py-2.5 bg-blue-800 hover:bg-blue-900 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm rounded-full shadow-xs transition-colors"
          >
            {currentStep === 1
              ? (profile?.name ? 'Proceed to Traffic Rules →' : 'Enter Name or Scan Aadhaar')
              : currentStep === 2 && trafficPhase === 'guide'
              ? 'Start 5-Q Test →'
              : currentStep === 4
              ? (booked ? 'Process Completed ✓' : 'Select Slot to Finish')
              : 'Proceed to Next Step →'}
          </button>
        </div>
      </footer>
    </div>
  );
}
