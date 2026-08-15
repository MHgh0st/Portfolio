"use client";

import { useState } from "react";
import { Code2, ExternalLink, GitBranch, Layers, Activity, CheckCircle2 } from "lucide-react";

type Project = {
  id: string;
  title: string;
  category: string;
  summary: string;
  architecture: string;
  metrics: { label: string; value: string }[];
  codeSnippet: string;
  techStack: string[];
};

const PROJECTS: Project[] = [
  {
    id: "hyper-mesh",
    title: "HyperMesh // High-Throughput Event Engine",
    category: "Distributed Systems & Rust",
    summary: "A low-latency distributed pub/sub event mesh delivering sub-millisecond dispatch across thousands of concurrent microservices.",
    architecture: "Lock-free ringbuffers in Rust with zero-copy deserialization using FlatBuffers. Communicates via custom gRPC framed transport.",
    metrics: [
      { label: "P99 Dispatch Latency", value: "< 420µs" },
      { label: "Throughput", value: "3.4M msg/sec" },
      { label: "Memory Footprint", value: "14MB RSS" },
    ],
    codeSnippet: `// High-Performance Zero-Copy RingBuffer Worker
pub struct RingWorker<T> {
    ring: Arc<RingBuffer<T>>,
    atomic_head: AtomicU64,
}

impl<T> RingWorker<T> {
    #[inline(always)]
    pub fn dispatch(&self, payload: &[u8]) -> Result<(), DispatchError> {
        let cursor = self.atomic_head.fetch_add(1, Ordering::SeqCst);
        unsafe {
            self.ring.write_unchecked(cursor, payload);
        }
        Ok(())
    }
}`,
    techStack: ["Rust", "gRPC", "Tokio", "FlatBuffers", "Docker"],
  },
  {
    id: "nexus-flow",
    title: "NexusFlow // Real-Time AI Canvas Engine",
    category: "Frontend Engineering & WebGL",
    summary: "Collaborative node-based canvas for AI visual workflows running 60 FPS under 10,000 active nodes using WebGL and WebAssembly.",
    architecture: "Custom WebGL shader pipeline paired with Rust-compiled Wasm layout engine for instant edge routing and physics recalculations.",
    metrics: [
      { label: "Render Frame Rate", value: "60 FPS Constant" },
      { label: "Active Nodes Limit", value: "50,000+" },
      { label: "Bundle Size", value: "48KB Gzip" },
    ],
    codeSnippet: `// WebGL Node Instance Rendering Pipeline
const vertexShader = \`
  attribute vec2 a_position;
  attribute vec4 a_color;
  uniform mat3 u_transform;
  varying vec4 v_color;
  void main() {
    gl_Position = vec4(u_transform * vec3(a_position, 1.0), 1.0);
    v_color = a_color;
  }
\`;`,
    techStack: ["TypeScript", "WebGL", "WebAssembly", "Next.js", "Tailwind v4"],
  },
  {
    id: "chronos-db",
    title: "ChronosDB // Time-Series Analytics Store",
    category: "Database Engineering & Go",
    summary: "High-performance time-series database optimized for IoT metric aggregation and real-time query execution.",
    architecture: "LSM-tree storage engine with columnar compression (Gorilla floating-point encoding) yielding 12x storage reduction.",
    metrics: [
      { label: "Compression Ratio", value: "12.4x" },
      { label: "Write Throughput", value: "850k ops/sec" },
      { label: "Query Execution", value: "1.4ms AVG" },
    ],
    codeSnippet: `// Gorilla Floating-Point XOR Compression Strategy
func CompressBatch(timestamps []int64, values []float64) []byte {
    buf := bytes.NewBuffer(make([]byte, 0, len(values)*2))
    var prevBits uint64
    for _, val := range values {
        bits := math.Float64bits(val)
        xor := bits ^ prevBits
        writeVariableBits(buf, xor)
        prevBits = bits
    }
    return buf.Bytes()
}`,
    techStack: ["Go", "Time-Series", "Protobuf", "Distributed Consensus", "Prometheus"],
  },
];

export function CaseStudyMatrix() {
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);
  const [viewMode, setViewMode] = useState<"architecture" | "code">("architecture");

  return (
    <section id="projects" className="py-20 border-t border-[#262a31]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff4d00] uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4" />
            <span>PRODUCTION ENGINEERING CASE STUDIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans text-[#e5e7eb] tracking-tight">
            High-Impact Engineering Projects
          </h2>
          <p className="mt-2 text-[#9ca3af] font-sans max-w-2xl text-sm leading-relaxed">
            Explorations in low-latency systems, web graphics engines, and distributed databases built with extreme craft.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Project List Column */}
          <div className="lg:col-span-4 space-y-3">
            {PROJECTS.map((project) => {
              const isSelected = selectedProject.id === project.id;
              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`w-full text-left p-5 border transition-all cursor-pointer relative ${
                    isSelected
                      ? "bg-[#121417] border-[#ff4d00] shadow-lg"
                      : "bg-[#0b0c0e]/80 border-[#262a31] hover:border-[#393f4a]"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-[#ff4d00]" />
                  )}
                  <div className="text-[10px] font-mono text-[#ff4d00] uppercase font-bold tracking-wider mb-1">
                    {project.category}
                  </div>
                  <h3 className="text-base font-bold font-sans text-[#e5e7eb] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs font-sans text-[#9ca3af] line-clamp-2">
                    {project.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Project Inspector Column */}
          <div className="lg:col-span-8 bg-[#121417] border border-[#262a31] font-mono">
            {/* Inspector Header & View Switcher */}
            <div className="px-5 py-3 bg-[#1a1d22] border-b border-[#262a31] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-[#ff4d00]" />
                <span className="text-xs font-bold text-[#e5e7eb]">
                  {selectedProject.id.toUpperCase()} // DEEP_DIVE
                </span>
              </div>

              <div className="flex items-center bg-[#0b0c0e] p-1 border border-[#262a31]">
                <button
                  onClick={() => setViewMode("architecture")}
                  className={`px-3 py-1 text-xs transition-colors cursor-pointer ${
                    viewMode === "architecture"
                      ? "bg-[#ff4d00] text-[#0b0c0e] font-bold"
                      : "text-[#9ca3af] hover:text-[#e5e7eb]"
                  }`}
                >
                  ARCHITECTURE
                </button>
                <button
                  onClick={() => setViewMode("code")}
                  className={`px-3 py-1 text-xs transition-colors cursor-pointer ${
                    viewMode === "code"
                      ? "bg-[#ff4d00] text-[#0b0c0e] font-bold"
                      : "text-[#9ca3af] hover:text-[#e5e7eb]"
                  }`}
                >
                  SOURCE CODE
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="p-6">
              {/* Metrics Banner */}
              <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-[#0b0c0e] border border-[#262a31]">
                {selectedProject.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-[10px] text-[#6b7280] uppercase tracking-wider">
                      {metric.label}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#ff4d00] mt-1">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {viewMode === "architecture" ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs text-[#9ca3af] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-[#ff4d00]" />
                      Overview & Problem Statement
                    </h4>
                    <p className="text-sm font-sans text-[#e5e7eb] leading-relaxed">
                      {selectedProject.summary}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs text-[#9ca3af] uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#ff4d00]" />
                      Architectural Blueprint
                    </h4>
                    <p className="text-sm font-sans text-[#9ca3af] leading-relaxed p-4 bg-[#0b0c0e] border border-[#262a31]">
                      {selectedProject.architecture}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs text-[#9ca3af] uppercase tracking-wider mb-2">
                      Tech Stack Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-[#1a1d22] border border-[#262a31] text-xs text-[#e5e7eb]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#0b0c0e] border border-[#262a31] p-4 text-xs overflow-x-auto text-[#e5e7eb]">
                  <pre className="font-mono leading-relaxed">
                    <code>{selectedProject.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
