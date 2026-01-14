"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Play, Pause, Volume2 } from "lucide-react"

interface AudioPlayerProps {
  t: (key: string) => string
}

export function AudioPlayer({ t }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isKidMode, setIsKidMode] = useState(false)

  return (
    <section className="py-10 relative">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="terminal-module rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border/30 bg-background/20">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              Audio Explainer
            </span>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-accent/10 flex items-center justify-center">
                  <Volume2 className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{t("audio.title")}</h3>
                  <p className="text-[10px] text-muted-foreground">{t("audio.subtitle")}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Kid Mode Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">{t("audio.kidMode")}</span>
                  <Switch checked={isKidMode} onCheckedChange={setIsKidMode} />
                </div>

                {/* Play Button */}
                <Button
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="metallic-stroke text-primary-foreground w-10 h-10 rounded-full"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="h-1 rounded-full bg-secondary overflow-hidden">
                <div className="h-full w-0 bg-accent transition-all" />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>0:00</span>
                <span>{isKidMode ? "1:30" : "1:15"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
