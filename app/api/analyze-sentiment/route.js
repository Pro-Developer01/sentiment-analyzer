import { analyzeSentiment } from '../../../utils/sentimentAnalysis'

export async function POST(req) {
  const { article } = await req.json()
  
  try {
    const sentiment = await analyzeSentiment(article)
    return new Response(JSON.stringify(sentiment), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error analyzing sentiment' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    })
  }
}