"use client"

import { useEffect, useState } from "react"

export function Quote() {
  const [quote, setQuote] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchQuotes = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/zen`)
      const data = await res.json()
      setLoading(true)
      if (res.ok) {
        setQuote(data.quote)
      } else if (res.status == 500) {
        alert("we are sorry our sever is having some issue")
      } else {
        alert("try again laer")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  return (
    <div className="min-h-[120px] flex items-center justify-center">
      {loading || quote.length == 0? (
        <div className="text-white/50 animate-pulse">Loading...</div>
      ) : (
        <blockquote className="text-2xl font-serif italic text-white">{quote}</blockquote>
      )}
    </div>
  )
}