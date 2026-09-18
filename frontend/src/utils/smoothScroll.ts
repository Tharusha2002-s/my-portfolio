/**
 * Smoothly scrolls to a target section by ID, taking fixed headers into account.
 */
export function smoothScrollTo(targetId: string, offset: number = 70) {
  if (typeof window === "undefined") return;

  const element = document.getElementById(targetId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: "smooth",
  });

  if (window.history.pushState) {
    window.history.pushState(null, "", `#${targetId}`);
  }
}
