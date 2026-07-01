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
    <section className="bg-[#0B1F55] px-5 py-10 text-white md:px-10 md:py-14">
      <div className="mx-auto max-w-[1440px]">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CCFF00]">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl text-[clamp(2.25rem,5vw,4.25rem)] font-black uppercase leading-[0.92] tracking-tight">
            {title}
          </h1>
        </div>
        <div className="mt-5">
          <p className="text-sm font-semibold leading-6 text-white/80 md:text-base md:leading-7">
            {description}
          </p>
          {children ? <div className="mt-5">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
