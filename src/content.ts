import { readPreferences, type Preferences, isEnabledForHost } from "./shared/preferences";
import { isSupportedBoardsRoute } from "./shared/routes";

const root = document.documentElement;
let preferences: Preferences | undefined;
const cardSelector = ".kanban-card, .work-item-card, .board-card";
const accentSourceSelector = [
  ".work-item-type-icon",
  ".work-item-type",
  ".work-item-color",
  ".card-color",
  ".type-icon",
  ".wit-icon",
  '[class*="accent"]',
  '[class*="type"]',
  "[style]"
].join(", ");

function isAccentColor(color: string): boolean {
  const channels = color.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*[,/]\s*([\d.]+))?/i);
  if (!channels || (channels[4] !== undefined && Number(channels[4]) === 0)) return false;

  const rgb = channels.slice(1, 4).map(Number);
  return Math.max(...rgb) - Math.min(...rgb) >= 12;
}

function colorFromComputedStyle(element: Element): string | undefined {
  const style = getComputedStyle(element);
  const candidates = [style.borderLeftColor, style.borderInlineStartColor, style.outlineColor, style.backgroundColor];

  for (let index = 0; index < style.length; index += 1) {
    const property = style[index];
    if (property.startsWith("--") && /(accent|color|type)/i.test(property)) candidates.push(style.getPropertyValue(property));
  }

  return candidates.find(isAccentColor);
}

function detectCardAccent(card: Element): string | undefined {
  return colorFromComputedStyle(card) ??
    Array.from(card.querySelectorAll(accentSourceSelector)).map(colorFromComputedStyle).find(Boolean);
}

function annotateCards(active = root.hasAttribute("data-abm-active")): void {
  const cards = document.querySelectorAll<HTMLElement>(cardSelector);

  cards.forEach((card) => {
    if (!active) {
      card.removeAttribute("data-abm-card-accent");
      card.style.removeProperty("--abm-card-accent");
      return;
    }

    const accent = detectCardAccent(card);
    const cardAccent = accent ?? "var(--abm-border)";
    if (card.style.getPropertyValue("--abm-card-accent") !== cardAccent) {
      card.style.setProperty("--abm-card-accent", cardAccent);
    }
    card.toggleAttribute("data-abm-card-accent", Boolean(accent));
  });
}

let annotationQueued = false;
function queueCardAnnotation(): void {
  if (annotationQueued) return;
  annotationQueued = true;
  requestAnimationFrame(() => {
    annotationQueued = false;
    annotateCards();
  });
}

function applyModernizer(): void {
  const active = Boolean(
    preferences && isSupportedBoardsRoute(location.pathname) && isEnabledForHost(preferences, location.hostname)
  );

  // Read native card accents before the active stylesheet substitutes its fallback border.
  if (active) annotateCards(true);
  root.toggleAttribute("data-abm-active", active);
  if (!active) annotateCards();
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

function observeCards(): void {
  const observer = new MutationObserver(queueCardAnnotation);
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

observeRoutes();
observeCards();
void refreshPreferences();

chrome.storage.onChanged.addListener((_changes, areaName) => {
  if (areaName === "sync") void refreshPreferences();
});
