const INTRO_DONE = "bcp-intro-done";

/** Première visite sur l'accueil → animation gants avant le site. Retourne true si redirection en cours. */
export function maybeRedirectToIntro(): boolean {
  const path = window.location.pathname.replace(/\/index\.html$/, "/");
  if (path !== "/" && path !== "") return false;

  try {
    if (
      localStorage.getItem(INTRO_DONE) === "1" ||
      sessionStorage.getItem(INTRO_DONE) === "1"
    ) {
      return false;
    }
  } catch {
    return false;
  }

  window.location.replace("/intro/");
  return true;
}

export function markIntroDoneAndEnterSite() {
  try {
    localStorage.setItem(INTRO_DONE, "1");
    sessionStorage.setItem(INTRO_DONE, "1");
  } catch {}
  window.location.href = "/";
}
