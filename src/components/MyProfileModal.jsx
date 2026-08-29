import React from 'react';
import DataTable from './DataTable';

/**
 * My Profile Citizen Detail Drawer / Modal
 * Displays full citizen demographics, assigned jurisdiction, and eKYC records.
 */
export default function MyProfileModal({ profile, isOpen, onClose, currentStep, paid, paymentRef, selectedSlot }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-300 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Modal Top Bar */}
        <div className="bg-[#0f2a4a] text-white px-5 py-3.5 flex items-center justify-between border-b border-amber-500">
          <div>
            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              Citizen Profile Record
            </p>
            <h3 className="text-base font-bold">
              {profile?.name} — {profile?.applicationId}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-amber-400 text-lg font-bold px-2 py-0.5 rounded transition-colors"
            title="Close profile dialog"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 flex-1">
          <DataTable
            title="Citizen Identity & Demographics"
            badge="UIDAI eKYC Verified"
            subtitle="Registered particulars under Motor Vehicles Act, 1988"
            rows={[
              ['Application Number', <span key="app" className="font-mono font-bold">{profile?.applicationId}</span>],
              ['Full Legal Name', profile?.name],
              ['Mobile Number', profile?.mobile],
              ['Date of Birth', profile?.dob],
              ['Aadhaar UID / VID', <span key="aadh" className="font-mono">{profile?.aadhaar}</span>],
              ['Residential Address', profile?.address],
              ['Assigned RTO Jurisdiction', <strong key="rto" className="text-blue-900">{profile?.rto}</strong>],
            ]}
          />

          <DataTable
            title="Application Workflow Status"
            badge={`Step ${currentStep} of 4`}
            rows={[
              [
                'Current Workflow Stage',
                currentStep === 1
                  ? 'Step 1: Application Form & Aadhaar OCR'
                  : currentStep === 2
                  ? 'Step 2: Traffic Rules & Signs Practice'
                  : currentStep === 3
                  ? 'Step 3: Statutory Fee Payment'
                  : 'Step 4: RTO Slot Allotment & Test Day',
              ],
              [
                'Challan Payment Status',
                paid ? (
                  <span key="p" className="text-emerald-700 font-bold">
                    PAID (Ref: {paymentRef})
                  </span>
                ) : (
                  <span key="np" className="text-slate-500 font-medium">
                    Pending Settlement (₹150)
                  </span>
                ),
              ],
              [
                'Reserved Test Slot',
                selectedSlot ? (
                  <span key="sl" className="font-bold text-blue-900">
                    {selectedSlot.date} at {selectedSlot.time} ({selectedSlot.rto})
                  </span>
                ) : (
                  <span key="nsl" className="text-slate-500 font-medium">
                    Not Yet Reserved
                  </span>
                ),
              ],
            ]}
          />
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded border border-slate-300 transition-colors"
          >
            Print Profile Record
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#0f2a4a] hover:bg-blue-900 text-white text-xs font-bold rounded transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
