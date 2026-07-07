import Link from "next/link";

export function BrandLogo() {
  return (
    <Link
      href="/"
      className="group flex min-h-11 items-center gap-2 text-[var(--ink)]"
      aria-label="Mr. Sign and Print home"
    >
      <span className="text-xl font-black tracking-[-0.06em] md:text-[1.65rem]">
        MR. SIGN
      </span>
      <span className="rounded-[0.2rem] border border-[var(--ink)] px-2 py-1 text-[0.58rem] font-extrabold tracking-[0.16em] transition-colors group-hover:bg-[var(--ink)] group-hover:text-white">
        PRINT
      </span>
    </Link>
  );
}
