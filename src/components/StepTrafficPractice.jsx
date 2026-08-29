import React, { useState, useEffect } from 'react';
import TrafficSignImage from './TrafficSignImage';
import { QUESTION_BANK } from '../data/questionBank';
import { TRANSLATIONS } from '../data/translations';

const TOTAL_TEST_QUESTIONS = 5;
const REQUIRED_PASS_SCORE = 3;

/**
 * Step 2: 5-Question Traffic Practice Test (Pure Bilingual Support & Hindi Voice Speech)
 */
export default function StepTrafficPractice({
  onPassed,
  practicePassed: _practicePassed,
  onProceedToPayment,
  onBackToGuide,
  lang = 'en',
}) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [audioState, setAudioState] = useState('idle');
  const [testFinished, setTestFinished] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const isHi = lang === 'hi';

  const initTest = () => {
    const shuffled = [...QUESTION_BANK].sort(() => 0.5 - Math.random());
    const selectedFive = shuffled.slice(0, TOTAL_TEST_QUESTIONS);
    setQuestions(selectedFive);
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setTestFinished(false);
    stopAudio();
  };

  useEffect(() => {
    initTest();
    return () => {
      stopAudio();
    };
  }, []);

  const playAudio = (textToRead) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = isHi ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.92;

    utterance.onend = () => {
      setAudioState('idle');
    };

    utterance.onerror = () => {
      setAudioState('idle');
    };

    window.speechSynthesis.speak(utterance);
    setAudioState('playing');
  };

  const pauseAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setAudioState('paused');
    }
  };

  const resumeAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setAudioState('playing');
    }
  };

  const stopAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setAudioState('idle');
  };

  const currentQ = questions[currentIndex];
  const activeQuestionText = isHi && currentQ?.questionHi ? currentQ.questionHi : currentQ?.question;
  const activeOptions = isHi && currentQ?.optionsHi ? currentQ.optionsHi : currentQ?.options || [];
  const activeCategory = isHi && currentQ?.categoryHi ? currentQ.categoryHi : currentQ?.category || 'Road Safety';
  const activeExplanation = isHi && currentQ?.explanationHi ? currentQ.explanationHi : currentQ?.explanation;

  const handleSelectOption = (idx) => {
    if (selectedOption !== null || !currentQ) return;
    setSelectedOption(idx);
    const isCorrect = idx === currentQ.correctIndex;

    const updatedAnswers = [
      ...answers,
      {
        questionId: currentQ.id,
        isCorrect,
        selectedOption: idx,
      },
    ];
    setAnswers(updatedAnswers);

    const totalScore = updatedAnswers.filter((a) => a.isCorrect).length;
    if (totalScore >= REQUIRED_PASS_SCORE) {
      onPassed && onPassed();
    }
  };

  const handleNextQuestion = () => {
    stopAudio();
    if (currentIndex + 1 < TOTAL_TEST_QUESTIONS) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      setTestFinished(true);
    }
  };

  const currentScore = answers.filter((a) => a.isCorrect).length;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm p-6 sm:p-8 space-y-6 text-slate-900 dark:text-slate-100">
      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              {t.examModuleBadge}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f2a4a] dark:text-blue-200 tracking-tight mt-0.5">
              {t.examTitle}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {onBackToGuide && (
              <button
                type="button"
                onClick={() => {
                  stopAudio();
                  onBackToGuide();
                }}
                className="text-xs text-blue-700 dark:text-blue-300 hover:underline font-semibold"
              >
                {t.backToStudyGuide}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Status Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-slate-100 dark:border-slate-700 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 dark:text-slate-100">
            {t.questionOf(Math.min(currentIndex + 1, TOTAL_TEST_QUESTIONS), TOTAL_TEST_QUESTIONS)}
          </span>
          <span className="text-slate-400 dark:text-slate-500">|</span>
          <span className="text-slate-600 dark:text-slate-300">
            {t.scoreOf(currentScore, answers.length)}
          </span>
        </div>

        {/* 5 Indicator Dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL_TEST_QUESTIONS }).map((_, idx) => {
            const answerRecord = answers[idx];
            const isCurrent = idx === currentIndex && !testFinished;

            return (
              <div
                key={idx}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                  answerRecord
                    ? answerRecord.isCorrect
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                    : isCurrent
                    ? 'bg-blue-700 text-white ring-2 ring-blue-300 dark:ring-blue-500'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-400'
                }`}
              >
                {answerRecord ? (answerRecord.isCorrect ? '✓' : '✗') : idx + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Question Flow */}
      {!testFinished && currentQ ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Visual Sign Reference */}
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center shrink-0 mx-auto md:mx-0 border border-slate-200/60 dark:border-slate-700">
              <TrafficSignImage signId={currentQ.id} size={110} />
            </div>

            {/* Question Text & Audio Player */}
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                  {activeCategory}
                </span>

                {/* Audio Controls */}
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full text-xs">
                  {audioState === 'idle' && (
                    <button
                      type="button"
                      onClick={() => {
                        const optPrefixes = isHi ? ['विकल्प क:', 'विकल्प ख:', 'विकल्प ग:', 'विकल्प घ:'] : ['Option A:', 'Option B:', 'Option C:', 'Option D:'];
                        const spokenText = `${activeQuestionText}. ${optPrefixes[0]} ${activeOptions[0]}. ${optPrefixes[1]} ${activeOptions[1]}. ${optPrefixes[2]} ${activeOptions[2]}. ${optPrefixes[3]} ${activeOptions[3]}.`;
                        playAudio(spokenText);
                      }}
                      className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      {t.readQuestionAudio}
                    </button>
                  )}
                  {audioState === 'playing' && (
                    <button
                      type="button"
                      onClick={pauseAudio}
                      className="text-[11px] font-bold text-amber-600 dark:text-amber-300 hover:underline"
                    >
                      {t.pauseAudio}
                    </button>
                  )}
                  {audioState === 'paused' && (
                    <button
                      type="button"
                      onClick={resumeAudio}
                      className="text-[11px] font-bold text-blue-600 dark:text-blue-300 hover:underline"
                    >
                      {t.resumeAudio}
                    </button>
                  )}
                  {audioState !== 'idle' && (
                    <button
                      type="button"
                      onClick={stopAudio}
                      className="text-[11px] text-slate-400 hover:text-slate-200 ml-1"
                    >
                      {t.stopAudio}
                    </button>
                  )}
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-50 leading-snug">
                {activeQuestionText}
              </h3>
            </div>
          </div>

          {/* Options Stream */}
          <div className="space-y-2.5">
            {activeOptions.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === currentQ.correctIndex;
              const hasAnswered = selectedOption !== null;

              let optionStyle =
                'border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100';

              if (hasAnswered) {
                if (isCorrectOption) {
                  optionStyle =
                    'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 font-bold';
                } else if (isSelected) {
                  optionStyle =
                    'border-rose-500 bg-rose-50 dark:bg-rose-950/70 text-rose-950 dark:text-rose-100';
                } else {
                  optionStyle = 'opacity-40 border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-900';
                }
              }

              const letterLabel = isHi
                ? ['क', 'ख', 'ग', 'घ'][idx] || String.fromCharCode(65 + idx)
                : String.fromCharCode(65 + idx);

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 text-xs sm:text-sm ${optionStyle}`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      hasAnswered && isCorrectOption
                        ? 'bg-emerald-600 text-white'
                        : hasAnswered && isSelected
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {letterLabel}
                  </span>
                  <span className="leading-relaxed flex-1">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation & Next Step */}
          {selectedOption !== null && (
            <div className="pt-2 space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 rounded-xl text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t.statutoryRuleExplanation}
                </span>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {activeExplanation}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs sm:text-sm font-bold rounded-full shadow-xs transition-colors"
                >
                  {currentIndex + 1 < TOTAL_TEST_QUESTIONS ? t.nextQuestionBtn : t.viewResultsBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Test Completion Sheet */
        <div className="text-center py-6 space-y-5">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold mx-auto ${
              currentScore >= REQUIRED_PASS_SCORE
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
            }`}
          >
            {currentScore >= REQUIRED_PASS_SCORE ? '✓' : '✗'}
          </div>

          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {currentScore >= REQUIRED_PASS_SCORE
                ? t.testQualifiedTitle
                : t.testIncompleteTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {t.scoredSummary(currentScore, TOTAL_TEST_QUESTIONS)}
              {currentScore >= REQUIRED_PASS_SCORE
                ? t.eligibleForPayment
                : t.needMinScore(REQUIRED_PASS_SCORE)}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={initTest}
              className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-semibold rounded-full transition-colors"
            >
              {t.retryTestBtn}
            </button>

            {currentScore >= REQUIRED_PASS_SCORE && (
              <button
                type="button"
                onClick={onProceedToPayment}
                className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs sm:text-sm font-bold rounded-full shadow-xs transition-colors"
              >
                {t.proceedToPaymentBtn}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
