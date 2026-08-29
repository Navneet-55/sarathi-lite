import { QUESTION_BANK } from '../data/questionBank';
import { INITIAL_SLOTS, rankSlots } from '../data/rtoSlots';
import { runBrowserTesseractOcr } from './ocrEngine';

/**
 * Robust API Service Layer for Sarathi-Lite
 * Dedicated Front-Side and Back-Side Optical Character Recognition
 */

export async function fetchOcrData(base64Image, docType = 'aadhaar', side = 'both') {
  // 1. Try serverless /api/ocr endpoint
  try {
    const res = await fetch('/api/ocr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64Image, docType, side }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && (data.name || data.docNumber || data.dob || data.address || data.mobile)) {
        return { ...data, isLiveAi: true };
      }
    }
  } catch {
    // Continue to browser-side direct / WASM OCR
  }

  // 2. Try direct OpenAI GPT-4o-mini Vision from browser if VITE_OPENAI_API_KEY exists
  const clientKey = typeof import.meta !== 'undefined' && import.meta.env?.VITE_OPENAI_API_KEY;
  if (clientKey && clientKey.startsWith('sk-')) {
    try {
      const promptText =
        side === 'front'
          ? 'Extract demographic fields from the FRONT side of this Indian Aadhaar card: name (full English name), dob (DD/MM/YYYY), gender (Male/Female/Transgender), mobile (phone number if visible), docNumber (12-digit UID e.g. 8938 3111 6226). Leave address blank.'
          : side === 'back'
          ? 'Extract fields from the BACK side of this Indian Aadhaar card: address (complete permanent English residential address with PIN code), docNumber (12-digit UID if visible). Leave name, dob, mobile blank.'
          : 'Extract all demographic fields from this Indian Aadhaar card (front and/or back side): name, dob (DD/MM/YYYY), mobile, address, docNumber, gender.';

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${clientKey.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an Indian government Aadhaar document OCR parser. Extract fields into JSON format: name, dob (DD/MM/YYYY), mobile, address, docNumber, gender, confidence (number 0.95-0.99), verified (boolean true).',
            },
            {
              role: 'user',
              content: [
                { type: 'text', text: promptText },
                { type: 'image_url', image_url: { url: base64Image } },
              ],
            },
          ],
          response_format: { type: 'json_object' },
        }),
      });

      if (response.ok) {
        const json = await response.json();
        const parsed = JSON.parse(json.choices[0].message.content);
        if (parsed && (parsed.name || parsed.docNumber || parsed.dob || parsed.address || parsed.mobile)) {
          return {
            ...parsed,
            isLiveAi: true,
          };
        }
      }
    } catch {
      // Continue to local Tesseract.js WebAssembly
    }
  }

  // 3. In-Browser Tesseract.js Character Recognition
  try {
    const tesseractResult = await runBrowserTesseractOcr(base64Image, side);
    if (tesseractResult) {
      return {
        ...tesseractResult,
        isLiveAi: false,
      };
    }
  } catch (err) {
    console.error('Tesseract OCR error:', err);
  }

  // 4. Default empty state
  return {
    name: '',
    dob: '',
    mobile: '',
    gender: '',
    address: '',
    docNumber: '',
    confidence: 0.7,
    verified: false,
    isLiveAi: false,
    note: 'Image characters could not be resolved. Please verify document or enter details manually.',
  };
}

export async function fetchTrafficQuestion(seenIds = []) {
  try {
    const res = await fetch('/api/traffic-sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count: 1 }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.questions?.[0]) {
        return { ...data.questions[0], isLiveAi: true };
      }
    }
  } catch {
    // fall through to dynamic fallback
  }

  const available = QUESTION_BANK.filter((q) => !seenIds.includes(q.id));
  const pool = available.length > 0 ? available : QUESTION_BANK;
  const selected = pool[Math.floor(Math.random() * pool.length)];

  return {
    ...selected,
    isLiveAi: false,
  };
}

export async function fetchSlotRecommendations(userProfile, preference = 'morning') {
  try {
    const res = await fetch('/api/slots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slots: INITIAL_SLOTS,
        profile: userProfile,
        preference,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      return { ...data, isLiveAi: true };
    }
  } catch {
    // fall through to dynamic fallback
  }

  const recommendations = rankSlots(INITIAL_SLOTS, userProfile?.rto, preference);
  return {
    recommendations,
    isLiveAi: false,
  };
}
