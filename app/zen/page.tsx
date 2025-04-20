import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"
import { Signin } from "@/components/signin"
import { Logout } from "@/components/logout"
import { Quote } from "@/components/quotes"
import { Breathing } from "@/components/breathing"
import Link from "next/link"
import { ArrowLeft, Sparkles, Heart } from "lucide-react"

export default async function () {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 flex items-center justify-center"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-rose-400" />
            <h1 className="text-2xl font-bold text-white">Zen</h1>
          </div>
        </div>
        <div>
          {session && <Logout />}
          {!session && <Signin />}
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto mb-10">
          <p className="text-xl text-white/70">
            Take a moment to breathe and reflect. Here's a sweet message to bring peace to your day.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
            <Sparkles className="h-10 w-10 text-rose-400 mx-auto mb-6" />
            <Quote />
          </div>

          <div className="text-center text-white/70 max-w-xl mx-auto">
            Take time to notice the beauty in small things around you.
          </div>

          <Breathing />
        </div>
      </main>

      <footer className="py-12 border-t border-white/10 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Heart className="h-5 w-5 text-rose-400" />
              <h2 className="text-xl font-bold text-white">HumanKind</h2>
            </div>
            <div className="flex gap-8 text-white/60">
              <Link href="/dailylog" className="hover:text-rose-400 transition-colors">
                Daily Logs
              </Link>
              <Link href="/gratitude" className="hover:text-rose-400 transition-colors">
                Gratitude
              </Link>
              <Link href="/knowledge" className="hover:text-rose-400 transition-colors">
                Knowledge
              </Link>
              <Link href="/zen" className="text-rose-400">
                Zen
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-white/40 text-sm">
            © {new Date().getFullYear()} HumanKind. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}