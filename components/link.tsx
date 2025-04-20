"use client"

import type React from "react"

import { signIn, useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { ExternalLink, Loader2, Send, User } from "lucide-react"

type KnowledgeItem = {
  link: string
  title?: string
  user?: {
    email: string
  }
  createdAt?: string
}

export function LinkComponent() {
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>([])
  const [link, setLink] = useState("")
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  const fetchResources = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/knowledge`)
      const data = await res.json()

      if (res.ok) {
        setKnowledge(data.knowledge)
      } else {
        alert("something went wrong")
      }
    } catch (error) {
      console.log(error)
      alert("server down")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResources()
  }, [])

  const postLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session) {
      signIn("google")
      return
    }
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/knowledge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link }),
      })

      const data = await res.json()

      if (res.ok) {
        fetchResources()
        setLink("")
      } else if (res.status == 400) {
        alert("enter a valid url")
      } else {
        alert("something went wrong")
      }
    } catch (error) {
      console.log(error)
      alert("server down")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={postLink} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Paste URL here..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          />
        </div>

        <div className="flex justify-end">
          <button
            disabled={loading}
            className="bg-rose-500/80 hover:bg-rose-500 text-white rounded-full px-6 py-2 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Adding..." : "Add Resource"}
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center text-white/50 py-8">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            Loading...
          </div>
        ) : knowledge.length === 0 ? (
          <div className="text-center text-white/50 py-8">No resources shared yet. Be the first to share!</div>
        ) : (
          knowledge.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all hover:border-rose-500/30"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-rose-300" />
                </div>
                <div>
                  <div className="font-medium text-white">{item.user?.email || "Anonymous"}</div>
                </div>
              </div>
              <div className="mb-4">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-400 hover:text-rose-300 flex items-center gap-2 group"
                >
                  <span className="text-lg font-medium underline-offset-4 group-hover:underline">
                    {item.title || item.link}
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <div className="text-white/40 text-sm">
                {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recently shared"}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}