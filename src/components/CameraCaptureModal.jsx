import React, { useRef, useState, useEffect } from 'react';

/**
 * Live Camera Scanner Modal for Front & Back Aadhaar Capture
 */
export default function CameraCaptureModal({ isOpen, onClose, onCapture, title, lang = 'en' }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'user' | 'environment'

  const isHi = lang === 'hi';

  const startCamera = async (mode) => {
    try {
      setError(null);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError(
        isHi
          ? 'कैमरा चालू करने में असमर्थ। कृपया ब्राउज़र में कैमरा अनुमति की जांच करें।'
          : 'Unable to access camera. Please check browser permissions.'
      );
    }
  };

  useEffect(() => {
    if (isOpen) {
      startCamera(facingMode);
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen, facingMode]);

  const handleCaptureSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Data = canvas.toDataURL('image/jpeg', 0.92);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    onCapture(base64Data);
    onClose();
  };

  const handleSwitchCamera = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col text-white">
        {/* Top Bar */}
        <div className="bg-[#0b2545] px-4 py-3 flex items-center justify-between border-b border-amber-500">
          <div>
            <h3 className="text-sm font-bold text-white">
              {title || (isHi ? 'लाइव कैमरा दस्तावेज़ स्कैनर' : 'Live Camera Document Scanner')}
            </h3>
            <p className="text-[10px] text-amber-300">
              {isHi ? 'कार्ड को आयताकार फ्रेम के भीतर संरेखित करें' : 'Align document within rectangular frame'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-amber-400 font-bold text-lg px-2"
          >
            ✕
          </button>
        </div>

        {/* Video Viewfinder Area */}
        <div className="relative bg-black min-h-[300px] flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="p-6 text-center text-xs text-rose-300 space-y-2 max-w-xs">
              <span className="text-3xl block">📷</span>
              <p>{error}</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover max-h-[360px]"
              />

              {/* Viewfinder Target Overlay Frame */}
              <div className="absolute inset-8 border-2 border-dashed border-amber-400/80 rounded-xl pointer-events-none flex flex-col justify-between p-3">
                <span className="text-[9px] font-bold text-amber-300 uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded self-start">
                  {isHi ? 'आधार कार्ड फ्रेम' : 'Aadhaar Card Frame'}
                </span>
                <span className="text-[9px] text-amber-300 bg-black/60 px-2 py-0.5 rounded self-center">
                  {isHi ? 'सीधी रोशनी में स्पष्ट रखें' : 'Hold steady in good light'}
                </span>
              </div>
            </>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Action Controls */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleSwitchCamera}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-full border border-slate-700 transition-colors"
          >
            🔄 {isHi ? 'कैमरा बदलें' : 'Switch Camera'}
          </button>

          <button
            type="button"
            onClick={handleCaptureSnapshot}
            disabled={!!error}
            className="px-6 py-2.5 bg-blue-700 hover:bg-blue-600 disabled:bg-slate-700 text-white font-bold text-xs sm:text-sm rounded-full shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>📸</span>
            <span>{isHi ? 'फोटो खींचें व स्कैन करें' : 'Capture & Extract'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
