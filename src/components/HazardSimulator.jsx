import React, { useState } from 'react';

const HAZARD_SCENARIOS = [
  {
    id: 1,
    title: 'Scenario 1: Emergency Ambulance Approaching Behind You',
    titleHi: 'परिदृश्य 1: पीछे से आती आपातकालीन एंबुलेंस',
    situation: 'You are driving at 50 km/h in the middle lane when you hear a loud siren and see an ambulance with flashing emergency lights behind you.',
    situationHi: 'आप 50 किमी/घंटा की गति से चल रहे हैं तभी आपके पीछे सायरन बजाती हुई एक आपातकालीन एंबुलेंस आती है।',
    question: 'What is your statutory driver obligation under Section 194E?',
    questionHi: 'मोटर वाहन अधिनियम धारा 194E के तहत आपका अनिवार्य कर्तव्य क्या है?',
    options: [
      'Accelerate immediately to outrun the ambulance',
      'Signal and smoothly draw your vehicle to the left side to provide free passage',
      'Stop dead in your lane immediately and turn on hazard lights',
      'Sound your horn to alert vehicles in front to clear the way',
    ],
    optionsHi: [
      'एंबुलेंस से तेज गति से आगे भागने के लिए गति बढ़ाएं',
      'इंडिकेटर देकर वाहन को सुरक्षित रूप से बाईं ओर दबाएं और निर्बाध रास्ता दें',
      'अपनी ही लेन में अचानक गाड़ी रोक दें',
      'आगे वाले वाहनों को हटाने के लिए हॉर्न बजाएं',
    ],
    correctIndex: 1,
    explanation: 'Section 194E of the Motor Vehicles Act mandates drawing your vehicle to the left side to provide free passage to emergency response vehicles. Failure to comply carries a fine of ₹10,000 and up to 6 months imprisonment.',
    explanationHi: 'धारा 194E के तहत एंबुलेंस या फायर ब्रिगेड को तत्काल बाईं ओर होकर रास्ता देना अनिवार्य है। उल्लंघन पर ₹10,000 जुर्माना और 6 माह की जेल का प्रावधान है।',
    rule: 'Section 194E MV Act (Emergency Vehicles)',
  },
  {
    id: 2,
    title: 'Scenario 2: Oncoming Vehicle with Blinding High Beams at Night',
    titleHi: 'परिदृश्य 2: रात में सामने से आती तेज हाई-बीम हेडलाइट',
    situation: 'On an unlit two-lane highway, the oncoming vehicle is driving on high beam, completely dazzling your vision.',
    situationHi: 'रात में सामने से आ रहा वाहन अपनी हाई-बीम हेडलाइट जलाए हुए है जिससे आपकी आंखों में चकाचौंध हो रही है।',
    question: 'What is the safest driving procedure to avoid a collision?',
    questionHi: 'सुरक्षित ड्राइविंग हेतु आपको क्या कदम उठाना चाहिए?',
    options: [
      'Turn on your high beams too to blind the other driver',
      'Keep headlights on low beam, reduce speed, and focus your eyes on the white left road margin line',
      'Slam the brakes and stop in the middle of the carriageway',
      'Close your eyes for 2 seconds until the car passes',
    ],
    optionsHi: [
      'आप भी हाई-बीम जलाकर सामने वाले की आंखें चौंधियाएं',
      'अपनी हेडलाइट लो-बीम पर रखें, गति कम करें और सड़क के बाएं किनारे की सफेद पट्टी पर नजर रखें',
      'सड़क के बीच में अचानक ब्रेक लगाकर रुक जाएं',
      'गाड़ी गुजरने तक 2 सेकंड के लिए आंखें बंद कर लें',
    ],
    correctIndex: 1,
    explanation: 'Never retaliate with high beams. Dip your headlights to low beam, decelerate safely, and use the white pavement edge marking on your left to guide your lane position until the vehicle passes.',
    explanationHi: 'कभी भी बदले में हाई-बीम न जलाएं। अपनी लाइट लो-बीम रखें, गति धीमी करें और सड़क के बाईं ओर की सफेद लाइन को देखकर सुरक्षित रूप से गाड़ी निकालें।',
    rule: 'Rule 27 Road Regulations (Headlight Etiquette)',
  },
  {
    id: 3,
    title: 'Scenario 3: Narrow Mountain Ghat Road Priority',
    titleHi: 'परिदृश्य 3: संकरे पहाड़ी घाट मार्ग पर प्राथमिकता',
    situation: 'On a narrow single-lane mountain road, your vehicle traveling downhill meets a loaded truck ascending uphill. The road is too narrow for both to pass simultaneously.',
    situationHi: 'संकरे पहाड़ी मार्ग पर ढलान से नीचे उतरते समय आपका सामना नीचे से ऊपर चढ़ते हुए एक भारी ट्रक से होता है।',
    question: 'Who has statutory right-of-way on steep gradients?',
    questionHi: 'पहाड़ी चढ़ाई पर पहला अधिकार किसका है?',
    options: [
      'The downhill descending vehicle because it is faster',
      'The uphill ascending vehicle has absolute statutory right-of-way; the descending vehicle must yield and reverse if necessary',
      'Whichever vehicle honks first gets priority',
      'Both vehicles must stop and wait for traffic police',
    ],
    optionsHi: [
      'ढलान से नीचे उतरने वाले वाहन का क्योंकि वह तेज है',
      'चढ़ाई चढ़ने वाले वाहन का पूर्ण अधिकार है; नीचे उतरने वाले वाहन को रुककर रास्ता देना होगा',
      'जो पहले हॉर्न बजाए उसे रास्ता मिलेगा',
      'दोनों गाड़ियां रोककर पुलिस का इंतजार करें',
    ],
    correctIndex: 1,
    explanation: 'On hill roads and ghats, ascending vehicles have statutory priority because stopping and restarting a loaded vehicle uphill is hazardous. Descending vehicles must stop or reverse to an available turnout.',
    explanationHi: 'पहाड़ों पर चढ़ाई चढ़ने वाले (UPHILL) वाहन को हमेशा पहला अधिकार होता है क्योंकि चढ़ाई पर भारी वाहन को रोकना व उठाना खतरनाक होता है। ढलान वाले वाहन को रास्ता देना होगा।',
    rule: 'Rule 18 CMVR (Mountain & Gradient Driving)',
  },
  {
    id: 4,
    title: 'Scenario 4: Waterlogged Road Aquaplaning Hazard',
    titleHi: 'परिदृश्य 4: जलभराव वाली सड़क पर फिसलन (एक्वाप्लानिंग)',
    situation: 'During heavy monsoon rains, your car hits a deep standing sheet of water at 60 km/h and your steering wheel suddenly feels loose and disconnected.',
    situationHi: 'भारी बारिश में 60 किमी/घंटा की गति से पानी भरे गड्ढे में जाने पर गाड़ी का स्टीयरिंग अचानक हल्का और बेअसर महसूस होता है।',
    question: 'How should you regain vehicle control during aquaplaning?',
    questionHi: 'एक्वाप्लानिंग की स्थिति में वाहन पर नियंत्रण कैसे प्राप्त करें?',
    options: [
      'Slam the brakes as hard as possible',
      'Ease off the accelerator gently, hold the steering wheel straight, and avoid abrupt braking until tire tread reconnects with asphalt',
      'Turn the steering wheel rapidly left and right to shake off water',
      'Pull the mechanical handbrake immediately',
    ],
    optionsHi: [
      'पूरी ताकत से ब्रेक पेडल दबाएं',
      'एक्सीलेटर से धीरे-धीरे पैर हटाएं, स्टीयरिंग सीधा रखें और ब्रेक न लगाएं जब तक टायर सड़क पर पकड़ न बना लें',
      'पानी हटाने हेतु स्टीयरिंग तेजी से दाएं-बाएं घुमाएं',
      'चलती गाड़ी में हैंडब्रेक खींच दें',
    ],
    correctIndex: 1,
    explanation: 'Slamming the brakes during aquaplaning induces an uncontrollable vehicle skid. Ease off the gas, do not brake abruptly, and keep the steering pointed straight ahead until tires push through the water film.',
    explanationHi: 'पानी पर फिसलते समय अचानक ब्रेक लगाने से गाड़ी पलट सकती है। एक्सीलेटर से धीरे से पैर हटाएं और स्टीयरिंग सीधा रखें।',
    rule: 'Monsoon Road Safety Protocol',
  },
];

export default function HazardSimulator({ onClose, lang = 'en' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const isHi = lang === 'hi';
  const scenario = HAZARD_SCENARIOS[currentIndex];

  const handleSelectOption = (idx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    if (idx === scenario.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < HAZARD_SCENARIOS.length) {
      setCurrentIndex((idx) => idx + 1);
      setSelectedOpt(null);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-300 dark:border-slate-700 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto flex flex-col text-slate-900 dark:text-slate-100">
        {/* Header */}
        <div className="bg-[#0b2545] text-white px-5 py-3.5 flex items-center justify-between border-b border-amber-500 rounded-t-2xl">
          <div>
            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
              {isHi ? 'इंटरैक्टिव सिम्युलेटर • सड़क जोखिम निर्णय' : 'Interactive Simulator • Hazard Perception'}
            </span>
            <h3 className="text-sm sm:text-base font-bold">
              {isHi ? 'वास्तविक भारतीय सड़क सुरक्षा परिदृश्य' : 'Real-World Indian Road Scenarios'}
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

        {/* Content Area */}
        {!completed ? (
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-200 dark:border-slate-700">
              <span className="font-bold text-blue-900 dark:text-blue-300">
                {isHi ? `परिदृश्य ${currentIndex + 1} / ${HAZARD_SCENARIOS.length}` : `Scenario ${currentIndex + 1} of ${HAZARD_SCENARIOS.length}`}
              </span>
              <span className="font-mono">{scenario.rule}</span>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-amber-950 dark:text-amber-200 space-y-1">
              <h4 className="font-bold text-amber-900 dark:text-amber-300">
                {isHi ? scenario.titleHi : scenario.title}
              </h4>
              <p className="leading-relaxed">
                {isHi ? scenario.situationHi : scenario.situation}
              </p>
            </div>

            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
              {isHi ? scenario.questionHi : scenario.question}
            </h4>

            {/* Options Stream */}
            <div className="space-y-2.5">
              {(isHi ? scenario.optionsHi : scenario.options).map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const isCorrect = idx === scenario.correctIndex;
                const answered = selectedOpt !== null;

                let optClass = 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';
                if (answered) {
                  if (isCorrect) {
                    optClass = 'bg-emerald-600 text-white border-emerald-700 font-bold';
                  } else if (isSelected) {
                    optClass = 'bg-rose-600 text-white border-rose-700';
                  } else {
                    optClass = 'opacity-50 border-slate-200 dark:border-slate-700';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={answered}
                    className={`w-full p-3 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-start gap-2.5 ${optClass}`}
                  >
                    <span className="w-5 h-5 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Statutory Explanation */}
            {selectedOpt !== null && (
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {isHi ? 'वैधानिक सुरक्षा स्पष्टीकरण' : 'Statutory Safety Explanation'}
                </span>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {isHi ? scenario.explanationHi : scenario.explanation}
                </p>
              </div>
            )}

            {/* Next Button */}
            {selectedOpt !== null && (
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm rounded-full shadow-xs transition-colors"
                >
                  {currentIndex + 1 < HAZARD_SCENARIOS.length ? (isHi ? 'अगला परिदृश्य →' : 'Next Scenario →') : (isHi ? 'परिणाम देखें →' : 'View Results →')}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Results */
          <div className="p-8 text-center space-y-4">
            <div className="text-4xl">🛡️</div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {isHi ? 'जोखिम निर्णय सिमुलेशन पूर्ण' : 'Hazard Perception Assessment Complete'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {isHi
                ? `आपने ${HAZARD_SCENARIOS.length} में से ${score} परिदृश्यों में सही निर्णय लिया।`
                : `You made the correct defensive driving decision in ${score} out of ${HAZARD_SCENARIOS.length} hazard situations.`}
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setCurrentIndex(0);
                  setSelectedOpt(null);
                  setScore(0);
                  setCompleted(false);
                }}
                className="px-6 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs rounded-full shadow-xs transition-colors"
              >
                {isHi ? 'पुनः प्रयास करें' : 'Retry Simulator'}
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
