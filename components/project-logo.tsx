"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Renders a project's logo image, falling back to its initial letter in a
 * tile if the image is missing or fails to load. Needs client state for the
 * `onError` fallback, so it's split out as a small leaf component — the
 * project detail page itself stays a server component.
 */
export function ProjectLogo({
  src,
  title,
  className,
}: {
  src?: string;
  title: string;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;

  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-[0_0_0_1px_var(--glow-primary)]",
        className,
      )}
    >
      {showImage ? (
        <Image
          src={src}
          alt={`${title} logo`}
          width={96}
          height={96}
          className="h-2/3 w-2/3 object-contain"
          onError={() => setErrored(true)}
        />
      ) : (
        <span className="font-display text-3xl text-primary">
          {title.charAt(0)}
        </span>
      )}
    </div>
  );
}
