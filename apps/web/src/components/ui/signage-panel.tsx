type SignagePanelProps = {
  label: string;
  accent?: "blue" | "red" | "yellow";
  className?: string;
};

const accentStyles = {
  blue: "bg-[#0B1F55] text-white border-white/40",
  red: "bg-[#E51B23] text-white border-white/40",
  yellow: "bg-[#CCFF00] text-[#151515] border-[#151515]/15",
};

export function SignagePanel({
  label,
  accent = "yellow",
  className = "",
}: SignagePanelProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border p-5 shadow-[0_18px_36px_rgba(13,31,143,0.18)] ${accentStyles[accent]} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.28)_0_10%,transparent_10%_26%,rgba(255,255,255,0.18)_26%_36%,transparent_36%)]" />
      <div className="relative flex min-h-36 flex-col justify-between">
        <span className="w-fit rounded-full border border-current/20 bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
          Shop proof
        </span>
        <p className="mt-8 text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">
          {label}
        </p>
      </div>
    </div>
  );
}
