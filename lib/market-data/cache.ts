// Simple in-memory cache with TTL support
import type { CacheEntry } from "./types"

const cache = new Map<string, CacheEntry<unknown>>()

const DEFAULT_TTL = 30000 // 30 seconds

export function getCache<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined
  if (!entry) return null

  const now = Date.now()
  if (now - entry.timestamp > entry.ttl) {
    // Expired but keep for fallback
    return null
  }

  return entry.data
}

export function setCache<T>(key: string, data: T, ttl: number = DEFAULT_TTL): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  })
}

export function getStaleCache<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined
  return entry?.data ?? null
}

export function clearCache(): void {
  cache.clear()
}

export function getCacheAge(key: string): number | null {
  const entry = cache.get(key)
  if (!entry) return null
  return Date.now() - entry.timestamp
}
