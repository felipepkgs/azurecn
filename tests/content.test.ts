import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const content = readFileSync(resolve(process.cwd(), "src/content.ts"), "utf8");

describe("work-item card annotation", () => {
  it("detects native color sources and writes a card-local accent variable", () => {
    expect(content).toContain("function detectCardAccent");
    expect(content).toContain('card.style.setProperty("--abm-card-accent", cardAccent)');
    expect(content).toContain('const cardAccent = accent ?? "var(--abm-border)"');
  });

  it("re-annotates cards as Azure replaces SPA content", () => {
    expect(content).toContain("new MutationObserver(queueCardAnnotation)");
    expect(content).toContain("childList: true, subtree: true");
  });

  it("removes card annotations whenever the modernizer is inactive", () => {
    expect(content).toContain('card.removeAttribute("data-abm-card-accent")');
    expect(content).toContain('card.style.removeProperty("--abm-card-accent")');
  });
});
