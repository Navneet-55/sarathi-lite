import { gptStructured } from './_openai.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { slots, profile, preference } = req.body || {}
  if (!slots?.length) return res.status(400).json({ error: 'slots required' })

  try {
    const result = await gptStructured({
      model: 'gpt-4o-mini',
      schemaName: 'slot_recommendations',
      schema: {
        type: 'object',
        properties: {
          recommendations: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                slotId: { type: 'string' },
                score: { type: 'number' },
                reason: { type: 'string' },
              },
              required: ['slotId', 'score', 'reason'],
              additionalProperties: false,
            },
          },
        },
        required: ['recommendations'],
        additionalProperties: false,
      },
      messages: [
        {
          role: 'system',
          content: `You are an RTO appointment advisor for Sarathi Parivahan in India. Rank the top 3 slots for a learner's license computer test. Consider: proximity to applicant RTO, seat availability, time preference (${preference || 'any'}), and avoiding peak hours. Score 0-100.`,
        },
        {
          role: 'user',
          content: `Applicant profile: ${JSON.stringify(profile)}\n\nAvailable slots:\n${JSON.stringify(slots)}\n\nReturn top 3 recommendations.`,
        },
      ],
    })

    res.status(200).json(result)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
