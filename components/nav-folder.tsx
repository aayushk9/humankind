import Link from "next/link"
import type { ReactNode } from "react"

interface NavFolderProps {
  icon: ReactNode
  title: string
  href: string
}

export function NavFolder({ icon, title, href }: NavFolderProps) {
  return (
    <Link href={href} className="block group">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-rose-500/30 transition-colors rounded-xl p-4 text-center">
        <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center mx-auto mb-3">{icon}</div>
        <p className="text-white font-medium">{title}</p>
      </div>
    </Link>
  )
}
