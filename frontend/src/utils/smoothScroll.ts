/**
 * Smoothly scrolls to a target section by ID, taking fixed headers into account.
 */
export function smoothScrollTo(targetId: string, offset: number = 80) {
  if (typeof window === "undefined") return;

  if (targetId === "top" || targetId === "hero") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (window.history.pushState) {
      window.history.pushState(null, "", window.location.pathname);
    }
    return;
  }

  const element = document.getElementById(targetId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(0, Math.round(offsetPosition)),
    behavior: "smooth",
  });

  if (window.history.pushState) {
    window.history.pushState(null, "", `#${targetId}`);
  }
}
