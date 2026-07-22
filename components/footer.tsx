const STACK = ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"]

const VERSION = "v1.0"
const LAST_UPDATED_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-foreground">
              SP<span className="text-primary">.</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              &copy; {LAST_UPDATED_YEAR} Senghout Peng. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-start gap-1 text-xs text-muted-foreground md:items-end">
            <p>
              Built with{" "}
              {STACK.map((tech, i) => (
                <span key={tech}>
                  <span className="text-foreground/80">{tech}</span>
                  {i < STACK.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p className="font-mono">
              {VERSION} &middot; last updated {LAST_UPDATED_YEAR}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
