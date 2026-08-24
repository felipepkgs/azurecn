# Azure Boards Modernizer

A local-first Chrome extension that gives Azure Boards a quieter, shadcn-inspired interface. It changes presentation only: it never calls Azure APIs, reads work-item data, or sends data anywhere.

## What v0.1 supports

| View | Support |
| --- | --- |
| Boards hub, Kanban boards | Visual refresh and density |
| Backlogs | Visual refresh and density |
| Sprints | Visual refresh and density |
| Shared Boards menus and dialogs | Visual refresh |
| Work-item forms, Queries, Delivery Plans | Native appearance; planned later |

The extension supports Azure DevOps cloud URLs under `https://dev.azure.com/*`. It intentionally leaves Repos, Pipelines, project settings, and non-Boards URLs unchanged.

## Install locally

### From a GitHub Release (recommended)

1. Download `dist.zip` from the repository root (or `azure-boards-modernizer-<version>.zip` from a GitHub Release when available) and extract it.
2. Open `chrome://extensions`, enable **Developer mode**, select **Load unpacked**, and choose the extracted folder (the folder containing `manifest.json`).
3. Visit an Azure Boards board, backlog, or sprint. Use the extension toolbar button to select theme, density, or turn the modernizer off for `dev.azure.com`.

### From source

Install Node.js 20 or newer, clone this repository, run `npm install` and `npm run build`, then load the generated `dist` folder using the steps above.

Creating and pushing a version tag such as `v0.1.0` publishes the ZIP as a GitHub Release automatically. The same ZIP is also a suitable starting package for Chrome Web Store submission, subject to its listing and policy requirements.

Run `npm run check`, `npm test`, and `npm run build` before opening a pull request.

## Design principles

- Preserve Azure’s status and work-item-type color meanings.
- Do not replace or intercept Azure DevOps interactions.
- Make every visual change reversible with one site-level switch.
- Prefer resilient, shared component selectors over brittle page-specific markup.

## Privacy

See [PRIVACY.md](PRIVACY.md). This project has no telemetry, remote code, tracking, or network requests.

## Reporting selector breakage

Azure DevOps can change its DOM without notice. Please open the **Selector breakage** issue template with the affected URL pattern, a screenshot, extension version, browser version, and theme/density setting. Redact work-item content before attaching screenshots.

## License

[MIT](LICENSE)
