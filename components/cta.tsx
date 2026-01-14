import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Cta() {
  return (
    <section className="py-20 px-6 border-t border-border">
      <div className="mx-auto max-w-4xl text-center">
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-accent/5 blur-3xl" />
          <div className="rounded-2xl border border-border bg-card p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              Ready to streamline your workflow?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
              Join thousands of teams already using StreamLine to work smarter. Start your free trial today.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary px-8 bg-transparent"
              >
                Talk to Sales
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">No credit card required. 14-day free trial.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
