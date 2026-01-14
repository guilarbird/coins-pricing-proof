import { Zap, Users, BarChart3, Shield } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Instant Automation",
    description:
      "Set up powerful workflows in minutes. Connect your tools and let StreamLine handle the repetitive tasks automatically.",
  },
  {
    icon: Users,
    title: "Seamless Collaboration",
    description:
      "Real-time collaboration for your entire team. Share projects, assign tasks, and keep everyone aligned effortlessly.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Get actionable insights with beautiful dashboards. Track performance, identify trends, and make data-driven decisions.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and compliance. Your data is protected with SOC 2 Type II certification and GDPR compliance.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-accent font-semibold mb-4">Features</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Everything you need to scale</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Powerful features designed to help teams work smarter, not harder.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-xl border border-border bg-card p-6 hover:border-accent/50 transition-all duration-300"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary group-hover:bg-accent/10 transition-colors">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
