import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import { fetchSlotRecommendations } from '../services/apiService';
import { INITIAL_SLOTS } from '../data/rtoSlots';
import { TRANSLATIONS } from '../data/translations';

/**
 * Step 4: RTO Appointment Slot Booking & Form 2 Acknowledgment Slip
 * Pure Bilingual Support (English & Hindi)
 */
export default function StepSlotBooking({
  profile,
  paid,
  paymentRef,
  selectedSlot,
  setSelectedSlot,
  booked,
  setBooked,
  lang = 'en',
}) {
  const [slotRecs, setSlotRecs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterRto, setFilterRto] = useState('all');

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isHi = lang === 'hi';

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
            {t.appointmentConfirmedTitle}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 max-w-xl mx-auto">
            {t.appointmentConfirmedDesc}
          </p>
          <div className="pt-2 no-print">
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm rounded-full shadow-xs transition-colors"
            >
              {t.printForm2SlipBtn}
            </button>
          </div>
        </div>

        {/* Application Summary Ledger */}
        <DataTable
          title={t.officialSlotSlipTitle}
          badge={t.confirmedReadyBadge}
          subtitle={t.slotSlipSubtitle}
          lang={lang}
          rows={[
            [t.appNumberField, <span key="app" className="font-mono font-bold">{profile?.applicationId}</span>],
            [t.applicantNameField, profile?.name],
            [t.dobField, profile?.dob],
            [t.mobileField, profile?.mobile],
            [t.allottedSlotField, <strong key="dt" className="text-blue-900 dark:text-blue-300">{selectedSlot?.date} at {selectedSlot?.time}</strong>],
            [t.reportingRtoField, selectedSlot?.rto || profile?.rto],
            [t.feeChallanField, <span key="pay" className="font-mono">{paid ? paymentRef : (isHi ? 'पूर्व भुगतान (सत्यापित)' : 'Pre-paid (Verified)')}</span>],
            [t.ekycStatusField, t.ekycVerifiedText],
            [t.trafficQualField, t.trafficPassedText],
          ]}
        />

        {/* Test Day Instructions */}
        <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
          <h4 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs">
            {t.mandatoryChecklistTitle}
          </h4>
          <ul className="list-disc list-inside space-y-1.5 leading-relaxed text-slate-600 dark:text-slate-400">
            <li>{t.checkItem1(selectedSlot?.time || '09:30 AM')}</li>
            <li>{t.checkItem2}</li>
            <li>{t.checkItem3}</li>
            <li>{t.checkItem4}</li>
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
              {t.step4Badge}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f2a4a] dark:text-blue-100 tracking-tight mt-0.5">
              {t.step4Title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">{t.filterLocation}</span>
            <select
              value={filterRto}
              onChange={(e) => setFilterRto(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              <option value="all">{t.allRtoCenters}</option>
              <option value="south">Bengaluru South (KA-05)</option>
              <option value="central">Bengaluru Central (KA-01)</option>
              <option value="east">Bengaluru East (KA-03)</option>
              <option value="electronic">Electronic City (KA-51)</option>
            </select>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          {t.step4Desc}
        </p>
      </div>

      {/* Slots List Stream */}
      {loading ? (
        <div className="py-12 text-center space-y-2">
          <div className="inline-block w-6 h-6 border-2 border-blue-800 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{t.loadingSlots}</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
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
                    : 'hover:bg-slate-50 dark:hover:bg-slate-750/50'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {slot.date} — {slot.time}
                    </span>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full font-medium">
                      {slot.window}
                    </span>
                    {rec?.score >= 85 && (
                      <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                        {t.recommendedBadge}
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
                    <span>{t.seatsOpen(slot.seats)}</span>
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
            ? t.confirmReservationBtn(selectedSlot.date, selectedSlot.time)
            : t.selectSlotPrompt}
        </button>
      </div>
    </div>
  );
}
