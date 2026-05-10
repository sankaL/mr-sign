"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";


import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TrendPoint = { date: string; count: number };

const chartConfig = {
  requests: {
    label: "Requests",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

const TIME_RANGE_OPTIONS = [
  { value: "ytd", label: "Year-to-date" },
  { value: "1y", label: "Last year" },
  { value: "6m", label: "Last 6 months" },
  { value: "3m", label: "Last 3 months" },
  { value: "1m", label: "Last month" },
] as const;

type TimeRange = (typeof TIME_RANGE_OPTIONS)[number]["value"];

function getStartDate(range: TimeRange): Date {
  const now = new Date();
  switch (range) {
    case "1m": {
      const d = new Date(now);
      d.setMonth(d.getMonth() - 1);
      return d;
    }
    case "3m": {
      const d = new Date(now);
      d.setMonth(d.getMonth() - 3);
      return d;
    }
    case "6m": {
      const d = new Date(now);
      d.setMonth(d.getMonth() - 6);
      return d;
    }
    case "1y": {
      const d = new Date(now);
      d.setFullYear(d.getFullYear() - 1);
      return d;
    }
    case "ytd":
      return new Date(now.getFullYear(), 0, 1);
  }
}

function getDescription(range: TimeRange): string {
  switch (range) {
    case "1m":
      return "Requests over the last month";
    case "3m":
      return "Requests over the last 3 months";
    case "6m":
      return "Requests over the last 6 months";
    case "1y":
      return "Requests over the last year";
    case "ytd":
      return "Requests since January 1st";
  }
}

function fillMissingDates(data: TrendPoint[], start: Date): TrendPoint[] {
  const map = new Map(data.map((d) => [d.date, d.count]));
  const result: TrendPoint[] = [];
  const cursor = new Date(start);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  while (cursor <= today) {
    const key = cursor.toISOString().slice(0, 10);
    result.push({ date: key, count: map.get(key) ?? 0 });
    cursor.setDate(cursor.getDate() + 1);
  }
  return result;
}

type RequestTrendChartProps = {
  data: TrendPoint[];
};

export function RequestTrendChart({ data }: RequestTrendChartProps) {
  const [timeRange, setTimeRange] = React.useState<TimeRange>("1y");

  const filtered = React.useMemo(() => {
    const startDate = getStartDate(timeRange);
    return fillMissingDates(
      data.filter((d) => new Date(d.date) >= startDate),
      startDate,
    );
  }, [data, timeRange]);

  return (
    <div className="admin-card">
      <div className="admin-card-header flex items-center gap-2 sm:flex-row">
        <div className="flex-1">
          <p className="admin-card-title">Request Trends</p>
          <p className="admin-card-subtitle">{getDescription(timeRange)}</p>
        </div>
        <Select
          value={timeRange}
          onValueChange={(v) => setTimeRange(v as TimeRange)}
        >
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last year" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {TIME_RANGE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="admin-card-body px-2 sm:px-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filtered}>
            <defs>
              <linearGradient id="fillRequests" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-requests)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-requests)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="count"
              type="natural"
              fill="url(#fillRequests)"
              stroke="var(--color-requests)"
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
