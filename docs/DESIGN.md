# Design System: Mr. Sign and Print Prototype

## 1. Visual Theme & Atmosphere

Mr. Sign and Print should feel like a modernized local sign shop: loud, practical, confident, and built around fast quote requests. The interface borrows from commercial signage, print proofs, vinyl decals, and storefront graphics rather than startup SaaS.

- **Density:** 5/10 — enough content to feel service-driven, but not crowded.
- **Variance:** 7/10 — asymmetric headline stacking, angled image tiles, and energetic badge elements.
- **Motion:** 5/10 — steady floating production cards and tactile hover states, never cinematic or distracting.
- **Mood:** bright shop-floor utility with high street visibility.

The first screen must signal the business immediately: Signs, Print, Design, Mr. Sign and Print, Vaughan/GTA service, and a quote/contact path.

## 2. Color Palette & Roles

- **Sign Blue** (`#1936D4`) — Primary hero background, high-recognition brand field, strong local-commercial energy.
- **Legacy Red** (`#E51B23`) — CTA emphasis, section labels, urgent service highlights, and quote accents.
- **Print Yellow** (`#FFF200`) — Primary highlight color for badges, stickers, labels, and high-visibility signage moments.
- **Warm Shop White** (`#FFFAF0`) — Main lower-page canvas, warmer than sterile white, suitable for print-shop materials.
- **Paper White** (`#FFFFFF`) — Nav logo chips, service card interiors, and high-contrast content surfaces.
- **Ink Charcoal** (`#151515`) — Primary dark text and linework. Avoid pure black except where legacy artwork demands it.
- **Shop Steel** (`#D8DDE3`) — Secondary borders, muted dividers, and utilitarian support surfaces.
- **Shadow Blue** (`#0D1F8F`) — Dimensional display-type shadow on blue backgrounds.

Rules:
- Keep the palette primary-color commercial, not gradient-led.
- Do not introduce purple, violet, cyan neon, or generic startup blues.
- Red and yellow should be used as signage accents, not as large competing backgrounds in the same section.
- Do not use soft beige luxury palettes; this brand should feel like production and visibility.

## 3. Typography Rules

- **Display:** Use a condensed, heavy sans direction. Current prototype uses `"Arial Black", Impact, sans-serif`; production should replace this with a licensed display face such as `Archivo Black`, `Anton`, `Druk`, `Obviously`, or `Bebas Neue Pro`.
- **Body:** Use a clean grotesk/system sans with practical readability. Current scaffold uses system sans; production can upgrade to `Geist`, `Satoshi`, or `Archivo`.
- **Display Behavior:** Headlines use uppercase, heavy weight, tight leading (`0.85` to `0.95`), and `clamp()` sizing.
- **Body Behavior:** Body copy should stay concise, quote-focused, and service-specific. Keep paragraphs under `65ch`.
- **Metadata:** Contact details, labels, and production notes should be bold, small, and highly scannable.

Copy rules:
- Prefer concrete service terms: `Storefront Signs`, `Rush Print Jobs`, `Design Support`, `Request Quote`.
- Avoid vague marketing language such as "elevate", "seamless", "next-gen", "unleash", and "transform your brand".
- Do not imply unsupported flows: no online payment, file upload, customer account, or ecommerce checkout language.

## 4. Component Stylings

### Navigation

- Logo is built as two physical chips: white `MR. SIGN` speech-tag plus yellow `PRINT` pill.
- Desktop nav uses compact pill links with white translucent borders.
- Mobile should preserve the quote/contact action first. A collapsed menu is acceptable, but the phone CTA must remain visible.
- Minimum tap target: `44px`.

### Hero

- Hero uses a full-viewport blue grid field with oversized stacked type.
- The headline stack should stay visually dominant and read as `SIGNS / PRINT / DESIGN`.
- Asymmetry is required: never center all three headline lines on the same axis.
- Floating image tiles should look like shop work samples, not profile cards or crypto/social cards.
- Use real production-adjacent imagery: signage, print materials, storefronts, work surfaces, design review.
- Badge copy should route toward a quote or contact action.

### Buttons and Links

- Primary CTA: red or blue filled pill, uppercase, bold, direct.
- Secondary CTA: white outline pill on blue, or charcoal text on warm white.
- Hover states may invert fill and text colors.
- Active state should feel tactile: slight `translateY(1px)` or scale reduction.
- No glowing shadows, custom cursors, or decorative gradient text.

### Cards

- Cards can be rounded and expressive because the prototype is signage-inspired, but they must not become generic SaaS cards.
- Service cards should include a concrete service title, one production-specific sentence, a supporting image or texture, and a quote action.
- Avoid nested cards. If content needs hierarchy, use labels, borders, or image overlays.
- Use borders and shadows sparingly; hierarchy should come from color, typography, and image contrast.

### Imagery

- Use authentic shop, signage, print, and storefront images.
- Avoid abstract stock photos, blurry city lights, and unrelated office lifestyle imagery.
- Unsplash images must include stable query parameters and should be replaced by owned project photos before production.
- Decorative images should use `alt=""`; meaningful service images need plain descriptive alt text.

## 5. Layout Principles

- Default component path is `/components/ui`, matching shadcn conventions and the alias import `@/components/ui/hero`.
- App demo path is `src/demo.tsx`; production routing can mount the hero on the home page.
- Use Tailwind utility classes with TypeScript React components.
- Keep max content width around `1440px` for hero/nav and `1152px` for service content.
- Use CSS Grid for service sections and responsive layouts.
- Mobile below `768px` collapses to one column.
- Prevent horizontal scroll at every breakpoint.
- Hero and service sections should be full-width bands, not page sections inside outer cards.
- Avoid equal generic three-card rows in future pages; use asymmetric grids, editorial rows, or production workflow sequences. The current three service cards are acceptable only as a prototype summary.

Spacing:
- Page section padding: `clamp(3rem, 8vw, 6rem)`.
- Card padding: `1.5rem` mobile, `2rem` desktop.
- Nav horizontal padding: `1.25rem` mobile, `2.5rem` desktop.
- Use stable aspect ratios for fixed-format tiles and badges.

## 6. Motion & Interaction

- Use `motion/react` for floating production tiles and future mounted animations.
- Animate only `transform` and `opacity`; never animate layout properties such as `top`, `left`, `width`, or `height`.
- Floating cards should move slowly (`5s` to `6s`) with `easeInOut`.
- Hover rotations may settle angled cards back to zero degrees.
- Badge spin may loop slowly (`10s`) and must remain readable enough to avoid visual noise.
- Respect reduced-motion preferences in future production work.

Recommended defaults:
- Spring interactions: `stiffness: 100`, `damping: 20`.
- Reveal cascades: `0.06s` to `0.12s` between repeated elements.
- Button active state: `scale(0.98)` or `translateY(1px)`.

## 7. Content Model

The hero component currently needs no props, state, hooks, or providers. Future production use should make these values configurable:

- Business name: `Mr. Sign and Print`.
- Primary services: `Signs`, `Printing`, `Design`.
- Phone: `(416) 512-9353`.
- Secondary phone: `(905) 761-8970`.
- Email: `order@mrsignandprint.net`.
- Address: `399 Four Valley Dr. Unit 3, Vaughan, Ontario L4K 5X5`.
- Service area: `Vaughan and the GTA`.
- Primary action: `Request Quote` or `Call for quote`.

Do not add data models for carts, checkout, uploaded artwork, accounts, or payment unless the product requirements change.

## 8. Accessibility & Responsiveness

- Maintain high text contrast on blue, red, yellow, and image overlays.
- Links that call or email must use `tel:` and `mailto:` hrefs.
- Decorative SVG arrows should not receive focus.
- Images with business meaning need descriptive alt text.
- Body text should never drop below `14px`; primary readable text should be `16px` or larger.
- Touch targets must be at least `44px` tall/wide.
- Check mobile widths for headline overflow, rotated tile collisions, and badge overlap.

## 9. Anti-Patterns

Never use:

- Purple gradients, neon glow shadows, or generic tech-startup visuals.
- Fake dashboards, wallets, token points, crypto handles, or social profile cards.
- Generic placeholder company names such as Acme, Nexus, or John Doe.
- Unsupported ecommerce language: cart, checkout, account, upload portal, online payment.
- AI copywriting cliches: elevate, unleash, seamless, next-gen, revolutionary.
- Emoji in production UI.
- Pure black as the dominant surface color.
- Centered hero layouts where every headline line shares the same axis.
- Decorative blobs, bokeh orbs, or abstract gradient backgrounds.
- Broken image links or unrelated stock photos.
- Dense paragraphs in the hero.

## 10. Current Implementation Notes

- Framework: Vite + React + TypeScript.
- Styling: Tailwind CSS.
- UI location: `/components/ui/hero.tsx`.
- Demo mount: `/src/demo.tsx`.
- Runtime dependencies: `motion`, `lucide-react`, `react`, `react-dom`.
- Build command: `npm run build`.
- Dev command: `npm run dev -- --host 127.0.0.1`.
