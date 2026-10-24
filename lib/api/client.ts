import axios from "axios"

// cookie-based session auth against the AutoPayX backend
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.autopayx.xyz/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

export { apiClient }
