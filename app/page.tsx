'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, [])

  return (
    <div>
      <h1>Welcome to Next.js 14 with Backend Support</h1>
      <p>Message from API: {message}</p>
    </div>
  )
}