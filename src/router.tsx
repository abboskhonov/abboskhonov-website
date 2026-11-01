import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"

// Back/forward swipe gestures on mobile already animate the page; running a
// view transition on top of that plays the navigation twice.
let uaAnimatedNavigation = false
if (typeof window !== "undefined") {
  window.addEventListener("popstate", (e) => {
    uaAnimatedNavigation = e.hasUAVisualTransition
  })
}

const isProject = (pathname = "") => pathname.startsWith("/projects/")

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,

    // Applies to links and to browser back/forward alike.
    defaultViewTransition: {
      types: ({ fromLocation, toLocation, pathChanged }) => {
        const skip = uaAnimatedNavigation
        uaAnimatedNavigation = false
        if (skip || !pathChanged) return false
        if (isProject(toLocation.pathname)) return ["nav-forward"]
        if (isProject(fromLocation?.pathname)) return ["nav-back"]
        return false
      },
    },

    scrollRestoration: true,
    // Per history entry, so opening a project always starts at the top while
    // back/forward and reloads return to where you were. The homepage is
    // keyed by path so its "back" links also land where you left it.
    // Keep in sync with restoreScrollScript in __root.tsx.
    getScrollRestorationKey: (location) =>
      location.pathname === "/"
        ? "/"
        : location.state.__TSR_key || location.href,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  })

  return router
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
