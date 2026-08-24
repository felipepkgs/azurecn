export type Theme = "system" | "light" | "dark";
export type Density = "comfortable" | "compact";

export interface Preferences {
  enabledByHost: Record<string, boolean>;
  theme: Theme;
  density: Density;
}

export const DEFAULT_PREFERENCES: Preferences = {
  enabledByHost: {},
  theme: "system",
  density: "comfortable"
};

export function normalizePreferences(value: Partial<Preferences> | undefined): Preferences {
  return {
    enabledByHost: value?.enabledByHost ?? {},
    theme: value?.theme ?? DEFAULT_PREFERENCES.theme,
    density: value?.density ?? DEFAULT_PREFERENCES.density
  };
}

export function isEnabledForHost(preferences: Preferences, hostname: string): boolean {
  return preferences.enabledByHost[hostname] ?? true;
}

export async function readPreferences(): Promise<Preferences> {
  const stored = await chrome.storage.sync.get(DEFAULT_PREFERENCES);
  return normalizePreferences(stored as Partial<Preferences>);
}

export async function savePreferences(preferences: Preferences): Promise<void> {
  await chrome.storage.sync.set(preferences);
}
