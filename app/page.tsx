import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link"
import { Heart, Coffee, Lightbulb, Sparkles } from "lucide-react"
import { NavFolder } from "@/components/nav-folder"


export default async function Home() {

  const session = await getServerSession();

  if(session) {
   redirect("/logs")
  } 

  return (
    <div className="min-h-screen bg-black text-white">
    <header className="container mx-auto py-6 px-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Heart className="h-6 w-6 text-rose-400" />
        <h1 className="text-2xl font-bold text-white">HumanKind</h1>
      </div>
    </header>

    <main>
      <section className="min-h-[70vh] flex items-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-rose-500/20 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-rose-500/20 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-7 lg:col-span-6 space-y-8">
            <div className="space-y-2">
              <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-300">
                  human
                </span>
                <span className="block">kind</span>
              </h1>
            </div>

            <p className="text-xl text-white/80 max-w-md">
            gentle reminder that we're still present for each other
            </p>

          </div>

          <div className="col-span-12 md:col-span-5 lg:col-span-6 relative h-[50vh] md:h-auto">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-500 to-rose-400 opacity-20 blur-xl animate-pulse" />
                <div className="absolute inset-4 rounded-full bg-black" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="h-20 w-20 text-rose-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-300">
              Reconnect
            </span>{" "}
            with Humanity
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <NavFolder icon={<Coffee className="h-5 w-5 text-rose-400" />} title="Daily Logs" href="/logs" />

            <NavFolder icon={<Heart className="h-5 w-5 text-rose-400" />} title="Gratitude" href="/gratitude" />

            <NavFolder icon={<Lightbulb className="h-5 w-5 text-rose-400" />} title="Knowledge" href="/knowledge" />

            <NavFolder icon={<Sparkles className="h-5 w-5 text-rose-400" />} title="Zen" href="/zen" />
          </div>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 gap-8">
              <div className="relative">
                <div className="absolute -top-6 -left-6">
                  <div className="text-6xl text-white/10">"</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">
                    <p className="text-xl md:text-2xl text-white/80 italic mb-6">
                      The motive behind building this website is simple to keep human connections alive.
                      We, as humans share an innate sense of connectivity, but often tend to forget it.
                      So I thought of creating a nice app that spreads positivity, nurtures human connection and promotes a better state of mind for everyone.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center">
                        <span className="text-rose-300 font-medium">A</span>
                      </div>
                      <div>
                        <div className="font-medium text-white">Aayush K</div>
                        <div className="text-white/60 text-sm">Human connection</div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer className="py-12 border-t border-white/10">
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
            <Link href="/gratitude" className="hover:text-rose-400 transition-colors">
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
  );
}

