import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';

/**
 * Official Ministry Application Status & Lifecyle Tracker
 */
export default function ApplicationTrackerModal({
  isOpen,
  onClose,
  profile,
  currentStep: _currentStep,
  practicePassed,
  paid,
  paymentRef,
  selectedSlot,
  booked,
  lang = 'en',
}) {
  const [searchId, setSearchId] = useState(profile?.applicationId || '');
  const [trackedData, setTrackedData] = useState(null);

  const _t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isHi = lang === 'hi';

  if (!isOpen) return null;

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    // Build timeline state for queried Application ID
    const isCurrent = searchId.trim().toUpperCase() === profile?.applicationId?.toUpperCase();

    setTrackedData({
      appId: searchId.trim().toUpperCase(),
      name: isCurrent && profile?.name ? profile.name : (isHi ? 'नागरिक आवेदक' : 'Authorized Citizen Applicant'),
      rto: isCurrent && profile?.rto ? profile.rto : 'Bengaluru South (KA-05)',
      stages: [
        {
          title: isHi ? '1. प्रपत्र 2 आवेदन प्रविष्टि' : '1. Form 2 Application Submission',
          desc: isHi ? 'व्यक्तिगत विवरण व पता सफलतापूर्वक पंजीकृत' : 'Citizen demographics and address registered',
          completed: isCurrent ? !!profile?.name : true,
          date: '2026-08-29 10:15 AM',
        },
        {
          title: isHi ? '2. आधार ई-केवाईसी दस्तावेज़ सत्यापन' : '2. Aadhaar eKYC Document Verification',
          desc: isHi ? 'ओसीआर द्वारा पहचान व पते का प्रमाण सत्यापित' : 'Demographic & address verified via OCR scanning',
          completed: isCurrent ? (!!profile?.name && !!profile?.address) : true,
          date: '2026-08-29 10:20 AM',
        },
        {
          title: isHi ? '3. सड़क संकेत व यातायात नियम ज्ञान परीक्षा' : '3. Road Signs & Safety Qualifying Test',
          desc: isHi ? '5-प्रश्नों की नियामक परीक्षा उत्तीर्ण' : 'Passed regulatory 5-question qualifying test',
          completed: isCurrent ? practicePassed : true,
          date: '2026-08-29 10:25 AM',
        },
        {
          title: isHi ? '4. सरकारी चालान शुल्क भुगतान (₹150)' : '4. Treasury Fee Challan Settlement (₹150)',
          desc: isHi ? `राजकोषीय संदर्भ: ${paymentRef || 'MH-UPI-98412033'}` : `Treasury Ref: ${paymentRef || 'MH-UPI-98412033'}`,
          completed: isCurrent ? paid : true,
          date: '2026-08-29 10:28 AM',
        },
        {
          title: isHi ? '5. आरटीओ परीक्षा वर्कस्टेशन स्लॉट आवंटन' : '5. RTO Examination Workstation Slot Allotment',
          desc: isCurrent && selectedSlot ? `${selectedSlot.date} at ${selectedSlot.time} (${selectedSlot.rto})` : '2026-09-02 at 09:30 AM (Bengaluru South)',
          completed: isCurrent ? booked : true,
          date: '2026-08-29 10:30 AM',
        },
      ],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto flex flex-col text-slate-900 dark:text-slate-100">
        {/* Top Header */}
        <div className="bg-[#0b2545] text-white px-5 py-3.5 flex items-center justify-between border-b border-amber-500 rounded-t-2xl">
          <div>
            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">
              {isHi ? 'राष्ट्रीय परिवहन रजिस्टर' : 'National Transport Register'}
            </p>
            <h3 className="text-base font-bold">
              {isHi ? 'आवेदन स्थिति ट्रैकर (Track Status)' : 'Application Status & Lifecycle Tracker'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-amber-400 font-bold text-lg px-2"
          >
            ✕
          </button>
        </div>

        {/* Body Search Form */}
        <div className="p-5 space-y-5 flex-1">
          <form onSubmit={handleTrackSubmit} className="flex gap-2">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder={isHi ? 'आवेदन क्रमांक दर्ज करें (उदा. KA-2026-LL-12345)' : 'Enter Application ID (e.g. KA-2026-LL-12345)'}
              className="flex-1 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-full text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm rounded-full shadow-xs transition-colors shrink-0"
            >
              {isHi ? 'स्थिति जांचें' : 'Track'}
            </button>
          </form>

          {/* Timeline Output */}
          {trackedData && (
            <div className="space-y-4 pt-2">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex flex-wrap justify-between gap-2">
                <div>
                  <span className="text-slate-500 block">{isHi ? 'आवेदन क्रमांक:' : 'Application ID:'}</span>
                  <strong className="font-mono text-sm text-blue-900 dark:text-blue-300">{trackedData.appId}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">{isHi ? 'आवेदक का नाम:' : 'Applicant Name:'}</span>
                  <strong className="text-slate-900 dark:text-slate-100">{trackedData.name}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">{isHi ? 'आरटीओ:' : 'RTO Office:'}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{trackedData.rto}</span>
                </div>
              </div>

              {/* Sequential Stepper */}
              <div className="space-y-4 relative pl-4 border-l-2 border-slate-200 dark:border-slate-700 ml-3">
                {trackedData.stages.map((st, idx) => (
                  <div key={idx} className="relative group">
                    <div
                      className={`absolute -left-[23px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        st.completed
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 dark:ring-emerald-950'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                      }`}
                    >
                      {st.completed ? '✓' : idx + 1}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`text-xs font-bold ${st.completed ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}`}>
                          {st.title}
                        </h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${st.completed ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                          {st.completed ? (isHi ? 'सफल' : 'Completed') : (isHi ? 'प्रतीक्षित' : 'Pending')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">
                        {st.desc}
                      </p>
                      {st.completed && (
                        <span className="text-[10px] text-slate-400 font-mono block">
                          {isHi ? 'समय:' : 'Timestamp:'} {st.date}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-5 py-3 flex justify-end rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-full transition-colors"
          >
            {isHi ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
