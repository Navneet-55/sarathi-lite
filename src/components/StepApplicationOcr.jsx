import React, { useRef, useState } from 'react';
import DataTable from './DataTable';
import { RTO_OFFICES } from '../data/rtoSlots';

/**
 * Step 1: Applicant Registration & Aadhaar OCR Verification
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
      <div className="border-b border-slate-200 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-[#0f2a4a]">
            Step 1: Application Form & Document OCR Verification
          </h2>
          <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-300 font-mono">
            Form 2 (Rules 4, 8)
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1">
          Verify your demographic details or upload your Aadhaar document to automatically extract and populate your application via OCR.
        </p>
      </div>

      {/* Section 1: Demographics Form */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h3 className="text-xs sm:text-sm font-bold text-[#0f2a4a] uppercase tracking-wide flex items-center gap-2">
            <span className="w-5 h-5 bg-[#0f2a4a] text-white rounded text-[11px] flex items-center justify-center font-bold">1</span>
            Applicant Demographics & Jurisdiction
          </h3>
          <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            eKYC Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Full Legal Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={profile?.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-700 focus:outline-none bg-white text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Mobile Number (for SMS Alerts) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={profile?.mobile || ''}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-700 focus:outline-none bg-white text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Date of Birth (DD/MM/YYYY) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={profile?.dob || ''}
              onChange={(e) => handleInputChange('dob', e.target.value)}
              placeholder="e.g. 15/03/1998"
              className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-700 focus:outline-none bg-white text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Aadhaar UID / VID Reference
            </label>
            <input
              type="text"
              value={profile?.aadhaar || ''}
              onChange={(e) => handleInputChange('aadhaar', e.target.value)}
              placeholder="e.g. XXXX-XXXX-4521"
              className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-700 focus:outline-none bg-white text-slate-900 font-mono"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-700 font-semibold mb-1">
              Permanent Residential Address <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              value={profile?.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Full address with pin code"
              className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-700 focus:outline-none bg-white text-slate-900"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-700 font-semibold mb-1">
              Target RTO Office Jurisdiction <span className="text-rose-500">*</span>
            </label>
            <select
              value={profile?.rto || ''}
              onChange={(e) => handleInputChange('rto', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-700 focus:outline-none bg-white text-slate-900"
            >
              {RTO_OFFICES.map((rto) => (
                <option key={rto.code} value={rto.name}>
                  {rto.name} ({rto.code})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1">
              Select the RTO office geographically corresponding to your residential address.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Aadhaar OCR Upload & Scanner */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h3 className="text-xs sm:text-sm font-bold text-[#0f2a4a] uppercase tracking-wide flex items-center gap-2">
            <span className="w-5 h-5 bg-[#0f2a4a] text-white rounded text-[11px] flex items-center justify-center font-bold">2</span>
            Aadhaar eKYC Document OCR Scanner
          </h3>
          <span className="text-[11px] text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">
            AI Vision Parser
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
              ? 'border-blue-700 bg-blue-50/50'
              : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50'
          }`}
        >
          {docPreview ? (
            <div className="relative inline-block mx-auto">
              <img
                src={docPreview}
                alt="Aadhaar Document Preview"
                className="max-h-48 rounded border border-slate-300 shadow-sm mx-auto"
              />
              {ocrLoading && (
                <div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-md animate-scan"
                  aria-hidden="true"
                />
              )}
            </div>
          ) : (
            <div className="py-4 space-y-2">
              <div className="text-4xl" aria-hidden="true">📄</div>
              <p className="text-xs sm:text-sm font-bold text-slate-800">
                Drag & Drop Aadhaar Card front image here, or browse files
              </p>
              <p className="text-[11px] text-slate-500">
                Supports JPG, PNG, WebP up to 5MB (Simulated eKYC pipeline)
              </p>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-[#0f2a4a] hover:bg-blue-900 text-white text-xs font-bold rounded shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>📁</span>
              <span>{docPreview ? 'Upload Another Document' : 'Browse Local Image'}</span>
            </button>

            {triggerSampleOcr && (
              <button
                type="button"
                onClick={triggerSampleOcr}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold rounded transition-colors"
              >
                ⚡ Load Sample Aadhaar for OCR
              </button>
            )}
          </div>
        </div>

        {/* Scanning Indicator */}
        {ocrLoading && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded flex items-center justify-center gap-3">
            <div className="w-4 h-4 border-2 border-[#0f2a4a] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold text-[#0f2a4a]">
              Optical Character Recognition in progress • Extracting text fields...
            </span>
          </div>
        )}

        {/* OCR Result Table */}
        {ocrResult && (
          <div className="space-y-3 pt-2">
            <DataTable
              title="Aadhaar OCR Extraction Results"
              badge={`${Math.round((ocrResult.confidence || 0.96) * 100)}% Match Confidence`}
              subtitle="The extracted values below have been synchronized with your application form."
              rows={[
                ['Extracted Full Name', ocrResult.name],
                ['Extracted Date of Birth', ocrResult.dob],
                ['Gender', ocrResult.gender || 'Male'],
                ['Masked Aadhaar Number', ocrResult.docNumber],
                ['Extracted Address', ocrResult.address],
                [
                  'Validation Status',
                  <span key="status" className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                    <span>✓</span> Verified against UIDAI eKYC Standards (Mock)
                  </span>,
                ],
              ]}
            />
            {ocrResult.note && (
              <p className="text-[11px] text-slate-600 bg-slate-100 p-2.5 rounded border border-slate-200">
                ℹ️ <strong>System Note:</strong> {ocrResult.note}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
