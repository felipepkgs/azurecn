# Contributing

## Local workflow

Run `npm install`, `npm run check`, `npm test`, and `npm run build`. Load `dist` in Chrome as an unpacked extension and reload it from `chrome://extensions` after each build.

## Change guidelines

- Scope styles under `html[data-abm-active]`.
- Do not change Azure DevOps state or request any Azure data.
- Keep work-item type and status color accents intact.
- Test light, dark, system, compact, and comfortable modes on a board, backlog, and sprint.
- Prefer selectors used by multiple native Azure components. If a selector is page-specific, document the supported route.

## Pull requests

Include before/after screenshots with sensitive work-item text redacted, and state the Azure route and browser version used for verification.
