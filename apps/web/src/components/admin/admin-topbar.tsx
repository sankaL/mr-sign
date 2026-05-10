import type { ReactNode } from "react";

type AdminTopBarProps = {
  title: string;
  description: string;
  actions?: ReactNode;
};

export function AdminTopBar({ title, description, actions }: AdminTopBarProps) {
  return (
    <div className="sticky top-0 z-10 border-b border-[#151515]/8 bg-white px-6 py-5 lg:px-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#151515] lg:text-2xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-[#151515]/55">{description}</p>
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}

