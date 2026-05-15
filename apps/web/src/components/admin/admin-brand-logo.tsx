import Link from "next/link";

type AdminBrandLogoProps = {
  badgeBg?: string;
};

export function AdminBrandLogo({ badgeBg = "white" }: AdminBrandLogoProps) {
  return (
    <Link
      href="/admin"
      className="inline-flex items-center gap-1"
      aria-label="Mr. Sign and Print admin"
    >
      <span
        className="relative rounded-xl rounded-bl-sm px-2.5 py-1 text-[11px] font-black tracking-tight text-[#151515]"
        style={{ background: badgeBg }}
      >
        MR. SIGN
        <span
          className="absolute -bottom-1 left-0 h-2.5 w-2.5"
          style={{
            background: badgeBg,
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
          }}
        />
      </span>
      <span className="rounded-full border-[1.5px] border-white/20 bg-[#CCFF00] px-2.5 py-1 text-[11px] font-black text-[#151515]">
        PRINT
      </span>
    </Link>
  );
}
