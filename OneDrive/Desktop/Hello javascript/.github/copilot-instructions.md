# AI Coding Agent Instructions for hello-js

This is a **personal portfolio website project** built with vanilla JavaScript, HTML5, and CSS3. It's a full-stack showcase combining professional greeting functionality with interactive demos and neon-themed UI.

## Architecture Overview

**Three-tier structure:**
- **Backend logic** (`src/index.js`): Core greeting function exported as CommonJS module
- **Web UI** (`index.html` + `js/script.js`): Interactive greeting interface with time-aware messages and particle effects
- **Supplementary pages** (`about.html`, `profession.html`): Portfolio sections with isolated demo systems

**Key design decision:** Functional programming (IIFE modules) + event-driven architecture, no framework. Each script is self-contained via closure pattern.

## Critical Workflows

### Running the Project
- **Dev**: `npm install && npm start -- "YourName"` (runs `src/index.js` via Node)
- **Tests**: `npm test` (Mocha + Chai pattern in `test/test.js`)
- **Lint/Format**: `npm run lint` → ESLint; `npm run format` → Prettier
- **Browser**: Open `index.html` directly (no build process)

### Adding New Features
1. **Backend logic**: Add to `src/index.js`, export with `module.exports`
2. **Frontend interaction**: Create IIFE module in `js/` folder following `header.js`/`footer.js` pattern
3. **UI components**: Style in `css/styles.css` using CSS custom properties (`:root` variables)
4. **Tests**: Follow `test/test.js` structure with `describe()` and `it()` blocks

## Project-Specific Patterns

### Module Pattern (IIFE)
All interactive scripts use self-executing functions to avoid global scope pollution:
```javascript
(function() {
  // Private scope: not accessible globally
  const element = document.querySelector('...');
  element.addEventListener('click', handler);
  // Optionally expose via window: window.moduleName = publicAPI;
})();
```
**Why**: Prevents variable conflicts across multiple script files (`header.js`, `footer.js`, `script.js`, `profession.js`).

### Particle Effects (3+ locations)
Header, footer, profession page all use identical gravity-based particle burst pattern:
- Create DOM elements with `createElement()`
- Animate via `requestAnimationFrame` with velocity vectors
- Apply gravity effect: `vel.y += 0.08 to 0.15`
- Remove after lifecycle (30-50 frames) to prevent memory leaks

**Keep consistent**: Reuse this animation when adding particle features.

### CSS Neon Theme
Three core accent colors in `:root`:
```css
--accent: #00f5ff;        /* cyan */
--accent-2: #ff00d6;      /* magenta */
--accent-3: #39ff14;      /* green */
```
Use `text-shadow` for glow effect: `0 0 12px rgba(0,245,255,0.15)`
Use `box-shadow` for element glow: `0 0 40px rgba(0,245,255,0.1)`

### Interactive Demo Pattern (`profession.js`)
Four isolated demo functions: typewriter, color mixer, memory game, particle burst. Key structure:
- Clear output with `clearDemo()` before running new demo
- Use `event.stopPropagation()` to prevent bubbling to parent listeners
- Include "Click here for instructions" hint in demo output
- Track state locally (e.g., `matched` tiles counter, `flipped` array)

## Key Files & Patterns

| File | Purpose | Pattern |
|------|---------|---------|
| `src/index.js` | Core greeting logic | Function export + CommonJS |
| `js/script.js` | Main greeting UI on index.html | IIFE + DOM manipulation + Web Animations API |
| `js/header.js` | Header message cycling + sparkles | IIFE + click handlers + particle effects |
| `js/footer.js` | Footer message cycling | IIFE + click handlers + particle effects |
| `js/profession.js` | Interactive demo selector | IIFE + conditional demo dispatch |
| `css/styles.css` | All styling (neon + animations) | CSS variables + @keyframes (9+ animations defined) |
| `test/test.js` | Unit tests for greeting | Mocha/Chai with `expect()` assertions |

## Common Tasks

**Add a new greeting message**: Update `messages` array in `js/header.js` or `js/footer.js`

**Create a new interactive demo**: 
1. Add function to `js/profession.js` (follow `runTypewriterDemo()` pattern)
2. Add `<option>` to profession.html dropdown
3. Add case in `runSelectedDemo()` switch

**Modify neon colors**: Update `--accent*` in `:root` of `css/styles.css`; changes propagate everywhere via CSS variable inheritance

**Extend particle effects**: Copy gravity animation loop from existing burst function, adjust `vel.y` gravity constant (higher = faster fall)

## Dependencies

- **Runtime**: None (vanilla JS)
- **Dev**: ESLint (8.x), Prettier (3.x), Mocha (10.x), Chai (4.x)
- **No build step**: Browser loads `index.html` directly; Node runs `src/index.js` via `npm start`

## Avoiding Common Pitfalls

- **Don't mutate shared state across modules**: Each IIFE encapsulates its own variables
- **Clean up event listeners**: Remove particle elements from DOM after animation (`particle.remove()`)
- **Use `event.stopPropagation()`**: Prevent nested clickable elements from triggering parent handlers (seen in demo system)
- **Respect localStorage usage**: Already used for hint tracking; clear carefully if needed
- **Keep test exports in sync**: Changes to `src/index.js` module.exports must match test imports
