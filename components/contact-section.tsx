"use client"

import { useState, type FormEvent } from "react"
import { Linkedin, Github, Send, Mail, Clock, CircleDot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/motion"

// TODO: fill these in — empty href leaves the link inert for now, matching
// the placeholder pattern used in hero-section.tsx.
const socials = [
  { label: "LinkedIn", href: "", icon: Linkedin },
  { label: "GitHub", href: "", icon: Github },
  { label: "Telegram", href: "", icon: Send },
  { label: "Email", href: "mailto:henglong0000@gmail.com", icon: Mail },
]

// TODO: confirm this is still accurate closer to send time.
const AVAILABILITY = "Open to internships / new grad roles"
const TIMEZONE = "GMT+7 (Phnom Penh)"

export function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${name || "someone"}`)
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? ` (${email})` : ""}`
    )
    window.location.href = `mailto:henglong0000@gmail.com?subject=${subject}&body=${body}`
  }

  const fieldClass =
    "w-full rounded-md border border-border bg-surface-1 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary"

  return (
    <section id="contact" className="scroll-mt-28">
      <h2 className="section-label mb-8" data-index="05">
        Get In Touch
      </h2>

      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <FadeIn className="flex flex-col justify-between">
          <div className="space-y-8">
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
              Have a project in mind, or just want to talk shop? My inbox is
              open — I try to reply within a day or two.
            </p>

            <div className="surface-card space-y-4 p-6">
              <div className="flex items-center gap-3">
                <CircleDot className="size-4 shrink-0 text-primary" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Availability
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">
                    {AVAILABILITY}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="size-4 shrink-0 text-primary" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Timezone
                  </p>
                  <p className="mt-0.5 font-mono text-sm font-medium text-foreground">
                    {TIMEZONE}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Elsewhere
              </p>
              <div className="mt-3 flex items-center gap-4">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href || undefined}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="tile-hover flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={fieldClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@gmail.com"
                className={fieldClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="I'm interested in working with you!"
                className={`${fieldClass} resize-y`}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="h-11 rounded-md bg-primary px-8 font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
              >
                Send
              </Button>
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  )
}
