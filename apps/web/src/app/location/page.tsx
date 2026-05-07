import { SiteShell } from "@/components/site/site-shell";
import { CtaSection } from "@/components/ui/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { siteContact } from "@/lib/site";

export const metadata = {
  title: "Location",
};

export default function LocationPage() {
  return (
    <SiteShell>
      <main>
        <PageHeader
          eyebrow="Location"
          title="Visit the Vaughan shop for sign and print support."
          description="A production-ready contact layout foundation. Map embeds and final hours can be expanded when launch content is locked."
        />
        <section className="px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-[1152px] gap-6 md:grid-cols-[1fr_1fr]">
            <div className="rounded-[2rem] border border-[#151515]/10 bg-white p-6 md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#E51B23]">
                Address
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-none">
                {siteContact.address}
              </h2>
              <p className="mt-5 text-sm font-semibold leading-6 text-[#151515]/65">
                Serving {siteContact.serviceArea}. Call ahead for quote timing,
                pickup details, and production questions.
              </p>
            </div>
            <div className="relative min-h-72 overflow-hidden rounded-[2rem] border border-[#151515]/10 bg-[#FFF200] p-6">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#15151518_1px,transparent_1px),linear-gradient(to_bottom,#15151518_1px,transparent_1px)] bg-[size:2rem_2rem]" />
              <div className="relative flex h-full flex-col justify-between">
                <span className="w-fit rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
                  Vaughan
                </span>
                <p className="text-5xl font-black uppercase leading-none text-[#151515]">
                  Four Valley Dr.
                </p>
              </div>
            </div>
          </div>
        </section>
        <CtaSection title="Planning a pickup or shop visit?" />
      </main>
    </SiteShell>
  );
}
