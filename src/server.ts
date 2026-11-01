import handler, { createServerEntry } from "@tanstack/react-start/server-entry"
import { markdownForPath, markdownNotFound } from "@/lib/markdown"

declare const __BUILD_ID__: string

// Rendered pages are cached at Cloudflare's edge so repeat visits skip SSR.
// Nothing in the HTML varies per visitor (time, theme and GitHub activity are
// filled in by the browser). Keys include the build ID, so after a deploy no
// one is served HTML that points at the previous build's asset files.
const HTML_EDGE_TTL = 60 * 60 * 24
const edgeCache = import.meta.env.DEV
  ? undefined
  : (globalThis.caches as unknown as { default?: Cache } | undefined)?.default

function htmlCacheKey(url: URL) {
  return new Request(`https://html.cache/${__BUILD_ID__}${url.pathname}`)
}

function htmlResponse(response: Response) {
  const headers = new Headers(response.headers)
  appendVary(headers, "Accept")
  // Browsers revalidate, so a deploy is picked up on the next visit.
  headers.set("Cache-Control", "no-cache")
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

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

    const cacheable = edgeCache && request.method === "GET" && !url.search
    if (cacheable) {
      const cached = await edgeCache.match(htmlCacheKey(url))
      if (cached) return htmlResponse(cached)
    }

    const response = await handler.fetch(request)
    if (!response.headers.get("Content-Type")?.includes("text/html")) {
      return response
    }

    if (
      cacheable &&
      response.status === 200 &&
      !response.headers.has("Set-Cookie")
    ) {
      const stored = new Response(response.clone().body, response)
      stored.headers.set("Cache-Control", `public, max-age=${HTML_EDGE_TTL}`)
      await edgeCache.put(htmlCacheKey(url), stored)
    }

    return htmlResponse(response)
  },
})
