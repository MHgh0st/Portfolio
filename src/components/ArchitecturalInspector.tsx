"use client";

import { useState } from "react";
import { Cpu, Database, ShieldCheck, Zap, Layers, Terminal, Server, ArrowRight } from "lucide-react";

type ServiceNode = {
  id: string;
  name: string;
  type: "API Gateway" | "Microservice" | "Cache Layer" | "Database Cluster";
  latency: string;
  status: "OPTIMAL" | "ACTIVE" | "READY";
  throughput: string;
  description: string;
};

const NODES: ServiceNode[] = [
  {
    id: "edge-gateway",
    name: "Edge API Router",
    type: "API Gateway",
    latency: "1.2ms",
    status: "OPTIMAL",
    throughput: "245k req/s",
    description: "Rust-based edge proxy with automatic JWT payload verification and zero-allocation rate limiting.",
  },
  {
    id: "event-bus",
    name: "Distributed Event Pipeline",
    type: "Microservice",
    latency: "4.8ms",
    status: "ACTIVE",
    throughput: "1.2M msg/s",
    description: "Kafka & NATS streaming architecture handling transactional events with strict ordering constraints.",
  },
  {
    id: "l2-cache",
    name: "Sub-millisecond Cache",
    type: "Cache Layer",
    latency: "0.4ms",
    status: "OPTIMAL",
    throughput: "890k op/s",
    description: "Multi-tier Redis cluster with memory-mapped bloom filters for fast negative cache checks.",
  },
  {
    id: "db-cluster",
    name: "CockroachDB Sharded Engine",
    type: "Database Cluster",
    latency: "8.5ms",
    status: "READY",
    throughput: "45k tps",
    description: "Distributed ACID SQL database deployed across 3 global regions with automated leader election.",
  },
];

export function ArchitecturalInspector() {
  const [selectedNode, setSelectedNode] = useState<ServiceNode>(NODES[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "SYS.INIT: Distributed System Inspector loaded",
    "NET.TRACE: 4 nodes operational across 3 regions",
    "STATUS: Ready for real-time telemetry inspection",
  ]);

  const runSimulation = () => {
    setIsSimulating(true);
    const newLog = `TRACE [${new Date().toLocaleTimeString()}]: Executing trace query on ${selectedNode.name} -> Latency: ${selectedNode.latency} (PASSED)`;
    setLogs((prev) => [newLog, ...prev.slice(0, 4)]);
    setTimeout(() => setIsSimulating(false), 600);
  };

  return (
    <div className="w-full bg-[#121417] border border-[#262a31] rounded-none overflow-hidden font-mono shadow-2xl">
      {/* Window Titlebar */}
      <div className="px-4 py-2.5 bg-[#1a1d22] border-b border-[#262a31] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#ff4d00]" />
          <span className="text-xs font-semibold text-[#e5e7eb] tracking-wide">
            ARCH.INSPECTOR // SYSTEM DIAGRAM
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#9ca3af]">
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            ENGINE_ONLINE
          </span>
          <span className="text-[#393f4a]">|</span>
          <span>BUILD: v4.8.2</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#262a31]">
        {/* Left Column: Interactive Topology Nodes */}
        <div className="lg:col-span-7 p-5 bg-[#0b0c0e]/50">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-[#9ca3af] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#ff4d00]" />
              Topology Nodes (Select to Inspect)
            </div>
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="px-2.5 py-1 bg-[#1a1d22] hover:bg-[#262a31] text-[#ff4d00] border border-[#ff4d00]/30 text-[11px] transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Zap className={`w-3 h-3 ${isSimulating ? "animate-spin" : ""}`} />
              {isSimulating ? "TRACING..." : "RUN TRACE"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {NODES.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3.5 text-left border transition-all cursor-pointer relative ${
                    isSelected
                      ? "bg-[#1a1d22] border-[#ff4d00] text-[#e5e7eb]"
                      : "bg-[#121417]/80 border-[#262a31] text-[#9ca3af] hover:border-[#393f4a] hover:text-[#e5e7eb]"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-2 h-2 bg-[#ff4d00]" />
                  )}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-[#ff4d00] uppercase font-bold tracking-wider">
                      {node.type}
                    </span>
                    <span className="text-[10px] text-[#6b7280]">
                      {node.latency}
                    </span>
                  </div>
                  <div className="text-sm font-medium font-sans text-[#e5e7eb] mb-1">
                    {node.name}
                  </div>
                  <div className="text-[11px] text-[#6b7280]">
                    TP: {node.throughput}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Terminal Console Feed */}
          <div className="mt-4 p-3 bg-[#0b0c0e] border border-[#262a31] text-[11px] text-[#9ca3af] space-y-1">
            <div className="flex items-center gap-1.5 text-[#393f4a] border-b border-[#1a1d22] pb-1 mb-1">
              <Terminal className="w-3 h-3 text-[#ff4d00]" />
              <span>LIVE TELEMETRY LOGS</span>
            </div>
            {logs.map((log, idx) => (
              <div key={idx} className="truncate font-mono">
                <span className="text-[#ff4d00] mr-1.5">&gt;</span>
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Node Details & Metrics */}
        <div className="lg:col-span-5 p-5 bg-[#121417] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-[#9ca3af] uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#ff4d00]" />
                Node Specs
              </span>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                {selectedNode.status}
              </span>
            </div>

            <h4 className="text-lg font-bold font-sans text-[#e5e7eb] mb-2">
              {selectedNode.name}
            </h4>
            <p className="text-xs text-[#9ca3af] font-sans leading-relaxed mb-5">
              {selectedNode.description}
            </p>

            <div className="space-y-3">
              <div className="p-2.5 bg-[#1a1d22] border border-[#262a31] flex justify-between items-center text-xs">
                <span className="text-[#6b7280]">P99 Latency:</span>
                <span className="text-[#ff4d00] font-bold">{selectedNode.latency}</span>
              </div>
              <div className="p-2.5 bg-[#1a1d22] border border-[#262a31] flex justify-between items-center text-xs">
                <span className="text-[#6b7280]">Peak Throughput:</span>
                <span className="text-[#e5e7eb] font-bold">{selectedNode.throughput}</span>
              </div>
              <div className="p-2.5 bg-[#1a1d22] border border-[#262a31] flex justify-between items-center text-xs">
                <span className="text-[#6b7280]">Fault Tolerance:</span>
                <span className="text-emerald-400 font-bold">Multi-AZ Failover</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#262a31] flex items-center justify-between text-xs text-[#9ca3af]">
            <span>System Architecture Verified</span>
            <ShieldCheck className="w-4 h-4 text-[#ff4d00]" />
          </div>
        </div>
      </div>
    </div>
  );
}
