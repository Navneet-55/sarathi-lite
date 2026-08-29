import React from 'react';
import { TRANSLATIONS } from '../data/translations';

/**
 * DigiLocker / mParivahan Simulated Digital Learner's License Smart Card
 */
export default function DigitalSmartCard({ profile, paymentRef: _paymentRef, selectedSlot: _selectedSlot, lang = 'en' }) {
  const _t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isHi = lang === 'hi';

  const issueDate = new Date().toLocaleDateString(isHi ? 'hi-IN' : 'en-IN');
  const validUntil = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString(isHi ? 'hi-IN' : 'en-IN');
  const vehicleClasses = (profile?.vehicleClasses || ['MCWG', 'LMV']).join(' + ');

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Digital Smart Card Body */}
      <div className="relative mx-auto max-w-md w-full bg-gradient-to-br from-[#0B2545] via-[#133E68] to-[#0B2545] text-white rounded-2xl p-5 sm:p-6 shadow-xl border-2 border-amber-400/40 overflow-hidden">
        {/* Background Watermark Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center font-bold text-7xl uppercase tracking-widest select-none">
          SARATHI
        </div>

        {/* Top Ministry Ribbon */}
        <div className="flex items-center justify-between border-b border-amber-400/30 pb-2.5 mb-3">
          <div>
            <p className="text-[8px] sm:text-[9px] text-amber-300 font-bold uppercase tracking-widest leading-none">
              {isHi ? 'सड़क परिवहन और राजमार्ग मंत्रालय' : 'Ministry of Road Transport & Highways'}
            </p>
            <p className="text-[10px] sm:text-xs font-extrabold text-white tracking-tight mt-0.5">
              {isHi ? 'भारत सरकार • ई-लर्निंग ड्राइविंग लाइसेंस' : 'Government of India • Digital Learner License'}
            </p>
          </div>
          <span className="text-[9px] font-mono bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black tracking-wider uppercase">
            FORM 3
          </span>
        </div>

        {/* Card Main Particulars */}
        <div className="flex gap-4 items-center">
          {/* Avatar Photo Frame & Chip */}
          <div className="shrink-0 space-y-1.5 text-center">
            <div className="w-20 h-24 sm:w-22 sm:h-26 bg-slate-100 text-slate-800 rounded-lg border-2 border-amber-400/60 overflow-hidden flex flex-col items-center justify-center font-bold shadow-inner">
              <span className="text-2xl sm:text-3xl">👤</span>
              <span className="text-[9px] font-bold text-slate-600 mt-1 uppercase tracking-tight">
                {isHi ? 'फोटो' : 'PHOTO'}
              </span>
            </div>
            {/* Simulated Smart Chip Graphic */}
            <div className="w-7 h-5 mx-auto bg-gradient-to-r from-amber-300 to-amber-500 rounded border border-amber-600 shadow-2xs" />
          </div>

          {/* Citizen Demographics Column */}
          <div className="space-y-1 text-[11px] sm:text-xs flex-1 min-w-0">
            <div>
              <span className="text-[9px] text-amber-300 uppercase font-semibold block">
                {isHi ? 'लाइसेंस संख्या (LL No.)' : 'LL License Number'}
              </span>
              <span className="font-mono font-bold text-sm tracking-tight text-white block truncate">
                {profile?.applicationId ? `LL-${profile.applicationId}` : 'LL-KA2026-98124'}
              </span>
            </div>

            <div>
              <span className="text-[9px] text-slate-300 uppercase font-semibold block">
                {isHi ? 'चालक का नाम' : 'Holder Name'}
              </span>
              <span className="font-bold text-white uppercase truncate block">
                {profile?.name || (isHi ? 'नागरिक नाम' : 'Authorized Citizen')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div>
                <span className="text-[8px] text-slate-300 uppercase block">{isHi ? 'जन्मतिथि' : 'DOB'}</span>
                <span className="font-semibold text-white">{profile?.dob || '15/03/1998'}</span>
              </div>
              <div>
                <span className="text-[8px] text-slate-300 uppercase block">{isHi ? 'रक्त समूह' : 'Blood Grp'}</span>
                <span className="font-bold text-rose-300">{profile?.bloodGroup || 'O+'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div>
                <span className="text-[8px] text-slate-300 uppercase block">{isHi ? 'श्रेणी (COV)' : 'Class (COV)'}</span>
                <span className="font-bold text-amber-300 truncate block">{vehicleClasses}</span>
              </div>
              <div>
                <span className="text-[8px] text-slate-300 uppercase block">{isHi ? 'अंगदाता' : 'Donor'}</span>
                <span className="font-bold text-emerald-300">{profile?.organDonor ? 'YES 🫀' : 'NO'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div>
                <span className="text-[8px] text-slate-300 uppercase block">{isHi ? 'जारी तिथि' : 'Issue Date'}</span>
                <span className="font-semibold text-white">{issueDate}</span>
              </div>
              <div>
                <span className="text-[8px] text-slate-300 uppercase block">{isHi ? 'वैधता' : 'Valid Upto'}</span>
                <span className="font-semibold text-amber-300">{validUntil}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer Bar */}
        <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-300">
          <span className="truncate max-w-[200px]">{profile?.rto || 'RTO Bengaluru'}</span>
          <span className="font-mono font-bold text-amber-300 uppercase">DigiLocker Verified ✓</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 no-print">
        <button
          type="button"
          onClick={handlePrintCard}
          className="px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs rounded-full shadow-xs transition-colors flex items-center gap-1.5"
        >
          <span>🖨️</span>
          <span>{isHi ? 'डिजिटल स्मार्ट कार्ड प्रिंट / सेव करें' : 'Print / Save Digital Smart Card'}</span>
        </button>
      </div>
    </div>
  );
}
