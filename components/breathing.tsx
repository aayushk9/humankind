"use client"
import { useState, useEffect } from "react"

export function Breathing() {
  const [breathePhase, setBreathePhase] = useState("inhale")

  useEffect(() => {
    const breathingCycle = setInterval(() => {
      setBreathePhase((prev) => (prev === "inhale" ? "hold" : prev === "hold" ? "exhale" : "inhale"))
    }, 4000)

    return () => {
      clearInterval(breathingCycle)
    }
  }, [])

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-8">Take a Moment to Breathe</h2>
        <div className="relative mx-auto mb-8">
          <div className="w-48 h-48 mx-auto relative">
            <div
              className={`absolute inset-0 rounded-full bg-rose-500/10 transition-all duration-4000 ease-in-out ${
                breathePhase === "inhale"
                  ? "scale-100 opacity-50"
                  : breathePhase === "hold"
                    ? "scale-100 opacity-70"
                    : "scale-50 opacity-30"
              }`}
            />
            <div
              className={`absolute inset-8 rounded-full bg-rose-500/20 transition-all duration-4000 ease-in-out ${
                breathePhase === "inhale"
                  ? "scale-100 opacity-50"
                  : breathePhase === "hold"
                    ? "scale-100 opacity-70"
                    : "scale-75 opacity-30"
              }`}
            />
            <div
              className={`absolute inset-16 rounded-full bg-rose-500/30 transition-all duration-4000 ease-in-out ${
                breathePhase === "inhale"
                  ? "scale-100 opacity-50"
                  : breathePhase === "hold"
                    ? "scale-100 opacity-70"
                    : "scale-90 opacity-30"
              }`}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xl font-light uppercase tracking-widest">
                {breathePhase === "inhale" ? "Breathe In" : breathePhase === "hold" ? "Hold" : "Breathe Out"}
              </span>
            </div>
          </div>
        </div>
        <p className="text-white/70 mb-4">Breathe in for 4 seconds, hold for 4 seconds, exhale for 4 seconds.</p>
        <p className="text-white/50 text-sm">Repeat this exercise whenever you need a moment of calm.</p>
      </div>
    </div>
  )
}