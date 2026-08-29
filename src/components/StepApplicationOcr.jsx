import React, { useRef } from 'react';
import DataTable from './DataTable';
import { RTO_OFFICES } from '../data/rtoSlots';

/**
 * Step 1: Application Details & Aadhaar OCR Verification
 */
export default function StepApplicationOcr({
  profile,
  setProfile,
  docPreview,
  ocrResult,
  ocrLoading,
  handleDocUpload,
}) {
  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#0f2a4a]">Step 1: Application Details & OCR Document Verification</h2>
        <p className="text-xs text-slate-600 mt-1">
          Review your applicant details below or upload your Aadhaar card to auto-populate information via OCR.
        </p>
      </div>

      {/* Applicant Details Form */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#0f2a4a] border-b border-slate-200 pb-2 uppercase tracking-wide">
          Applicant Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Full Legal Name</label>
            <input
              type="text"
              value={profile?.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Mobile Number</label>
            <input
              type="text"
              value={profile?.mobile || ''}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Date of Birth</label>
            <input
              type="text"
              value={profile?.dob || ''}
              onChange={(e) => handleInputChange('dob', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Aadhaar Number (eKYC)</label>
            <input
              type="text"
              value={profile?.aadhaar || ''}
              onChange={(e) => handleInputChange('aadhaar', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-600 font-semibold mb-1">Residential Address</label>
            <textarea
              rows={2}
              value={profile?.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-600 font-semibold mb-1">Selected RTO Jurisdiction</label>
            <select
              value={profile?.rto || ''}
              onChange={(e) => handleInputChange('rto', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
            >
              {RTO_OFFICES.map((rto) => (
                <option key={rto.code} value={rto.name}>
                  {rto.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Document Upload Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h3 className="text-sm font-bold text-[#0f2a4a] uppercase tracking-wide">
            Aadhaar Document OCR Extraction
          </h3>
          <span className="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-medium border border-blue-200">
            Automated Validation
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleDocUpload}
        />

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-auto px-6 py-3 bg-[#0f2a4a] text-white text-xs sm:text-sm font-bold rounded hover:bg-blue-900 transition-colors flex items-center justify-center gap-2"
          >
            <span>📷</span>
            <span>{docPreview ? 'Upload Different Image' : 'Select Aadhaar Image'}</span>
          </button>
          <span className="text-xs text-slate-500">Supports JPG, PNG formats up to 5MB</span>
        </div>

        {docPreview && (
          <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded flex items-center gap-4">
            <img src={docPreview} alt="Aadhaar preview" className="h-16 w-24 object-cover rounded border border-slate-300" />
            <div className="text-xs text-slate-600">
              <p className="font-semibold text-slate-800">Document Uploaded</p>
              <p>Image preview loaded into memory for OCR processing.</p>
            </div>
          </div>
        )}

        {ocrLoading && (
          <div className="p-4 text-center bg-blue-50/50 border border-blue-200 rounded">
            <div className="inline-block w-5 h-5 border-2 border-blue-700 border-t-transparent rounded-full animate-spin mr-2 align-middle" />
            <span className="text-xs font-semibold text-blue-800">Scanning document & extracting key-value pairs...</span>
          </div>
        )}

        {ocrResult && (
          <div className="space-y-3 pt-2">
            <DataTable
              title="Extracted OCR Document Data"
              badge={`${Math.round((ocrResult.confidence || 0.95) * 100)}% Confidence`}
              rows={[
                ['Parsed Full Name', ocrResult.name],
                ['Parsed Date of Birth', ocrResult.dob],
                ['Document Number', ocrResult.docNumber],
                ['Residential Address', ocrResult.address],
                ['Verification Status', ocrResult.verified ? 'Verified eKYC Record' : 'Pending Review'],
              ]}
            />
            {ocrResult.note && (
              <p className="text-xs text-slate-500 bg-slate-100 p-2 rounded border border-slate-200">
                ℹ️ {ocrResult.note}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
