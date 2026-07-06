import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

/**
 * Returns false on the server and during the initial hydration render, then
 * true immediately after hydration completes.
 *
 * Portal-based components (Modal, Drawer, Lightbox) must render nothing until
 * hydration is done: the server cannot render a portal, so emitting one during
 * the hydration render makes the client tree differ from the server HTML and
 * triggers a hydration mismatch. Unlike a `typeof document` branch, this hook
 * keeps the first client render identical to the server render; unlike a
 * mounted flag set in useEffect, it needs no state and re-renders exactly once.
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}
