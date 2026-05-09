import Link from "next/link";

import { SiteShell } from "@/components/site/site-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { primaryActions } from "@/lib/site";

export default function NotFound() {
  return (
    <SiteShell>
      <main className="bg-[#FFFAF0] px-5 py-20 md:px-10 md:py-28">
        <section className="mx-auto grid max-w-[900px] gap-8 rounded-[2rem] border border-[#151515]/10 bg-white p-6 md:p-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#E51B23]">
              Page not found
            </p>
            <h1 className="mt-4 text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-[0.88] tracking-tight">
              This route is not on the shop board.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-[#151515]/66">
              Browse the public service pages or contact the shop directly for
              signs, printing, and design support.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={primaryActions.services.href}>
              Browse services
            </ButtonLink>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#151515]/15 px-5 py-3 text-xs font-black uppercase tracking-wide text-[#151515] transition-colors hover:bg-[#151515] hover:!text-white focus-visible:bg-[#151515] focus-visible:!text-white active:scale-[0.98]"
            >
              Contact us
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
