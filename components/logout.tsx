"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export function Logout() {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  return (
    <button
      onClick={handleSignOut}
      className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 text-white rounded-full px-6 py-2 transition-colors"
    >
      Sign out
    </button>
  )
}