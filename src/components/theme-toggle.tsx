"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { IconSun, IconMoon } from "@tabler/icons-react"

interface ThemeContextType {
  theme: "dark" | "light"
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggle: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

// Switch the theme in one frame: without this, every element with a
// `transition-colors` class fades on its own schedule.
function applyTheme(theme: "dark" | "light") {
  const root = document.documentElement
  const style = document.createElement("style")
  style.textContent =
    "*,*::before,*::after{transition:none!important;animation:none!important}"
  document.head.appendChild(style)

  root.classList.toggle("dark", theme === "dark")
  root.style.colorScheme = theme

  // Force the new colors to be computed before transitions come back.
  void window.getComputedStyle(root).opacity
  requestAnimationFrame(() => style.remove())
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof document === "undefined") return "dark"
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("theme") as "dark" | "light" | null
    const initial = saved || "dark"
    setTheme(initial)
    document.documentElement.classList.toggle("dark", initial === "dark")
    document.documentElement.style.colorScheme = initial
  }, [])

  useEffect(() => {
    if (!mounted) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "d" || e.key === "D") {
        if (
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        ) {
          return
        }
        e.preventDefault()
        const next = theme === "dark" ? "light" : "dark"
        setTheme(next)
        localStorage.setItem("theme", next)
        applyTheme(next)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [theme, mounted])

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    localStorage.setItem("theme", next)
    applyTheme(next)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className={cn(
        "inline-flex items-center p-2 text-neutral-500 transition-colors hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-200",
        className
      )}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title="Toggle theme (D)"
    >
      {theme === "dark" ? <IconMoon className="h-4 w-4" /> : <IconSun className="h-4 w-4" />}
    </button>
  )
}
