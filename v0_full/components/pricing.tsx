"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    description: "Perfect for small teams getting started",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: ["Up to 10 team members", "5 automation workflows", "Basic analytics", "Email support", "1GB storage"],
  },
  {
    name: "Pro",
    description: "For growing teams that need more power",
    monthlyPrice: 79,
    yearlyPrice: 790,
    popular: true,
    features: [
      "Up to 50 team members",
      "Unlimited workflows",
      "Advanced analytics",
      "Priority support",
      "25GB storage",
      "Custom integrations",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    description: "For organizations with advanced needs",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: [
      "Unlimited team members",
      "Unlimited everything",
      "Custom analytics",
      "Dedicated support",
      "Unlimited storage",
      "SSO & SAML",
      "Custom contracts",
      "SLA guarantee",
    ],
  },
]

export function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="py-20 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-accent font-semibold mb-4">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Simple, transparent pricing</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your team. All plans include a 14-day free trial.
          </p>

          <div className="mt-8 inline-flex items-center gap-4 rounded-full border border-border bg-secondary p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                !annual ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                annual ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              Annual <span className="text-accent ml-1">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative rounded-xl border p-6 flex flex-col",
                plan.popular ? "border-accent bg-card shadow-lg shadow-accent/10" : "border-border bg-card",
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">
                  ${annual ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-muted-foreground">/{annual ? "year" : "month"}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={cn(
                  "w-full",
                  plan.popular
                    ? "bg-accent text-accent-foreground hover:bg-accent/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                )}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
