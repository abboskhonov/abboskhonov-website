import { textLinkClass } from "./text-link"

declare global {
  interface Window {
    Allline?: (method: string, ...args: unknown[]) => void
    // Defined by the widget script in __root.tsx.
    loadAllline?: () => void
  }
}

const OPEN_TIMEOUT_MS = 10_000

// Opens the Allline chat. Once loaded, the widget handles clicks itself
// through `data-allline-launcher`; it loads late to keep the page fast, so a
// click before then loads it right away and opens the chat when it's ready.
export function ChatButton() {
  const handleClick = () => {
    if (window.Allline) return
    window.loadAllline?.()
    const started = Date.now()
    const timer = setInterval(() => {
      if (window.Allline) {
        clearInterval(timer)
        window.Allline("show")
      } else if (Date.now() - started > OPEN_TIMEOUT_MS) {
        clearInterval(timer)
      }
    }, 50)
  }

  return (
    <button
      type="button"
      data-allline-launcher
      onClick={handleClick}
      className={`cursor-pointer ${textLinkClass}`}
    >
      chat
    </button>
  )
}
