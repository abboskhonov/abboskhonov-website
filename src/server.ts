import handler, { createServerEntry } from "@tanstack/react-start/server-entry"
import { markdownForPath, markdownNotFound } from "@/lib/markdown"

function appendVary(headers: Headers, value: string) {
  const values = new Set(
    (headers.get("Vary") ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  )
  values.add(value)
  headers.set("Vary", [...values].join(", "))
}

function markdownResponse(request: Request, body: string, status = 200) {
  const headers = new Headers({
    "Cache-Control": "public, max-age=300",
    "Content-Type": "text/markdown; charset=utf-8",
  })
  appendVary(headers, "Accept")
  appendVary(headers, "Accept-Encoding")

  return new Response(request.method === "HEAD" ? null : body, {
    status,
    headers,
  })
}

export default createServerEntry({
  async fetch(request) {
    const url = new URL(request.url)
    const acceptsMarkdown = request.headers
      .get("Accept")
      ?.includes("text/markdown")
    const isMarkdownPath = url.pathname.endsWith(".md")
    const isAgentIndex = url.pathname === "/llms.txt"
    const supportsBody = request.method === "GET" || request.method === "HEAD"

    if (supportsBody && (acceptsMarkdown || isMarkdownPath || isAgentIndex)) {
      const markdown = markdownForPath(url.pathname)
      const response = markdownResponse(
        request,
        markdown ?? markdownNotFound(),
        markdown ? 200 : 404
      )

      if (isAgentIndex) {
        response.headers.set("Content-Type", "text/plain; charset=utf-8")
      }

      return response
    }

    const response = await handler.fetch(request)
    if (!response.headers.get("Content-Type")?.includes("text/html")) {
      return response
    }

    const headers = new Headers(response.headers)
    appendVary(headers, "Accept")

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  },
})
