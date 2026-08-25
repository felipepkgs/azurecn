# Azure Boards Modernizer

A local-first Chrome extension that gives Azure Boards a quieter, shadcn-inspired interface. It changes presentation only: it never calls Azure APIs, reads work-item data, or sends data anywhere.

## What it modernizes

| View | Support |
| --- | --- |
| Boards hub, Kanban boards | Visual refresh, density, and native-accent work-item cards |
| Backlogs | Visual refresh and density; grid rows retain Azure’s native treatment |
| Sprints | Visual refresh, density, and native-accent work-item cards |
| Shared Boards menus and dialogs | Visual refresh |
| Work-item forms, Queries, Delivery Plans | Native appearance; planned later |

The extension supports Azure DevOps cloud URLs under `https://dev.azure.com/*`. It intentionally leaves Repos, Pipelines, project settings, and non-Boards URLs unchanged.

## Interface details

- Tabs and ordinary Board actions stay transparent at rest. Inactive tabs use muted text, while the active tab uses stronger text and a thin underline.
- Hover and keyboard-focus feedback remain visible without adding a permanent filled control surface. Azure primary and destructive actions keep their semantic styling.
- Tab bars, command toolbars, and page action rows share comfortable vertical spacing that becomes tighter in compact density mode. Work-item form field spacing is unchanged.
- Kanban, Board, and work-item cards receive a complete 1px border using their existing Azure work-item-type accent. When Azure does not expose an accent, the border uses the neutral theme border instead.
- Card accents are refreshed as Azure DevOps replaces Board content during single-page navigation, without changing card content, status, or drag-and-drop behavior.

## Install locally

### From a GitHub Release (recommended)

1. Download the `azure-boards-modernizer-<version>.zip` asset from the latest GitHub Release and extract it. The repository also contains `dist.zip` for local use.
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
