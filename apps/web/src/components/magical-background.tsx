"use client"

import { Particles } from "@/components/ui/particles";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function MagicalBackground({ show, pulse = true }: { show: boolean; pulse?: boolean }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div 
        className={cn(
            "fixed inset-0 pointer-events-none z-[51] transition-opacity duration-700",
            show ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
    >
        {/* Center Burst/Glow - Golden Orange (Warm) */}
        <div className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] min-w-[600px] min-h-[600px] bg-[radial-gradient(circle,rgba(217,119,87,0.4)_0%,rgba(0,0,0,0)_70%)] blur-[60px]",
            pulse && "animate-pulse"
        )} />

        {/* Floating Particles - Centered & Fine */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
            <Particles 
                className="absolute inset-0"
                quantity={200}
                ease={80}
                color="#d97757"
                refresh
                vy={-0.3}
            />
        </div>
    </div>
  )
}
