import Link from "next/link";

import { SiteShell } from "@/components/site/site-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { primaryActions } from "@/lib/site";

export default function NotFound() {
  return (
    <SiteShell>
      <main className="section-space bg-[var(--canvas)]">
        <section className="site-container max-w-[900px]">
          <div>
            <p className="eyebrow">Page not found</p>
            <h1 className="display-title mt-4">
              This route is not on the shop board.
            </h1>
            <p className="body-copy mt-5 max-w-2xl">
              Browse the public service pages or contact the shop directly for
              signs, printing, manufacturing, and services.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={primaryActions.services.href}>
              Browse services
            </ButtonLink>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-[0.45rem] border border-[var(--line)] px-5 py-3 text-[0.68rem] font-extrabold uppercase tracking-[0.06em] text-[var(--ink)] transition-colors hover:border-[var(--ink)]"
            >
              Contact us
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
