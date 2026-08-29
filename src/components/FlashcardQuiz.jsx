import React, { useState, useEffect } from 'react';
import TrafficSignImage from './TrafficSignImage';
import { COMPLETE_TRAFFIC_SIGNS } from '../data/trafficSignCatalog';

/**
 * 60-Second Rapid-Fire Road Sign Speed Flashcard Challenge
 */
export default function FlashcardQuiz({ onClose, lang = 'en' }) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'
  const [isFinished, setIsFinished] = useState(false);
  const [shuffledSigns, setShuffledSigns] = useState([]);

  const isHi = lang === 'hi';

  // Initialize game
  const initGame = () => {
    const signs = [...COMPLETE_TRAFFIC_SIGNS].sort(() => 0.5 - Math.random());
    setShuffledSigns(signs);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setIsFinished(false);
    setFeedback(null);
  };

  useEffect(() => {
    initGame();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isFinished || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished, timeLeft]);

  // Generate 4 randomized options for the current flashcard sign
  useEffect(() => {
    if (shuffledSigns.length === 0 || isFinished) return;
    const currentSign = shuffledSigns[currentIndex % shuffledSigns.length];

    const otherSigns = COMPLETE_TRAFFIC_SIGNS.filter((s) => s.id !== currentSign.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const pool = [currentSign, ...otherSigns].sort(() => 0.5 - Math.random());
    setOptions(pool);
    setFeedback(null);
  }, [currentIndex, shuffledSigns, isFinished]);

  const handleSelectAnswer = (selectedSignId) => {
    if (feedback !== null || isFinished) return;
    const currentSign = shuffledSigns[currentIndex % shuffledSigns.length];

    if (selectedSignId === currentSign.id) {
      setFeedback('correct');
      setScore((s) => s + 1);
      setStreak((st) => {
        const next = st + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      setFeedback('wrong');
      setStreak(0);
    }

    setTimeout(() => {
      setCurrentIndex((idx) => idx + 1);
    }, 350);
  };

  const currentSign = shuffledSigns[currentIndex % shuffledSigns.length];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-300 dark:border-slate-700 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col text-slate-900 dark:text-slate-100">
        {/* Top Header */}
        <div className="bg-[#0b2545] text-white px-5 py-3 flex items-center justify-between border-b border-amber-500">
          <div>
            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
              {isHi ? 'गति परीक्षण • 60 सेकंड चुनौती' : 'Speed Challenge • 60-Second Flashcards'}
            </span>
            <h3 className="text-sm sm:text-base font-bold">
              {isHi ? 'सड़क संकेत त्वरित पहचान अभ्यास' : 'Rapid Road Sign Recognition'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-amber-400 font-bold text-lg px-2"
          >
            ✕
          </button>
        </div>

        {/* Dashboard Strip */}
        <div className="bg-slate-100 dark:bg-slate-800 px-5 py-2.5 flex items-center justify-between text-xs border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="text-base">⏱️</span>
            <span className={`font-mono text-sm ${timeLeft <= 10 ? 'text-rose-600 font-extrabold animate-pulse' : 'text-slate-900 dark:text-slate-100'}`}>
              {timeLeft}s
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <span className="text-[10px] text-slate-500 block">{isHi ? 'अंक' : 'Score'}</span>
              <strong className="text-blue-900 dark:text-blue-300 font-mono text-sm">{score}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">{isHi ? 'लगातार सही' : 'Streak'}</span>
              <strong className="text-amber-600 dark:text-amber-400 font-mono text-sm">🔥 {streak}</strong>
            </div>
          </div>
        </div>

        {/* Main Flashcard Arena */}
        {!isFinished && currentSign ? (
          <div className="p-6 space-y-6 text-center">
            {/* Sign Graphic Frame */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 inline-block shadow-inner mx-auto">
              <TrafficSignImage signId={currentSign.signId} size={110} />
            </div>

            <p className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
              {isHi ? 'यह कौन सा संकेत है? सही विकल्प चुनें:' : 'Identify this Indian road sign:'}
            </p>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {options.map((opt) => {
                const isSelectedAndCorrect = feedback === 'correct' && opt.id === currentSign.id;
                const isSelectedAndWrong = feedback === 'wrong' && opt.id === currentSign.id;

                let btnClass = 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100';
                if (isSelectedAndCorrect) {
                  btnClass = 'bg-emerald-600 text-white border-emerald-700 font-bold';
                } else if (isSelectedAndWrong) {
                  btnClass = 'bg-emerald-600 text-white border-emerald-700'; // highlight correct
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectAnswer(opt.id)}
                    disabled={feedback !== null}
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all text-left shadow-2xs flex items-center justify-between gap-2 ${btnClass}`}
                  >
                    <span>{isHi ? opt.nameHi : opt.name}</span>
                    <span className="text-[10px] opacity-75 shrink-0">({opt.orderNum})</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Game Over Summary */
          <div className="p-8 text-center space-y-4">
            <div className="text-4xl">🏆</div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {isHi ? 'समय समाप्त! आपकी चुनौती पूर्ण' : 'Time Up! Challenge Completed'}
            </h4>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs grid grid-cols-2 gap-3 max-w-xs mx-auto">
              <div>
                <span className="text-slate-500 block">{isHi ? 'कुल सही उत्तर' : 'Total Correct'}</span>
                <strong className="text-xl font-mono text-emerald-600">{score}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">{isHi ? 'सर्वश्रेष्ठ स्ट्रीक' : 'Best Streak'}</span>
                <strong className="text-xl font-mono text-amber-600">🔥 {bestStreak}</strong>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={initGame}
                className="px-6 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs rounded-full shadow-xs transition-colors"
              >
                {isHi ? 'पुनः प्रयास करें' : 'Play Again'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-full"
              >
                {isHi ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
