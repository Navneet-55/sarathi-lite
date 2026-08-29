# Sarathi Parivahan — Learner's License Portal (Lite)

An accessible, fast, and secure public service web portal simulating the end-to-end Learner's Driving License workflow under the Motor Vehicles Act (1988) and Central Motor Vehicles Rules (1989).

Author: **[Navneet](https://github.com/Navneet-55)**

Live Deployment: [**https://sarathi-lite.vercel.app**](https://sarathi-lite.vercel.app)

---

## Key Features

- **Document Optical Character Recognition (OCR)**:
  - Supports single-sided and dual front & back combined Aadhaar cards.
  - Multi-tier OCR pipeline powered by GPT-4o-mini Vision and client-side Tesseract.js WebAssembly.
  - Automatically extracts Full Legal Name, Date of Birth, Mobile Number, Gender, Aadhaar 12-Digit UID, and Residential Address.
- **Road Safety & Traffic Regulations Handbook**:
  - Comprehensive study guide covering mandatory stop rules, speed limits, pedestrian right-of-way, silent zones, give-way signs, and overtaking regulations.
  - Vector SVG graphics rendering standard Indian Roads Congress (IRC:67) regulatory road signs.
- **5-Question Knowledge Test**:
  - Fixed 5-question qualifying test with instant feedback, explanations, and dynamic score tracking.
  - Full speech synthesizer with Play, Pause, Resume, and Stop controls for enhanced accessibility.
- **Statutory Fee Challan Settlement**:
  - Official itemized ₹150 government challan breakdown (Form 2 fee, test fee, and slot reservation).
  - Instant treasury receipt generation with print capability.
- **RTO Slot Allotment & Appointment Booking**:
  - Real-time seat availability across regional transport offices.
  - Generates official Form 2 LL test appointment slip with printable checklist.
- **Universal Accessibility & Theming**:
  - GIGW-compliant root font size scaling (`A-`, `A`, `A+`).
  - High Contrast mode and native Dark Mode theme support.
  - Dedicated **My Profile** citizen identity modal.

---

## 4-Step Linear Workflow

```
Step 1: Application Form & Aadhaar OCR
  └── Step 2: Traffic Safety Study Guide & 5-Question Test
        └── Step 3: Statutory Challan Settlement (₹150)
              └── Step 4: RTO Slot Allotment & Test Day Slip
```

---

## Tech Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS (with Class-based Dark Mode)
- **OCR Engine**: Tesseract.js (WebAssembly) + OpenAI GPT-4o-mini Vision API
- **Analytics & Deployment**: Vercel Serverless Functions + Vercel Analytics
- **Code Quality**: ESLint 9, Prettier

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/Navneet-55/sarathi-lite.git
cd sarathi-lite

# Install dependencies
npm install

# Start local development server (includes built-in /api middleware)
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## Verification & Testing

```bash
# Run lint checks
npm run lint

# Build production bundle
npm run build
```

---

## License

MIT © [Navneet](https://github.com/Navneet-55)
