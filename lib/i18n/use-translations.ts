"use client"

import { useState, useCallback } from "react"
import en from "./en.json"
import pt from "./pt.json"

type Locale = "en" | "pt"

const translations = { en, pt }

export function useTranslations() {
  const [locale, setLocale] = useState<Locale>("en")

  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".")
      let value: unknown = translations[locale]

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = (value as Record<string, unknown>)[k]
        } else {
          // Fallback to English
          value = translations.en
          for (const fallbackKey of keys) {
            if (value && typeof value === "object" && fallbackKey in value) {
              value = (value as Record<string, unknown>)[fallbackKey]
            } else {
              return key
            }
          }
          break
        }
      }

      return typeof value === "string" ? value : key
    },
    [locale],
  )

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "pt" : "en"))
  }, [])

  return { t, locale, setLocale, toggleLocale }
}
