# BlackRoad Brand Templates

Approved UI component templates for the BlackRoad OS design system. These templates represent the official brand language as approved in the [brand kit issue](https://github.com/BlackRoad-OS-Inc/blackroad-brand-kit/issues/24).

## Color System

| Name | Hex | CSS Token |
|------|-----|-----------|
| Ember | `#FF6B2B` | `--accent-1` |
| Fuse | `#FF2255` | `--accent-2` |
| Pulse | `#CC00AA` | `--accent-3` |
| Drift | `#8844FF` | `--accent-4` |
| Signal | `#4488FF` | `--accent-5` |
| Arc | `#00D4FF` | `--accent-6` |

**Signature gradient:** `linear-gradient(90deg, #FF6B2B, #FF2255, #CC00AA, #8844FF, #4488FF, #00D4FF)`

### Neutral Scale

| Token | Hex |
|-------|-----|
| Gray 950 | `#0a0a0a` |
| Gray 900 | `#171717` |
| Gray 800 | `#262626` |
| Gray 700 | `#404040` |
| Gray 500 | `#737373` |
| Gray 400 | `#a3a3a3` |
| Gray 300 | `#d4d4d4` |
| Gray 100 | `#f5f5f5` |

## Typography

| Role | Font | Weight |
|------|------|--------|
| Display / Headings | Space Grotesk | 400, 600, 700 |
| Body | Inter | 400, 500 |
| Code / Mono | JetBrains Mono | 400, 500 |

## Templates

### `BrandColors.jsx`
Interactive brand color palette display. Shows spectrum accents, neutral scale, and signature gradient with click-to-copy hex values.

### `Portals.jsx`
Landing/about page template. Displays portal descriptions, company principles, and key stats with animated hover states.

### `Pricing.jsx`
Pricing plans template with four tiers (Open, Builder, Studio, Enterprise), comparison table, and FAQ accordion.

### `AgentStatus.jsx`
Live system status dashboard. Shows agent load meters, service health, and recent event log.

### `DocsPage.jsx`
Full documentation page with collapsible sidebar, search, breadcrumb navigation, code blocks, and prev/next pagination.

### `AgentProfiles.jsx`
Agent profile grid with role descriptions, company values, and timeline.

## Usage

These are React components. They require no external UI library — all styling is inline. Google Fonts are loaded via `@import` in `DocsPage.jsx`; for other components, ensure the following fonts are available:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

## Design Tokens

All templates share the same constant definitions at the top of each file:

```js
const COLORS = ["#FF6B2B", "#FF2255", "#CC00AA", "#8844FF", "#4488FF", "#00D4FF"];
const GRADIENT = `linear-gradient(90deg, ${COLORS.join(", ")})`;
```
