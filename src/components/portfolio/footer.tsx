import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

function useLocalTime(offset: number) {
  const [time, setTime] = useState("")
  useEffect(() => {
    const update = () => {
      const d = new Date()
      const utc = d.getTime() + d.getTimezoneOffset() * 60000
      const local = new Date(utc + offset * 3600000)
      const h = String(local.getHours()).padStart(2, "0")
      const m = String(local.getMinutes()).padStart(2, "0")
      setTime(`${h}:${m}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [offset])
  return time
}

export function Footer() {
  const time = useLocalTime(5)

  return (
    <footer className="mt-20 flex items-center justify-between text-neutral-500">
      <p>
        tashkent, uzbekistan
        {time && <span className="tabular-nums"> · {time}</span>}
      </p>
      <ThemeToggle className="-mr-2" />
    </footer>
  )
}
