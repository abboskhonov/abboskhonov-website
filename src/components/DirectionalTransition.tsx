import React from "react"
const { ViewTransition } = React

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter="fade-in"
      exit="fade-out"
      default="none"
    >
      {children}
    </ViewTransition>
  )
}
