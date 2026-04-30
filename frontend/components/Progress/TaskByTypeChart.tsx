"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { TaskType } from "@/types/progress";

interface TasksByTypeChartProps {
  data: TaskType[];
}

const TasksByTypeChart = ({ data }: TasksByTypeChartProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4 flex-1 min-w-[240px]">
      <h2 className="text-base font-medium text-foreground">Tasks by Type</h2>

      <div className="flex flex-col items-center gap-4">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data.map((entry) => ({
                ...entry,
                fill: entry.color,
              }))}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={85}
              paddingAngle={2}
              minAngle={5}
              dataKey="value"
              labelLine={false}
              label={({ cx, cy, midAngle, outerRadius, name }) => {
                if (!midAngle) return null;
                const RADIAN = Math.PI / 180;
                const r = outerRadius + 22;
                const x = cx + r * Math.cos(-midAngle * RADIAN);
                const y = cy + r * Math.sin(-midAngle * RADIAN);
                return (
                  <text
                    x={x}
                    y={y}
                    fill="var(--muted-foreground)"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    fontSize={12}
                  >
                    {name}
                  </text>
                );
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                color: "var(--foreground)",
                fontSize: 13,
              }}
              formatter={(value, name) => [value, name]}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 w-full">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-muted-foreground">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksByTypeChart;
