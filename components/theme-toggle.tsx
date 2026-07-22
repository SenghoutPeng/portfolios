"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground/55 transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-foreground",
        className,
      )}
    >
      {mounted ? (
        isDark ? (
          <Sun key="light" className="theme-icon-pop size-[18px]" />
        ) : (
          <Moon key="dark" className="theme-icon-pop size-[18px]" />
        )
      ) : (
        <span className="block h-[18px] w-[18px]" />
      )}
    </button>
  );
}
