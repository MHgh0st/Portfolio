"use client";

import { Cpu, Terminal, Shield, Wrench, Globe, Server, Check } from "lucide-react";

type SkillCategory = {
  title: string;
  skills: { name: string; level: string; detail: string }[];
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Systems & Backend Engineering",
    skills: [
      { name: "Rust", level: "EXPERT", detail: "Async Tokio, FFI, lock-free concurrency, memory safety" },
      { name: "Go (Golang)", level: "EXPERT", detail: "Microservices, gRPC, channel design, high throughput" },
      { name: "Node.js / TypeScript", level: "MASTERY", detail: "V8 internals, event loop optimization, Next.js App Router" },
      { name: "Distributed SQL / NoSQL", level: "ADVANCED", detail: "CockroachDB, PostgreSQL, Redis L2 caching, Kafka" },
    ],
  },
  {
    title: "Frontend Architecture & Graphics",
    skills: [
      { name: "React / Next.js", level: "MASTERY", detail: "RSC architecture, SSR/SSG, state management, Tailwind v4" },
      { name: "WebGL / Three.js", level: "ADVANCED", detail: "Custom shaders, instanced rendering, canvas optimization" },
      { name: "Performance & Web Vitals", level: "EXPERT", detail: "Sub-100ms LCP, bundle splitting, memory leak diagnosis" },
    ],
  },
  {
    title: "Cloud & DevOps Infrastructure",
    skills: [
      { name: "Kubernetes & Docker", level: "ADVANCED", detail: "Multi-cluster orchestration, Helm charts, service mesh" },
      { name: "CI/CD & Observability", level: "ADVANCED", detail: "GitHub Actions, Prometheus, Grafana, OpenTelemetry" },
    ],
  },
];

export function TechnicalRadar() {
  return (
    <section id="radar" className="py-20 border-t border-[#262a31] bg-[#0b0c0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff4d00] uppercase tracking-wider mb-2">
            <Cpu className="w-4 h-4" />
            <span>TECHNICAL CAPABILITIES MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#e5e7eb] tracking-tight">
            Engineering Radar & Craft Floor
          </h2>
          <p className="mt-2 text-[#9ca3af] font-sans max-w-2xl text-sm leading-relaxed">
            Core stack competencies evaluated by operational impact and architectural experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="bg-[#121417] border border-[#262a31] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-[#ff4d00] font-bold uppercase mb-4 pb-2 border-b border-[#262a31]">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{cat.title}</span>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#e5e7eb] font-sans">
                          {skill.name}
                        </span>
                        <span className="px-2 py-0.5 bg-[#1a1d22] border border-[#ff4d00]/30 text-[10px] text-[#ff4d00]">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9ca3af] font-sans leading-normal">
                        {skill.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#262a31] flex items-center justify-between text-[11px] text-[#6b7280]">
                <span>AUDITED CAPACITY</span>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
