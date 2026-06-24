# Design System: Mr. Sign and Print Static Site

## 1. Visual Theme

Mr. Sign and Print should feel like a modernized local sign shop: loud, practical, confident, and built around direct phone, email, and shop-visit contact. The interface borrows from commercial signage, print proofs, vinyl decals, and storefront graphics.

- **Density:** 5/10. Enough service content to feel useful, but not crowded.
- **Variance:** 7/10. Use asymmetric headline stacking, angled image tiles, and energetic badge elements.
- **Motion:** 5/10. Use tactile hover states and steady card motion, never cinematic distraction.
- **Mood:** Bright shop-floor utility with high street visibility.

The first screen must signal the business immediately: Signs, Printing, Design, Mr. Sign and Print, Vaughan/GTA service, and a direct-contact path.

## 2. Color Palette

- **Sign Blue** (`#1936D4`): Primary hero background and strong brand field.
- **Legacy Red** (`#E51B23`): Primary CTA emphasis and section labels.
- **Print Yellow** (`#FFF200`): Badges, stickers, labels, and high-visibility signage moments.
- **Warm Shop White** (`#FFFAF0`): Main lower-page canvas.
- **Paper White** (`#FFFFFF`): Nav logo chips, service card interiors, and content surfaces.
- **Ink Charcoal** (`#151515`): Primary dark text and linework.
- **Shop Steel** (`#D8DDE3`): Secondary borders and muted dividers.
- **Shadow Blue** (`#0D1F8F`): Dimensional display-type shadow on blue backgrounds.

Rules:

- Keep the palette commercial and brand-led, not gradient-led.
- Do not introduce purple, violet, cyan neon, or generic startup blues.
- Red and yellow should be accents, not large competing backgrounds.
- Do not use soft beige luxury palettes.

## 3. Typography

- **Display:** Use a condensed, heavy sans direction. Current implementation uses `"Arial Black", Impact, sans-serif`.
- **Body:** Use a clean grotesk or system sans with practical readability.
- **Display behavior:** Headlines use uppercase, heavy weight, tight leading, and stable responsive sizing.
- **Body behavior:** Copy should stay concise, service-specific, and direct-contact oriented.
- **Metadata:** Contact details, labels, and production notes should be bold, small, and scannable.

Copy rules:

- Prefer concrete terms: `Storefront Signs`, `Rush Print Jobs`, `Design Support`, `Call the Shop`, `Email Us`.
- Avoid vague marketing language such as "elevate", "seamless", "next-gen", "unleash", and "transform your brand".
- Do not imply unsupported flows: no online payment, file upload, customer account, ecommerce checkout, or online submission language.

## 4. Components

### Navigation

- Logo is built as two physical chips: white `MR. SIGN` speech-tag plus yellow `PRINT` pill.
- Desktop nav uses compact pill links with translucent borders.
- Mobile should preserve the phone CTA first.
- Minimum tap target: `44px`.

### Hero

- Hero uses a full-viewport blue grid field with oversized stacked type.
- The headline stack should read as `SIGNS / PRINTING / DESIGN`.
- Asymmetry is required. Do not center all three headline lines on the same axis.
- Use production-adjacent imagery: signage, print materials, storefronts, work surfaces, and design review.
- Badge and CTA copy should route toward phone, email, services, or location.

### Buttons and Links

- Primary CTA: red or blue filled pill, uppercase, bold, direct.
- Secondary CTA: white outline pill on blue, or charcoal text on warm white.
- Hover states may invert fill and text colors.
- Active state should feel tactile with `scale(0.98)`.
- No glowing shadows, custom cursors, or decorative gradient text.

### Cards

- Cards can be rounded and expressive because the site is signage-inspired.
- Service cards should include a concrete service title, one production-specific sentence, supporting imagery, and a view-service path.
- Avoid nested cards.
- Use borders and shadows sparingly.

### Imagery

- Use authentic shop, signage, print, and storefront images.
- Avoid abstract stock photos, blurry city lights, and unrelated office lifestyle imagery.
- Decorative images should use `alt=""`.
- Meaningful service images need plain descriptive alt text.

## 5. Layout

- Use Tailwind utility classes with TypeScript React components.
- Keep max content width around `1440px` for hero/nav and `1152px` for service content.
- Use CSS Grid for service sections and responsive layouts.
- Mobile below `768px` collapses to one column.
- Prevent horizontal scroll at every breakpoint.
- Hero and service sections should be full-width bands, not page sections inside outer cards.
- Use stable aspect ratios for fixed-format tiles and badges.

## 6. Motion

- Use `motion/react` for card and hero interactions.
- Animate only `transform` and `opacity`.
- Floating cards should move slowly with `easeInOut`.
- Hover rotations may settle angled cards back to zero degrees.
- Badge spin may loop slowly and must remain readable.
- Respect reduced-motion preferences in future production work.

## 7. Content Model

Public content comes from JSON files in `packages/content/content/`.

- Site details: `site.json`
- Categories: `categories.json`
- Services: one JSON file per service under `services/{signs,printing,design}/`

Do not add data models for carts, checkout, uploaded artwork, accounts, online submissions, admin users, or payment unless the product requirements change.

## 8. Accessibility

- Maintain high text contrast on blue, red, yellow, and image overlays.
- Links that call or email must use `tel:` and `mailto:` hrefs.
- Decorative SVG arrows should not receive focus.
- Images with business meaning need descriptive alt text.
- Body text should never drop below `14px`; primary readable text should be `16px` or larger.
- Touch targets must be at least `44px`.
- Check mobile widths for headline overflow, rotated tile collisions, and badge overlap.

## 9. Anti-Patterns

Never use:

- Purple gradients, neon glow shadows, or generic tech-startup visuals.
- Fake dashboards, wallets, token points, crypto handles, or social profile cards.
- Generic placeholder company names such as Acme, Nexus, or John Doe.
- Unsupported ecommerce language: cart, checkout, account, upload portal, online payment.
- Online submission language unless the product requirements change.
- AI copywriting cliches: elevate, unleash, seamless, next-gen, revolutionary.
- Emoji in production UI.
- Pure black as the dominant surface color.
- Centered hero layouts where every headline line shares the same axis.
- Decorative blobs, bokeh orbs, or abstract gradient backgrounds.
- Broken image links or unrelated stock photos.

## 10. Current Implementation Notes

- Framework: Next.js static export.
- Styling: Tailwind CSS.
- Content: JSON-backed `@mrsign/content` package.
- Runtime dependencies: `motion`, `lucide-react`, `react`, `react-dom`.
- Build command: `corepack pnpm --filter @mrsign/web build`.
- Dev command: `corepack pnpm --filter @mrsign/web dev`.
