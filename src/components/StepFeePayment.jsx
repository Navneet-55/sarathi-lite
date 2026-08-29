import React, { useState } from 'react';
import DataTable from './DataTable';

/**
 * Step 3: Statutory RTO Fee Challan Settlement
 * Clean Document Sheet (Non-Boxy)
 */
export default function StepFeePayment({
  profile,
  paid,
  setPaid,
  paymentRef,
  setPaymentRef,
  paying,
  setPaying,
}) {
  const [payMethod, setPayMethod] = useState('upi');

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

  return (
    <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Challan Head: 0041-00-102 • Rule 32 CMVR
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f2a4a] dark:text-blue-100 tracking-tight mt-0.5">
              Statutory Fee Settlement
            </h2>
          </div>
          <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full font-medium">
            Tariff Fixed Rate: ₹150.00
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          Settlement of statutory government fees for Form 2 processing, computerized test administration, and smart card allotment.
        </p>
      </div>

      {/* Itemized Challan Table */}
      <div className="bg-slate-50/70 dark:bg-slate-900/50 rounded-xl p-4 sm:p-5 border border-slate-200/70 dark:border-slate-800 space-y-3">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider pb-1">
          Ministry Challan Fee Schedule
        </div>

        <div className="divide-y divide-slate-200/70 dark:divide-slate-800 text-xs sm:text-sm">
          <div className="py-2.5 flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Issue of Learner's License (Form 2)</p>
              <p className="text-[11px] text-slate-400">Rule 32, Central Motor Vehicles Rules</p>
            </div>
            <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">₹50.00</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Computerized LL Knowledge Test Fee</p>
              <p className="text-[11px] text-slate-400">Parivahan testing workstation fee</p>
            </div>
            <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">₹50.00</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">Online Service & Slot Reservation Fee</p>
              <p className="text-[11px] text-slate-400">Administrative processing tariff</p>
            </div>
            <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">₹50.00</span>
          </div>

          <div className="pt-3 pb-1 flex items-center justify-between font-bold text-sm sm:text-base text-blue-950 dark:text-blue-200">
            <span>Total Payable Amount</span>
            <span className="font-mono text-lg text-blue-900 dark:text-blue-300">₹150.00</span>
          </div>
        </div>
      </div>

      {/* Payment Processing Flow */}
      {!paid ? (
        <div className="space-y-4 pt-2">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Select Payment Method
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'upi', label: 'UPI (BHIM / GPay / PhonePe)' },
              { id: 'card', label: 'Debit / Credit Card' },
              { id: 'netbanking', label: 'Internet Banking' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setPayMethod(m.id)}
                className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                  payMethod === m.id
                    ? 'border-blue-700 bg-blue-50/70 dark:bg-blue-950/60 text-blue-950 dark:text-blue-200 ring-1 ring-blue-700'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
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
                <span>Authorizing Treasury Settlement...</span>
              </>
            ) : (
              <span>Authorize Settlement of ₹150.00 via {payMethod.toUpperCase()}</span>
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
                <h4 className="font-bold text-sm">Payment Authorized & Settled</h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  Treasury Reference ID: <strong>{paymentRef}</strong>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-1.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-full border border-slate-200 dark:border-slate-700 shadow-xs no-print"
            >
              Print Receipt
            </button>
          </div>

          <DataTable
            title="Official RTO Treasury Payment Receipt"
            badge="PAID & ACCEPTED"
            subtitle="Retain this official payment confirmation for test day reporting."
            rows={[
              ['Application Number', profile?.applicationId],
              ['Applicant Full Name', profile?.name],
              ['Transaction Reference ID', <span key="ref" className="font-mono font-bold text-blue-900 dark:text-blue-300">{paymentRef}</span>],
              ['Payment Settlement Date', new Date().toLocaleString('en-IN')],
              ['Accounting Head', '0041-00-102 RTO Motor Vehicle Taxes & Fees'],
              ['Total Amount Settled', '₹150.00 (One Hundred and Fifty Rupees Only)'],
              ['Receipt Status', <span key="status" className="font-bold text-emerald-700 dark:text-emerald-400">SUCCESS • Treasury Accepted</span>],
            ]}
          />
        </div>
      )}
    </div>
  );
}
