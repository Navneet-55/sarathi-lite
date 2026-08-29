import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchSlotRecommendations } from '../services/apiService';
import { INITIAL_SLOTS } from '../data/rtoSlots';

/**
 * Step 4: RTO Appointment Slot Booking & Form 2 Acknowledgment Slip
 * Clean Document Sheet (Non-Boxy)
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
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm p-6 sm:p-8 space-y-6 text-slate-900 dark:text-slate-100">
        {/* Success Header */}
        <div className="bg-emerald-50/80 dark:bg-emerald-950/60 rounded-xl p-5 text-emerald-950 dark:text-emerald-200 text-center space-y-2 border border-emerald-200 dark:border-emerald-800">
          <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-base mx-auto">
            ✓
          </div>
          <h2 className="text-lg sm:text-xl font-bold">
            Learner's License Test Appointment Confirmed
          </h2>
          <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 max-w-xl mx-auto">
            Your appointment has been registered with the Regional Transport Authority. Retain your official Form 2 acknowledgment slip below.
          </p>
          <div className="pt-2 no-print">
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm rounded-full shadow-xs transition-colors"
            >
              Print Form 2 Acknowledgment Slip
            </button>
          </div>
        </div>

        {/* Application Summary Ledger */}
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

        {/* Test Day Instructions */}
        <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
          <h4 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs">
            Mandatory Checklist for Test Day Reporting
          </h4>
          <ul className="list-disc list-inside space-y-1.5 leading-relaxed text-slate-600 dark:text-slate-400">
            <li>Arrive at the RTO counter at least 15 minutes before your allotted window ({selectedSlot?.time}).</li>
            <li>Bring original Aadhaar card and printed copy of this acknowledgment slip.</li>
            <li>Live photograph capture and biometrics will be recorded at the workstation.</li>
            <li>The computer-based test consists of 15 questions on road signs and traffic regulations.</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm p-6 sm:p-8 space-y-6 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              RTO Allotment Module • Step 4
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f2a4a] dark:text-blue-100 tracking-tight mt-0.5">
              Select RTO Appointment Slot
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">Filter Location:</span>
            <select
              value={filterRto}
              onChange={(e) => setFilterRto(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              <option value="all">All RTO Centers</option>
              <option value="south">Bengaluru South (KA-05)</option>
              <option value="central">Bengaluru Central (KA-01)</option>
              <option value="east">Bengaluru East (KA-03)</option>
              <option value="electronic">Electronic City (KA-51)</option>
            </select>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          Select an available examination slot for your physical document verification and computerized test.
        </p>
      </div>

      {/* Slots List Stream */}
      {loading ? (
        <div className="py-12 text-center space-y-2">
          <div className="inline-block w-6 h-6 border-2 border-blue-800 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Loading live RTO seat availability...</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {displayedSlots.map((slot) => {
            const rec = slotRecs?.recommendations?.find((r) => r.slotId === slot.id);
            const isSelected = selectedSlot?.id === slot.id;

            return (
              <div
                key={slot.id}
                onClick={() => setSelectedSlot(slot)}
                className={`py-3.5 px-3 rounded-xl transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-blue-50/70 dark:bg-blue-950/60 ring-1 ring-blue-700'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {slot.date} — {slot.time}
                    </span>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full font-medium">
                      {slot.window}
                    </span>
                    {rec?.score >= 85 && (
                      <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300">{slot.rto}</p>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        slot.seats > 10 ? 'bg-emerald-600' : 'bg-amber-600'
                      }`}
                    />
                    <span>{slot.seats} examination seats open</span>
                  </div>
                </div>

                <div className="shrink-0 self-end sm:self-center">
                  <input
                    type="radio"
                    name="rtoSlotSelection"
                    checked={isSelected}
                    onChange={() => setSelectedSlot(slot)}
                    className="text-blue-700 h-4 w-4"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirm Button */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={handleConfirmBooking}
          disabled={!selectedSlot}
          className="w-full py-3.5 bg-blue-800 hover:bg-blue-900 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base rounded-full shadow-xs transition-colors"
        >
          {selectedSlot
            ? `Confirm Reservation: ${selectedSlot.date} at ${selectedSlot.time}`
            : 'Select an RTO appointment slot to proceed'}
        </button>
      </div>
    </div>
  );
}
