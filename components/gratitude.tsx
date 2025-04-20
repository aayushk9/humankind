"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Heart, Send, Loader2, User } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { Signin } from "./signin"

type Post = {
  story: string
  createdAt: string
  user?: {
    email: string
  }
}

export function Gratitude() {
  const [post, setPost] = useState<Post[]>([])
  const [newPost, setNewPost] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [showSignIn, setShowSignIn] = useState(false)

  const { data: session } = useSession()

  const fetchStories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/gratitude`)
      const data = await res.json()

      setLoading(true)
      if (res.ok) {
        setPost(data.post)
      } else if (res.status === 500) {
        alert("Ahh, error fetching post")
      } else {
        alert("Something unusual happened")
      }
    } catch (error) {
      console.log(error)
      alert("Server is down")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStories()
  }, [])

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session) {
      signIn("google");
      return;
    }

    try {
      setLoading(true)
      const res = await fetch("http://localhost:3000/api/gratitude", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPost }),
      })

      const data = await res.json()

      if (res.ok) {
        fetchStories()
        setNewPost("")
      } else if (res.status === 400) {
        alert("Please enter more than 4 words to post something")
      } else {
        alert("Something went wrong")
      }
    } catch (error) {
      console.log(error)
      alert("Server is down, try again later")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={createPost} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
      
        <div className="mb-4">
          <input
            type="text"
            placeholder="Express your gratitude..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          />
        </div>

        <div className="flex justify-end">
          <button
            disabled={loading}
            className="bg-rose-500/80 hover:bg-rose-500 text-white rounded-full px-6 py-2 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Posting..." : "Post"}
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
        ) : post.length === 0 ? (
          <div className="text-center text-white/50 py-8">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                      Loading...
                    </div>
        ) : (
          post.map((item, index) => (
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
              <p className="text-white/90 mb-4">{item.story}</p>
              <div className="flex justify-between items-center">
                <div className="text-white/40 text-sm">
                  {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}