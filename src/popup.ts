import { readPreferences, savePreferences, type Density, type Preferences, type Theme } from "./shared/preferences";

const enabled = document.querySelector<HTMLInputElement>("#enabled")!;
const siteName = document.querySelector<HTMLElement>("#site-name")!;
let hostname = "dev.azure.com";
let preferences: Preferences;

function render(): void {
  enabled.checked = preferences.enabledByHost[hostname] ?? true;
  document.querySelectorAll<HTMLButtonElement>("[data-theme]").forEach((button) => {
    button.dataset.selected = String(button.dataset.theme === preferences.theme);
  });
  document.querySelectorAll<HTMLButtonElement>("[data-density]").forEach((button) => {
    button.dataset.selected = String(button.dataset.density === preferences.density);
  });
}

async function persist(): Promise<void> {
  await savePreferences(preferences);
  render();
}

async function initialize(): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  hostname = tab.url ? new URL(tab.url).hostname : hostname;
  siteName.textContent = hostname === "dev.azure.com" ? "dev.azure.com" : hostname;
  preferences = await readPreferences();
  render();
}

enabled.addEventListener("change", () => {
  preferences.enabledByHost[hostname] = enabled.checked;
  void persist();
});

document.querySelectorAll<HTMLButtonElement>("[data-theme]").forEach((button) => {
  button.addEventListener("click", () => {
    preferences.theme = button.dataset.theme as Theme;
    void persist();
  });
});

document.querySelectorAll<HTMLButtonElement>("[data-density]").forEach((button) => {
  button.addEventListener("click", () => {
    preferences.density = button.dataset.density as Density;
    void persist();
  });
});

void initialize();
