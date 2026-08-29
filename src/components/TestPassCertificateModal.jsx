import React from 'react';

/**
 * Formal RTO Learner's License Test Qualification Certificate
 */
export default function TestPassCertificateModal({ isOpen, onClose, profile, score, totalQuestions = 15, lang = 'en' }) {
  if (!isOpen) return null;

  const isHi = lang === 'hi';
  const issueDate = new Date().toLocaleString(isHi ? 'hi-IN' : 'en-IN');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border-2 border-amber-500 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col text-slate-900 dark:text-slate-100 font-sans">
        {/* Certificate Top Bar */}
        <div className="bg-[#0b2545] text-white px-5 py-3 flex items-center justify-between border-b border-amber-500 rounded-t-2xl no-print">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            {isHi ? 'आधिकारिक परीक्षा योग्यता प्रमाण पत्र' : 'Official Test Qualification Certificate'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-amber-400 font-bold text-lg px-2"
          >
            ✕
          </button>
        </div>

        {/* Certificate Parchment Body */}
        <div className="p-8 sm:p-10 space-y-6 text-center bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 dark:from-slate-850 dark:to-slate-900 relative border-8 border-double border-amber-500/30 m-4 rounded-xl">
          {/* Header */}
          <div className="space-y-1 border-b border-slate-200 dark:border-slate-700 pb-4">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
              {isHi ? 'सड़क परिवहन और राजमार्ग मंत्रालय • भारत सरकार' : 'Ministry of Road Transport & Highways • Government of India'}
            </p>
            <h2 className="text-xl sm:text-2xl font-black text-[#0b2545] dark:text-blue-200 tracking-tight uppercase">
              {isHi ? 'लर्नर लाइसेंस योग्यता प्रमाण पत्र' : 'Learner License Qualification Certificate'}
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              Central Motor Vehicles Rules, 1989 (Rule 11 & Rule 32)
            </p>
          </div>

          {/* Citizen Citation */}
          <div className="space-y-3 py-2 text-xs sm:text-sm">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {isHi ? 'यह प्रमाणित किया जाता है कि आवेदक:' : 'This is to certify that the applicant:'}
            </p>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0b2545] dark:text-amber-400 uppercase tracking-wide">
              {profile?.name || (isHi ? 'नागरिक आवेदक' : 'Authorized Citizen')}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-mono">
              {isHi ? 'आवेदन संख्या:' : 'Application ID:'} <strong>{profile?.applicationId || 'KA-2026-LL-98124'}</strong>
            </p>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 max-w-lg mx-auto leading-relaxed">
              {isHi
                ? `ने सड़क संकेत, मोटर वाहन अधिनियम 1988 और चालक सुरक्षा नियमों पर आयोजित कंप्यूटरीकृत ज्ञान परीक्षा में ${totalQuestions} में से ${score} अंक प्राप्त कर सफलता पूर्वक उत्तीर्णता प्राप्त की है।`
                : `has successfully passed the statutory Computerized Knowledge Examination on Road Signs, Traffic Regulations, and Motor Vehicles Act 1988 with a score of ${score}/${totalQuestions}.`}
            </p>
          </div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <div>
              <span className="text-[9px] text-slate-400 uppercase block">{isHi ? 'प्राप्त अंक' : 'Score'}</span>
              <strong className="font-mono text-emerald-600 dark:text-emerald-400 text-sm">{score} / {totalQuestions}</strong>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 uppercase block">{isHi ? 'परिणाम' : 'Status'}</span>
              <strong className="text-emerald-700 dark:text-emerald-300 uppercase">{isHi ? 'उत्तीर्ण (PASS)' : 'PASS'}</strong>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 uppercase block">{isHi ? 'आरटीओ' : 'Authority'}</span>
              <span className="font-medium text-slate-700 dark:text-slate-300 truncate block">{profile?.rto || 'KA-05'}</span>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 uppercase block">{isHi ? 'जारी समय' : 'Timestamp'}</span>
              <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400 truncate block">{issueDate}</span>
            </div>
          </div>

          {/* Security Seal Graphic */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500">
            <span className="font-mono text-[10px]">SARATHI DIGITAL SEAL: ✓ SECURE</span>
            <span className="font-bold text-[#0b2545] dark:text-blue-300 uppercase">Licensing Authority</span>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-5 py-3 flex items-center justify-between rounded-b-2xl no-print">
          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs rounded-full shadow-xs transition-colors"
          >
            🖨️ {isHi ? 'प्रमाण पत्र प्रिंट / डाउनलोड करें' : 'Print / Download Certificate'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-full"
          >
            {isHi ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
