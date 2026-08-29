import Link from "next/link";

import { Button } from "@/components/ui/button";

export const NotFoundView = () => (
  <section className="band-surface py-28 md:py-40">
    <div className="container-content text-center">
      <p className="kicker">Error 404</p>
      <h1 className="mt-4 text-heading-lg font-semibold text-foreground">
        This page has stopped.
      </h1>
      <p className="mt-5 text-body text-muted-foreground max-w-[40ch] mx-auto">
        The page you were looking for doesn’t exist or has moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/products">Shop all watches</Link>
        </Button>
        <Button asChild variant="neutral" size="lg">
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </div>
  </section>
);
