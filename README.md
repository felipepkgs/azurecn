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

1. Install Node.js 20 or newer.
2. Clone this repository, then run `npm install` and `npm run build`.
3. Open `chrome://extensions`, enable **Developer mode**, select **Load unpacked**, and choose this repository’s `dist` folder.
4. Visit an Azure Boards board, backlog, or sprint. Use the extension toolbar button to select theme, density, or turn the modernizer off for `dev.azure.com`.

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
