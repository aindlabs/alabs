"use client";

import { useEffect, useState } from "react";

/**
 * useActiveSection — scroll-spy for in-page section links.
 * ----------------------------------------------------------------------------
 * Observes the given element ids and returns the one currently considered "in
 * view", so the header can highlight the matching nav tab on the home page.
 *
 * The asymmetric `rootMargin` shrinks the observed viewport to a horizontal
 * band around the upper-middle of the screen, so a section becomes active as it
 * reaches that band rather than the moment it peeks in at the bottom.
 *
 * `ids` must be referentially stable (define it at module scope) so the effect
 * doesn't re-subscribe every render.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
