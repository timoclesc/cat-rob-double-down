"use client"

import type { DashboardStats } from "@/lib/types"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface DashboardSectionProps {
  stats: DashboardStats
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
  return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
          {formatCurrency(payload.value)}
        </text>
      </g>
    );
};

export function DashboardSection({ stats }: DashboardSectionProps) {


  const chartData = [
    {
      category: "Pledges",
      for: stats.totalFor,
      against: stats.totalAgainst,
    },
  ]

  const chartConfig = {
    for: {
      label: "FOR Success",
      color: "hsl(142, 76%, 36%)",
    },
    against: {
      label: "AGAINST Failure",
      color: "hsl(346, 77%, 49%)",
    },
  }

  return (
    <section id="dashboard" className="py-16 md:py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">Live Fundraising Dashboard</h2>
          <p className="mt-3 text-lg text-stone-600">Track the pledges in real-time. Who are you backing?</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-stone-600">Pledged FOR Success</h3>
            <p className="text-4xl font-extrabold text-emerald-600 mt-2">{formatCurrency(stats.totalFor)}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-stone-600">Pledged AGAINST Failure</h3>
            <p className="text-4xl font-extrabold text-rose-600 mt-2">{formatCurrency(stats.totalAgainst)}</p>
          </div>
          <div className="bg-rose-800 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-rose-100">Our Max Potential Payout</h3>
            <p className="text-4xl font-extrabold mt-2">{formatCurrency(stats.maxPayout)}</p>
          </div>
        </div>
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" tick={<CustomizedAxisTick />} />
                <YAxis type="category" dataKey="category" hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="for" stackId="a" fill="var(--color-for)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="against" stackId="a" fill="var(--color-against)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </section>
  )
}
