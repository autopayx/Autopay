"use client"

import { useState } from "react"
import { Text } from "@/components/reuseables/text"

const RANGES = ["7D", "30D", "90D"] as const

function CollectedChartCard({ series }: { series: Record<(typeof RANGES)[number], number[]> }) {
  const [range, setRange] = useState<(typeof RANGES)[number]>("30D")
  const data = series[range]

  const width = 500
  const height = 160
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1 || 1)) * width
    const y = height - ((value - min) / (max - min || 1)) * height
    return `${x},${y}`
  })

  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <div className="flex items-center justify-between">
        <Text as="h3" weight="semibold">
          USDC collected
        </Text>
        <div className="flex gap-1 rounded-full bg-muted p-1">
          {RANGES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRange(item)}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                range === item ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <Text as="p" weight="bold" className="mt-3 text-2xl">
        {(data[data.length - 1] ?? 0).toFixed(2)} USDC
      </Text>
      <Text as="p" size="sm" className="text-muted-foreground">
        Last {range}
      </Text>

      <div className="relative mt-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-40 w-full" preserveAspectRatio="none">
          <polyline fill="none" stroke="#3B82F6" strokeWidth="2" points={points.join(" ")} />
          <polygon fill="url(#chart-gradient)" points={`0,${height} ${points.join(" ")} ${width},${height}`} />
          <defs>
            <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}

export { CollectedChartCard }
