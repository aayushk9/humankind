import { Signin } from "@/components/signin"
import { Logout } from "@/components/logout"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import Link from "next/link"
import { Heart, ArrowLeft } from "lucide-react"
import { Gratitude } from "@/components/gratitude"

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
            <Heart className="h-6 w-6 text-rose-400" />
            <h1 className="text-2xl font-bold text-white">Gratitude Board</h1>
          </div>
        </div>
        <div>{session ? <Logout /> : <Signin />}</div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto mb-10">
          <p className="text-xl text-white/70">
            Leave anonymous kind stories for others to read. Express gratitude for the people and moments that have
            touched your life.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Gratitude />
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
              <Link href="/logs" className="hover:text-rose-400 transition-colors">
                Daily Logs
              </Link>
              <Link href="/gratitude" className="text-rose-400">
                Gratitude
              </Link>
              <Link href="/knowledge" className="hover:text-rose-400 transition-colors">
                Knowledge
              </Link>
              <Link href="/zen" className="hover:text-rose-400 transition-colors">
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