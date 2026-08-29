import React, { useRef, useState } from 'react';
import DataTable from './DataTable';
import CameraCaptureModal from './CameraCaptureModal';
import { RTO_OFFICES } from '../data/rtoSlots';
import { TRANSLATIONS } from '../data/translations';

/**
 * Step 1: Citizen Application Form, Dual Front/Back Aadhaar OCR & Live Camera Scanner
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
  lang = 'en',
}) {
  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);
  const [isFrontDragOver, setIsFrontDragOver] = useState(false);
  const [isBackDragOver, setIsBackDragOver] = useState(false);
  const [cameraModalSide, setCameraModalSide] = useState(null); // 'front' | 'back' | null

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

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

  const handleCameraCapture = (base64Data) => {
    if (cameraModalSide === 'front') {
      // Simulate file upload with data URL
      const mockEvent = { target: { files: [dataURLtoFile(base64Data, 'aadhaar_front.jpg')] } };
      handleFrontUpload(mockEvent);
    } else if (cameraModalSide === 'back') {
      const mockEvent = { target: { files: [dataURLtoFile(base64Data, 'aadhaar_back.jpg')] } };
      handleBackUpload(mockEvent);
    }
    setCameraModalSide(null);
  };

  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm p-6 sm:p-8 space-y-8 text-slate-900 dark:text-slate-100">
      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              {t.form2Badge}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f2a4a] dark:text-blue-100 tracking-tight mt-0.5">
              {t.step1Title}
            </h2>
          </div>
          <span className="text-xs bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full font-semibold border border-emerald-200 dark:border-emerald-800">
            {t.ekycBadge}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          {t.step1Desc}
        </p>
      </div>

      {/* Section 1: Demographics Form Fields */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          <span className="w-5 h-5 rounded-full bg-blue-800 text-white flex items-center justify-center text-[10px]">
            1
          </span>
          <span>{t.section1Demographics}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              {t.fullNameLabel} <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={profile?.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder={t.fullNamePlaceholder}
              className="w-full px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-blue-700 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              {t.mobileLabel} <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={profile?.mobile || ''}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              placeholder={t.mobilePlaceholder}
              className="w-full px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-blue-700 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              {t.dobLabel} <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={profile?.dob || ''}
              onChange={(e) => handleInputChange('dob', e.target.value)}
              placeholder={t.dobPlaceholder}
              className="w-full px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-blue-700 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              {t.aadhaarLabel}
            </label>
            <input
              type="text"
              value={profile?.aadhaar || ''}
              onChange={(e) => handleInputChange('aadhaar', e.target.value)}
              placeholder={t.aadhaarPlaceholder}
              className="w-full px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-mono focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-blue-700 focus:outline-none transition-colors"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              {t.addressLabel} <span className="text-rose-600">*</span>
            </label>
            <textarea
              rows={2}
              value={profile?.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder={t.addressPlaceholder}
              className="w-full px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-blue-700 focus:outline-none transition-colors"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
              {t.rtoLabel} <span className="text-rose-600">*</span>
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
            <span>{t.section2Ocr}</span>
          </div>
          <span className="text-[11px] text-blue-700 dark:text-blue-300 font-semibold">
            {t.autoExtractBadge}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Front Page Scanner */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {t.frontSideTitle}
              </span>
              {profile?.name && (
                <span className="text-emerald-700 dark:text-emerald-400 font-bold text-[11px]">
                  {t.frontReadSuccess}
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
                    {t.uploadFrontPrompt}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {t.dropOrBrowse}
                  </p>
                </div>
              )}

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => frontInputRef.current?.click()}
                  className="px-3.5 py-1.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-full shadow-xs transition-colors"
                >
                  {frontPreview ? t.changeFront : t.browseFront}
                </button>
                <button
                  type="button"
                  onClick={() => setCameraModalSide('front')}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-semibold rounded-full transition-colors"
                >
                  {t.cameraScanFront}
                </button>
                {triggerSampleFront && (
                  <button
                    type="button"
                    onClick={triggerSampleFront}
                    className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-full transition-colors"
                  >
                    {t.sampleFrontBtn}
                  </button>
                )}
              </div>
            </div>

            {frontLoading && (
              <div className="p-2 bg-blue-50 dark:bg-blue-950/60 rounded-lg flex items-center justify-center gap-2 text-xs text-blue-900 dark:text-blue-300 font-semibold">
                <div className="w-3.5 h-3.5 border-2 border-blue-800 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span>{t.readingFront}</span>
              </div>
            )}
          </div>

          {/* Back Page Scanner */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {t.backSideTitle}
              </span>
              {profile?.address && (
                <span className="text-emerald-700 dark:text-emerald-400 font-bold text-[11px]">
                  {t.backReadSuccess}
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
                    {t.uploadBackPrompt}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {t.dropOrBrowse}
                  </p>
                </div>
              )}

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => backInputRef.current?.click()}
                  className="px-3.5 py-1.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-full shadow-xs transition-colors"
                >
                  {backPreview ? t.changeBack : t.browseBack}
                </button>
                <button
                  type="button"
                  onClick={() => setCameraModalSide('back')}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-semibold rounded-full transition-colors"
                >
                  {t.cameraScanBack}
                </button>
                {triggerSampleBack && (
                  <button
                    type="button"
                    onClick={triggerSampleBack}
                    className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-full transition-colors"
                  >
                    {t.sampleBackBtn}
                  </button>
                )}
              </div>
            </div>

            {backLoading && (
              <div className="p-2 bg-blue-50 dark:bg-blue-950/60 rounded-lg flex items-center justify-center gap-2 text-xs text-blue-900 dark:text-blue-300 font-semibold">
                <div className="w-3.5 h-3.5 border-2 border-blue-800 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span>{t.readingBack}</span>
              </div>
            )}
          </div>
        </div>

        {/* Combined OCR Extracted Summary Ledger */}
        {(ocrResult || profile?.name || profile?.address) && (
          <div className="pt-4">
            <DataTable
              title={t.verifiedOcrTitle}
              badge={t.syncBadge}
              subtitle={t.syncSubtitle}
              lang={lang}
              rows={[
                [t.fullNameLabel, profile?.name || <span className="text-slate-400 italic">{t.uploadFrontHint}</span>],
                [t.dobLabel, profile?.dob || <span className="text-slate-400 italic">{t.uploadFrontHint}</span>],
                [t.mobileLabel, profile?.mobile || <span className="text-slate-400 italic">{t.uploadFrontHint}</span>],
                [t.aadhaarLabel, profile?.aadhaar || <span className="text-slate-400 italic">{t.uploadFrontHint}</span>],
                [t.addressLabel, profile?.address || <span className="text-slate-400 italic">{t.uploadBackHint}</span>],
                [
                  t.ekycStatusField,
                  <span key="status" className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
                    <span>✓</span> {t.syncVerified}
                  </span>,
                ],
              ]}
            />
          </div>
        )}
      </div>

      {/* Live Camera Scanner Modal */}
      <CameraCaptureModal
        isOpen={cameraModalSide !== null}
        onClose={() => setCameraModalSide(null)}
        onCapture={handleCameraCapture}
        title={cameraModalSide === 'front' ? t.cameraScanFront : t.cameraScanBack}
        lang={lang}
      />
    </div>
  );
}
