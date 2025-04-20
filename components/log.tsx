"use client"

import { useEffect, useState } from "react"
import { useSession, signIn } from "next-auth/react"
import { Send, User } from "lucide-react"
import { Loader2 } from "lucide-react"

type Log = {
  dailyLogs: string
  createdAt?: string | Date
  // add more properties if needed
}

export function Log() {
  const [dailyLogs, setDailyLogs] = useState([])
  const [newLog, setNewlog] = useState("")
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  const fetchLogs = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/dailylog")
      const data = await res.json()

      if (res.ok) {
        setDailyLogs(data.dailyLogs)
      } else if (res.status === 500) {
        alert("Failed to fetch logs")
      }
    } catch (error) {
      console.error("Error fetching logs:", error)
      alert("Something went wrong while fetching")
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const sendPosts = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session) {
      signIn("google")
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/dailylog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dailyLogs: newLog }),
      })

      const data = await res.json()
      if (res.ok) {
        setNewlog("")
        fetchLogs()
      } else if (res.status == 400) {
        alert("please enter more than 4 words to your post")
      } else if (res.status == 500) {
        alert("we are sorry some internal server error occured")
      } else {
        alert("please sign up in order to post your log")
      }
    } catch (error) {
      console.log(error)
      alert("some internla error occured")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={sendPosts} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Write your log of the day..."
            value={newLog}
            onChange={(e) => setNewlog(e.target.value)}
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
        {dailyLogs.length === 0 ? (
           <div className="text-center text-white/50 py-8">
                       <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                       Loading...
                     </div>
        ) : (
          dailyLogs.map((log: Log, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all hover:border-rose-500/30"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-rose-300" />
                </div>
                <div>
                  <div className="font-medium text-white">{"Anonymous"}</div>
                </div>
              </div>
              <p className="text-white/90 mb-4">{log.dailyLogs}</p>
              <div className="flex justify-between items-center">
                <div className="text-white/40 text-sm">
                  {new Date(log.createdAt || Date.now()).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}