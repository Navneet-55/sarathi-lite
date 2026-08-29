import React from 'react';
import { TRANSLATIONS } from '../data/translations';

const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'mr', label: 'मराठी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
];

/**
 * Enhanced Accessibility Utility Bar (GIGW Compliant)
 * Controls: Multilingual selector + Text sizing + High Contrast + Dark Mode
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
      {/* 5-Language Dropdown Selector */}
      {setLang && (
        <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full border border-white/20">
          <span className="text-[10px] text-amber-300">🌐</span>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer pr-1"
            title="Choose Language"
          >
            {SUPPORTED_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code} className="bg-slate-900 text-white font-medium">
                {l.label}
              </option>
            ))}
          </select>
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
