import React, { useState } from 'react';
import DataTable from './DataTable';

/**
 * Step 3: Official RTO Fee Challan Payment Settlement
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
      <div className="border-b border-slate-200 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-[#0f2a4a]">
            Step 3: Statutory RTO Application Fee Challan Settlement
          </h2>
          <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-300 font-mono">
            Challan Head: 0041-00-102
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1">
          Settlement of statutory fees for Form 2 processing, computerized knowledge test, and smart card allotment under Rule 32 of CMVR.
        </p>
      </div>

      {/* Itemized Fee Breakdown Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-[#0f2a4a] uppercase tracking-wider">
            Ministry Challan Fee Schedule
          </h3>
          <span className="text-[11px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
            Govt. Fixed Rate
          </span>
        </div>
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-100/70 text-slate-700 border-b border-slate-200 text-[11px] uppercase font-bold">
              <th className="py-2.5 px-4">Service Description</th>
              <th className="py-2.5 px-4">Statutory Rule</th>
              <th className="py-2.5 px-4 text-right">Amount (INR)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-800">
            <tr>
              <td className="py-2.5 px-4 font-medium">Issue of Learner's License (Form 2)</td>
              <td className="py-2.5 px-4 text-slate-500 text-xs">Rule 32, CMVR</td>
              <td className="py-2.5 px-4 text-right font-mono">₹50.00</td>
            </tr>
            <tr className="bg-slate-50/50">
              <td className="py-2.5 px-4 font-medium">Learner's Test Fee (Computerized)</td>
              <td className="py-2.5 px-4 text-slate-500 text-xs">Rule 32, CMVR</td>
              <td className="py-2.5 px-4 text-right font-mono">₹50.00</td>
            </tr>
            <tr>
              <td className="py-2.5 px-4 font-medium">Online Service & Slot Reservation Fee</td>
              <td className="py-2.5 px-4 text-slate-500 text-xs">Administrative Tariff</td>
              <td className="py-2.5 px-4 text-right font-mono">₹50.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="bg-slate-100 font-bold border-t-2 border-slate-300 text-[#0f2a4a]">
              <td colSpan={2} className="py-3 px-4 text-right uppercase text-xs">
                Total Payable Amount:
              </td>
              <td className="py-3 px-4 text-right font-mono text-base text-blue-900">
                ₹150.00
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Payment Processing Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
        {!paid ? (
          <div className="space-y-4">
            <h3 className="text-xs sm:text-sm font-bold text-[#0f2a4a] uppercase tracking-wide border-b border-slate-200 pb-2">
              Select Electronic Payment Mode
            </h3>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'upi', label: 'UPI (BHIM / GPay / PhonePe)', icon: '📱' },
                { id: 'card', label: 'Debit / Credit Card (RuPay)', icon: '💳' },
                { id: 'netbanking', label: 'Internet Banking (SBI/All)', icon: '🏦' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPayMethod(m.id)}
                  className={`p-3 rounded border text-left text-xs font-semibold flex items-center gap-2.5 transition-all ${
                    payMethod === m.id
                      ? 'border-blue-700 bg-blue-50/80 text-blue-950 ring-1 ring-blue-700'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xl" aria-hidden="true">{m.icon}</span>
                  <span className="leading-tight">{m.label}</span>
                </button>
              ))}
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs text-slate-700 flex items-start gap-2">
              <span className="text-blue-700 text-sm">ℹ️</span>
              <p className="leading-relaxed">
                <strong>Instant Sandbox Simulation:</strong> No real bank debit or debit card details required. Click below to simulate instant treasury receipt generation.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePayment}
              disabled={paying}
              className="w-full py-4 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold text-sm sm:text-base rounded shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              {paying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Settling with Treasury Payment Gateway...</span>
                </>
              ) : (
                <>
                  <span>🔒</span>
                  <span>Authorize & Pay ₹150.00 via {payMethod.toUpperCase()}</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Payment Success & Formal Receipt */
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4 text-emerald-950 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base">Payment Authorized & Settled</h4>
                  <p className="text-xs text-emerald-800">
                    Official Treasury Receipt generated under Reference: <strong>{paymentRef}</strong>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePrint}
                className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded border border-slate-300 shadow-xs flex items-center gap-1.5 no-print"
              >
                <span>🖨️</span>
                <span>Print Receipt</span>
              </button>
            </div>

            <DataTable
              title="Official RTO Treasury Payment Receipt"
              badge="VERIFIED PAID"
              subtitle="Keep this receipt for your records and test day physical reporting."
              rows={[
                ['Application Number', profile?.applicationId],
                ['Applicant Full Name', profile?.name],
                ['Transaction Reference ID', <span key="ref" className="font-mono font-bold text-blue-900">{paymentRef}</span>],
                ['Payment Settlement Date', new Date().toLocaleString('en-IN')],
                ['Accounting Head', '0041-00-102 RTO Motor Vehicle Taxes & Fees'],
                ['Total Amount Settled', '₹150.00 (One Hundred and Fifty Rupees Only)'],
                ['Receipt Status', <span key="status" className="font-bold text-emerald-700">SUCCESS • Treasury Accepted</span>],
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
