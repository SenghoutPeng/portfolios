"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll } from "motion/react";
import { cn, scrollToId, getVisibleElementById } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Nav items support both in-page anchors and real routes from day one, so
 * later phases can promote a section (e.g. Projects) to a real route like
 * `/work` without touching this component's rendering logic — only the
 * data below changes.
 */
type NavItem =
  | { type: "anchor"; id: string; label: string }
  | { type: "route"; href: string; label: string };

const items: NavItem[] = [
  { type: "anchor", id: "projects", label: "Work" },
  { type: "anchor", id: "philosophy", label: "Philosophy" },
  { type: "anchor", id: "expertise", label: "Expertise" },
  { type: "anchor", id: "experience", label: "Experience" },
  { type: "anchor", id: "contact", label: "Contact" },
];

const sectionIds = items.filter((i) => i.type === "anchor").map((i) => i.id);

export function Navigation() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) return;
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      if (window.scrollY < 160) {
        setActive("home");
        return;
      }
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(sectionIds[sectionIds.length - 1]);
        return;
      }
      for (const id of [...sectionIds].reverse()) {
        const el = getVisibleElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onHome]);

  useEffect(() => {
    if (!onHome) setScrolled(true);
  }, [onHome]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled && "solid-bar",
      )}
    >
      {onHome && (
        <motion.div
          className="absolute inset-x-0 top-0 h-px origin-left bg-primary"
          style={{ scaleX: scrollYProgress }}
        />
      )}

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
        <Link
          href="/"
          onClick={(e) => {
            if (onHome) {
              e.preventDefault();
              scrollToId("home");
              setActive("home");
            }
          }}
          className="font-display text-lg font-semibold tracking-tight text-foreground"
        >
          SP<span className="text-primary">.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item) => {
            const isActive = item.type === "anchor" && active === item.id;
            const commonClass = cn(
              "rounded-none border-b-2 px-3 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            );

            if (item.type === "route") {
              return (
                <Link key={item.href} href={item.href} className={commonClass}>
                  {item.label}
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (onHome) {
                    scrollToId(item.id);
                    setActive(item.id);
                  } else {
                    window.location.href = `/#${item.id}`;
                  }
                }}
                className={commonClass}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>

      {/* mobile section rail */}
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-border/70 px-4 py-2 md:hidden">
        {items.map((item) => {
          const isActive = item.type === "anchor" && active === item.id;
          const commonClass = cn(
            "flex shrink-0 items-center rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
            isActive
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground",
          );

          if (item.type === "route") {
            return (
              <Link key={item.href} href={item.href} className={commonClass}>
                {item.label}
              </Link>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => {
                if (onHome) {
                  scrollToId(item.id);
                  setActive(item.id);
                } else {
                  window.location.href = `/#${item.id}`;
                }
              }}
              className={commonClass}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
