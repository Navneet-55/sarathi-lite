import React, { useState } from 'react';
import TrafficSignImage from './TrafficSignImage';
import FlashcardQuiz from './FlashcardQuiz';
import HazardSimulator from './HazardSimulator';
import { COMPLETE_TRAFFIC_SIGNS, CORE_DRIVING_RULES } from '../data/trafficSignCatalog';
import { TRANSLATIONS } from '../data/translations';

/**
 * Driver Road Safety & Traffic Sign Training Academy
 * Includes: 36 Traffic Signs + 60s Speed Flashcards + Hazard Perception Simulator
 */
export default function TrafficRulesGuide({ onStartTest, lang = 'en' }) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSignId, setExpandedSignId] = useState(null);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showHazardSim, setShowHazardSim] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isHi = lang === 'hi';

  const filteredSigns = COMPLETE_TRAFFIC_SIGNS.filter((sign) => {
    const matchesCategory =
      activeTab === 'all' || sign.group.toLowerCase() === activeTab.toLowerCase();
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      sign.name.toLowerCase().includes(query) ||
      (sign.nameHi && sign.nameHi.includes(query)) ||
      sign.orderNum.toLowerCase().includes(query) ||
      sign.action.toLowerCase().includes(query) ||
      (sign.actionHi && sign.actionHi.includes(query)) ||
      sign.rule.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm p-6 sm:p-8 space-y-6 text-slate-900 dark:text-slate-100">
      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              {t.curriculumBadge}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f2a4a] dark:text-blue-100 tracking-tight mt-0.5">
              {t.academyTitle}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowFlashcards(true)}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-full shadow-2xs transition-colors flex items-center gap-1"
            >
              <span>{t.flashcardBtn}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowHazardSim(true)}
              className="px-3.5 py-1.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs rounded-full shadow-2xs transition-colors flex items-center gap-1"
            >
              <span>{t.hazardBtn}</span>
            </button>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          {t.academyDesc}
        </p>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          {[
            { id: 'all', label: t.tabAll(COMPLETE_TRAFFIC_SIGNS.length) },
            { id: 'mandatory', label: t.tabMandatory },
            { id: 'cautionary', label: t.tabCautionary },
            { id: 'informatory', label: t.tabInformatory },
            { id: 'rules', label: t.tabRules },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-full transition-all text-xs font-semibold ${
                activeTab === tab.id
                  ? 'bg-blue-800 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchSignPlaceholder}
            className="w-full px-3.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>
      </div>

      {/* Content Stream */}
      {activeTab === 'rules' ? (
        <div className="divide-y divide-slate-100 dark:divide-slate-700 pt-2">
          {CORE_DRIVING_RULES.map((rule, idx) => (
            <div key={idx} className="py-4 space-y-1.5">
              <h3 className="text-sm font-bold text-[#0f2a4a] dark:text-blue-300">
                {isHi ? rule.titleHi : rule.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isHi ? rule.contentHi : rule.content}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {filteredSigns.map((item) => {
            const isExpanded = expandedSignId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setExpandedSignId(isExpanded ? null : item.id)}
                className="py-4 px-2 sm:px-3 hover:bg-slate-50/70 dark:hover:bg-slate-750/50 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Left: Graphic & Summary */}
                  <div className="flex items-center gap-4">
                    <div className="p-1.5 bg-slate-50 dark:bg-slate-900 rounded-lg shrink-0 border border-slate-200/60 dark:border-slate-700">
                      <TrafficSignImage signId={item.signId} size={70} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                          {item.orderNum}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            item.group === 'Mandatory'
                              ? 'bg-rose-50 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300'
                              : item.group === 'Cautionary'
                              ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
                              : 'bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300'
                          }`}
                        >
                          {isHi ? item.groupHi : item.group}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                          {isHi ? item.shapeHi : item.shape}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mt-1">
                        {isHi ? item.nameHi : item.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="font-medium text-slate-700 dark:text-slate-300">{t.actionPrefix}</span>{' '}
                        {isHi ? item.actionHi : item.action}
                      </p>
                    </div>
                  </div>

                  {/* Right: Expand Trigger */}
                  <div className="shrink-0 self-end sm:self-center">
                    <span className="text-xs text-blue-700 dark:text-blue-400 font-semibold">
                      {isExpanded ? t.hideDetails : t.showDetails}
                    </span>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-3 text-xs border border-slate-200/60 dark:border-slate-700">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {t.statutoryReg}
                      </span>
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                        {isHi ? item.ruleHi : item.rule}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-400 tracking-wider">
                        {t.statutoryPenalty}
                      </span>
                      <p className="text-rose-900 dark:text-rose-200 font-semibold leading-relaxed">
                        {isHi ? item.penaltyHi : item.penalty}
                      </p>
                    </div>

                    <div className="md:col-span-2 pt-1 border-t border-slate-200/60 dark:border-slate-800 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-blue-800 dark:text-blue-300 tracking-wider">
                        {t.examTipHeader}
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {isHi ? item.examTipHi : item.examTip}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Start Test Action Bar */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center space-y-2">
        <button
          type="button"
          onClick={onStartTest}
          className="px-8 py-3.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm sm:text-base rounded-full shadow-xs transition-colors inline-flex items-center gap-2"
        >
          <span>{t.completeTrainingBtn}</span>
        </button>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {t.completeTrainingSubtext}
        </p>
      </div>

      {/* 60s Speed Flashcard Modal */}
      {showFlashcards && (
        <FlashcardQuiz
          onClose={() => setShowFlashcards(false)}
          lang={lang}
        />
      )}

      {/* Hazard Perception Simulator Modal */}
      {showHazardSim && (
        <HazardSimulator
          onClose={() => setShowHazardSim(false)}
          lang={lang}
        />
      )}
    </div>
  );
}
