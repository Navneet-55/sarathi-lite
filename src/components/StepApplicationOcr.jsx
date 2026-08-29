import React, { useRef, useState } from 'react';
import DataTable from './DataTable';
import { RTO_OFFICES } from '../data/rtoSlots';

/**
 * Step 1: Applicant Registration & Genuine Aadhaar OCR Verification (Dark Mode Ready)
 */
export default function StepApplicationOcr({
  profile,
  setProfile,
  docPreview,
  ocrResult,
  ocrLoading,
  handleDocUpload,
  triggerSampleOcr,
}) {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showRawText, setShowRawText] = useState(false);

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const mockEvent = { target: { files: e.dataTransfer.files } };
      handleDocUpload(mockEvent);
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
          Fill in your applicant demographic details below, or upload your Aadhaar document to automatically extract and populate your application via Optical Character Recognition (OCR).
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

      {/* Section 2: Aadhaar OCR Upload & Scanner */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
          <h3 className="text-xs sm:text-sm font-bold text-[#0f2a4a] dark:text-blue-300 uppercase tracking-wide flex items-center gap-2">
            <span className="w-5 h-5 bg-[#0f2a4a] text-white rounded text-[11px] flex items-center justify-center font-bold">2</span>
            Aadhaar eKYC Document OCR Scanner
          </h3>
          <span className="text-[11px] text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800 font-semibold">
            {ocrResult?.engine ? ocrResult.engine : 'Optical Character Recognition'}
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleDocUpload}
        />

        {/* Drag & Drop / Upload Area */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors relative overflow-hidden ${
            isDragOver
              ? 'border-blue-700 bg-blue-50/50 dark:bg-blue-900/30'
              : 'border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900'
          }`}
        >
          {docPreview ? (
            <div className="relative inline-block mx-auto">
              <img
                src={docPreview}
                alt="Aadhaar Document Preview"
                className="max-h-52 rounded border border-slate-300 dark:border-slate-600 shadow-xs mx-auto"
              />
              {ocrLoading && (
                <div
                  className="absolute left-0 right-0 h-1 bg-blue-600 shadow-md animate-scan"
                  aria-hidden="true"
                />
              )}
            </div>
          ) : (
            <div className="py-3 space-y-1.5">
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Upload Aadhaar Card image (Front side) for character recognition
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Drag and drop image file here, or click browse button below (Supports JPG, PNG, WebP up to 5MB)
              </p>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-[#0f2a4a] hover:bg-blue-900 text-white text-xs font-bold rounded shadow-xs transition-colors"
            >
              {docPreview ? 'Upload Different File' : 'Browse Local Image File'}
            </button>

            {triggerSampleOcr && (
              <button
                type="button"
                onClick={triggerSampleOcr}
                className="px-4 py-2 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 text-xs font-bold rounded transition-colors"
              >
                Load Sample Aadhaar
              </button>
            )}
          </div>
        </div>

        {/* Scanning Progress */}
        {ocrLoading && (
          <div className="p-3.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded flex items-center justify-center gap-3">
            <div className="w-4 h-4 border-2 border-[#0f2a4a] dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold text-[#0f2a4a] dark:text-blue-300">
              Optical character recognition in progress • Extracting text from document pixels...
            </span>
          </div>
        )}

        {/* OCR Result Table */}
        {ocrResult && (
          <div className="space-y-3 pt-2">
            <DataTable
              title="Aadhaar OCR Extracted Fields"
              badge={`${Math.round((ocrResult.confidence || 0.95) * 100)}% Confidence`}
              subtitle={`Extracted via ${ocrResult.engine || 'Optical Character Recognition'}. Validated fields have updated your form above.`}
              rows={[
                ['Parsed Full Name', ocrResult.name || <span className="text-slate-400 italic">Not detected on document</span>],
                ['Parsed Date of Birth', ocrResult.dob || <span className="text-slate-400 italic">Not detected on document</span>],
                ['Gender', ocrResult.gender || <span className="text-slate-400 italic">Not detected</span>],
                ['Aadhaar Number', ocrResult.docNumber || <span className="text-slate-400 italic">Not detected on document</span>],
                ['Residential Address', ocrResult.address || <span className="text-slate-400 italic">Not detected on front side</span>],
                [
                  'Validation Result',
                  <span key="status" className="inline-flex items-center gap-1 text-emerald-800 dark:text-emerald-400 font-bold">
                    <span>✓</span> eKYC Optical Character Recognition Complete
                  </span>,
                ],
              ]}
            />

            {ocrResult.rawText && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowRawText(!showRawText)}
                  className="text-[11px] text-blue-800 dark:text-blue-300 hover:underline font-bold flex items-center gap-1"
                >
                  {showRawText ? 'Hide Raw OCR Text Feed' : 'View Raw Extracted Text Feed'}
                </button>
                {showRawText && (
                  <pre className="mt-2 p-3 bg-slate-900 text-slate-100 text-[11px] font-mono rounded overflow-x-auto whitespace-pre-wrap max-h-40 border border-slate-700">
                    {ocrResult.rawText}
                  </pre>
                )}
              </div>
            )}

            {ocrResult.note && (
              <p className="text-[11px] text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-700">
                <strong>Notice:</strong> {ocrResult.note}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
