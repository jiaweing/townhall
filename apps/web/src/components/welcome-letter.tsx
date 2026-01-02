"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useState } from "react"

import { MagicalBackground } from "@/components/magical-background"

export function WelcomeLetter() {
  const [showEnvelope, setShowEnvelope] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    const hasSeen = localStorage.getItem("townhall-welcome-seen")
    if (!hasSeen) {
      // Delay slightly to ensure fonts/layout loaded
      setTimeout(() => setShowEnvelope(true), 500)
    }
  }, [])

  const handleOpenLetter = () => {
    setShowEnvelope(false)
    setShowLetter(true)
    localStorage.setItem("townhall-welcome-seen", "true")
  }

  const handleClose = () => {
    if (isClosing) return
    setIsClosing(true)
    setTimeout(() => {
        setShowLetter(false)
        setIsClosing(false)
    }, 600) // Match animation duration
  }

  if (!hasMounted) return null
  if (!showEnvelope && !showLetter && !isClosing) return null

  return (
    <div>
      <MagicalBackground show={showLetter || isClosing || showEnvelope} pulse={!showLetter} />

      {showEnvelope && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center animate-in fade-in duration-500">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-12 animate-bounce-slow tracking-tight text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] px-4">
            You have a mail!
          </h1>
          
          <button 
            onClick={handleOpenLetter}
            className="group relative transform transition-all hover:scale-110 active:scale-95 cursor-pointer outline-none focus:outline-none"
            aria-label="Open Mail"
          >
             <div className="animate-bounce-game relative">
                <Image 
                  src="/assets/icons/Smilies/Love Letter.png" 
                  alt="New Mail" 
                  width={192} 
                  height={192}
                  className="w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl object-contain"
                  priority
                />
             </div>
             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold text-shadow text-nowrap pointer-events-none">
               Click to open
             </div>
          </button>
        </div>
      )}

      <Dialog open={showLetter} onOpenChange={(open) => {
        if (!open) handleClose()
      }}>
        <DialogContent 
            className={cn(
                "z-[60] sm:max-w-md bg-background border-ring ring-6 shadow-2xl p-0 overflow-hidden -rotate-1 transform transition-transform duration-300 hover:scale-[1.02]",
                isClosing && "animate-[letter-exit_0.6s_ease-in_forwards]"
            )}
            showCloseButton={false}
        >
          <div className="bg-background text-foreground p-4 text-center relative">
             <DialogTitle className="text-2xl font-serif tracking-wide">
              A Letter from the Founders
            </DialogTitle>
            <div className="absolute top-2 right-2">
                 <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleClose}
                    className="text-foreground hover:bg-white/10"
                 >
                    <span className="sr-only">Close</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 18 12" />
                    </svg>
                 </Button>
            </div>
          </div>
          <div className="p-6 space-y-4 text-foreground leading-relaxed relative max-h-[80vh] overflow-y-auto text-lg">
            <p>
              Greetings, Traveler!
            </p>
            <p>
              Welcome to Townhall. We've built this space with a simple dream: to bring people together in a way that feels genuine, fun, and truly yours.
            </p>
            <p>
              This isn't just another platform; it's a playground for your community. Whether you're planning the next big event, sharing your latest creation, or just hanging out, we want this to feel like home.
            </p>
            <p>
              So go ahead, explore, break things (gently), and let us know what you think. We're just getting started, and we're so glad you're here for the ride.
            </p>
            <p className="font-bold text-right mt-6 italic">
              — The Townhall Team
            </p>
            
            <div className="flex justify-center mt-8 pb-2">
                <Button 
                onClick={handleClose}
                className="font-serif px-8 shadow-md"
                >
                Start Exploring
                </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
