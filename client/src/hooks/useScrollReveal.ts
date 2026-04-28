import { useEffect } from "react";

/**
 * useScrollReveal
 *
 * Adds a one-shot IntersectionObserver that toggles
 * `data-revealed="true"` on every element matching `[data-reveal]`
 * inside the scoped root (or the whole document if no root is given)
 * once it scrolls into view. Pairs with the CSS in `index.css` that
 * styles `[data-reveal]` (initial hidden state) and
 * `[data-reveal][data-revealed="true"]` (revealed state).
 *
 * Respects `prefers-reduced-motion` — when reduced motion is on, the
 * CSS already disables the animation, but we still mark elements as
 * revealed immediately so they are visible without any transition.
 */
export function useScrollReveal(rootRef?: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scope: ParentNode = rootRef?.current ?? document;
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = (element: HTMLElement) => {
      element.setAttribute("data-revealed", "true");
    };

    const queryTargets = () =>
      Array.from(scope.querySelectorAll<HTMLElement>("[data-reveal]"));

    const initialTargets = queryTargets();
    if (initialTargets.length === 0) return;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      initialTargets.forEach(reveal);
      return;
    }

    const observed = new WeakSet<HTMLElement>();
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const observeTarget = (element: HTMLElement) => {
      if (observed.has(element)) {
        return;
      }

      if (element.dataset.revealed === "true") {
        return;
      }

      observed.add(element);
      observer.observe(element);
    };

    initialTargets.forEach(observeTarget);

    const mutationObserver = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;

          if (node.matches("[data-reveal]")) {
            observeTarget(node);
          }

          node
            .querySelectorAll<HTMLElement>("[data-reveal]")
            .forEach(observeTarget);
        }
      }
    });

    mutationObserver.observe(scope, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [rootRef]);
}
