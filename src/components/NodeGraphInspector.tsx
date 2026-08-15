"use client";

import { useState } from "react";
import { Terminal, ShieldCheck, Layers, Cpu } from "lucide-react";

type GraphNode = {
  id: string;
  name: string;
  repo: string;
  type: string;
  tech: string;
  description: string;
};

const GRAPH_NODES: GraphNode[] = [
  {
    id: "node-1",
    name: "موتور تصویرسازی سامانه فکر",
    repo: "سامانه فکر (GraphNext)",
    type: "تصویرسازی داده و گراف",
    tech: "Next.js 16 / React 19 / @xyflow/react / D3 / Apache Arrow",
    description: "سامانه آنالیتیکس سفارشی مبتنی بر گراف‌های برداری، دیاگرام‌های Sankey و نمایش داده‌های پرحجم متمرکز بر عملکرد با Apache Arrow و elkjs.",
  },
  {
    id: "node-2",
    name: "موتور محاسبات بالینی ASCVD",
    repo: "ASCVD",
    type: "آنالیتیکس پزشکی و Supabase",
    tech: "Next.js 15 / React 19 / Supabase / Prisma / NextAuth",
    description: "محاسبه آنی شاخص‌های ریسک قلبی-عروقی بر اساس الگوریتم ACC/AHA 2013 با ذخیره‌سازی سوابق در PostgreSQL و احراز هویت پیامکی.",
  },
  {
    id: "node-3",
    name: "سامانه تیکتینگ شرکتی",
    repo: "ticketing-system",
    type: "کامپوننت‌های دست‌ساز Nuxt/Vue",
    tech: "Vue.js 3 / Nuxt.js / Tailwind CSS / Custom UI",
    description: "سامانه ثبت و پیگیری تیکت‌ها با لایو چت سفارشی، ورود SMS و توسعه ۱۰۰٪ دست‌ساز سیستم دیزاین بدون هیچ پکیج UI خارجی.",
  },
];

export function NodeGraphInspector() {
  const [activeNode, setActiveNode] = useState<GraphNode>(GRAPH_NODES[0]);
  const [simulatedLog, setSimulatedLog] = useState<string>("سیستم آماده است // بررسی ریپازیتوری‌های گیت‌هاب MHgh0st");

  const selectNode = (node: GraphNode) => {
    setActiveNode(node);
    setSimulatedLog(`در حال بررسی: [${node.repo}] -> ${node.type} (${node.tech})`);
  };

  return (
    <div className="w-full bg-[#f4f3ef] border border-[#111111] font-sans text-xs">
      {/* Title Header */}
      <div className="px-4 py-2.5 bg-[#111111] text-[#f4f3ef] flex items-center justify-between font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#d4ff00]" />
          <span className="font-bold tracking-wider text-[11px]">
            بررسی دقیق ریپازیتوری‌ها // MHGH0ST_REPOS
          </span>
        </div>
        <span className="text-[10px] text-[#cccccc] hidden sm:inline">
          مخازن رسمی گیت‌هاب
        </span>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-[#111111]">
        
        {/* Right (RTL Start): Node Selection Matrix */}
        <div className="md:col-span-6 p-4 bg-[#f4f3ef] space-y-3">
          <div className="text-[11px] text-[#555555] font-bold flex items-center justify-between">
            <span>ریپازیتوری‌های عمومی</span>
            <span className="text-[#0047ff] font-mono text-[10px]">[جهت بررسی کلیک کنید]</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {GRAPH_NODES.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => selectNode(node)}
                  className={`w-full text-right p-3 border transition-all cursor-pointer relative ${
                    isSelected
                      ? "bg-[#111111] text-[#f4f3ef] border-[#111111]"
                      : "bg-[#f4f3ef] text-[#111111] border-[#111111] hover:bg-[#e9e7e1]"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-2 left-2 w-2.5 h-2.5 bg-[#d4ff00]" />
                  )}
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[11px] font-extrabold ${isSelected ? "text-[#d4ff00]" : "text-[#0047ff]"}`}>
                      {node.repo}
                    </span>
                    <span className="text-[10px] opacity-75">{node.type}</span>
                  </div>
                  <div className="font-bold text-sm tracking-tight font-sans">
                    {node.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Telemetry Bar */}
          <div className="p-2.5 bg-[#e9e7e1] border border-[#111111] text-[11px] text-[#111111] flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#0047ff] shrink-0" />
            <span className="truncate font-mono">{simulatedLog}</span>
          </div>
        </div>

        {/* Left (RTL End): Technical Spec Detail */}
        <div className="md:col-span-6 p-5 bg-[#f4f3ef] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#111111] pb-2">
              <span className="text-[11px] font-bold text-[#555555]">مشخصات واقعی ریپازیتوری</span>
              <span className="px-2 py-0.5 bg-[#d4ff00] text-[#111111] text-[10px] font-bold border border-[#111111]">
                بررسی شده در سورس
              </span>
            </div>

            <div>
              <div className="text-xs text-[#0047ff] font-bold mb-1 font-mono">
                {activeNode.repo} // {activeNode.type}
              </div>
              <h3 className="text-xl font-extrabold text-[#111111] leading-tight mb-2">
                {activeNode.name}
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed font-medium">
                {activeNode.description}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <div className="p-2.5 bg-[#e9e7e1] border border-[#111111] text-xs flex justify-between items-center">
                <span className="text-[#555555]">تکنولوژی‌ها:</span>
                <span className="font-bold text-[#111111] font-mono text-[11px]">{activeNode.tech}</span>
              </div>
              <div className="p-2.5 bg-[#e9e7e1] border border-[#111111] text-xs flex justify-between items-center">
                <span className="text-[#555555]">آدرس مخزن:</span>
                <span className="font-bold text-[#0047ff] font-mono text-[11px]">MHgh0st/{activeNode.repo}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#111111] mt-6 flex items-center justify-between text-[11px] text-[#555555]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0047ff]" />
              اطلاعات مستقیماً از سورس کد استخراج شد
            </span>
            <span className="font-bold text-[#111111] font-mono">MHGH0ST.DEV</span>
          </div>
        </div>

      </div>
    </div>
  );
}
