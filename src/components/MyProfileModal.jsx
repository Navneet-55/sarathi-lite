import React from 'react';
import DataTable from './DataTable';
import { TRANSLATIONS } from '../data/translations';

/**
 * My Profile Citizen Detail Drawer / Modal
 * Pure Bilingual Support (English & Hindi)
 */
export default function MyProfileModal({
  profile,
  isOpen,
  onClose,
  currentStep,
  paid,
  paymentRef,
  selectedSlot,
  lang = 'en',
}) {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isHi = lang === 'hi';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Modal Top Bar */}
        <div className="bg-[#0b2545] text-white px-5 py-3.5 flex items-center justify-between border-b border-amber-500 rounded-t-2xl">
          <div>
            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              {t.myProfile}
            </p>
            <h3 className="text-base font-bold">
              {profile?.name
                ? `${profile.name} — ${profile.applicationId || (isHi ? 'नया आवेदन' : 'New Application')}`
                : t.profileRecordTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-amber-400 text-lg font-bold px-2 py-0.5 rounded transition-colors"
            title={t.closeBtn}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 flex-1">
          <DataTable
            title={t.profileRecordTitle}
            badge={profile?.name ? (isHi ? 'आधार ई-केवाईसी सत्यापित' : 'UIDAI eKYC Verified') : (isHi ? 'प्रारूप आवेदन' : 'Draft Application')}
            subtitle={t.profileSubtitle}
            lang={lang}
            rows={[
              [t.appNumberField, <span key="app" className="font-mono font-bold">{profile?.applicationId || t.pendingRegistration}</span>],
              [t.fullNameLabel, profile?.name || t.notProvided],
              [t.mobileLabel, profile?.mobile || t.notProvided],
              [t.dobLabel, profile?.dob || t.notProvided],
              [t.aadhaarLabel, <span key="aadh" className="font-mono">{profile?.aadhaar || t.notProvided}</span>],
              [t.addressLabel, profile?.address || t.notProvided],
              [t.rtoLabel, <strong key="rto" className="text-blue-900 dark:text-blue-300">{profile?.rto}</strong>],
            ]}
          />

          <DataTable
            title={isHi ? 'आवेदन प्रगति स्थिति' : 'Application Workflow Status'}
            badge={t.stepOf(currentStep, 4)}
            lang={lang}
            rows={[
              [
                isHi ? 'वर्तमान चरण' : 'Current Workflow Stage',
                currentStep === 1
                  ? t.step1Short
                  : currentStep === 2
                  ? t.step2Short
                  : currentStep === 3
                  ? t.step3Short
                  : t.step4Short,
              ],
              [
                isHi ? 'चालान शुल्क स्थिति' : 'Challan Payment Status',
                paid ? (
                  <span key="p" className="text-emerald-700 dark:text-emerald-300 font-bold">
                    {isHi ? `भुगतान पूर्ण (संदर्भ: ${paymentRef})` : `PAID (Ref: ${paymentRef})`}
                  </span>
                ) : (
                  <span key="np" className="text-slate-500 dark:text-slate-400 font-medium">
                    {isHi ? 'भुगतान लंबित (₹150)' : 'Pending Settlement (₹150)'}
                  </span>
                ),
              ],
              [
                isHi ? 'आरक्षित परीक्षा स्लॉट' : 'Reserved Test Slot',
                selectedSlot ? (
                  <span key="sl" className="font-bold text-blue-900 dark:text-blue-300">
                    {selectedSlot.date} at {selectedSlot.time} ({selectedSlot.rto})
                  </span>
                ) : (
                  <span key="nsl" className="text-slate-500 dark:text-slate-400 font-medium">
                    {isHi ? 'अभी आरक्षित नहीं किया गया' : 'Not Yet Reserved'}
                  </span>
                ),
              ],
            ]}
          />
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-5 py-3 flex items-center justify-between rounded-b-2xl">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-full border border-slate-300 dark:border-slate-600 transition-colors"
          >
            {t.printReceiptBtn}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#0b2545] dark:bg-blue-700 hover:bg-blue-900 dark:hover:bg-blue-600 text-white text-xs font-bold rounded-full transition-colors"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
