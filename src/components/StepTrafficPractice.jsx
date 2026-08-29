import React, { useState, useEffect } from 'react';
import TrafficSignImage from './TrafficSignImage';
import { QUESTION_BANK } from '../data/questionBank';

const TOTAL_TEST_QUESTIONS = 5;
const REQUIRED_PASS_SCORE = 3;

/**
 * Step 2: Strictly 5 Questions Traffic Practice Test with Audio Pause, Visual Signs, and Dark Mode
 */
export default function StepTrafficPractice({ onPassed, practicePassed, onProceedToPayment, onBackToGuide }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]); // records { questionId, isCorrect, selectedOption }
  const [audioState, setAudioState] = useState('idle'); // 'idle' | 'playing' | 'paused'
  const [testFinished, setTestFinished] = useState(false);

  // Initialize strictly 5 questions on mount or reset
  const initTest = () => {
    // Shuffle and pick strictly 5 questions
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

  // Audio Player Handlers (Play / Pause / Resume / Stop)
  const playAudio = (textToRead) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'en-IN';
    utterance.rate = 0.95;

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
      onPassed();
    }
  };

  const handleNext = () => {
    stopAudio();
    setSelectedOption(null);
    if (currentIndex + 1 < TOTAL_TEST_QUESTIONS) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setTestFinished(true);
    }
  };

  const currentScore = answers.filter((a) => a.isCorrect).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-[#0f2a4a] dark:text-blue-200">
            Mandatory Traffic Rules & Road Signs Knowledge Test
          </h2>
          <div className="flex items-center gap-2">
            {onBackToGuide && (
              <button
                type="button"
                onClick={() => {
                  stopAudio();
                  onBackToGuide();
                }}
                className="text-[11px] text-blue-700 dark:text-blue-300 hover:underline font-bold px-2 py-0.5"
              >
                ← Back to Study Guide
              </button>
            )}
            <span className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-600 font-mono">
              5 Questions
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          Answer the 5 regulatory road safety questions below. Score at least {REQUIRED_PASS_SCORE} out of 5 to qualify for Step 3 (Fee Payment).
        </p>
      </div>

      {/* Progress Tracker Strip */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Test Progress
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xl font-extrabold text-[#0f2a4a] dark:text-blue-200">
                Question {Math.min(currentIndex + 1, TOTAL_TEST_QUESTIONS)} of {TOTAL_TEST_QUESTIONS}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                (Score: {currentScore}/{answers.length})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                Qualification Status
              </span>
              {currentScore >= REQUIRED_PASS_SCORE || practicePassed ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-300 dark:border-emerald-800">
                  <span>✓</span> Qualified ({currentScore}/{TOTAL_TEST_QUESTIONS} Passed)
                </span>
              ) : (
                <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
                  Need {REQUIRED_PASS_SCORE} correct to qualify
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 5 Fixed Question Step Indicator */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mr-1">Questions:</span>
          {Array.from({ length: TOTAL_TEST_QUESTIONS }).map((_, idx) => {
            const answerRecord = answers[idx];
            const isCurrent = idx === currentIndex && !testFinished;

            return (
              <div
                key={idx}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                  answerRecord
                    ? answerRecord.isCorrect
                      ? 'bg-emerald-700 border-emerald-800 text-white'
                      : 'bg-rose-600 border-rose-700 text-white'
                    : isCurrent
                    ? 'border-[#0f2a4a] dark:border-blue-400 bg-blue-50 dark:bg-slate-700 text-[#0f2a4a] dark:text-blue-300 ring-2 ring-blue-300 dark:ring-blue-500'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600'
                }`}
                title={`Question ${idx + 1}`}
              >
                {answerRecord ? (answerRecord.isCorrect ? '✓' : '✗') : idx + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Question / Results Card */}
      {!testFinished && currentQ ? (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5 shadow-xs space-y-4">
          {/* Question Header & Category Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0f2a4a] dark:text-blue-300 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 px-2.5 py-1 rounded uppercase tracking-wider">
                Question {currentIndex + 1} of {TOTAL_TEST_QUESTIONS}: {currentQ.category || 'Road Sign'}
              </span>
              {currentQ.lawSection && (
                <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline font-mono">
                  ({currentQ.lawSection})
                </span>
              )}
            </div>

            {/* Audio Playback Controller (Play, Pause, Resume, Stop) */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded border border-slate-300 dark:border-slate-700 text-xs">
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 px-1">Audio:</span>
              {audioState === 'idle' && (
                <button
                  type="button"
                  onClick={() =>
                    playAudio(
                      `${currentQ.question}. Option A: ${currentQ.options[0]}. Option B: ${currentQ.options[1]}. Option C: ${currentQ.options[2]}. Option D: ${currentQ.options[3]}.`
                    )
                  }
                  className="px-2 py-0.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded border border-slate-300 dark:border-slate-600 shadow-2xs"
                  title="Listen to question audio"
                >
                  ▶ Listen
                </button>
              )}

              {audioState === 'playing' && (
                <>
                  <button
                    type="button"
                    onClick={pauseAudio}
                    className="px-2 py-0.5 bg-amber-500 text-slate-900 font-bold rounded shadow-2xs"
                    title="Pause audio playback"
                  >
                    ⏸ Pause
                  </button>
                  <button
                    type="button"
                    onClick={stopAudio}
                    className="px-2 py-0.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded border border-slate-300 dark:border-slate-600"
                    title="Stop audio playback"
                  >
                    ⏹ Stop
                  </button>
                </>
              )}

              {audioState === 'paused' && (
                <>
                  <button
                    type="button"
                    onClick={resumeAudio}
                    className="px-2 py-0.5 bg-emerald-600 text-white font-bold rounded shadow-2xs"
                    title="Resume audio playback"
                  >
                    ▶ Resume
                  </button>
                  <button
                    type="button"
                    onClick={stopAudio}
                    className="px-2 py-0.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded border border-slate-300 dark:border-slate-600"
                    title="Stop audio playback"
                  >
                    ⏹ Stop
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Question Text & Visual Road Sign Illustration Card */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Visual Sign Reference Illustration */}
            <div className="md:col-span-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mb-2">Sign Illustration:</span>
              <TrafficSignImage signId={currentQ.id} />
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-2">
                {currentQ.shape || 'Standard Sign'}
              </span>
            </div>

            {/* Question Prompt */}
            <div className="md:col-span-3">
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {currentQ.question}
              </p>
            </div>
          </div>

          {/* Options Selection */}
          <div className="space-y-2.5 pt-2">
            {currentQ.options?.map((option, idx) => {
              let btnStyle =
                'border-slate-300 dark:border-slate-600 hover:border-[#0f2a4a] dark:hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-850';
              if (selectedOption !== null) {
                if (idx === currentQ.correctIndex) {
                  btnStyle =
                    'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 font-bold ring-1 ring-emerald-600';
                } else if (idx === selectedOption) {
                  btnStyle =
                    'border-rose-600 bg-rose-50 dark:bg-rose-950/60 text-rose-950 dark:text-rose-200 ring-1 ring-rose-600';
                } else {
                  btnStyle = 'border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600 bg-slate-50 dark:bg-slate-900 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-3.5 text-xs sm:text-sm rounded border transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span className="font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 rounded px-1.5 py-0.5 text-xs">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-normal">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation & Proceed Button */}
          {selectedOption !== null && (
            <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-700">
              <div
                className={`p-3.5 rounded border text-xs sm:text-sm ${
                  selectedOption === currentQ.correctIndex
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
                }`}
              >
                <p className="font-bold mb-1 flex items-center gap-1.5">
                  {selectedOption === currentQ.correctIndex ? (
                    <>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓</span>
                      <span>Correct Answer</span>
                    </>
                  ) : (
                    <>
                      <span className="text-rose-700 dark:text-rose-400 font-bold">✗</span>
                      <span>Incorrect Response</span>
                    </>
                  )}
                </p>
                <p className="leading-relaxed text-slate-700 dark:text-slate-300">{currentQ.explanation}</p>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full py-3.5 bg-[#0f2a4a] hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-xs sm:text-sm font-bold rounded shadow-xs transition-colors"
              >
                {currentIndex + 1 === TOTAL_TEST_QUESTIONS
                  ? 'Finish Test & View Results'
                  : `Next Question (${currentIndex + 2} of 5) →`}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Test Finished Final Summary Card */
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-xs space-y-5 text-center">
          <div
            className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center font-bold text-xl ${
              currentScore >= REQUIRED_PASS_SCORE
                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
            }`}
          >
            {currentScore >= REQUIRED_PASS_SCORE ? '✓' : '✗'}
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#0f2a4a] dark:text-blue-200">
              Test Result: {currentScore} / {TOTAL_TEST_QUESTIONS} Correct
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-md mx-auto">
              {currentScore >= REQUIRED_PASS_SCORE
                ? `Congratulations! You have satisfied the mandatory qualification threshold (Min. ${REQUIRED_PASS_SCORE}/5). You may now proceed to Step 3: Fee Payment.`
                : `You scored ${currentScore}/5. You need at least ${REQUIRED_PASS_SCORE} correct answers to qualify. You can review the rules or retake the test.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={initTest}
              className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold rounded border border-slate-300 dark:border-slate-600 transition-colors"
            >
              Retake Practice Test (5 Questions)
            </button>

            {currentScore >= REQUIRED_PASS_SCORE && onProceedToPayment && (
              <button
                type="button"
                onClick={onProceedToPayment}
                className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold rounded shadow-xs transition-colors"
              >
                Proceed to Step 3: Fee Payment →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
