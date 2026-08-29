# Sarathi-Lite

AI-powered learner's license portal — hackathon build for Varun Mayya x OpenAI.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and tap **1-Click Demo Login**.

## OpenAI Setup

Copy `.env.example` to `.env` and add your key:

```
OPENAI_API_KEY=sk-...
```

For Vercel, add `OPENAI_API_KEY` in project Environment Variables.

Without a key, the app falls back to mock responses so the demo still works.

## Features

- **1-Click Demo Login** — pre-filled mock citizen profile
- **Document OCR** — GPT-4o-mini vision parses uploaded Aadhaar (structured output)
- **Mock Payment** — 1-click ₹150 RTO fee (no real money)
- **Traffic Sign Tutor** — GPT-generated quiz for learner's license prep
- **Smart Slot Picks** — AI ranks best RTO appointment slots

## Deploy to Vercel

```bash
npx vercel
```

API routes in `/api` deploy as serverless functions automatically.

## Stack

React + Vite + Tailwind CSS · OpenAI GPT-4o-mini structured outputs · Vercel

**Lead Developer:** Navneet Patnaik
