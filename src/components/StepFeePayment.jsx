import React from 'react';
import DataTable from './DataTable';

/**
 * Step 3: RTO Learner's License Fee Payment Settlement
 */
export default function StepFeePayment({ profile, paid, setPaid, paymentRef, setPaymentRef, paying, setPaying }) {
  const handlePayment = () => {
    if (paying || paid) return;
    setPaying(true);
    setTimeout(() => {
      setPaid(true);
      setPaying(false);
      setPaymentRef(`RTO-UPI-${Math.floor(10000000 + Math.random() * 90000000)}`);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#0f2a4a]">Step 3: Statutory RTO Application Fee Settlement</h2>
        <p className="text-xs text-slate-600 mt-1">
          Pay the standard ₹150 RTO fee for Learner's License processing and online slot allotment.
        </p>
      </div>

      <DataTable
        title="Fee Settlement Order Summary"
        badge="Standard Fee Schedule"
        rows={[
          ['Application Number', profile?.applicationId],
          ['Applicant Name', profile?.name],
          ['Assigned RTO Office', profile?.rto],
          ['Service Fee Item', "Learner's License Test & Issuance Fee"],
          ['Total Payable Amount', '₹150.00 (Inclusive of tax)'],
          ['Payment Method', 'Online UPI Payment Gateway (Mock)'],
        ]}
      />

      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
        {!paid ? (
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600">
              ℹ️ Safe demo mode: No actual money will be deducted from your bank account or UPI wallet.
            </div>

            <button
              type="button"
              onClick={handlePayment}
              disabled={paying}
              className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              {paying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Mock UPI Gateway Settlement...</span>
                </>
              ) : (
                <>
                  <span>💳</span>
                  <span>Confirm & Pay ₹150.00</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded text-emerald-900 space-y-1">
              <div className="flex items-center gap-2 font-bold text-sm">
                <span>✓ Payment Confirmed</span>
              </div>
              <p className="text-xs">Transaction Reference Number: <strong className="font-mono">{paymentRef}</strong></p>
              <p className="text-xs text-emerald-800">Status: Settlement Success (RTO Treasury Receipt Generated)</p>
            </div>

            <DataTable
              title="Official RTO Payment Receipt"
              badge="PAID"
              rows={[
                ['Receipt Number', paymentRef],
                ['Payment Timestamp', new Date().toLocaleString('en-IN')],
                ['Amount Paid', '₹150.00'],
                ['Payment Status', 'SUCCESS'],
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
