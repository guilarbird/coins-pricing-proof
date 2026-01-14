import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-muted-foreground mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Now with AI-powered automation
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
              The complete platform to <span className="text-accent">streamline</span> your workflow
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 text-pretty">
              Stop juggling tools. StreamLine brings automation, collaboration, and analytics together so your team can
              focus on what matters.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base">
                Start for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary px-8 py-6 text-base bg-transparent"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">10k+</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">50%</p>
                <p className="text-sm text-muted-foreground">Time Saved</p>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-xl lg:max-w-none">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-accent/10 blur-2xl" />
              <div className="relative rounded-xl border border-border bg-card p-4 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
                <img
                  src="/modern-dashboard-interface-with-analytics-charts-a.jpg"
                  alt="StreamLine Dashboard Preview"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
