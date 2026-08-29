import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchSlotRecommendations } from '../services/apiService';
import { INITIAL_SLOTS } from '../data/rtoSlots';

/**
 * Step 4: RTO Appointment Slot Booking & Final Confirmation
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

  if (booked) {
    return (
      <div className="space-y-6">
        <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-5 text-emerald-900 text-center space-y-2">
          <div className="text-4xl">✅</div>
          <h2 className="text-xl font-bold">Learner's License Slot Successfully Booked!</h2>
          <p className="text-xs text-emerald-800">
            Your appointment has been registered with the Ministry of Road Transport & Highways (Sarathi).
          </p>
        </div>

        <DataTable
          title="Official Learner's License Application Summary"
          badge="BOOKED & CONFIRMED"
          rows={[
            ['Application ID', profile?.applicationId],
            ['Applicant Name', profile?.name],
            ['Mobile Number', profile?.mobile],
            ['Date of Birth', profile?.dob],
            ['Assigned RTO Location', selectedSlot?.rto || profile?.rto],
            ['Appointment Date & Time', `${selectedSlot?.date} at ${selectedSlot?.time}`],
            ['Fee Payment Status', paid ? `Paid (Ref: ${paymentRef})` : 'Exempt / Paid'],
            ['Aadhaar eKYC Status', 'Verified via Document OCR'],
          ]}
        />

        <div className="bg-white rounded-lg border border-slate-200 p-4 text-xs text-slate-600 space-y-2">
          <h4 className="font-bold text-slate-800 uppercase tracking-wide">Important Instructions for Test Day:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Arrive at the RTO office 15 minutes prior to your scheduled time slot.</li>
            <li>Carry physical original Aadhaar Card and printed copy of this acknowledgment.</li>
            <li>Mandatory biometric verification will be conducted at the RTO counter.</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#0f2a4a]">Step 4: Select RTO Appointment Slot</h2>
        <p className="text-xs text-slate-600 mt-1">
          Choose a convenient date and time slot for your physical document verification and driving test.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-sm font-bold text-[#0f2a4a] uppercase tracking-wide">
            Available Slots at {profile?.rto || 'RTO Office'}
          </h3>
          <span className="text-xs text-[#0f2a4a] font-semibold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
            AI Ranked Options
          </span>
        </div>

        {loading ? (
          <div className="py-8 text-center">
            <div className="inline-block w-5 h-5 border-2 border-[#0f2a4a] border-t-transparent rounded-full animate-spin mb-2" />
            <p className="text-xs text-slate-600 font-medium">Fetching real-time RTO slot availability...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {INITIAL_SLOTS.map((slot) => {
              const rec = slotRecs?.recommendations?.find((r) => r.slotId === slot.id);
              const isSelected = selectedSlot?.id === slot.id;

              return (
                <div
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3.5 rounded border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-700 bg-blue-50/70 ring-1 ring-blue-700'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#0f2a4a]">
                          {slot.date} — {slot.time}
                        </span>
                        {rec?.score >= 85 && (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                            RECOMMENDED ({rec.score}% match)
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{slot.rto}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {slot.seats} capacity seats remaining
                      </p>
                    </div>

                    <input
                      type="radio"
                      name="slotSelection"
                      checked={isSelected}
                      onChange={() => setSelectedSlot(slot)}
                      className="mt-1 text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                  </div>

                  {rec && (
                    <p className="text-[11px] text-slate-500 mt-2 pt-1 border-t border-slate-100 italic">
                      💡 Reason: {rec.reason}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <button
          type="button"
          onClick={handleConfirmBooking}
          disabled={!selectedSlot}
          className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm rounded transition-colors shadow-xs"
        >
          Confirm & Book Selected Slot
        </button>
      </div>
    </div>
  );
}
