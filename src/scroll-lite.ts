/** Lightweight scroll/reveal for inner pages — no Lenis or GSAP. */

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initScrollLite() {
  initLineReveals();
  initNav();
  initCssReveals();
  initMediaReveal();
}

function initLineReveals() {
  const lines = document.querySelectorAll<HTMLElement>(".reveal-line");
  if (!lines.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -4% 0px" }
  );
  lines.forEach((l) => io.observe(l));
}

function initNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;
  let last = 0;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 40);
    nav.classList.toggle("hidden", y > last && y > 400);
    last = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initCssReveals() {
  const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!items.length) return;
  if (reduced) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el) => io.observe(el));
}

function initMediaReveal() {
  const items = document.querySelectorAll<HTMLElement>(".shot, .feature-img");
  if (!items.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
  );
  items.forEach((el) => io.observe(el));
}
