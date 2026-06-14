/** Defer video bytes until the element (or its section) nears the viewport. */
export function attachLazyVideo(
  video: HTMLVideoElement,
  onLoaded?: () => void,
  rootMargin = "320px"
) {
  const src = video.dataset.src;
  if (!src) return;
  video.preload = "none";

  const load = () => {
    if (video.src) return;
    video.src = src;
    if (onLoaded) {
      video.addEventListener("loadedmetadata", onLoaded, { once: true });
    }
    video.load();
  };

  const root = video.closest("section, .scrub, .clip") ?? video;
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          load();
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(root);
  } else {
    load();
  }
}

/** Gallery clips: load on approach, play only while visible. */
export function initLazyClipVideos(root: ParentNode = document) {
  root.querySelectorAll<HTMLVideoElement>(".clip video[data-src]").forEach((video) => {
    attachLazyVideo(video, () => {
      if (!("IntersectionObserver" in window)) {
        video.play().catch(() => {});
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          const vis = entries[0]?.isIntersecting;
          if (vis) video.play().catch(() => {});
          else video.pause();
        },
        { threshold: 0.2 }
      );
      io.observe(video);
    });
  });
}
