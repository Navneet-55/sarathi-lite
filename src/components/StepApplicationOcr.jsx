import React, { useRef, useState } from 'react';
import DataTable from './DataTable';
import { RTO_OFFICES } from '../data/rtoSlots';

/**
 * Step 1: Citizen Application Form & Dual Front/Back Aadhaar OCR
 * Clean Document Sheet Design (Non-Boxy)
 */
export default function StepApplicationOcr({
  profile,
  setProfile,
  frontPreview,
  backPreview,
  frontLoading,
  backLoading,
  ocrResult,
  handleFrontUpload,
  handleBackUpload,
  triggerSampleFront,
  triggerSampleBack,
}) {
  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);
  const [isFrontDragOver, setIsFrontDragOver] = useState(false);
  const [isBackDragOver, setIsBackDragOver] = useState(false);

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleFrontDrop = (e) => {
    e.preventDefault();
    setIsFrontDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFrontUpload({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleBackDrop = (e) => {
    e.preventDefault();
    setIsBackDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleBackUpload({ target: { files: e.dataTransfer.files } });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-8">
      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Form 2 • Central Motor Vehicles Rules
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f2a4a] dark:text-blue-100 tracking-tight mt-0.5">
              Learner's License Application
            </h2>
          </div>
          <span className="text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full font-semibold border border-emerald-200 dark:border-emerald-800">
            eKYC Verification Enabled
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          Provide your legal particulars below, or upload your Aadhaar document for automatic character extraction.
        </p>
      </div>

      {/* Section 1: Demographics Form Fields */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          <span className="w-5 h-5 rounded-full bg-blue-800 text-white flex items-center justify-center text-[10px]">
            1
          </span>
          <span>Applicant Demographics & Address</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              Full Legal Name <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={profile?.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g. Enter your full name"
              className="w-full px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-blue-700 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              Mobile Number (SMS Alerts) <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={profile?.mobile || ''}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-blue-700 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              Date of Birth (DD/MM/YYYY) <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={profile?.dob || ''}
              onChange={(e) => handleInputChange('dob', e.target.value)}
              placeholder="DD/MM/YYYY"
              className="w-full px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-blue-700 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              Aadhaar UID / VID Reference
            </label>
            <input
              type="text"
              value={profile?.aadhaar || ''}
              onChange={(e) => handleInputChange('aadhaar', e.target.value)}
              placeholder="XXXX XXXX 1234"
              className="w-full px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-mono focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-blue-700 focus:outline-none transition-colors"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              Permanent Residential Address <span className="text-rose-600">*</span>
            </label>
            <textarea
              rows={2}
              value={profile?.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter complete residential address with pin code"
              className="w-full px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-blue-700 focus:outline-none transition-colors"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              Regional Transport Authority (RTO Jurisdiction) <span className="text-rose-600">*</span>
            </label>
            <select
              value={profile?.rto || ''}
              onChange={(e) => handleInputChange('rto', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-medium focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-blue-700 focus:outline-none transition-colors"
            >
              {RTO_OFFICES.map((rto) => (
                <option key={rto.code} value={rto.name}>
                  {rto.name} ({rto.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Section 2: Aadhaar Document Scanners (Front & Back) */}
      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            <span className="w-5 h-5 rounded-full bg-blue-800 text-white flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Document OCR Scanners (Front & Back)</span>
          </div>
          <span className="text-[11px] text-blue-700 dark:text-blue-300 font-semibold">
            Automated Character Extraction
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Front Page Scanner */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Front Side (Photo, Name, DOB, UID)
              </span>
              {profile?.name && (
                <span className="text-emerald-700 dark:text-emerald-400 font-bold text-[11px]">
                  ✓ Front Read
                </span>
              )}
            </div>

            <input
              ref={frontInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFrontUpload}
            />

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsFrontDragOver(true);
              }}
              onDragLeave={() => setIsFrontDragOver(false)}
              onDrop={handleFrontDrop}
              className={`rounded-xl p-5 text-center transition-all min-h-[160px] flex flex-col justify-center border ${
                isFrontDragOver
                  ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              {frontPreview ? (
                <div className="relative inline-block mx-auto">
                  <img
                    src={frontPreview}
                    alt="Front Preview"
                    className="max-h-36 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs mx-auto"
                  />
                  {frontLoading && (
                    <div className="absolute left-0 right-0 h-1 bg-blue-600 shadow-sm animate-scan" />
                  )}
                </div>
              ) : (
                <div className="py-2 space-y-1">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Upload Front Page
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Drag & drop or browse image (JPG, PNG)
                  </p>
                </div>
              )}

              <div className="mt-3 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => frontInputRef.current?.click()}
                  className="px-3.5 py-1.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-full shadow-xs transition-colors"
                >
                  {frontPreview ? 'Change Front Image' : 'Browse Front Page'}
                </button>
                {triggerSampleFront && (
                  <button
                    type="button"
                    onClick={triggerSampleFront}
                    className="px-3.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-full transition-colors"
                  >
                    Sample Front
                  </button>
                )}
              </div>
            </div>

            {frontLoading && (
              <div className="p-2 bg-blue-50 dark:bg-blue-950/60 rounded-lg flex items-center justify-center gap-2 text-xs text-blue-900 dark:text-blue-300 font-semibold">
                <div className="w-3.5 h-3.5 border-2 border-blue-800 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span>Reading Front Page...</span>
              </div>
            )}
          </div>

          {/* Back Page Scanner */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Back Side (Residential Address)
              </span>
              {profile?.address && (
                <span className="text-emerald-700 dark:text-emerald-400 font-bold text-[11px]">
                  ✓ Back Read
                </span>
              )}
            </div>

            <input
              ref={backInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBackUpload}
            />

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsBackDragOver(true);
              }}
              onDragLeave={() => setIsBackDragOver(false)}
              onDrop={handleBackDrop}
              className={`rounded-xl p-5 text-center transition-all min-h-[160px] flex flex-col justify-center border ${
                isBackDragOver
                  ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              {backPreview ? (
                <div className="relative inline-block mx-auto">
                  <img
                    src={backPreview}
                    alt="Back Preview"
                    className="max-h-36 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs mx-auto"
                  />
                  {backLoading && (
                    <div className="absolute left-0 right-0 h-1 bg-blue-600 shadow-sm animate-scan" />
                  )}
                </div>
              ) : (
                <div className="py-2 space-y-1">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Upload Back Page
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Drag & drop or browse image (JPG, PNG)
                  </p>
                </div>
              )}

              <div className="mt-3 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => backInputRef.current?.click()}
                  className="px-3.5 py-1.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-full shadow-xs transition-colors"
                >
                  {backPreview ? 'Change Back Image' : 'Browse Back Page'}
                </button>
                {triggerSampleBack && (
                  <button
                    type="button"
                    onClick={triggerSampleBack}
                    className="px-3.5 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-full transition-colors"
                  >
                    Sample Back
                  </button>
                )}
              </div>
            </div>

            {backLoading && (
              <div className="p-2 bg-blue-50 dark:bg-blue-950/60 rounded-lg flex items-center justify-center gap-2 text-xs text-blue-900 dark:text-blue-300 font-semibold">
                <div className="w-3.5 h-3.5 border-2 border-blue-800 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span>Reading Back Page...</span>
              </div>
            )}
          </div>
        </div>

        {/* Combined OCR Extracted Summary Ledger */}
        {(ocrResult || profile?.name || profile?.address) && (
          <div className="pt-4">
            <DataTable
              title="Verified eKYC Extracted Fields"
              badge="Synchronized"
              subtitle="Particulars mapped automatically from your documents to your application record."
              rows={[
                ['Parsed Full Name', profile?.name || <span className="text-slate-400 italic">Upload Front Page</span>],
                ['Parsed Date of Birth', profile?.dob || <span className="text-slate-400 italic">Upload Front Page</span>],
                ['Mobile Number', profile?.mobile || <span className="text-slate-400 italic">Upload Front Page</span>],
                ['Aadhaar Number', profile?.aadhaar || <span className="text-slate-400 italic">Upload Front / Back Page</span>],
                ['Residential Address', profile?.address || <span className="text-slate-400 italic">Upload Back Page</span>],
                [
                  'Verification Status',
                  <span key="status" className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
                    <span>✓</span> eKYC Verification Synchronized
                  </span>,
                ],
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
