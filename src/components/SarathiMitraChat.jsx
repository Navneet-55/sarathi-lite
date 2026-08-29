import React, { useState, useRef, useEffect } from 'react';

const FAQ_KNOWLEDGE_BASE = [
  {
    keywords: ['alone', 'drive alone', 'solo', 'single', 'accompanied', 'trainer'],
    answerEn: "No, under Rule 3 of CMVR 1989, a Learner's License holder CANNOT drive alone. You must always be accompanied by a person holding a valid permanent Driving License for that category, and an 'L' board must be displayed on front and rear.",
    answerHi: "नहीं, केंद्रीय मोटर वाहन नियमावली नियम 3 के अनुसार, लर्नर लाइसेंस धारक अकेले वाहन नहीं चला सकता। आपके साथ उस वाहन श्रेणी का स्थायी ड्राइविंग लाइसेंस धारक व्यक्ति बैठा होना अनिवार्य है और वाहन के आगे व पीछे 'L' बोर्ड लगाना होगा।",
    answerKn: "ಇಲ್ಲ, ಸಿಎಂವಿಆರ್ ನಿಯಮ 3 ರ ಪ್ರಕಾರ, ಲರ್ನರ್ಸ್ ಲೈಸೆನ್ಸ್ ಹೊಂದಿರುವವರು ಒಂಟಿಯಾಗಿ ವಾಹನ ಚಲಾಯಿಸುವಂತಿಲ್ಲ. ನಿಮ್ಮೊಂದಿಗೆ ಶಾಶ್ವತ ಡ್ರೈವಿಂಗ್ ಲೈಸೆನ್ಸ್ ಹೊಂದಿರುವವರು ಇರಬೇಕು ಮತ್ತು 'L' ಬೋರ್ಡ್ ಅಳವಡಿಸಿರಬೇಕು.",
    answerMr: "नाही, नियमांनुसार लर्नर लायसन्स धारक एकटा गाडी चालवू शकत नाही. सोबत कायमस्वरूपी ड्रायव्हिंग लायसन्स धारक असणे अनिवार्य आहे आणि वाहनावर 'L' बोर्ड लावणे आवश्यक आहे.",
    answerTa: "இல்லை, விதி 3 இன் படி, பழகுநர் உரிமம் வைத்திருப்பவர் தனியாக வாகனம் ஓட்ட முடியாது. உங்களுடன் நிரந்தர ஓட்டுநர் உரிமம் பெற்ற ஒருவர் இருக்க வேண்டும் மற்றும் வாகனத்தில் 'L' பலகை பொருத்தப்பட்டிருக்க வேண்டும்.",
    answerTe: "లేదు, నిబంధనల ప్రకారం లెర్నర్స్ లైసెన్స్ ఉన్నవారు ఒంటరిగా వాహనం నడపకూడదు. మీతో పాటు శాశ్వత లైసెన్స్ ఉన్న వ్యక్తి ఉండాలి మరియు వాహనానికి 'L' బోర్డు అమర్చాలి.",
  },
  {
    keywords: ['validity', 'expire', 'duration', 'valid', 'months', 'period'],
    answerEn: "A Learner's License is valid for 6 months (180 days) across all of India from the date of issue. You can apply for a permanent Driving License after 30 days of holding your LL.",
    answerHi: "लर्नर लाइसेंस जारी होने की तिथि से पूरे भारत में 6 महीने (180 दिन) के लिए वैध होता है। आप 30 दिन पूरे होने के बाद स्थायी ड्राइविंग लाइसेंस (Permanent DL) के लिए आवेदन कर सकते हैं।",
    answerKn: "ಲರ್ನರ್ಸ್ ಲೈಸೆನ್ಸ್ ನೀಡಿದ ದಿನಾಂಕದಿಂದ 6 ತಿಂಗಳವರೆಗೆ (180 ದಿನಗಳು) ಮಾನ್ಯವಾಗಿರುತ್ತದೆ. 30 ದಿನಗಳ ನಂತರ ನೀವು ಶಾಶ್ವತ ಪರವಾನಗಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು.",
    answerMr: "लर्नर लायसन्स जारी केल्याच्या तारखेपासून ६ महिन्यांसाठी (१८० दिवस) वैध असते. ३० दिवसांनंतर आपण पक्क्या लायसन्ससाठी अर्ज करू शकता.",
    answerTa: "பழகுநர் உரிமம் வழங்கப்பட்ட தேதியிலிருந்து 6 மாதங்களுக்கு (180 நாட்கள்) செல்லுபடியாகும். 30 நாட்களுக்குப் பிறகு நீங்கள் நிரந்தர உரிமத்திற்கு விண்ணப்பிக்கலாம்.",
    answerTe: "లెర్నర్స్ లైసెన్స్ జారీ చేసిన తేదీ నుండి 6 నెలల పాటు (180 రోజులు) చెల్లుబాటు అవుతుంది. 30 రోజుల తర్వాత మీరు శాశ్వత డ్రైవింగ్ లైసెన్స్ కోసం దరఖాస్తు చేసుకోవచ్చు.",
  },
  {
    keywords: ['documents', 'carry', 'test day', 'rto documents', 'bring', 'proof'],
    answerEn: "On test day at the RTO, carry: 1. Printed Form 2 Acknowledgment Slip, 2. Fee Challan Payment Receipt, 3. Original Aadhaar Card or Proof of Identity/Address, and 4. Form 1 Self-Declaration.",
    answerHi: "आरटीओ परीक्षा के दिन साथ ले जाएं: 1. प्रपत्र 2 पावती पर्ची (Form 2 Slip), 2. शुल्क चालान भुगतान रसीद, 3. मूल आधार कार्ड (Original Aadhaar), 4. फॉर्म 1 स्व-घोषणा पत्र।",
    answerKn: "ಆರ್‌ಟಿಒ ಪರೀಕ್ಷಾ ದಿನದಂದು ತನ್ನಿ: 1. ನಮೂನೆ 2 ರಸೀದಿ, 2. ಶುಲ್ಕ ಪಾವತಿ ರಸೀದಿ, 3. ಮೂಲ ಆಧಾರ್ ಕಾರ್ಡ್, ಮತ್ತು 4. ಸ್ವಯಂ ಘೋಷಣಾ ಪತ್ರ.",
    answerMr: "आरटीओ परीक्षेच्या दिवशी सोबत आणा: १. फॉर्म २ पावती, २. शुल्क चलन पावती, ३. मूळ आधार कार्ड, आणि ४. स्वयंघोषणा पत्र.",
    answerTa: "ஆர்டிஓ தேர்வு நாளில் கொண்டு வர வேண்டியவை: 1. படிவம் 2 ஒப்புகைச் சீட்டு, 2. கட்டண ரசீது, 3. அசல் ஆதார் அட்டை, மற்றும் 4. சுய அறிவிப்பு படிவம்.",
    answerTe: "ఆర్టీఓ పరీక్ష రోజు వెంట తీసుకెళ్లవలసినవి: 1. ఫారమ్ 2 రసీదు, 2. ఫీజు చెల్లింపు రసీదు, 3. అసలు ఆధార్ కార్డు, మరియు 4. స్వీయ ధృవీకరణ పత్రం.",
  },
  {
    keywords: ['red light', 'fine', 'penalty', 'signal', 'jumping'],
    answerEn: "Jumping a red traffic light attracts a statutory fine of ₹1,000 to ₹5,000 and possible license suspension for 3 months under Section 184 of the Motor Vehicles Act (Dangerous Driving).",
    answerHi: "रेड लाइट जंप करने पर मोटर वाहन अधिनियम की धारा 184 के तहत ₹1,000 से ₹5,000 का जुर्माना और 3 महीने के लिए ड्राइविंग लाइसेंस निलंबन हो सकता है।",
    answerKn: "ಕೆಂಪು ದೀಪ ಉಲ್ಲಂಘನೆಗೆ ಮೋಟಾರು ವಾಹನ ಕಾಯ್ದೆಯಡಿ ₹1,000 ರಿಂದ ₹5,000 ದಂಡ ಮತ್ತು 3 ತಿಂಗಳವರೆಗೆ ಪರವಾನಗಿ ಅಮಾನತುಗೊಳಿಸಬಹುದು.",
    answerMr: "रेड सिग्नल तोडल्यास मोटार वाहन कायद्यानुसार ₹१,००० ते ₹५,००० दंड आणि ३ महिन्यांसाठी लायसन्स निलंबन होऊ शकते.",
    answerTa: "சிவப்பு சிக்னலை மீறினால் மோட்டார் வாகனச் சட்டத்தின் கீழ் ₹1,000 முதல் ₹5,000 வரை அபராதம் மற்றும் 3 மாதங்கள் உரிமம் ரத்து செய்யப்படலாம்.",
    answerTe: "రెడ్ సిగ్నల్ జంప్ చేస్తే మోటారు వాహనాల చట్టం ప్రకారం ₹1,000 నుండి ₹5,000 జరిమానా మరియు 3 నెలల పాటు లైసెన్స్ సస్పెండ్ చేయవచ్చు.",
  },
  {
    keywords: ['helmet', 'helmet fine', 'seatbelt', 'belt'],
    answerEn: "Riding without a BIS-standard helmet incurs a ₹1,000 fine and 3-month DL disqualification (Section 194D). Driving without a seatbelt carries a fine of ₹1,000 (Section 194B).",
    answerHi: "बिना मानक हेलमेट के दोपहिया चलाने पर ₹1,000 जुर्माना और 3 महीने हेतु लाइसेंस अयोग्य (धारा 194D) है। बिना सीटबेल्ट कार चलाने पर ₹1,000 जुर्माना (धारा 194B) है।",
    answerKn: "ಹೆಲ್ಮೆಟ್ ಇಲ್ಲದೆ ವಾಹನ ಚಲಾಯಿಸಿದರೆ ₹1,000 ದಂಡ ಮತ್ತು 3 ತಿಂಗಳು ಅಮಾನತು. ಸೀಟ್‌ಬೆಲ್ಟ್ ಧರಿಸದಿದ್ದರೆ ₹1,000 ದಂಡ.",
    answerMr: "हेल्मेट नसताना गाडी चालवल्यास ₹१,००० दंड आणि ३ महिने बंदी. सीटबेल्ट न लावल्यास ₹१,००० दंड होतो.",
    answerTa: "ஹெல்மெட் அணியாமல் சென்றால் ₹1,000 அபராதம் மற்றும் 3 மாத இடைநீக்கம். சீட்பெல்ட் அணியாவிட்டால் ₹1,000 அபராதம்.",
    answerTe: "హెల్మెట్ లేకుండా డ్రైవ్ చేస్తే ₹1,000 జరిమానా మరియు 3 నెలల సస్పెన్షన్. సీట్‌బెల్ట్ లేకపోతే ₹1,000 జరిమానా.",
  },
  {
    keywords: ['drunk', 'alcohol', 'drinking', 'blood alcohol'],
    answerEn: "Drunk driving (>30mg alcohol per 100ml blood) carries a fine up to ₹10,000 and/or 6 months imprisonment for 1st offense under Section 185 MV Act.",
    answerHi: "शराब पीकर वाहन चलाने पर धारा 185 के तहत प्रथम अपराध पर ₹10,000 तक का जुर्माना और/या 6 महीने का कारावास हो सकता है।",
    answerKn: "ಮದ್ಯಪಾನ ಮಾಡಿ ವಾಹನ ಚಲಾಯಿಸಿದರೆ ₹10,000 ದಂಡ ಮತ್ತು/ಅಥವಾ 6 ತಿಂಗಳ ಜೈಲು ಶಿಕ್ಷೆ ವಿಧಿಸಲಾಗುತ್ತದೆ.",
    answerMr: "दारू पिऊन वाहन चालवल्यास ₹१०,००० दंड आणि/किंवा ६ महिने कारावास होऊ शकतो.",
    answerTa: "மது அருந்திவிட்டு வாகனம் ஓட்டினால் ₹10,000 வரை அபராதம் மற்றும்/அல்லது 6 மாத சிறைத்தண்டனை விதிக்கப்படும்.",
    answerTe: "మద్యం సేవించి డ్రైవింగ్ చేస్తే ₹10,000 వరకు జరిమానా మరియు/లేదా 6 నెలల జైలు శిక్ష విధించబడుతుంది.",
  },
];

export default function SarathiMitraChat({ lang = 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text:
        lang === 'hi'
          ? 'नमस्ते! मैं सारथी मित्र (AI सहायक) हूँ। ड्राइविंग लाइसेंस, यातायात नियम, चालान या आरटीओ प्रक्रिया के बारे में मुझसे पूछें।'
          : lang === 'kn'
          ? 'ನಮಸ್ಕಾರ! ನಾನು ಸಾರಥಿ ಮಿತ್ರ (AI ಸಹಾಯಕ). ಚಾಲನಾ ಪರವಾನಗಿ, ಸಂಚಾರ ನಿಯಮಗಳು ಅಥವಾ ಆರ್‌ಟಿಒ ಬಗ್ಗೆ ನನ್ನನ್ನು ಕೇಳಿ.'
          : lang === 'mr'
          ? 'नमस्कार! मी सारथी मित्र (AI सहाय्यक) आहे. ड्रायव्हिंग लायसन्स, वाहतूक नियम किंवा आरटीओबद्दल मला विचारा.'
          : lang === 'ta'
          ? 'வணக்கம்! நான் சாரதி மித்ரா (AI உதவியாளர்). ஓட்டுநர் உரிமம், போக்குவரத்து விதிகள் பற்றி என்னிடம் கேளுங்கள்.'
          : lang === 'te'
          ? 'నమస్కారం! నేను సారథి మిత్ర (AI అసిస్టెంట్). డ్రైవింగ్ లైసెన్స్ లేదా ఆర్టీఓ నిబంధనల గురించి నన్ను అడగండి.'
          : 'Namaste! I am Sarathi Mitra, your public AI assistant for Learner Licensing, Motor Vehicles Act rules, RTO procedures, and traffic penalties. How can I help you?',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef(null);

  const isHi = lang === 'hi';

  const quickQuestions = [
    {
      label: isHi ? 'क्या LL पर अकेले गाड़ी चला सकते हैं?' : 'Can I drive alone on a Learner License?',
      query: 'drive alone on learner license',
    },
    {
      label: isHi ? 'लर्नर लाइसेंस कितने दिन वैध है?' : 'What is the validity of Learner License?',
      query: 'validity of learner license',
    },
    {
      label: isHi ? 'परीक्षा के दिन क्या ले जाना होगा?' : 'What documents to carry on test day?',
      query: 'documents carry test day',
    },
    {
      label: isHi ? 'रेड लाइट जंप करने पर कितना जुर्माना है?' : 'What is the fine for jumping a red light?',
      query: 'red light jumping fine',
    },
  ];

  const handleSend = (userText) => {
    const text = userText || inputVal;
    if (!text.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text }];
    setMessages(newMsgs);
    setInputVal('');

    // Query Knowledge Base
    const lower = text.toLowerCase();
    let bestMatch = FAQ_KNOWLEDGE_BASE.find((faq) =>
      faq.keywords.some((k) => lower.includes(k))
    );

    setTimeout(() => {
      let botResponse = '';
      if (bestMatch) {
        if (lang === 'hi') botResponse = bestMatch.answerHi;
        else if (lang === 'kn') botResponse = bestMatch.answerKn;
        else if (lang === 'mr') botResponse = bestMatch.answerMr;
        else if (lang === 'ta') botResponse = bestMatch.answerTa;
        else if (lang === 'te') botResponse = bestMatch.answerTe;
        else botResponse = bestMatch.answerEn;
      } else {
        botResponse =
          lang === 'hi'
            ? 'सारथी पोर्टल पर यह जानकारी उपलब्ध है। कृपया यातायात मार्गदर्शिका (चरण 2) देखें अथवा निकटतम आरटीओ कार्यालय से संपर्क करें।'
            : 'According to MoRTH guidelines and the Motor Vehicles Act 1988, please refer to the Step 2 Academy curriculum or contact your jurisdiction RTO.';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 400);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-4 z-40 no-print font-sans">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2 border-2 border-amber-400 font-bold text-xs sm:text-sm cursor-pointer"
          title="Open Sarathi Mitra Assistant"
        >
          <span className="text-lg">🤖</span>
          <span>{isHi ? 'सारथी मित्र (AI सहायक)' : 'Sarathi Mitra AI'}</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}

      {/* Chat Drawer Window */}
      {isOpen && (
        <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-300 dark:border-slate-700 shadow-2xl w-80 sm:w-96 flex flex-col h-[460px] overflow-hidden text-slate-900 dark:text-slate-100">
          {/* Header */}
          <div className="bg-[#0b2545] text-white px-4 py-3 flex items-center justify-between border-b border-amber-500">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm">
                🤖
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold leading-tight">
                  {isHi ? 'सारथी मित्र AI' : 'Sarathi Mitra AI'}
                </h4>
                <p className="text-[9px] text-amber-300">
                  {isHi ? 'आधिकारिक सड़क सुरक्षा व आरटीओ सहायक' : 'MoRTH Road Safety & RTO Advisor'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-amber-400 font-bold text-base px-1.5"
            >
              ✕
            </button>
          </div>

          {/* Quick Prompt Carousel */}
          <div className="bg-slate-100 dark:bg-slate-800 p-2 border-b border-slate-200 dark:border-slate-700 flex gap-1.5 overflow-x-auto no-scrollbar text-[10px]">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q.query)}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 shrink-0 font-medium border border-slate-200 dark:border-slate-600 transition-colors"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-3.5 space-y-3 overflow-y-auto text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-800 text-white rounded-br-none shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-750 text-slate-900 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex gap-1.5"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={isHi ? 'प्रश्न पूछें (उदा. सीटबेल्ट जुर्माना)...' : 'Ask any RTO or rule question...'}
              className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-full text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-700"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs rounded-full shadow-xs transition-colors"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
