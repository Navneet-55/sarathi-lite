import React, { useState, useEffect } from 'react';
import { fetchTrafficQuestion } from '../services/apiService';

/**
 * Step 2: Traffic Rules & Signs Practice Quiz
 */
export default function StepTrafficPractice({ onPassed }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [seenIds, setSeenIds] = useState([]);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const PASSING_SCORE = 3;

  const loadQuestion = async () => {
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
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const handleSelectOption = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    const isCorrect = index === currentQuestion.correctIndex;
    setAttempted((prev) => prev + 1);
    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore >= PASSING_SCORE) {
        onPassed();
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#0f2a4a]">Step 2: Traffic Rules & Mandatory Road Sign Practice</h2>
        <p className="text-xs text-slate-600 mt-1">
          Prepare for your Learner's License test by practicing mandatory Indian Motor Vehicle Act traffic signs.
        </p>
      </div>

      {/* Progress & Scoreboard Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 flex items-center justify-between shadow-xs">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Test Progress</span>
          <p className="text-sm font-bold text-[#0f2a4a]">
            Score: {score} / {attempted}
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Passing Requirement</span>
          <p className="text-xs font-bold text-emerald-700">
            {score >= PASSING_SCORE ? '✓ Qualification Criteria Met' : `Need ${PASSING_SCORE} correct answers`}
          </p>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
        {loading ? (
          <div className="py-12 text-center">
            <div className="inline-block w-6 h-6 border-2 border-[#0f2a4a] border-t-transparent rounded-full animate-spin mb-2" />
            <p className="text-xs text-slate-600 font-medium">Fetching question from question bank...</p>
          </div>
        ) : currentQuestion ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-bold text-[#0f2a4a] uppercase tracking-wide">
                Category: {currentQuestion.category || 'Road Sign'}
              </span>
              <span className="text-3xl" role="img" aria-label="sign icon">
                {currentQuestion.signEmoji || '🛑'}
              </span>
            </div>

            <p className="text-sm sm:text-base font-bold text-slate-800">
              {currentQuestion.question}
            </p>

            <div className="space-y-2">
              {currentQuestion.options?.map((option, idx) => {
                let btnStyle = 'border-slate-300 hover:bg-slate-50 text-slate-800';
                if (selectedOption !== null) {
                  if (idx === currentQuestion.correctIndex) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                  } else if (idx === selectedOption) {
                    btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                  } else {
                    btnStyle = 'border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left p-3 text-xs sm:text-sm rounded border transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="font-bold text-slate-500">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className="space-y-3 pt-2">
                <div
                  className={`p-3 rounded border text-xs sm:text-sm ${
                    selectedOption === currentQuestion.correctIndex
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}
                >
                  <p className="font-bold mb-1">
                    {selectedOption === currentQuestion.correctIndex
                      ? '✓ Correct Answer'
                      : '✗ Incorrect'}
                  </p>
                  <p>{currentQuestion.explanation}</p>
                </div>

                <button
                  type="button"
                  onClick={loadQuestion}
                  className="w-full py-2.5 bg-[#0f2a4a] text-white text-xs sm:text-sm font-bold rounded hover:bg-blue-900 transition-colors"
                >
                  Next Question →
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
