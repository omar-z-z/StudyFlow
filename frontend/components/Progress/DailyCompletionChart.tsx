"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DailyEntry } from "@/types/progress";

interface DailyCompletionChartProps {
  data: DailyEntry[];
}

const DailyCompletionChart = ({ data }: DailyCompletionChartProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4 flex-1 min-w-[280px]">
      <h2 className="text-base font-medium text-foreground">Daily Completion</h2>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
          barCategoryGap="35%"
          barGap={3}
        >
          <CartesianGrid
            vertical={false}
            stroke="var(--border)"
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="day"
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              color: "var(--foreground)",
              fontSize: 13,
            }}
            cursor={{ fill: "var(--accent)", opacity: 0.5 }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 13, paddingTop: 12 }}
            formatter={(value) => (
              <span style={{ color: "var(--muted-foreground)" }}>{value}</span>
            )}
          />
          <Bar dataKey="completed" name="Completed" fill="#2DBF8A" radius={[4, 4, 0, 0]} />
          <Bar dataKey="pending" name="Pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyCompletionChart;