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
    <section className="border-b border-[var(--line)] bg-[var(--canvas)] py-16 md:py-24">
      <div className="site-container grid gap-8">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-title mt-4 max-w-4xl">{title}</h1>
        </div>
        <div>
          <p className="body-copy w-full">{description}</p>
          {children ? <div className="mt-5">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
