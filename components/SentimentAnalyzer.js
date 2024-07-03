'use client'

import { useState } from 'react'

export default function SentimentAnalyzer() {
  const [article, setArticle] = useState('')
  const [sentiment, setSentiment] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyzeSentiment = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/analyze-sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article })
      })
      const data = await response.json()
      setSentiment(data)
    } catch (error) {
      console.error('Error analyzing sentiment:', error)
    }
    setLoading(false)
  }

  return (
    <div>
      <textarea
        className="w-full h-32 p-2 border rounded"
        value={article}
        onChange={(e) => setArticle(e.target.value)}
        placeholder="Enter your article here..."
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={analyzeSentiment}
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze Sentiment'}
      </button>
      {sentiment && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Sentiment Analysis Results:</h2>
          <p>Positive: {sentiment.positive?.toFixed(2)}</p>
          <p>Negative: {sentiment.negative?.toFixed(2)}</p>
          <p>Neutral: {sentiment.neutral?.toFixed(2)}</p>
        </div>
      )}
    </div>
  )
}