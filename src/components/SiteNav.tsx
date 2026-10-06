import Link from "next/link";

export default function SiteNav() {
  return (
    <nav className="mx-auto flex max-w-2xl items-center gap-6 px-6 pt-8 font-[family-name:var(--font-geist-sans)] text-sm">
      <Link href="/" className="font-medium text-white">
        jashwanth.fun
      </Link>
      <div className="ml-auto flex gap-5 text-zinc-400">
        <Link href="/" className="hover:text-white">
          Home
        </Link>
        <Link href="/tools" className="hover:text-white">
          Tools
        </Link>
      </div>
    </nav>
  );
}
