function Sparkline({ data, color = "#3B82F6", dashed = false }: { data: number[]; color?: string; dashed?: boolean }) {
  const width = 80
  const height = 24
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1 || 1)) * width
    const y = height - ((value - min) / (max - min || 1)) * height
    return `${x},${y}`
  })

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="shrink-0" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={dashed ? "3 3" : undefined}
        points={points.join(" ")}
      />
    </svg>
  )
}

export { Sparkline }
