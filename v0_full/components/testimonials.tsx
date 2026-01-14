import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "StreamLine has completely transformed how our team works. We've cut our project delivery time in half.",
    author: "Sarah Chen",
    role: "VP of Operations",
    company: "TechFlow Inc.",
    avatar: "/professional-woman-headshot.png",
  },
  {
    quote: "The automation features alone saved us 20+ hours per week. It's like having an extra team member.",
    author: "Marcus Rodriguez",
    role: "Founder & CEO",
    company: "LaunchPad",
    avatar: "/professional-man-headshot.png",
  },
  {
    quote: "Finally, a platform that just works. The onboarding was seamless and our team adopted it instantly.",
    author: "Emily Nakamura",
    role: "Product Manager",
    company: "Innovate Labs",
    avatar: "/professional-asian-woman-headshot.png",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-6 bg-card border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-accent font-semibold mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Loved by teams worldwide</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            See what industry leaders have to say about StreamLine.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-xl border border-border bg-background p-6 flex flex-col">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="text-foreground flex-1 mb-6 leading-relaxed">"{testimonial.quote}"</blockquote>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
