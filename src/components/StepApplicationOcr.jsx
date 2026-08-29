import React, { useRef, useState } from 'react';
import DataTable from './DataTable';
import { RTO_OFFICES } from '../data/rtoSlots';

/**
 * Step 1: Applicant Registration & Distinct Front/Back Aadhaar OCR Verification
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
      const mockEvent = { target: { files: e.dataTransfer.files } };
      handleFrontUpload(mockEvent);
    }
  };

  const handleBackDrop = (e) => {
    e.preventDefault();
    setIsBackDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const mockEvent = { target: { files: e.dataTransfer.files } };
      handleBackUpload(mockEvent);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-[#0f2a4a] dark:text-blue-200">
            Step 1: Application Form & Aadhaar Document OCR Verification
          </h2>
          <span className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-600 font-mono">
            Form 2 (Rules 4, 8)
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          Fill in your applicant demographic details, or upload your Aadhaar Front and Back documents below for automated character extraction.
        </p>
      </div>

      {/* Section 1: Demographics Form */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
          <h3 className="text-xs sm:text-sm font-bold text-[#0f2a4a] dark:text-blue-300 uppercase tracking-wide flex items-center gap-2">
            <span className="w-5 h-5 bg-[#0f2a4a] text-white rounded text-[11px] flex items-center justify-center font-bold">1</span>
            Applicant Demographics & Jurisdiction
          </h3>
          <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
            eKYC Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Full Legal Name <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={profile?.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g. Enter your full name"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-blue-700 focus:outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Mobile Number (for SMS Alerts) <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={profile?.mobile || ''}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-blue-700 focus:outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Date of Birth (DD/MM/YYYY) <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={profile?.dob || ''}
              onChange={(e) => handleInputChange('dob', e.target.value)}
              placeholder="DD/MM/YYYY"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-blue-700 focus:outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Aadhaar UID / VID Reference
            </label>
            <input
              type="text"
              value={profile?.aadhaar || ''}
              onChange={(e) => handleInputChange('aadhaar', e.target.value)}
              placeholder="XXXX XXXX 1234"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-blue-700 focus:outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Permanent Residential Address <span className="text-rose-600">*</span>
            </label>
            <textarea
              rows={2}
              value={profile?.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter complete residential address with pin code"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-blue-700 focus:outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Target RTO Office Jurisdiction <span className="text-rose-600">*</span>
            </label>
            <select
              value={profile?.rto || ''}
              onChange={(e) => handleInputChange('rto', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-blue-700 focus:outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            >
              {RTO_OFFICES.map((rto) => (
                <option key={rto.code} value={rto.name}>
                  {rto.name} ({rto.code})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Select the RTO office corresponding to your residence under the Motor Vehicles Act.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Dedicated Dual Front Page and Back Page OCR Scanners */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
          <h3 className="text-xs sm:text-sm font-bold text-[#0f2a4a] dark:text-blue-300 uppercase tracking-wide flex items-center gap-2">
            <span className="w-5 h-5 bg-[#0f2a4a] text-white rounded text-[11px] flex items-center justify-center font-bold">2</span>
            Aadhaar Document OCR Scanners (Front & Back)
          </h3>
          <span className="text-[11px] text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800 font-semibold">
            Optical Character Recognition
          </span>
        </div>

        {/* 2 Separate Upload Zones: Front Page & Back Page */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Front Page Scanner */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0f2a4a] dark:text-blue-300">
                Aadhaar Front Page (Photo, Name, DOB, UID)
              </span>
              {profile?.name && (
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
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
              className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors relative overflow-hidden flex flex-col justify-center min-h-[160px] ${
                isFrontDragOver
                  ? 'border-blue-700 bg-blue-50/50 dark:bg-blue-900/30'
                  : 'border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              {frontPreview ? (
                <div className="relative inline-block mx-auto">
                  <img
                    src={frontPreview}
                    alt="Aadhaar Front Side Preview"
                    className="max-h-36 rounded border border-slate-300 dark:border-slate-600 shadow-xs mx-auto"
                  />
                  {frontLoading && (
                    <div
                      className="absolute left-0 right-0 h-1 bg-blue-600 shadow-md animate-scan"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ) : (
                <div className="py-2 space-y-1">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Upload Front Side of Aadhaar
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Drag & drop or browse image (JPG, PNG)
                  </p>
                </div>
              )}

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => frontInputRef.current?.click()}
                  className="px-3 py-1.5 bg-[#0f2a4a] hover:bg-blue-900 text-white text-xs font-bold rounded shadow-xs transition-colors"
                >
                  {frontPreview ? 'Change Front Image' : 'Browse Front Page'}
                </button>

                {triggerSampleFront && (
                  <button
                    type="button"
                    onClick={triggerSampleFront}
                    className="px-3 py-1.5 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 text-xs font-bold rounded transition-colors"
                  >
                    Sample Front
                  </button>
                )}
              </div>
            </div>

            {frontLoading && (
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded flex items-center justify-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-[#0f2a4a] dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-[11px] font-bold text-[#0f2a4a] dark:text-blue-300">
                  Scanning Front Page...
                </span>
              </div>
            )}
          </div>

          {/* Back Page Scanner */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0f2a4a] dark:text-blue-300">
                Aadhaar Back Page (Residential Address, QR Code)
              </span>
              {profile?.address && (
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">
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
              className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors relative overflow-hidden flex flex-col justify-center min-h-[160px] ${
                isBackDragOver
                  ? 'border-blue-700 bg-blue-50/50 dark:bg-blue-900/30'
                  : 'border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900'
              }`}
            >
              {backPreview ? (
                <div className="relative inline-block mx-auto">
                  <img
                    src={backPreview}
                    alt="Aadhaar Back Side Preview"
                    className="max-h-36 rounded border border-slate-300 dark:border-slate-600 shadow-xs mx-auto"
                  />
                  {backLoading && (
                    <div
                      className="absolute left-0 right-0 h-1 bg-blue-600 shadow-md animate-scan"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ) : (
                <div className="py-2 space-y-1">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Upload Back Side of Aadhaar
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Drag & drop or browse image (JPG, PNG)
                  </p>
                </div>
              )}

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => backInputRef.current?.click()}
                  className="px-3 py-1.5 bg-[#0f2a4a] hover:bg-blue-900 text-white text-xs font-bold rounded shadow-xs transition-colors"
                >
                  {backPreview ? 'Change Back Image' : 'Browse Back Page'}
                </button>

                {triggerSampleBack && (
                  <button
                    type="button"
                    onClick={triggerSampleBack}
                    className="px-3 py-1.5 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 text-xs font-bold rounded transition-colors"
                  >
                    Sample Back
                  </button>
                )}
              </div>
            </div>

            {backLoading && (
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded flex items-center justify-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-[#0f2a4a] dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-[11px] font-bold text-[#0f2a4a] dark:text-blue-300">
                  Scanning Back Page...
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Combined OCR Extracted Summary Table */}
        {(ocrResult || profile?.name || profile?.address) && (
          <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <DataTable
              title="Verified eKYC Extracted Fields"
              badge="Validated"
              subtitle="The particulars below have been extracted and mapped to your official application."
              rows={[
                ['Parsed Full Name', profile?.name || <span className="text-slate-400 italic">Upload Front Page</span>],
                ['Parsed Date of Birth', profile?.dob || <span className="text-slate-400 italic">Upload Front Page</span>],
                ['Mobile Number', profile?.mobile || <span className="text-slate-400 italic">Upload Front Page</span>],
                ['Aadhaar Number', profile?.aadhaar || <span className="text-slate-400 italic">Upload Front / Back Page</span>],
                ['Residential Address', profile?.address || <span className="text-slate-400 italic">Upload Back Page</span>],
                [
                  'Verification Status',
                  <span key="status" className="inline-flex items-center gap-1 text-emerald-800 dark:text-emerald-400 font-bold">
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
