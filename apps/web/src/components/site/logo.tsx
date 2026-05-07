import Link from "next/link";

export function BrandLogo() {
  return (
    <Link
      href="/"
      className="flex min-h-11 items-center gap-1"
      aria-label="Mr. Sign and Print home"
    >
      <span className="relative rounded-2xl rounded-bl-sm bg-white px-3 py-1.5 text-xs font-black tracking-tight text-[#151515] shadow-sm md:text-sm">
        MR. SIGN
        <span
          className="absolute -bottom-1.5 left-0 h-3 w-3 bg-white"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        />
      </span>
      <span className="rounded-full border-[1.5px] border-white bg-[#FFF200] px-3 py-1.5 text-xs font-black text-[#151515] shadow-sm md:text-sm">
        PRINT
      </span>
    </Link>
  );
}
