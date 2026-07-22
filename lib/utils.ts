import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Next's dev-mode streaming can leave a stale `hidden` copy of a Suspense
 * boundary in the DOM alongside the live one, so a duplicate `id` briefly
 * exists. Plain `getElementById` returns whichever comes first in document
 * order — sometimes the hidden copy — which throws off scroll-target math.
 * This finds the first match that isn't sitting inside a `[hidden]` ancestor.
 */
export function getVisibleElementById(id: string): HTMLElement | null {
  const matches = document.querySelectorAll<HTMLElement>(`#${id}`);
  for (const el of matches) {
    if (!el.closest("[hidden]")) return el;
  }
  return null;
}

/**
 * Scrolls to a section by id, relying on the element's own
 * `scroll-margin-top` (set globally in globals.css via `--nav-offset`)
 * instead of a JS-maintained offset constant kept in sync by hand.
 */
export function scrollToId(id: string) {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = getVisibleElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}
