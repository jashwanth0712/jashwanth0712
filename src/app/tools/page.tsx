import type { Metadata } from "next";
import Link from "next/link";
import { WrenchIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Tools | Jashwanth Peddisetty",
  description:
    "Free browser tools by Jashwanth Peddisetty: polygon labeler for annotating image regions with auto-fit text. No upload, no signup.",
  alternates: { canonical: "https://jashwanth.fun/tools" },
};

const tools = [
  {
    name: "Polygon Labeler",
    description:
      "Draw polygons on an image and label each region. Text auto-sizes to fit inside the shape. Export as PNG.",
    href: "/tools/polygon-labeler",
    tags: ["Image annotation", "Polygon", "Text labels", "No upload"],
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <main className="mx-auto max-w-2xl px-6 py-12 font-[family-name:var(--font-geist-sans)]">
        <Link href="/" className="text-sm text-zinc-500 hover:text-white mb-6 inline-block">
          &larr; Home
        </Link>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
          Tools
        </h1>
        <p className="text-zinc-400 mb-10">
          Small utilities I built for myself. Everything runs in your browser,
          nothing is uploaded.
        </p>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
          <WrenchIcon size={14} />
          All tools
        </h2>
        <div className="space-y-3">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="block rounded-lg border border-zinc-800 p-4 transition-colors hover:border-zinc-600 hover:bg-zinc-900/50"
            >
              <p className="font-medium text-white">{t.name}</p>
              <p className="text-sm text-zinc-400 mt-1">{t.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
