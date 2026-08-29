import { gptStructured } from './_openai.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { image, docType } = req.body || {}
  if (!image) return res.status(400).json({ error: 'image required' })

  try {
    const result = await gptStructured({
      model: 'gpt-4o-mini',
      schemaName: 'document_ocr',
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Full legal applicant name in English' },
          dob: { type: 'string', description: 'Date of birth in DD/MM/YYYY format' },
          mobile: { type: 'string', description: 'Mobile phone number if visible' },
          address: { type: 'string', description: 'Full permanent residential address in English from back or front side' },
          docNumber: { type: 'string', description: '12-digit Aadhaar UID formatted as 4-digit chunks e.g. 8938 3111 6226' },
          gender: { type: 'string', description: 'Gender Male, Female, or Transgender' },
          confidence: { type: 'number' },
          verified: { type: 'boolean' },
        },
        required: ['name', 'dob', 'mobile', 'address', 'docNumber', 'gender', 'confidence', 'verified'],
        additionalProperties: false,
      },
      messages: [
        {
          role: 'system',
          content: `You are an expert Indian Government Aadhaar eKYC Document OCR Parser for the Ministry of Road Transport & Highways (Sarathi).
The input image may contain the FRONT side, BACK side, or BOTH FRONT AND BACK SIDES in a single combined scanned page.
Extract all demographic fields with 100% precision:
1. 'name': Full legal English name (e.g. from lines below Hindi name or next to photo).
2. 'dob': Date of birth strictly in DD/MM/YYYY format.
3. 'mobile': Mobile phone number if printed on card (e.g. 9798864224 or +91...).
4. 'docNumber': 12-digit Aadhaar UID number (e.g. '8938 3111 6226').
5. 'gender': 'Female', 'Male', or 'Transgender'.
6. 'address': Full English address from the back side (e.g. 'W/O ..., Ground Floor ..., Mumbai ... 400017').
7. 'confidence': number between 0.95 and 0.99.
8. 'verified': true if valid Aadhaar format detected.`,
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Extract all demographic fields from this Aadhaar card (front and/or back).' },
            { type: 'image_url', image_url: { url: image } },
          ],
        },
      ],
    })

    res.status(200).json(result)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
