"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { CharacterBase } from "@/types/character";

const COLORS = [
  "#4ade80",
  "#60a5fa",
  "#f472b6",
  "#fb923c",
  "#a78bfa",
  "#34d399",
  "#facc15",
  "#f87171",
];

interface SpeciesChartProps {
  characters: CharacterBase[];
}

export default function SpeciesChart({ characters }: SpeciesChartProps) {
  const speciesMap = characters.reduce<Record<string, number>>((acc, char) => {
    acc[char.species] = (acc[char.species] ?? 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(speciesMap)
    .map(([species, count]) => ({ species, count }))
    .sort((a, b) => b.count - a.count);

  if (data.length === 0) return null;

  return (
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
      <h2 className="text-sm font-semibold text-gray-300 mb-4">
        Characters by Species — current page
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 4 }}>
          <XAxis
            dataKey="species"
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#f9fafb",
              fontSize: 12,
            }}
            cursor={{ fill: "rgba(74,222,128,0.05)" }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
