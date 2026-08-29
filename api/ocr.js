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
          name: { type: 'string' },
          dob: { type: 'string' },
          address: { type: 'string' },
          docNumber: { type: 'string' },
          confidence: { type: 'number' },
          verified: { type: 'boolean' },
        },
        required: ['name', 'dob', 'address', 'docNumber', 'confidence', 'verified'],
        additionalProperties: false,
      },
      messages: [
        {
          role: 'system',
          content: `You are an Indian government document OCR parser for Sarathi Parivahan. Parse the uploaded ${docType || 'identity'} document. Return structured fields. Use XXXX masking for sensitive numbers if unclear. This is a hackathon demo with synthetic data.`,
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Extract all visible fields from this document image.' },
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
