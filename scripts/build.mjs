import { build } from "esbuild";
import { cp, mkdir, rm } from "node:fs/promises";

const outdir = "dist";
await rm(outdir, { recursive: true, force: true });
await mkdir(outdir, { recursive: true });

await build({
  entryPoints: ["src/content.ts", "src/popup.ts"],
  bundle: true,
  format: "iife",
  target: "chrome114",
  outdir,
  sourcemap: true
});

await Promise.all([
  cp("src/manifest.json", `${outdir}/manifest.json`),
  cp("src/styles.css", `${outdir}/styles.css`),
  cp("src/popup.html", `${outdir}/popup.html`),
  cp("src/popup.css", `${outdir}/popup.css`)
]);
