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
});
