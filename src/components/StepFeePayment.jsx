import React, { useState } from 'react';
import DataTable from './DataTable';

/**
 * Step 3: Official RTO Fee Challan Payment Settlement (Dark Mode Ready)
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
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-[#0f2a4a] dark:text-blue-200">
            Step 3: Statutory RTO Application Fee Challan Settlement
          </h2>
          <span className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-600 font-mono">
            Challan Head: 0041-00-102
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          Settlement of statutory fees for Form 2 processing, computerized knowledge test, and smart card allotment under Rule 32 of CMVR.
        </p>
      </div>

      {/* Itemized Fee Breakdown Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
        <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 py-2.5 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-[#0f2a4a] dark:text-blue-300 uppercase tracking-wider">
            Ministry Challan Fee Schedule
          </h3>
          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
            Govt. Fixed Rate
          </span>
        </div>
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-100/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 text-[11px] uppercase font-bold">
              <th className="py-2.5 px-4">Service Description</th>
              <th className="py-2.5 px-4">Statutory Rule</th>
              <th className="py-2.5 px-4 text-right">Amount (INR)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-800 dark:text-slate-200">
            <tr>
              <td className="py-2.5 px-4 font-medium">Issue of Learner's License (Form 2)</td>
              <td className="py-2.5 px-4 text-slate-500 dark:text-slate-400 text-xs">Rule 32, CMVR</td>
              <td className="py-2.5 px-4 text-right font-mono">₹50.00</td>
            </tr>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50">
              <td className="py-2.5 px-4 font-medium">Learner's Test Fee (Computerized)</td>
              <td className="py-2.5 px-4 text-slate-500 dark:text-slate-400 text-xs">Rule 32, CMVR</td>
              <td className="py-2.5 px-4 text-right font-mono">₹50.00</td>
            </tr>
            <tr>
              <td className="py-2.5 px-4 font-medium">Online Service & Slot Reservation Fee</td>
              <td className="py-2.5 px-4 text-slate-500 dark:text-slate-400 text-xs">Administrative Tariff</td>
              <td className="py-2.5 px-4 text-right font-mono">₹50.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="bg-slate-100 dark:bg-slate-900 font-bold border-t-2 border-slate-300 dark:border-slate-700 text-[#0f2a4a] dark:text-blue-300">
              <td colSpan={2} className="py-3 px-4 text-right uppercase text-xs">
                Total Payable Amount:
              </td>
              <td className="py-3 px-4 text-right font-mono text-base text-blue-900 dark:text-blue-200">
                ₹150.00
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Payment Processing Card */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5 shadow-xs space-y-4">
        {!paid ? (
          <div className="space-y-4">
            <h3 className="text-xs sm:text-sm font-bold text-[#0f2a4a] dark:text-blue-300 uppercase tracking-wide border-b border-slate-200 dark:border-slate-700 pb-2">
              Select Electronic Payment Mode
            </h3>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'upi', label: 'UPI Payment Gateway (BHIM / GPay / PhonePe)' },
                { id: 'card', label: 'Debit / Credit Card (RuPay / Visa / Master)' },
                { id: 'netbanking', label: 'Internet Banking (SBI & Nationalized Banks)' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPayMethod(m.id)}
                  className={`p-3 rounded border text-left text-xs font-semibold transition-all ${
                    payMethod === m.id
                      ? 'border-blue-700 dark:border-blue-400 bg-blue-50/80 dark:bg-blue-950/60 text-blue-950 dark:text-blue-200 ring-1 ring-blue-700 dark:ring-blue-400'
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="leading-tight">{m.label}</span>
                </button>
              ))}
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-700 dark:text-slate-300">
              <p className="leading-relaxed">
                <strong>Electronic Simulation Mode:</strong> Simulated gateway sandbox. Authorizing will generate an official treasury challan reference without debiting your account.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePayment}
              disabled={paying}
              className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 disabled:bg-slate-400 text-white font-bold text-sm rounded shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              {paying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing with Treasury Gateway...</span>
                </>
              ) : (
                <span>Authorize Payment of ₹150.00 via {payMethod.toUpperCase()}</span>
              )}
            </button>
          </div>
        ) : (
          /* Payment Success & Formal Receipt */
          <div className="space-y-4">
            <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-lg p-4 text-emerald-950 dark:text-emerald-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base">Payment Authorized & Settled</h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300">
                    Official Treasury Reference Number: <strong>{paymentRef}</strong>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePrint}
                className="px-3.5 py-1.5 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold rounded border border-slate-300 dark:border-slate-600 shadow-xs no-print"
              >
                Print Receipt
              </button>
            </div>

            <DataTable
              title="Official RTO Treasury Payment Receipt"
              badge="PAID & ACCEPTED"
              subtitle="Retain this payment record for your physical verification at the RTO center."
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
    </div>
  );
}
