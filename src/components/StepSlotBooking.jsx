import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchSlotRecommendations } from '../services/apiService';
import { INITIAL_SLOTS } from '../data/rtoSlots';

/**
 * Step 4: RTO Appointment Slot Booking & Form 2 Acknowledgment Slip (Dark Mode Ready)
 */
export default function StepSlotBooking({
  profile,
  paid,
  paymentRef,
  selectedSlot,
  setSelectedSlot,
  booked,
  setBooked,
}) {
  const [slotRecs, setSlotRecs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterRto, setFilterRto] = useState('all');

  useEffect(() => {
    async function loadSlots() {
      setLoading(true);
      try {
        const res = await fetchSlotRecommendations(profile, 'morning');
        setSlotRecs(res);
      } catch (err) {
        console.error('Failed to load slots:', err);
      } finally {
        setLoading(false);
      }
    }
    if (!booked) {
      loadSlots();
    }
  }, [profile, booked]);

  const handleConfirmBooking = () => {
    if (!selectedSlot) return;
    setBooked(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const displayedSlots = INITIAL_SLOTS.filter((s) => {
    if (filterRto === 'all') return true;
    return s.rto.toLowerCase().includes(filterRto.toLowerCase());
  });

  if (booked) {
    return (
      <div className="space-y-6">
        {/* Success Banner */}
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-lg p-5 text-emerald-950 dark:text-emerald-200 text-center space-y-2">
          <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-base mx-auto">
            ✓
          </div>
          <h2 className="text-lg sm:text-xl font-bold">
            Learner's License Test Appointment Confirmed
          </h2>
          <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 max-w-xl mx-auto">
            Your appointment has been registered with the Regional Transport Authority. Please download or print your official acknowledgment slip below.
          </p>
          <div className="pt-2 no-print">
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2.5 bg-[#0f2a4a] dark:bg-blue-700 hover:bg-blue-900 dark:hover:bg-blue-600 text-white font-bold text-xs sm:text-sm rounded shadow-xs transition-colors inline-flex items-center gap-2"
            >
              <span>Print Form 2 Acknowledgment Slip</span>
            </button>
          </div>
        </div>

        {/* Official Application Summary Table */}
        <DataTable
          title="Official Learner's License Application & Slot Allotment Slip"
          badge="CONFIRMED • READY FOR TEST"
          subtitle="Ministry of Road Transport & Highways — Sarathi Portal Record"
          rows={[
            ['Application Number', <span key="app" className="font-mono font-bold">{profile?.applicationId}</span>],
            ['Applicant Full Name', profile?.name],
            ['Date of Birth', profile?.dob],
            ['Contact Mobile', profile?.mobile],
            ['Allotted Test Date & Time', <strong key="dt" className="text-blue-900 dark:text-blue-300">{selectedSlot?.date} at {selectedSlot?.time}</strong>],
            ['Reporting RTO Office', selectedSlot?.rto || profile?.rto],
            ['Fee Challan Reference', <span key="pay" className="font-mono">{paid ? paymentRef : 'Pre-paid (Verified)'}</span>],
            ['eKYC Document Status', 'Aadhaar Verified via Optical Character Recognition (OCR)'],
            ['Traffic Signs Qualification', 'Passed Regulatory Signs Qualifying Assessment'],
          ]}
        />

        {/* Test Day Instructions Card */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5 shadow-xs space-y-3">
          <h4 className="text-xs sm:text-sm font-bold text-[#0f2a4a] dark:text-blue-300 uppercase tracking-wide border-b border-slate-200 dark:border-slate-700 pb-2">
            Mandatory Checklist for Test Day Reporting
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <li>
              <strong>Reporting Time:</strong> Arrive at the RTO testing counter at least 15 minutes before your allotted time (<span className="text-blue-900 dark:text-blue-300 font-semibold">{selectedSlot?.time}</span>).
            </li>
            <li>
              <strong>Physical Documents Required:</strong> Original Aadhaar card and a printed copy of this Form 2 acknowledgment.
            </li>
            <li>
              <strong>Biometric Verification:</strong> Live photo capture and thumb impression will be recorded at the RTO workstation.
            </li>
            <li>
              <strong>Computerized LL Test:</strong> 15 multiple-choice questions on road safety will be administered on the Parivahan terminal.
            </li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-[#0f2a4a] dark:text-blue-200">
            Step 4: Select RTO Appointment Slot
          </h2>
          <span className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-600 font-mono">
            Slot Allotment Module
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          Select an available testing date and time window for your physical document verification and computerized Learner's License examination.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5 shadow-xs space-y-4">
        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#0f2a4a] dark:text-blue-300 uppercase tracking-wide">
              Available Test Slots
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Showing real-time seat availability across RTO testing centers
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-400">Filter Location:</span>
            <select
              value={filterRto}
              onChange={(e) => setFilterRto(e.target.value)}
              className="px-2.5 py-1.5 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-blue-700 focus:outline-none"
            >
              <option value="all">All RTO Centers</option>
              <option value="south">Bengaluru South (KA-05)</option>
              <option value="central">Bengaluru Central (KA-01)</option>
              <option value="east">Bengaluru East (KA-03)</option>
              <option value="electronic">Electronic City (KA-51)</option>
            </select>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-10 text-center space-y-2">
            <div className="inline-block w-6 h-6 border-2 border-[#0f2a4a] dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-bold text-[#0f2a4a] dark:text-blue-300">Querying live RTO slot database...</p>
          </div>
        ) : (
          /* Slot Cards List */
          <div className="space-y-3">
            {displayedSlots.map((slot) => {
              const rec = slotRecs?.recommendations?.find((r) => r.slotId === slot.id);
              const isSelected = selectedSlot?.id === slot.id;

              return (
                <div
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-4 rounded border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-700 dark:border-blue-400 bg-blue-50/80 dark:bg-blue-950/60 ring-1 ring-blue-700 dark:ring-blue-400'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-[#0f2a4a] dark:text-blue-200">
                          {slot.date} — {slot.time}
                        </span>
                        <span className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-medium border border-slate-200 dark:border-slate-700">
                          {slot.window} Window
                        </span>
                        {rec?.score >= 85 && (
                          <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded">
                            RECOMMENDED ({rec.score}% Match)
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">{slot.rto}</p>

                      <div className="flex items-center gap-2 pt-0.5">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${
                            slot.seats > 10 ? 'bg-emerald-600' : 'bg-amber-600'
                          }`}
                        />
                        <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                          {slot.seats} examination seats available
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="radio"
                        name="rtoSlotSelection"
                        checked={isSelected}
                        onChange={() => setSelectedSlot(slot)}
                        className="text-blue-700 focus:ring-blue-700 h-4 w-4"
                      />
                    </div>
                  </div>

                  {rec && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <span className="text-blue-900 dark:text-blue-300 font-bold">Location Match:</span>
                      <span>{rec.reason}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Confirm Slot Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleConfirmBooking}
            disabled={!selectedSlot}
            className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base rounded shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>
              {selectedSlot
                ? `Confirm Booking: ${selectedSlot.date} at ${selectedSlot.time}`
                : 'Select an RTO slot above to proceed'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
