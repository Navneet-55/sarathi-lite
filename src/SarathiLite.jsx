import { useState, useRef } from 'react'

// mock fixtures for instant demo rendering
const DEMO_PROFILE = {
  name: 'Rahul Sharma',
  aadhaar: 'XXXX-XXXX-4521',
  mobile: '+91 98765 43210',
  dob: '15/03/1998',
  address: 'HSR Layout, Bengaluru, Karnataka 560102',
  applicationId: 'KA-2026-LL-88421',
  rto: 'RTO Bengaluru South (KA-05)',
}

const MOCK_SLOTS = [
  { id: 's1', date: '2026-09-02', time: '09:30 AM', rto: 'RTO Bengaluru South', seats: 12 },
  { id: 's2', date: '2026-09-03', time: '11:00 AM', rto: 'RTO Bengaluru South', seats: 8 },
  { id: 's3', date: '2026-09-04', time: '02:30 PM', rto: 'RTO Bengaluru East', seats: 15 },
  { id: 's4', date: '2026-09-05', time: '10:00 AM', rto: 'RTO Bengaluru South', seats: 5 },
  { id: 's5', date: '2026-09-06', time: '03:00 PM', rto: 'RTO Bengaluru West', seats: 20 },
]

const STEPS = [
  { id: 'profile', label: 'Profile', icon: '👤' },
  { id: 'documents', label: 'Documents', icon: '📄' },
  { id: 'pay', label: 'Pay Fee', icon: '₹' },
  { id: 'signs', label: 'Sign Test', icon: '🚦' },
  { id: 'slot', label: 'Book Slot', icon: '📅' },
  { id: 'done', label: 'Done', icon: '✅' },
]

const MOCK_FEE = {
  amount: 150,
  label: 'RTO Learner License Fee',
  method: 'UPI (Mock)',
}

const TRAFFIC_SIGNS = ['🛑', '⚠️', '🚫', '⛔', '🔵', '🟢', '↩️', '🚶']

async function callApi(endpoint, body) {
  const res = await fetch(`/api/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `API error ${res.status}`)
  }
  return res.json()
}

export default function SarathiLite() {
  const [screen, setScreen] = useState('landing')
  const [step, setStep] = useState('profile')
  const [profile, setProfile] = useState(null)
  const [ocrResult, setOcrResult] = useState(null)
  const [ocrLoading, setOcrLoading] = useState(false)
  const [docPreview, setDocPreview] = useState(null)
  const [quiz, setQuiz] = useState(null)
  const [quizLoading, setQuizLoading] = useState(false)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizTotal, setQuizTotal] = useState(0)
  const [slotRecs, setSlotRecs] = useState(null)
  const [slotLoading, setSlotLoading] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [booked, setBooked] = useState(false)
  const [paid, setPaid] = useState(false)
  const [paying, setPaying] = useState(false)
  const [paymentRef, setPaymentRef] = useState(null)
  const fileRef = useRef(null)

  const resetJourney = () => {
    setScreen('landing')
    setStep('profile')
    setBooked(false)
    setPaid(false)
    setPaying(false)
    setPaymentRef(null)
  }

  const handleDemoLogin = () => {
    setProfile({ ...DEMO_PROFILE })
    setScreen('app')
    setStep('profile')
  }

  const handleMockPay = () => {
    if (paying || paid) return
    setPaying(true)
    // Mock UPI capture for quick demo testing
    setTimeout(() => {
      setPaid(true)
      setPaying(false)
      setPaymentRef(`MOCK-UPI-${Date.now().toString().slice(-8)}`)
    }, 900)
  }

  const handleDocUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async () => {
      const base64 = reader.result
      setDocPreview(base64)
      setOcrLoading(true)
      setOcrResult(null)

      try {
        const data = await callApi('ocr', {
          image: base64,
          docType: 'aadhaar',
        })
        setOcrResult(data)
      } catch {
        // fallback mock when API key missing
        setOcrResult({
          name: DEMO_PROFILE.name,
          dob: DEMO_PROFILE.dob,
          address: DEMO_PROFILE.address,
          docNumber: 'XXXX-XXXX-4521',
          confidence: 0.94,
          verified: true,
          note: 'Mock OCR — add OPENAI_API_KEY for live parsing',
        })
      } finally {
        setOcrLoading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const loadQuiz = async () => {
    setQuizLoading(true)
    setQuizAnswer(null)
    setQuiz(null)
    try {
      const data = await callApi('traffic-sign', { count: 1 })
      setQuiz(data.questions?.[0] || data)
    } catch {
      const signs = ['Stop', 'No Entry', 'U-Turn Prohibited', 'Pedestrian Crossing']
      const q = signs[Math.floor(Math.random() * signs.length)]
      setQuiz({
        question: `What does a red octagonal sign indicate?`,
        options: ['Stop', 'Yield', 'No Parking', 'Speed Limit'],
        correctIndex: 0,
        explanation: 'Red octagon = STOP. Must halt completely.',
        signEmoji: '🛑',
        note: 'Mock quiz — add OPENAI_API_KEY for live generation',
      })
    } finally {
      setQuizLoading(false)
    }
  }

  const handleQuizAnswer = (idx) => {
    if (quizAnswer !== null) return
    setQuizAnswer(idx)
    const correct = idx === (quiz.correctIndex ?? 0)
    setQuizTotal((t) => t + 1)
    if (correct) setQuizScore((s) => s + 1)
  }

  const loadSlotRecs = async () => {
    setSlotLoading(true)
    try {
      const data = await callApi('slots', {
        slots: MOCK_SLOTS,
        profile: profile || DEMO_PROFILE,
        preference: 'morning',
      })
      setSlotRecs(data)
    } catch {
      setSlotRecs({
        recommendations: [
          { slotId: 's1', score: 95, reason: 'Nearest RTO, morning slot, good availability' },
          { slotId: 's4', score: 88, reason: 'Same RTO, mid-morning, fewer applicants' },
          { slotId: 's2', score: 82, reason: 'Next-day option with 8 seats left' },
        ],
        note: 'Mock recommendations — add OPENAI_API_KEY for live AI picks',
      })
    } finally {
      setSlotLoading(false)
    }
  }

  const goNext = () => {
    const idx = STEPS.findIndex((s) => s.id === step)
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].id)
  }

  const stepIndex = STEPS.findIndex((s) => s.id === step)

  if (screen === 'landing') {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <header className="flex justify-between items-center px-5 py-4 bg-[#0f2a4a] text-white">
          <h1 className="text-xl font-bold">Sarathi Parivahan - Learner's License Portal (Lite)</h1>
          <div className="flex gap-2 text-sm">
            <button className="underline" aria-label="Decrease text size">A-</button>
            <button className="underline" aria-label="Normal text size">A</button>
            <button className="underline" aria-label="Increase text size">A+</button>
          </div>
        </header>

        <main className="px-5 pb-10 max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-[#0f2a4a] leading-tight">Sarathi Parivahan</h1>
          <p className="mt-2 text-gray-600 text-lg">Learner's License Portal (Lite)</p>
          <button
            onClick={handleDemoLogin}
            className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl"
          >
            ⚡ 1-Click Demo Login
          </button>
          <p className="mt-3 text-center text-xs text-gray-400">
            Mock profile · No real Aadhaar or OTP needed
          </p>
        </main>
      </div>

          <div className="mt-8 space-y-3">
            {[
              { icon: '📸', title: 'AI Document Scan', desc: 'Upload Aadhaar — fields auto-filled' },
              { icon: '₹', title: '1-Click Mock Pay', desc: '₹150 RTO fee — no real money' },
              { icon: '🚦', title: 'Traffic Sign Tutor', desc: 'Learn signs with GPT-powered quiz' },
              { icon: '📅', title: 'Smart Slot Picks', desc: 'AI recommends best RTO appointment' },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <p className="font-semibold text-slate-800">{f.title}</p>
                  <p className="text-sm text-slate-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleDemoLogin}
            className="mt-8 w-full py-4 bg-gradient-to-r from-saffron to-orange-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-orange-200 active:scale-[0.98] transition-transform"
          >
            ⚡ 1-Click Demo Login
          </button>
          <p className="mt-3 text-center text-xs text-slate-400">
            Mock profile · No real Aadhaar or OTP needed
          </p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto">
      {/* top bar */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Application</p>
            <p className="font-semibold text-sm">{profile?.applicationId}</p>
          </div>
          <button
            onClick={resetJourney}
            className="text-xs text-slate-400 underline"
          >
            Logout
          </button>
        </div>

        {/* progress */}
        <div className="mt-3 text-sm text-[#0f2a4a]">
          Step 1: Application & OCR → Step 2: Traffic Rules Practice → Step 3: Fee Payment → Step 4: Slot Booking
        </div>
        <p className="mt-1.5 text-xs text-slate-500">
          Step {stepIndex + 1}/{STEPS.length} — {STEPS[stepIndex].label}
        </p>
      </header>

      <main className="flex-1 px-4 py-5 pb-24 overflow-y-auto">
        {/* PROFILE */}
        {step === 'profile' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Your Profile</h2>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-3">
              {[
                ['Name', profile?.name],
                ['Mobile', profile?.mobile],
                ['Date of Birth', profile?.dob],
                ['Aadhaar', profile?.aadhaar],
                ['Address', profile?.address],
                ['RTO Office', profile?.rto],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="font-medium text-slate-800">{val}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 text-center">Pre-filled from mock Aadhaar eKYC</p>
          </div>
        )}

        {/* DOCUMENTS */}
        {step === 'documents' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Document Upload</h2>
            <p className="text-sm text-slate-500">Upload Aadhaar front — AI extracts your details.</p>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleDocUpload}
            />

            <button
              onClick={() => fileRef.current?.click()}
              className="w-full py-8 border-2 border-dashed border-slate-200 rounded-2xl bg-white text-slate-500 hover:border-saffron hover:text-saffron transition-colors"
            >
              {docPreview ? (
                <img src={docPreview} alt="doc" className="mx-auto max-h-40 rounded-lg" />
              ) : (
                <span className="text-4xl">📷</span>
              )}
              <p className="mt-2 font-medium">{docPreview ? 'Tap to re-upload' : 'Tap to upload Aadhaar'}</p>
            </button>

            {ocrLoading && (
              <div className="text-center py-4">
                <div className="inline-block w-6 h-6 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
                <p className="mt-2 text-sm text-slate-500">AI scanning document…</p>
              </div>
            )}

            {ocrResult && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-green-600 font-semibold">✓ Verified</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                    {Math.round((ocrResult.confidence || 0.9) * 100)}% confidence
                  </span>
                </div>
                {[
                  ['Name', ocrResult.name],
                  ['DOB', ocrResult.dob],
                  ['Doc No.', ocrResult.docNumber],
                  ['Address', ocrResult.address],
                ].map(([label, val]) => (
                  <div key={label} className="mb-2">
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="font-medium">{val}</p>
                  </div>
                ))}
                {ocrResult.note && <p className="text-xs text-amber-600 mt-2">{ocrResult.note}</p>}
              </div>
            )}
          </div>
        )}

        {/* MOCK PAYMENT */}
        {step === 'pay' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Pay RTO Fee</h2>
            <p className="text-sm text-slate-500">No real money is charged. This is a mock UPI settlement.</p>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <p className="text-xs text-slate-400">{MOCK_FEE.label}</p>
              <p className="text-3xl font-bold mt-1">₹{MOCK_FEE.amount}</p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant</span>
                  <span className="font-medium">{profile?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Application</span>
                  <span className="font-medium">{profile?.applicationId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Method</span>
                  <span className="font-medium">{MOCK_FEE.method}</span>
                </div>
              </div>
            </div>

            {!paid ? (
              <button
                onClick={handleMockPay}
                disabled={paying}
                className="w-full py-4 bg-gradient-to-r from-saffron to-orange-500 text-white font-bold rounded-2xl disabled:opacity-60"
              >
                {paying ? 'Processing mock UPI…' : '⚡ 1-Click Pay ₹150'}
              </button>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                <p className="font-semibold text-green-800">Payment successful</p>
                <p className="text-sm text-green-700 mt-1">Receipt {paymentRef}</p>
                <p className="text-xs text-green-600 mt-2">Mock settlement · no bank debit</p>
              </div>
            )}
          </div>
        )}

        {/* TRAFFIC SIGNS */}
        {step === 'signs' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Traffic Sign Tutor</h2>
            <p className="text-sm text-slate-500">
              Score {quizScore}/{quizTotal} correct · Need 5/5 to pass
            </p>

            {!quiz && !quizLoading && (
              <button
                onClick={loadQuiz}
                className="w-full py-4 bg-navy text-white font-semibold rounded-2xl"
              >
                Start Sign Quiz
              </button>
            )}

            {quizLoading && (
              <div className="text-center py-8">
                <div className="inline-block w-6 h-6 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                <p className="mt-2 text-sm text-slate-500">Generating question…</p>
              </div>
            )}

            {quiz && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="text-center text-5xl mb-4">{quiz.signEmoji || TRAFFIC_SIGNS[Math.floor(Math.random() * TRAFFIC_SIGNS.length)]}</div>
                <p className="font-semibold text-center mb-4">{quiz.question}</p>
                <div className="space-y-2">
                  {(quiz.options || []).map((opt, i) => {
                    let cls = 'w-full py-3 px-4 rounded-xl border text-left font-medium transition-colors '
                    if (quizAnswer !== null) {
                      if (i === (quiz.correctIndex ?? 0)) cls += 'bg-green-50 border-green-300 text-green-800'
                      else if (i === quizAnswer) cls += 'bg-red-50 border-red-300 text-red-800'
                      else cls += 'border-slate-100 text-slate-400'
                    } else {
                      cls += 'border-slate-200 hover:border-navy hover:bg-slate-50'
                    }
                    return (
                      <button key={i} onClick={() => handleQuizAnswer(i)} className={cls}>
                        {opt}
                      </button>
                    )
                  })}
                </div>
                {quizAnswer !== null && (
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl text-sm text-slate-600">
                    {quiz.explanation}
                  </div>
                )}
                {quizAnswer !== null && quizScore < 5 && (
                  <button onClick={loadQuiz} className="mt-3 w-full py-3 text-navy font-semibold">
                    Next Question →
                  </button>
                )}
                {quiz.note && <p className="text-xs text-amber-600 mt-2">{quiz.note}</p>}
              </div>
            )}
          </div>
        )}

        {/* SLOT BOOKING */}
        {step === 'slot' && !booked && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Book Test Slot</h2>

            {!slotRecs && !slotLoading && (
              <button
                onClick={loadSlotRecs}
                className="w-full py-4 bg-india text-white font-semibold rounded-2xl"
              >
                🤖 Get AI Slot Recommendations
              </button>
            )}

            {slotLoading && (
              <div className="text-center py-8">
                <div className="inline-block w-6 h-6 border-2 border-india border-t-transparent rounded-full animate-spin" />
                <p className="mt-2 text-sm text-slate-500">Finding best slots…</p>
              </div>
            )}

            {slotRecs && (
              <>
                {slotRecs.note && <p className="text-xs text-amber-600">{slotRecs.note}</p>}
                <p className="text-sm text-slate-500">AI-picked slots for you:</p>
                <div className="space-y-2">
                  {MOCK_SLOTS.map((slot) => {
                    const rec = slotRecs.recommendations?.find((r) => r.slotId === slot.id)
                    const isRec = !!rec
                    const isSelected = selectedSlot?.id === slot.id
                    return (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot)}
                        className={`w-full text-left p-4 rounded-2xl border transition-colors ${
                          isSelected
                            ? 'border-india bg-green-50'
                            : isRec
                            ? 'border-saffron/40 bg-orange-50/50'
                            : 'border-slate-100 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{slot.date} · {slot.time}</p>
                            <p className="text-sm text-slate-500">{slot.rto}</p>
                            <p className="text-xs text-slate-400">{slot.seats} seats left</p>
                          </div>
                          {isRec && (
                            <span className="text-xs bg-saffron text-white px-2 py-0.5 rounded-full font-medium">
                              {rec.score}% match
                            </span>
                          )}
                        </div>
                        {rec && <p className="text-xs text-slate-500 mt-1">{rec.reason}</p>}
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* CONFIRMATION */}
        {(step === 'done' || booked) && (
          <div className="text-center py-8 space-y-4">
            <div className="text-6xl">🎉</div>
            <h2 className="text-2xl font-bold text-green-700">Application Submitted!</h2>
            <p className="text-slate-500">Your learner's license test is booked.</p>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-left space-y-2">
              <p className="text-xs text-slate-400">Application ID</p>
              <p className="font-bold text-lg">{profile?.applicationId}</p>
              {paid && (
                <>
                  <p className="text-xs text-slate-400 mt-3">Fee Paid</p>
                  <p className="font-semibold">₹{MOCK_FEE.amount} · {paymentRef}</p>
                </>
              )}
              {selectedSlot && (
                <>
                  <p className="text-xs text-slate-400 mt-3">Test Slot</p>
                  <p className="font-semibold">{selectedSlot.date} at {selectedSlot.time}</p>
                  <p className="text-sm text-slate-500">{selectedSlot.rto}</p>
                </>
              )}
              <p className="text-xs text-slate-400 mt-3">Status</p>
              <span className="inline-block bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                Slot Confirmed (Mock)
              </span>
            </div>
            <p className="text-xs text-slate-400">SMS confirmation sent to {profile?.mobile}</p>
          </div>
        )}
      </main>

      {/* bottom nav */}
      {step !== 'done' && !booked && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-3 safe-bottom max-w-md mx-auto">
          <button
            onClick={() => {
              if (step === 'slot' && selectedSlot) {
                setBooked(true)
                setStep('done')
              } else if (step === 'signs' && quizScore < 5) {
                return
              } else {
                goNext()
              }
            }}
            disabled={
              (step === 'documents' && !ocrResult) ||
              (step === 'pay' && !paid) ||
              (step === 'signs' && quizScore < 5) ||
              (step === 'slot' && !selectedSlot)
            }
            className="w-full py-3.5 bg-slate-900 text-white font-semibold rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
          >
            {step === 'slot' ? 'Confirm Booking' : step === 'pay' ? 'Continue after payment' : 'Continue'}
          </button>
        </footer>
      )}
    </div>
  )
}
