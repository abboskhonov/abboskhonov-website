import "react"

declare module "react" {
  export interface ViewTransitionProps {
    children?: React.ReactNode
    name?: string
    default?: "auto" | "none" | string
    enter?: "auto" | "none" | string | Record<string, string>
    exit?: "auto" | "none" | string | Record<string, string>
    share?: "auto" | "none" | string | Record<string, string>
    onEnter?: (instance: ViewTransitionInstance, types: string[]) => (() => void) | void
    onExit?: (instance: ViewTransitionInstance, types: string[]) => (() => void) | void
    onUpdate?: (instance: ViewTransitionInstance, types: string[]) => (() => void) | void
    onShare?: (instance: ViewTransitionInstance, types: string[]) => (() => void) | void
  }

  export interface ViewTransitionInstance {
    old: ViewTransitionPseudoElement
    new: ViewTransitionPseudoElement
    group: ViewTransitionPseudoElement
    imagePair: ViewTransitionPseudoElement
    name: string
  }

  export interface ViewTransitionPseudoElement {
    animate: (keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions) => Animation
  }

  export function ViewTransition(props: ViewTransitionProps): React.ReactElement
  export function addTransitionType(type: string): void
  export function startTransition(scope: () => void): void

  interface ViewTransitionExport {
    (props: ViewTransitionProps): React.ReactElement
  }

  export const ViewTransition: ViewTransitionExport
  export const addTransitionType: (type: string) => void
  export const startTransition: (scope: () => void) => void
}
