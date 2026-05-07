import Link from "next/link";

const publicRoutes = [
  { href: "/signs", label: "Signs" },
  { href: "/printing", label: "Printing" },
  { href: "/design", label: "Design" },
  { href: "/request-quote", label: "Request Quote" },
  { href: "/order-online", label: "Order Online" },
  { href: "/location", label: "Location" },
  { href: "/contact", label: "Contact" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#1936D4] px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col justify-center">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#FFF200]">
          Mr. Sign and Print
        </p>
        <h1 className="mt-4 max-w-4xl text-5xl font-black uppercase leading-[0.9] md:text-8xl">
          Signs, printing, and design for Vaughan and the GTA.
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-semibold text-white/80">
          Production Next.js foundation is ready. The visual Vite prototype will
          be migrated during Phase 2.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {publicRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="rounded-full border border-white/35 px-4 py-2 text-sm font-black uppercase transition-colors hover:bg-white hover:text-[#1936D4]"
            >
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
