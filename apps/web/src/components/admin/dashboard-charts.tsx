"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const statusColors: Record<string, string> = {
  NEW: "#3b82f6",
  UNDER_REVIEW: "#f59e0b",
  QUOTE_SENT: "#6366f1",
  AWAITING_CUSTOMER_APPROVAL: "#ec4899",
  APPROVED: "#10b981",
  IN_PRODUCTION: "#f97316",
  READY_FOR_PICKUP: "#8b5cf6",
  COMPLETED: "#22c55e",
  CANCELLED: "#9ca3af",
};

const typeColors: Record<string, string> = {
  QUOTE: "#3b82f6",
  CONTACT: "#ec4899",
  ORDER: "#f59e0b",
};

function formatLabel(s: string) {
  return s
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
}

/* ─── Status bar chart ──────────────────────── */

type StatusBarChartProps = {
  data: Array<{ status: string; count: number }>;
};

export function StatusBarChart({ data }: StatusBarChartProps) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <p className="admin-card-title">Requests by status</p>
        <p className="admin-card-subtitle">Distribution of all requests</p>
      </div>
      <div className="admin-card-body">
        {data.length === 0 ? (
          <p className="py-4 text-center text-sm text-[#151515]/45">
            No request data yet.
          </p>
        ) : (
          <div className="grid gap-3">
            {data.map((item) => (
              <div key={item.status} className="grid gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#151515]/60">
                    {formatLabel(item.status)}
                  </span>
                  <span className="inline-flex h-5 min-w-[24px] items-center justify-center rounded-full bg-[#151515]/[0.06] px-1.5 text-[10px] font-bold text-[#151515]/80">
                    {item.count}
                  </span>
                </div>
                <div className="h-7 w-full overflow-hidden rounded-md bg-[#151515]/[0.04]">
                  <motion.div
                    className="chart-bar"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(item.count / max) * 100}%`,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.33, 1, 0.68, 1],
                      delay: 0.1,
                    }}
                    style={{
                      background: statusColors[item.status] ?? "#94a3b8",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Request type donut ────────────────────── */

type TypeDonutProps = {
  data: Array<{ type: string; count: number }>;
};

export function TypeDonut({ data }: TypeDonutProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  /* Build conic gradient stops */
  let conicStops = "";
  let cursor = 0;
  data.forEach((d) => {
    const pct = total > 0 ? (d.count / total) * 100 : 0;
    const color = typeColors[d.type] ?? "#94a3b8";
    conicStops += `${color} ${cursor}% ${cursor + pct}%, `;
    cursor += pct;
  });
  /* Fill remaining if rounding leaves gaps */
  if (cursor < 100) {
    conicStops += `#e5e7eb ${cursor}% 100%`;
  } else {
    conicStops = conicStops.replace(/,\s*$/, "");
  }

  return (
    <div className="admin-card flex h-full flex-col">
      <div className="admin-card-header shrink-0">
        <p className="admin-card-title">Request types</p>
        <p className="admin-card-subtitle">Quote, contact &amp; order split</p>
      </div>
      <div className="admin-card-body flex flex-1 flex-col items-center justify-center gap-5">
        {total === 0 ? (
          <p className="py-4 text-center text-sm text-[#151515]/45">
            No requests yet.
          </p>
        ) : (
          <>
            <motion.div
              className="chart-donut h-[140px] w-[140px]"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 18,
                delay: 0.15,
              }}
              style={{
                background: `conic-gradient(${conicStops})`,
              }}
            >
              <div className="chart-donut-hole flex flex-col items-center justify-center">
                <span className="text-xl font-bold leading-none text-[#151515]">
                  {total}
                </span>
                <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#151515]/40">
                  total
                </span>
              </div>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-3">
              {data.map((d) => (
                <div
                  key={d.type}
                  className="flex items-center gap-2 rounded-full bg-[#151515]/[0.04] px-3 py-1.5"
                >
                  <span
                    className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      background: typeColors[d.type] ?? "#94a3b8",
                    }}
                  />
                  <span className="text-xs font-semibold text-[#151515]/70">
                    {formatLabel(d.type)}
                  </span>
                  <span className="text-xs font-bold text-[#151515]">
                    {d.count}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Stat card ─────────────────────────────── */

type StatCardProps = {
  label: string;
  value: number;
  subtitle: string;
  href?: string;
  accentColor?: string;
  icon?: ReactNode;
  delay?: number;
};

export function StatCard({
  label,
  value,
  subtitle,
  href,
  accentColor = "#3b82f6",
  icon,
  delay = 0,
}: StatCardProps) {
  const content = (
    <>
      <div
        className="absolute left-0 right-0 top-0 h-[3px]"
        style={{ background: accentColor }}
      />
      <div className="flex items-start justify-between pt-1">
        <div>
          <p className="text-[13px] font-semibold text-[#151515]/50">
            {label}
          </p>
          <p className="mt-1.5 text-[32px] font-bold leading-none tracking-tight text-[#151515]">
            {value}
          </p>
          <p className="mt-1.5 text-xs text-[#151515]/35">{subtitle}</p>
        </div>
        {icon && (
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `${accentColor}14`,
              color: accentColor,
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </>
  );

  const motionWrapper = (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay,
      }}
      whileHover={{
        scale: 1.02,
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04)",
      }}
      className="admin-card relative overflow-hidden"
    >
      {href ? (
        <a href={href} className="block p-5">
          {content}
        </a>
      ) : (
        <div className="p-5">{content}</div>
      )}
    </motion.div>
  );

  return motionWrapper;
}
