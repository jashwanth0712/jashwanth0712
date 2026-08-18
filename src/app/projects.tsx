"use client";

import { useState } from "react";
import { ExternalLinkIcon, ChevronDownIcon } from "lucide-react";

interface Project {
  name: string;
  description: string;
  tags: string[];
  link?: string;
  website?: string;
  image?: string;
}

const projects: Project[] = [
  {
    name: "EAR",
    description:
      "Private, on-device AI meeting notes for iPhone — record, transcribe, identify speakers, and turn conversations into follow-up tasks.",
    tags: ["iOS", "On-device AI", "Privacy"],
    link: "https://github.com/jashwanth0712/ear",
    image: "/projects/ear.png",
  },
  {
    name: "Pixel Agents",
    description:
      "Desktop app that turns your AI coding agents into pixel art characters in a cozy virtual office. Cross-platform with auto-updates.",
    tags: ["Desktop", "AI", "Electron"],
    website: "https://pixelagent.space",
    image: "/projects/pixel-agents.png",
  },
  {
    name: "Unseizable",
    description:
      "Canadian-friendly Bitcoin and stablecoin exchange interface with a wallet-first mobile experience.",
    tags: ["Bitcoin", "Stablecoins", "Mobile"],
    website: "https://unseizable.com",
    image: "/projects/unseizable.png",
  },
  {
    name: "Promptli",
    description: "AI frontdesk for offline stores — currently building",
    tags: ["AI", "SaaS", "Active"],
    link: "https://promptli.com",
  },
  {
    name: "EasyClaw",
    description: "SaaS tool with $150 MRR and 5 paying customers",
    tags: ["SaaS", "Revenue"],
  },
  {
    name: "Documate",
    description: "Documentation tool — 80 users, featured on Product Hunt",
    tags: ["Product Hunt", "80 users"],
  },
  {
    name: "Synapse",
    description:
      "Agent knowledge marketplace via Stellar x402 micropayments",
    tags: ["AI Agents", "Web3"],
    link: "https://github.com/jashwanth0712/synapse",
  },
  {
    name: "MoltStack",
    description:
      "Agent-to-agent knowledge marketplace where agents trade hard-won solutions",
    tags: ["AI Agents", "Marketplace"],
    link: "https://github.com/jashwanth0712/moltstack",
  },
  {
    name: "PeerNet",
    description: "Decentralized VPN built for privacy-first networking",
    tags: ["Web3", "Privacy"],
    link: "https://github.com/jashwanth0712/peernet",
  },
  {
    name: "Cinemachine",
    description: "Creative storytelling platform for kids",
    tags: ["Creative", "Education"],
    link: "https://github.com/jashwanth0712/cinemachine",
  },
];

const INITIAL_COUNT = 3;

export default function Projects() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <section className="mb-16">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-6">
        Projects
      </h2>
      <div className="relative">
        <div className="space-y-4">
          {visible.map((project, i) => {
            const isFading =
              !expanded && i >= INITIAL_COUNT - 1;
            return (
              <div
                key={project.name}
                className="group rounded-lg border border-zinc-800 p-4 transition-colors hover:border-zinc-600 hover:bg-zinc-900/50"
                style={{
                  opacity: isFading ? 0.4 : 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                <div className="flex items-start gap-4">
                  {project.image && (
                    <a
                      href={project.website ?? project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0"
                    >
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    </a>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-white flex items-center gap-2">
                      {project.name}
                      {project.website && (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-500 hover:text-blue-400"
                        >
                          <ExternalLinkIcon size={14} />
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-500 hover:text-blue-400"
                        >
                          <ExternalLinkIcon size={14} />
                        </a>
                      )}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-1">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
        )}
      </div>

      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="mt-4 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronDownIcon size={16} />
          I never stop building — see more
        </button>
      ) : (
        <a
          href="https://github.com/jashwanth0712"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-white mt-4"
        >
          ...and 141+ more on GitHub
          <ExternalLinkIcon size={12} />
        </a>
      )}
    </section>
  );
}
