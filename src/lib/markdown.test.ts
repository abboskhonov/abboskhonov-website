import { describe, expect, it } from "vitest"
import {
  homepageMarkdown,
  llmsText,
  markdownForPath,
  projectMarkdown,
} from "./markdown"

describe("agent-readable Markdown", () => {
  it("lists every public project on the homepage", () => {
    const markdown = homepageMarkdown()

    expect(markdown).toContain("/projects/whisply")
    expect(markdown).toContain("/projects/tasteui")
    expect(markdown).toContain("/projects/pi-streak")
    expect(markdown).toContain("/projects/hermium")
    expect(markdown).not.toContain("crm-cognilabs")
  })

  it("serves project Markdown from HTML and .md paths", () => {
    expect(markdownForPath("/projects/whisply")).toBe(
      projectMarkdown("whisply")
    )
    expect(markdownForPath("/projects/whisply.md")).toBe(
      projectMarkdown("whisply")
    )
    expect(markdownForPath("/projects/not-found")).toBeNull()
  })

  it("gives agents specific when-to-use guidance", () => {
    expect(llmsText()).toContain("## When to use this site")
  })
})
