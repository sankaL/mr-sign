# Design System: Mr. Sign and Print Editorial Site

## 1. Direction

The public site uses a quiet editorial system inspired by premium architectural and professional-service websites. The interface should feel precise, local, established, and image-led.

- Density: 3/10. Keep layouts open and easy to scan.
- Variance: 4/10. Use controlled overlaps and varied image ratios without visual noise.
- Motion: 2/10. Motion supports interaction only.
- Mood: Warm white paper, deep navy ink, and restrained amber details.

The supplied July 2026 homepage reference is the primary visual source of truth. Do not reintroduce the former bright signage-board style.

## 2. Color

- Canvas: `#FCFBF8`
- Paper: `#FFFFFF`
- Ink navy: `#071A3A`
- Amber: `#D48318`
- Body copy: `#566174`
- Border: `#DCE1E8`
- Soft neutral: `#F2F3F3`

Rules:

- Ink navy is the dominant text and CTA color.
- Amber is limited to eyebrows, selected words, arrows, icons, and the CTA button inside the navy banner.
- Most sections use canvas or paper backgrounds.
- Do not use neon lime, bright red, saturated yellow, pure black sections, purple, or gradients.
- Borders are fine and cool gray. Shadows are subtle navy-tinted depth cues.

## 3. Typography

- Display: Libre Baskerville through `next/font`.
- Body and interface: Manrope through `next/font`.
- Large headings use sentence case, normal serif weight, tight tracking, and balanced line wrapping.
- Body text uses medium sans-serif weight, generous line height, and a maximum readable width near 60 characters.
- Eyebrows use small uppercase sans-serif text with amber color and controlled tracking.
- Avoid oversized condensed uppercase headlines.

## 4. Layout

- Shared content width: `1280px` maximum.
- Page gutters: `20px` mobile and `40px` from tablet upward.
- Main section spacing: approximately `72px` to `112px`.
- Desktop hero: editorial copy on the left and a large fixed-ratio image on the right.
- Cards use stable image ratios, `8px` to `14px` radii, and open internal spacing.
- Full-width bands remain flat. Do not wrap whole sections in decorative containers.
- Mobile layouts collapse to one or two columns without horizontal scrolling.

## 5. Shared Components

### Navigation

- Sticky white header with a fine bottom border.
- Simplified navy wordmark and outlined PRINT tag.
- Desktop links are plain text with an amber active underline.
- Project pricing uses a compact rectangular navy button.
- Mobile uses a white full-width menu below the header.

### Buttons

- Primary: navy fill, white text, rectangular `7px` radius.
- Secondary: transparent or white surface with a cool gray border.
- Accent: amber fill inside navy CTA sections.
- Buttons use direct labels and a small directional arrow.
- Hover motion is limited to a subtle upward translation.

### Cards

- Cards use one border, one paper surface, and a restrained shadow.
- Images lead the hierarchy.
- Do not use nested cards, 3D tilt, large pills, or decorative badges.

### CTA and Footer

- CTA banners use a navy field, amber eyebrow, serif heading, and amber primary action.
- The footer stays white.
- Contact details form a thin divided row above the compact footer columns.

## 6. Page Families

### Home

- Split hero with a large generated facade image and two overlapping project cards.
- Divided credibility row below the copy.
- Bordered service icon tiles.
- Four image-led featured service cards.
- Factual proof strip using existing business claims.
- Navy CTA banner, contact row, and white footer.

### Categories

- Split light hero with category copy and one large image.
- Open service grid with one optional prominent card.
- Shared direct-contact CTA.

### Service Details

- Light split hero, serif heading, and large service image.
- Long-form content and capabilities remain open and readable.
- Contact panel may become sticky on desktop.
- Related services use the shared card system.

### Utility Pages

- About, FAQs, Contact, Location, pricing contact, compatibility routes, and 404 use the same page header, typography, borders, and CTA language.
- Gallery uses a responsive project grid rather than an accordion interaction.

## 7. Imagery

- Home imagery uses the generated editorial suite in `apps/web/public/images/generated/home-editorial-*.png`.
- Category and service pages may reuse their existing managed images.
- Use consistent fixed ratios and `object-cover` crops.
- Meaningful images require descriptive alt text.
- Avoid readable third-party branding, unrelated stock photography, or abstract decorative imagery.

## 8. Interaction and Accessibility

- Minimum touch target: `44px`.
- Every interactive element requires a visible focus state.
- Use semantic sections, headings, navigation, lists, and links.
- Respect `prefers-reduced-motion`.
- Animate only transforms and opacity.
- Maintain readable contrast and prevent horizontal overflow at `320px`.
- The shared skip link targets the public content wrapper.

## 9. Product Guardrails

- Public CTAs route to phone, email, location, or service browsing.
- Do not imply online submission, file upload, payment, checkout, customer accounts, or inventory.
- Do not add fabricated testimonials, clients, ratings, metrics, or project claims.
- JSON in `packages/content/content/` remains the content source of truth.
