import { gptStructured } from './_openai.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { count = 1 } = req.body || {}

  try {
    const result = await gptStructured({
      model: 'gpt-4o-mini',
      schemaName: 'traffic_sign_quiz',
      schema: {
        type: 'object',
        properties: {
          questions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                question: { type: 'string' },
                options: { type: 'array', items: { type: 'string' } },
                correctIndex: { type: 'number' },
                explanation: { type: 'string' },
                signEmoji: { type: 'string' },
              },
              required: ['question', 'options', 'correctIndex', 'explanation', 'signEmoji'],
              additionalProperties: false,
            },
          },
        },
        required: ['questions'],
        additionalProperties: false,
      },
      messages: [
        {
          role: 'system',
          content: `You are an Indian traffic sign tutor for learner's license applicants. Generate ${count} multiple-choice question(s) about Indian Road Traffic signs (as per MV Act). Each question has exactly 4 options, one correct answer (correctIndex 0-3), a brief explanation, and a relevant emoji representing the sign. Focus on common signs: Stop, No Entry, Speed Limit, Pedestrian Crossing, U-Turn, One Way, etc.`,
        },
        { role: 'user', content: `Generate ${count} traffic sign quiz question(s) for a learner's license test in India.` },
      ],
    })

    res.status(200).json(result)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
