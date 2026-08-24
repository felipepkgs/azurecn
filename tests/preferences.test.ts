import { describe, expect, it } from "vitest";
import { DEFAULT_PREFERENCES, isEnabledForHost, normalizePreferences } from "../src/shared/preferences";

describe("preferences", () => {
  it("defaults to a comfortable system theme and enables a site", () => {
    expect(normalizePreferences(undefined)).toEqual(DEFAULT_PREFERENCES);
    expect(isEnabledForHost(DEFAULT_PREFERENCES, "dev.azure.com")).toBe(true);
  });

  it("honors a site-level disable setting", () => {
    const preferences = normalizePreferences({ enabledByHost: { "dev.azure.com": false } });
    expect(isEnabledForHost(preferences, "dev.azure.com")).toBe(false);
  });
});
