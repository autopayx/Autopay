"use client"

import { useState } from "react"

function useCopyToClipboard(resetDelay = 1500) {
  const [copied, setCopied] = useState(false)

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), resetDelay)
    } catch {
      // clipboard API unavailable or blocked by browser permissions; fail silently
    }
  }

  return { copied, copy }
}

export { useCopyToClipboard }
