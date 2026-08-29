import React, { useState } from 'react';
import DataTable from './DataTable';
import { TRANSLATIONS } from '../data/translations';

/**
 * Step 3: Statutory RTO Fee Challan Settlement with Dynamic Vehicle Category Calculation
 */
export default function StepFeePayment({
  profile,
  paid,
  setPaid,
  paymentRef,
  setPaymentRef,
  paying,
  setPaying,
  lang = 'en',
}) {
  const [payMethod, setPayMethod] = useState('upi');

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isHi = lang === 'hi';

  const vehicleClasses = profile?.vehicleClasses || ['MCWG', 'LMV'];
  const baseRatePerClass = 150;
  const totalPayableAmount = vehicleClasses.length * baseRatePerClass;

  const handlePayment = () => {
    if (paying || paid) return;
    setPaying(true);
    setTimeout(() => {
      const generatedRef = `MH-UPI-${Math.floor(10000000 + Math.random() * 90000000)}`;
      setPaid(true);
      setPaying(false);
      setPaymentRef(generatedRef);
    }, 850);
  };

  const handlePrint = () => {
    window.print();
  };

  const paymentModes = [
    { id: 'upi', label: t.payUpi },
    { id: 'card', label: t.payCard },
    { id: 'netbanking', label: t.payNetBanking },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm p-6 sm:p-8 space-y-6 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              {t.step3Badge}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f2a4a] dark:text-blue-100 tracking-tight mt-0.5">
              {t.step3Title}
            </h2>
          </div>
          <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1 rounded-full font-medium">
            ₹{baseRatePerClass}.00 per Vehicle Category
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          {t.step3Desc}
        </p>
      </div>

      {/* Itemized Challan Table */}
      <div className="bg-slate-50/70 dark:bg-slate-900/50 rounded-xl p-4 sm:p-5 border border-slate-200/70 dark:border-slate-700 space-y-3">
        <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider pb-1">
          <span>{t.challanScheduleTitle}</span>
          <span className="text-amber-600 dark:text-amber-400 font-mono">
            {vehicleClasses.length} {vehicleClasses.length === 1 ? 'Category' : 'Categories'} ({vehicleClasses.join(', ')})
          </span>
        </div>

        <div className="divide-y divide-slate-200/70 dark:divide-slate-700 text-xs sm:text-sm">
          {vehicleClasses.map((cov, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  {t.service1Title} — Class {cov}
                </p>
                <p className="text-[11px] text-slate-400">{t.service1Rule}</p>
              </div>
              <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                ₹{baseRatePerClass}.00
              </span>
            </div>
          ))}

          <div className="pt-3 pb-1 flex items-center justify-between font-bold text-sm sm:text-base text-blue-950 dark:text-blue-200">
            <span>{t.totalPayable}</span>
            <span className="font-mono text-lg text-blue-900 dark:text-blue-300">
              ₹{totalPayableAmount}.00
            </span>
          </div>
        </div>
      </div>

      {/* Payment Processing Flow */}
      {!paid ? (
        <div className="space-y-4 pt-2">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            {t.selectPaymentMode}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {paymentModes.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setPayMethod(m.id)}
                className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                  payMethod === m.id
                    ? 'border-blue-700 bg-blue-50/70 dark:bg-blue-950/60 text-blue-950 dark:text-blue-200 ring-1 ring-blue-700'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handlePayment}
            disabled={paying}
            className="w-full py-3.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm sm:text-base rounded-full shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            {paying ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t.authorizingTreasury}</span>
              </>
            ) : (
              <span>{t.authorizePaymentBtn(`₹${totalPayableAmount}.00`, payMethod.toUpperCase())}</span>
            )}
          </button>
        </div>
      ) : (
        /* Paid Receipt Stream */
        <div className="space-y-4 pt-2">
          <div className="bg-emerald-50 dark:bg-emerald-950/60 rounded-xl p-4 text-emerald-950 dark:text-emerald-200 flex flex-wrap items-center justify-between gap-3 border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-sm">{t.paymentSuccessTitle}</h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  {t.treasuryRefPrefix} <strong>{paymentRef}</strong>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-full border border-slate-200 dark:border-slate-700 shadow-xs no-print"
            >
              {t.printReceiptBtn}
            </button>
          </div>

          <DataTable
            title={t.officialReceiptTitle}
            badge={t.paidAcceptedBadge}
            subtitle={t.receiptSubtitle}
            lang={lang}
            rows={[
              [t.appNumberField, profile?.applicationId],
              [t.applicantNameField, profile?.name],
              [isHi ? 'स्वीकृत वाहन श्रेणियां' : 'Approved Vehicle Classes', vehicleClasses.join(' + ')],
              [t.transactionRefField, <span key="ref" className="font-mono font-bold text-blue-900 dark:text-blue-300">{paymentRef}</span>],
              [t.paymentDateField, new Date().toLocaleString(isHi ? 'hi-IN' : 'en-IN')],
              [t.accountingHeadField, isHi ? '0041-00-102 आरटीओ मोटर वाहन कर एवं शुल्क' : '0041-00-102 RTO Motor Vehicle Taxes & Fees'],
              [t.totalSettledField, `₹${totalPayableAmount}.00 (Settled in full)`],
              [t.receiptStatusField, <span key="status" className="font-bold text-emerald-700 dark:text-emerald-400">{t.treasurySuccessStatus}</span>],
            ]}
          />
        </div>
      )}
    </div>
  );
}
