import { readPreferences, type Preferences, isEnabledForHost } from "./shared/preferences";
import { isSupportedBoardsRoute } from "./shared/routes";

const root = document.documentElement;
let preferences: Preferences | undefined;

function applyModernizer(): void {
  const active = Boolean(
    preferences && isSupportedBoardsRoute(location.pathname) && isEnabledForHost(preferences, location.hostname)
  );

  root.toggleAttribute("data-abm-active", active);
  if (!preferences) return;
  root.dataset.abmTheme = preferences.theme;
  root.dataset.abmDensity = preferences.density;
}

async function refreshPreferences(): Promise<void> {
  preferences = await readPreferences();
  applyModernizer();
}

function observeRoutes(): void {
  const dispatchLocationChange = (): void => {
    window.dispatchEvent(new Event("abm:locationchange"));
  };
  for (const method of ["pushState", "replaceState"] as const) {
    const original = history[method];
    history[method] = function (...args: Parameters<History[typeof method]>): ReturnType<History[typeof method]> {
      const result = original.apply(this, args);
      dispatchLocationChange();
      return result;
    };
  }
  window.addEventListener("popstate", dispatchLocationChange);
  window.addEventListener("abm:locationchange", applyModernizer);
}

observeRoutes();
void refreshPreferences();

chrome.storage.onChanged.addListener((_changes, areaName) => {
  if (areaName === "sync") void refreshPreferences();
});
