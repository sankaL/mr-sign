import type { LucideIcon } from "lucide-react";

import { statusStateContent } from "@/lib/site";

type StatePanelProps = {
  kind: keyof typeof statusStateContent;
};

export function StatePanel({ kind }: StatePanelProps) {
  const content = statusStateContent[kind];
  const Icon: LucideIcon = content.icon;

  return (
    <div className="rounded-xl border border-[#151515]/10 bg-white p-4">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#CCFF00] text-[#151515]">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-base font-black uppercase leading-none">
            {content.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[#151515]/65">
            {content.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="rounded-[2rem] border border-[#151515]/10 bg-white p-6">
      <div className="h-4 w-32 rounded-full bg-[#D8DDE3]" />
      <div className="mt-6 grid gap-3">
        <div className="h-12 rounded-2xl bg-[#D8DDE3]" />
        <div className="h-12 rounded-2xl bg-[#D8DDE3]/70" />
        <div className="h-12 rounded-2xl bg-[#D8DDE3]/45" />
      </div>
    </div>
  );
}
