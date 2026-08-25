import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const styles = readFileSync(resolve(process.cwd(), "src/styles.css"), "utf8");

describe("Boards control styling", () => {
  it("keeps all extension rules scoped to an active Boards page", () => {
    expect(styles).toContain("html[data-abm-active]");
  });

  it("includes the modern control treatments", () => {
    expect(styles).toContain('--abm-font: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif');
    expect(styles).toContain(".bolt-button.icon-only");
    expect(styles).toContain('[role="toolbar"]');
    expect(styles).toContain('[role="tablist"]');
  });

  it("uses transparent resting controls and an underlined active tab", () => {
    expect(styles).toContain(".bolt-button:not(.primary)");
    expect(styles).toContain("background: transparent;");
    expect(styles).toContain("block-size: 2px;");
    expect(styles).toContain("opacity: 1;");
  });

  it("applies a shared compact-aware vertical rhythm outside work-item forms", () => {
    expect(styles).toContain("--abm-row-space: 16px;");
    expect(styles).toContain("margin-block-end: var(--abm-row-space);");
    expect(styles).toContain('data-abm-density="compact"] [role="tablist"]');
    expect(styles).not.toContain(".work-item-form .bolt-textfield");
  });

  it("outlines cards without styling backlog grid rows as cards", () => {
    expect(styles).toContain("border: 1px solid var(--abm-card-accent, var(--abm-border));");
    expect(styles).not.toContain(".board-card,\nhtml[data-abm-active] .grid-row");
  });
});
