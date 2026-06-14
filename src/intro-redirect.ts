const INTRO_DONE = "bcp-intro-done";

/** Accueil → intro sauf si l'utilisateur vient de terminer l'animation (session en cours). */
export function maybeRedirectToIntro(): boolean {
  const path = window.location.pathname.replace(/\/index\.html$/, "/");
  if (path !== "/" && path !== "") return false;

  try {
    if (sessionStorage.getItem(INTRO_DONE) === "1") return false;
  } catch {
    return false;
  }

  window.location.replace("/intro/");
  return true;
}

export function markIntroDoneAndEnterSite() {
  try {
    sessionStorage.setItem(INTRO_DONE, "1");
    sessionStorage.setItem("bcp-entered", "1");
  } catch {}
  window.location.href = "/";
}
