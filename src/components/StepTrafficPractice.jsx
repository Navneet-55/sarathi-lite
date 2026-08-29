import React, { useState, useEffect, useCallback } from 'react';
import { fetchTrafficQuestion } from '../services/apiService';

/**
 * Step 2: Mandatory Road Traffic Signs & Regulations Practice Test
 */
export default function StepTrafficPractice({ onPassed, practicePassed }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [seenIds, setSeenIds] = useState([]);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const REQUIRED_PASS_SCORE = 3;

  const loadQuestion = useCallback(async () => {
    setLoading(true);
    setSelectedOption(null);
    try {
      const q = await fetchTrafficQuestion(seenIds);
      setCurrentQuestion(q);
      if (q.id) {
        setSeenIds((prev) => [...prev, q.id]);
      }
    } catch (err) {
      console.error('Question load error:', err);
    } finally {
      setLoading(false);
    }
  }, [seenIds]);

  useEffect(() => {
    loadQuestion();
  }, []);

  const handleSelectOption = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    const isCorrect = index === currentQuestion.correctIndex;

    const newHistoryItem = {
      questionId: currentQuestion.id,
      isCorrect,
      question: currentQuestion.question,
    };
    setHistory((prev) => [...prev, newHistoryItem]);

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore >= REQUIRED_PASS_SCORE) {
        onPassed();
      }
    }
  };

  const handleSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && currentQuestion) {
      const text = `${currentQuestion.question}. Option A: ${currentQuestion.options[0]}. Option B: ${currentQuestion.options[1]}. Option C: ${currentQuestion.options[2]}. Option D: ${currentQuestion.options[3]}.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const totalAttempted = history.length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-[#0f2a4a]">
            Step 2: Mandatory Traffic Rules & Road Signs Practice Test
          </h2>
          <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-300 font-mono">
            CMVR Rule 11
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1">
          Under the Central Motor Vehicles Rules (1989), applicants must score a minimum of {REQUIRED_PASS_SCORE} correct answers to qualify for the Learner's License slot.
        </p>
      </div>

      {/* Progress & Qualification Tracker */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Assessment Score
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xl font-extrabold text-[#0f2a4a]">
                {score} / {totalAttempted}
              </span>
              <span className="text-xs text-slate-500">Correctly Answered</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Qualification Status
              </span>
              {score >= REQUIRED_PASS_SCORE || practicePassed ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300">
                  <span>✓</span> Qualified for Step 3
                </span>
              ) : (
                <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-300">
                  {REQUIRED_PASS_SCORE - score} more correct required to pass
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Question Dot Tracker */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
          <span className="text-[11px] text-slate-500 font-medium mr-1">Questions:</span>
          {Array.from({ length: Math.max(5, totalAttempted + (selectedOption !== null ? 1 : 0)) }).map((_, idx) => {
            const h = history[idx];
            const isCurrent = idx === totalAttempted && selectedOption === null;

            return (
              <div
                key={idx}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
                  h
                    ? h.isCorrect
                      ? 'bg-emerald-600 border-emerald-700 text-white'
                      : 'bg-rose-600 border-rose-700 text-white'
                    : isCurrent
                    ? 'border-[#0f2a4a] bg-blue-50 text-[#0f2a4a] ring-2 ring-blue-200'
                    : 'border-slate-200 bg-slate-100 text-slate-400'
                }`}
                title={h ? `Question ${idx + 1}: ${h.isCorrect ? 'Correct' : 'Incorrect'}` : `Question ${idx + 1}`}
              >
                {h ? (h.isCorrect ? '✓' : '✗') : idx + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
        {loading ? (
          <div className="py-10 text-center space-y-2">
            <div className="inline-block w-6 h-6 border-2 border-[#0f2a4a] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-bold text-[#0f2a4a]">Loading road regulation question...</p>
          </div>
        ) : currentQuestion ? (
          <div className="space-y-4">
            {/* Question Top Badge */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0f2a4a] bg-slate-100 border border-slate-300 px-2 py-0.5 rounded uppercase tracking-wider">
                  {currentQuestion.category || 'Road Sign'}
                </span>
                {currentQuestion.lawSection && (
                  <span className="text-[11px] text-slate-500 hidden sm:inline">
                    ({currentQuestion.lawSection})
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSpeech}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold border border-slate-300"
                  title="Read question aloud for accessibility"
                >
                  Listen Audio
                </button>
              </div>
            </div>

            {/* Question Prompt */}
            <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              {currentQuestion.question}
            </p>

            {/* Options List */}
            <div className="space-y-2.5 pt-1">
              {currentQuestion.options?.map((option, idx) => {
                let btnStyle = 'border-slate-300 hover:border-[#0f2a4a] hover:bg-slate-50 text-slate-800 bg-white';
                if (selectedOption !== null) {
                  if (idx === currentQuestion.correctIndex) {
                    btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600';
                  } else if (idx === selectedOption) {
                    btnStyle = 'border-rose-600 bg-rose-50 text-rose-950 ring-1 ring-rose-600';
                  } else {
                    btnStyle = 'border-slate-200 text-slate-400 bg-slate-50 opacity-60';
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
                    <span className="font-bold text-slate-600 bg-slate-100 rounded px-1.5 py-0.5 text-xs">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-normal">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation & Next Question */}
            {selectedOption !== null && (
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div
                  className={`p-3.5 rounded border text-xs sm:text-sm ${
                    selectedOption === currentQuestion.correctIndex
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <p className="font-bold mb-1 flex items-center gap-1.5">
                    {selectedOption === currentQuestion.correctIndex ? (
                      <>
                        <span className="text-emerald-700 font-bold">✓</span>
                        <span>Correct Answer</span>
                      </>
                    ) : (
                      <>
                        <span className="text-rose-700 font-bold">✗</span>
                        <span>Incorrect Response</span>
                      </>
                    )}
                  </p>
                  <p className="leading-relaxed text-slate-700">
                    {currentQuestion.explanation}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={loadQuestion}
                  className="w-full py-3 bg-[#0f2a4a] hover:bg-blue-900 text-white text-xs sm:text-sm font-bold rounded shadow-xs transition-colors"
                >
                  Proceed to Next Practice Question →
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
