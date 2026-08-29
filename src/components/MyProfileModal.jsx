import React from 'react';
import DataTable from './DataTable';

/**
 * My Profile Citizen Detail Drawer / Modal (Dark Mode Ready)
 * Displays full citizen demographics, assigned jurisdiction, and eKYC records.
 */
export default function MyProfileModal({ profile, isOpen, onClose, currentStep, paid, paymentRef, selectedSlot }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Modal Top Bar */}
        <div className="bg-[#0f2a4a] text-white px-5 py-3.5 flex items-center justify-between border-b border-amber-500">
          <div>
            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              Citizen Profile Record
            </p>
            <h3 className="text-base font-bold">
              {profile?.name ? `${profile.name} — ${profile.applicationId || 'New Application'}` : 'Applicant Profile Record'}
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
            badge={profile?.name ? "UIDAI eKYC Verified" : "Draft Application"}
            subtitle="Registered particulars under Motor Vehicles Act, 1988"
            rows={[
              ['Application Number', <span key="app" className="font-mono font-bold">{profile?.applicationId || 'Pending Registration'}</span>],
              ['Full Legal Name', profile?.name || 'Not Provided'],
              ['Mobile Number', profile?.mobile || 'Not Provided'],
              ['Date of Birth', profile?.dob || 'Not Provided'],
              ['Aadhaar UID / VID', <span key="aadh" className="font-mono">{profile?.aadhaar || 'Not Provided'}</span>],
              ['Residential Address', profile?.address || 'Not Provided'],
              ['Assigned RTO Jurisdiction', <strong key="rto" className="text-blue-900 dark:text-blue-300">{profile?.rto}</strong>],
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
                  <span key="p" className="text-emerald-700 dark:text-emerald-300 font-bold">
                    PAID (Ref: {paymentRef})
                  </span>
                ) : (
                  <span key="np" className="text-slate-500 dark:text-slate-400 font-medium">
                    Pending Settlement (₹150)
                  </span>
                ),
              ],
              [
                'Reserved Test Slot',
                selectedSlot ? (
                  <span key="sl" className="font-bold text-blue-900 dark:text-blue-300">
                    {selectedSlot.date} at {selectedSlot.time} ({selectedSlot.rto})
                  </span>
                ) : (
                  <span key="nsl" className="text-slate-500 dark:text-slate-400 font-medium">
                    Not Yet Reserved
                  </span>
                ),
              ],
            ]}
          />
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-5 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded border border-slate-300 dark:border-slate-600 transition-colors"
          >
            Print Profile Record
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#0f2a4a] dark:bg-blue-700 hover:bg-blue-900 dark:hover:bg-blue-600 text-white text-xs font-bold rounded transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
