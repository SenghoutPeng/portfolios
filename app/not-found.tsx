import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="font-display text-4xl font-semibold text-foreground">
        Page not found
      </h1>
      <p className="max-w-sm text-muted-foreground">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link href="/">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Back home
        </Button>
      </Link>
    </main>
  );
}
