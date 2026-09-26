# StudySync asset system

This directory is the production asset family generated from the approved Minimal Monogram (S) direction in `prototype.png` and the green design system documented in the project briefs.

## Start here

- `branding/logo-primary.svg` — default horizontal logo for light surfaces
- `branding/logos/dark/logo-dark.svg` — logo with a white wordmark for dark surfaces
- `branding/logo-icon.svg` — symbol-only mark
- `branding/icons/app/` — app icon variants and the generated PNG size set
- `branding/icons/favicon/` — favicon SVG plus 16–96 px PNGs
- `branding/splash/` — light and dark 1440×900 splash masters
- `icons/` — 24 px rounded-stroke product icons
- `illustrations/` — warm, editorial product-state illustrations
- `marketing/` and `print/` — editable SVG layout masters

## Brand tokens

| Token | Value |
| --- | --- |
| Deep Green | `#0B3D2E` |
| Forest Green | `#126F4F` |
| Lime Green | `#A7F15B` |
| Pale Mint | `#D8F6DD` |
| Warm Sand | `#F8FAF2` |
| Charcoal | `#1E1E1E` |

Use the horizontal mark at desktop widths, compact header mark for the 64 px application header, and the icon-only mark for mobile, favicons, and app surfaces. Keep at least two 8 px base units of clear space around the symbol; see `branding/logo-construction-guide.svg`.

All SVGs are editable, vector-first masters. `build-assets.ps1` regenerates the family and derives the icon PNG exports through the local Chrome renderer.
