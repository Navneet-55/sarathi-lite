import React from 'react';

/**
 * Accessibility Utility Bar (Text size control: A- | A | A+)
 */
export default function AccessibilityBar({ textSize, setTextSize }) {
  return (
    <div className="flex items-center gap-1.5 text-xs font-bold" aria-label="Accessibility controls">
      <span className="text-blue-200 mr-1 text-[11px] font-normal hidden sm:inline">Text Size:</span>
      <button
        type="button"
        onClick={() => setTextSize('small')}
        className={`px-2 py-0.5 rounded border transition-colors ${
          textSize === 'small'
            ? 'bg-white text-[#0f2a4a] border-white'
            : 'border-blue-800 text-blue-100 hover:bg-blue-900'
        }`}
        title="Decrease text size"
      >
        A-
      </button>
      <button
        type="button"
        onClick={() => setTextSize('normal')}
        className={`px-2 py-0.5 rounded border transition-colors ${
          textSize === 'normal'
            ? 'bg-white text-[#0f2a4a] border-white'
            : 'border-blue-800 text-blue-100 hover:bg-blue-900'
        }`}
        title="Normal text size"
      >
        A
      </button>
      <button
        type="button"
        onClick={() => setTextSize('large')}
        className={`px-2 py-0.5 rounded border transition-colors ${
          textSize === 'large'
            ? 'bg-white text-[#0f2a4a] border-white'
            : 'border-blue-800 text-blue-100 hover:bg-blue-900'
        }`}
        title="Increase text size"
      >
        A+
      </button>
    </div>
  );
}
