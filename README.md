# Sarathi Parivahan — Learner's License Portal (Lite)

A streamlined, citizen-friendly web portal that simulates the end-to-end Learner's License application process — from Aadhaar OCR to slot booking.

Built by **[Navneet-55](https://github.com/Navneet-55)**.

---

## Features

- **1-Click Demo Login** — pre-filled mock citizen profile (no real Aadhaar or OTP needed)
- **Document OCR** — AI vision parses uploaded Aadhaar and auto-fills application fields
- **Traffic Sign Tutor** — GPT-powered quiz to prepare for the Learner's License test
- **Mock Fee Payment** — simulated ₹150 RTO fee payment (no real money)
- **Smart Slot Booking** — AI-ranked RTO appointment slot recommendations

## Application Flow

```
Step 1: Application & OCR
  → Step 2: Traffic Rules Practice
  → Step 3: Fee Payment
  → Step 4: Slot Booking
```

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and click **1-Click Demo Login**.

## Environment Setup (Optional AI Features)

Copy `.env.example` to `.env` and add your OpenAI key:

```
VITE_OPENAI_API_KEY=sk-...
```

Without a key, the app falls back to mock responses — the full demo still works.

## Deploy

```bash
npx vercel
```

API routes in `/api` are deployed as serverless functions automatically.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| AI | OpenAI GPT-4o-mini (structured outputs) |
| Deployment | Vercel |

## License

MIT © [Navneet-55](https://github.com/Navneet-55)
