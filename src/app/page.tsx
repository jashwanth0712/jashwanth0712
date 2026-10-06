import Link from "next/link";
import {
  GithubIcon,
  WrenchIcon,
  LinkedinIcon,
  TwitterIcon,
  ExternalLinkIcon,
  PenIcon,
  MicIcon,
} from "lucide-react";
import Projects from "./projects";

const blogs = [
  {
    title: "How to Connect Convex to RunPod for Serverless GPU Workloads",
    url: "https://stack.convex.dev/convex-gpu-runpod-workflows",
    platform: "Convex Blog — Feb 2026",
  },
  {
    title: "Matrix: Building a Real-Time RPG Game with Convex",
    url: "https://stack.convex.dev/matrix-building-a-real-time-rpg-game-with-convex",
    platform: "Convex Blog — Feb 2025",
  },
];

const skills = [
  "TypeScript",
  "React / Next.js",
  "Node.js",
  "Python",
  "Solidity",
  "React Native",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Convex",
  "AI / RAG",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <main className="mx-auto max-w-2xl px-6 py-20 font-[family-name:var(--font-geist-sans)]">
        {/* Hero */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
            Jashwanth Peddisetty
          </h1>
          <p className="text-lg text-zinc-400 mb-6">
            Builder. Shipping products that people actually use.
          </p>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Developer at{" "}
            <a
              href="https://randomwalk.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400"
            >
              RandomWalk.ai
            </a>
            , building{" "}
            <a
              href="https://promptli.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400"
            >
              Promptli
            </a>{" "}
            — an AI frontdesk for offline stores. Full-stack developer from
            Hyderabad working at the intersection of{" "}
            <span className="text-blue-400">AI</span>,{" "}
            <span className="text-purple-400">blockchain</span>, and{" "}
            <span className="text-emerald-400">product</span>. I ship fast,
            write technical blogs as a{" "}
            <span className="text-orange-400">Convex Champion</span>, and give
            talks on AI.
          </p>
          <p className="text-sm text-zinc-500 mb-6">
            141+ repos &middot; Convex Champion &middot; building in public
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/jashwanth0712"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white"
              aria-label="GitHub"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="https://x.com/jashwanth0712"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white"
              aria-label="Twitter"
            >
              <TwitterIcon size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/jashwanth-peddisetty/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={20} />
            </a>
            <Link
              href="/tools"
              className="text-zinc-400 hover:text-white"
              aria-label="Tools"
              title="Tools"
            >
              <WrenchIcon size={20} />
            </Link>
          </div>
        </section>

        <Projects />

        {/* Writing */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
            <PenIcon size={14} />
            Writing
          </h2>
          <div className="space-y-3">
            {blogs.map((blog) => (
              <a
                key={blog.title}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-zinc-800 p-4 transition-colors hover:border-zinc-600 hover:bg-zinc-900/50"
              >
                <p className="font-medium text-white">{blog.title}</p>
                <p className="text-xs text-zinc-500 mt-1">{blog.platform}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Talks */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
            <MicIcon size={14} />
            Talks & Sessions
          </h2>
          <p className="text-zinc-400">
            I speak about AI, agents, and building products at meetups and
            conferences. Interested in having me speak?{" "}
            <a
              href="https://x.com/jashwanth0712"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              Reach out on Twitter
            </a>
            .
          </p>
        </section>

        {/* What I Build */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-6">
            What I Build
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            I don&apos;t stick to one thing. If it can be built, I&apos;ll
            figure it out — websites, mobile apps, games, Chrome extensions,
            VS Code extensions, CLIs, smart contracts, AI agents. The stack
            changes, the habit doesn&apos;t.
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-sm px-3 py-1 rounded-full border border-zinc-800 text-zinc-300 hover:border-zinc-600 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Ventures */}
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-6">
            Ventures
          </h2>
          <div className="space-y-4">
            <a
              href="https://promptli.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-zinc-800 p-4 transition-colors hover:border-zinc-600 hover:bg-zinc-900/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">Promptli</h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    AI frontdesk for offline stores
                  </p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                  US
                </span>
              </div>
            </a>
            <a
              href="https://artly.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-zinc-800 p-4 transition-colors hover:border-zinc-600 hover:bg-zinc-900/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">
                    Artly Creative Labs Pvt Ltd
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    Creative tech studio
                  </p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                  Hyderabad, India
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800 pt-8 text-center">
          <p className="text-sm text-zinc-600">
            jashwanth.fun
          </p>
        </footer>
      </main>
    </div>
  );
}
