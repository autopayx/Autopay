function parseAmount(value: string): number {
  const match = value.match(/[\d.]+/)
  return match ? parseFloat(match[0]) : 0
}

export { parseAmount }
