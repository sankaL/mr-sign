import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <section className="bg-[#1936D4] px-5 py-16 text-white md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#CCFF00]">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(3.25rem,8vw,7.5rem)] font-black uppercase leading-[0.88] tracking-tight">
            {title}
          </h1>
        </div>
        <div className="max-w-xl">
          <p className="text-base font-semibold leading-7 text-white/80 md:text-lg">
            {description}
          </p>
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
