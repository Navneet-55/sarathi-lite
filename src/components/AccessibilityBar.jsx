import React from 'react';
import { TRANSLATIONS } from '../data/translations';

/**
 * Enhanced Accessibility Utility Bar (GIGW Compliant)
 * Controls: Language Toggle (EN / हिन्दी) + Text sizing (A- | A | A+) + Contrast Mode + Dark Mode toggle
 */
export default function AccessibilityBar({
  textSize,
  setTextSize,
  contrast,
  setContrast,
  darkMode,
  setDarkMode,
  lang = 'en',
  setLang,
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold" aria-label="Accessibility & Language tools">
      {/* Language Toggle Switch */}
      {setLang && (
        <div className="flex items-center bg-white/10 rounded-full p-0.5 border border-white/20">
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
              lang === 'en'
                ? 'bg-white text-[#0b2545] shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="Switch to English"
            aria-pressed={lang === 'en'}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLang('hi')}
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
              lang === 'hi'
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            title="हिन्दी में बदलें"
            aria-pressed={lang === 'hi'}
          >
            हिन्दी
          </button>
        </div>
      )}

      {/* Font Size Group */}
      <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded border border-white/20">
        <span className="text-blue-100 text-[10px] uppercase tracking-wider px-1 hidden sm:inline">
          {t.sizeLabel}
        </span>
        <button
          type="button"
          onClick={() => setTextSize('small')}
          className={`px-2 py-0.5 rounded text-xs transition-colors ${
            textSize === 'small'
              ? 'bg-amber-400 text-slate-900 font-bold shadow-xs'
              : 'text-white hover:bg-white/20'
          }`}
          title="Decrease text size (A-)"
          aria-label="Decrease text size"
        >
          A-
        </button>
        <button
          type="button"
          onClick={() => setTextSize('normal')}
          className={`px-2 py-0.5 rounded text-xs transition-colors ${
            textSize === 'normal'
              ? 'bg-white text-[#0f2a4a] font-bold shadow-xs'
              : 'text-white hover:bg-white/20'
          }`}
          title="Standard text size (A)"
          aria-label="Standard text size"
        >
          A
        </button>
        <button
          type="button"
          onClick={() => setTextSize('large')}
          className={`px-2 py-0.5 rounded text-xs transition-colors ${
            textSize === 'large'
              ? 'bg-amber-400 text-slate-900 font-bold shadow-xs'
              : 'text-white hover:bg-white/20'
          }`}
          title="Increase text size (A+)"
          aria-label="Increase text size"
        >
          A+
        </button>
      </div>

      {/* Contrast Mode Toggle */}
      {setContrast && (
        <button
          type="button"
          onClick={() => setContrast(contrast === 'high' ? 'standard' : 'high')}
          className={`px-2 py-1 rounded text-[11px] font-bold border transition-colors flex items-center gap-1 ${
            contrast === 'high'
              ? 'bg-yellow-400 text-black border-yellow-300'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
          title="Toggle High Contrast Mode"
          aria-pressed={contrast === 'high'}
        >
          <span aria-hidden="true">◐</span>
          <span className="hidden sm:inline">
            {contrast === 'high' ? t.highContrast : t.contrast}
          </span>
        </button>
      )}

      {/* Dark Mode Toggle */}
      {setDarkMode && (
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className={`px-2 py-1 rounded text-[11px] font-bold border transition-colors flex items-center gap-1 ${
            darkMode
              ? 'bg-slate-900 text-amber-300 border-amber-400'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
          title="Toggle Dark Mode Theme"
          aria-pressed={darkMode}
        >
          <span aria-hidden="true">{darkMode ? '☀️' : '🌙'}</span>
          <span className="hidden sm:inline">
            {darkMode ? t.lightTheme : t.darkMode}
          </span>
        </button>
      )}
    </div>
  );
}
