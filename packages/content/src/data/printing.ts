import { requestQuote, startingFrom, tiered } from "../pricing";
import type { ServiceDetail } from "../types";
import { ref, service } from "./service-utils";

const old = (page: string) => `https://mrsignandprint.net/${page}.html`;

export const printingServices: ServiceDetail[] = [
  service({
    categorySlug: "printing",
    slug: "brochures",
    name: "Brochures",
    displayOrder: 1,
    shortDescription:
      "Professionally printed brochures that give your business the presentation it deserves. Folded formats and custom sizes available.",
    headline: "Brochures That Represent Your Business Properly",
    body: [
      "A well-designed, professionally printed brochure gives customers something to take home and remember you by.",
      "We print folded brochures in practical sizes and quantities for businesses across Vaughan and the GTA.",
    ],
    capabilities: [
      "Tri-fold, bi-fold, z-fold, and custom folded brochures",
      "Full-colour printing on coated and uncoated paper",
      "Gloss, matte, and soft-touch finish options",
      "Short and long run quantities",
    ],
    pricing: tiered(
      "Legacy full-colour tiers from $383",
      "Old-site full-colour brochure tables list 8.5x11 and 11x17 options from 500 to 5000 quantity, starting at $383 for 8.5x11 one-sided 80 lb stock.",
      old("colorbrochures"),
    ),
    imageAlt: "Tri-fold brochure printed on glossy stock.",
    imagePrompt:
      "A tri-fold brochure for a fictional local business, open on a clean surface to show polished interior panels with abstract text blocks, icons, and a small image area.",
    metaTitle: "Custom Brochures in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Professionally printed brochures for Vaughan businesses. Tri-fold, bi-fold, and custom formats available. Request a quote from Mr. Sign and Print.",
    related: [
      ref("printing", "flyers"),
      ref("printing", "full-colour-brochures"),
      ref("printing", "colour-postcards"),
    ],
  }),
  service({
    categorySlug: "printing",
    slug: "invitations",
    name: "Invitations",
    displayOrder: 2,
    shortDescription:
      "Custom-printed invitations for corporate events, celebrations, grand openings, and more. Professional quality every time.",
    headline: "Custom Invitations Printed for Any Occasion",
    capabilities: [
      "Single-panel and folded invitation cards",
      "Full-colour printing on quality card stock",
      "Matching envelope options",
      "Small and large quantity runs",
    ],
    pricing: requestQuote(),
    imageAlt: "Printed event invitation card with matching envelope.",
    imagePrompt:
      "A printed event invitation card alongside a matching envelope on a neutral linen surface, with elegant abstract layout blocks and a small decorative element.",
    metaTitle: "Custom Printed Invitations in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom-printed invitations for corporate events, grand openings, and celebrations in Vaughan and the GTA. Professional quality, fast turnaround. Request a quote.",
    related: [
      ref("printing", "weddings"),
      ref("printing", "colour-postcards"),
      ref("printing", "brochures"),
    ],
  }),
  service({
    categorySlug: "printing",
    slug: "business-cards",
    name: "Business Cards",
    displayOrder: 3,
    shortDescription:
      "First impressions that last. We print sharp, full-colour business cards on quality card stock in the finish of your choice.",
    headline: "Business Cards That Make a Strong First Impression",
    capabilities: [
      "Standard 3.5 inch by 2 inch business cards",
      "Gloss and matte finish options",
      "Single-sided and double-sided printing",
      "Standard, premium, and thick card stock options",
    ],
    pricing: startingFrom(
      3800,
      "Legacy offset cards from $38",
      old("businesscards"),
    ),
    imageAlt: "Fanned stack of matte-finish business cards.",
    imagePrompt:
      "A neatly fanned stack of matte-finish business cards on a white surface, showing clean modern abstract contact layout blocks.",
    metaTitle: "Business Cards in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Professionally printed business cards in Vaughan and the GTA. Matte, gloss, and premium finishes. Request a quote from Mr. Sign and Print.",
    related: [
      ref("printing", "colour-business-cards"),
      ref("printing", "flyers"),
      ref("printing", "colour-postcards"),
    ],
    isFeatured: true,
  }),
  service({
    categorySlug: "printing",
    slug: "invoices",
    name: "Invoices",
    displayOrder: 4,
    shortDescription:
      "Custom-printed invoice books and forms for your business. Clean, professional, and ready to use.",
    headline: "Custom Invoice Books and Business Forms",
    capabilities: [
      "Invoice books and business forms",
      "Professional header and line-item layouts",
      "Single-sheet and booklet options",
      "Custom business information and branding",
    ],
    pricing: requestQuote(),
    imageAlt: "Printed invoice booklet on a desk.",
    imagePrompt:
      "A printed invoice booklet with a professional header and line-item table on a tidy desk beside a pen, with abstract placeholder text lines.",
    metaTitle: "Custom Invoice Books in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom-printed invoice booklets and business forms in Vaughan and the GTA. Professional, NCR, and single-sheet options. Request a quote from Mr. Sign and Print.",
    related: [
      ref("printing", "stamps"),
      ref("printing", "business-cards"),
      ref("printing", "brochures"),
    ],
  }),
  service({
    categorySlug: "printing",
    slug: "colour-business-cards",
    name: "Colour Business Cards",
    displayOrder: 5,
    shortDescription:
      "Stand out from the crowd with full-colour business cards that show off your brand, your work, or your personality.",
    headline: "Full-Colour Business Cards That Stand Out",
    capabilities: [
      "4/0 single-sided colour cards",
      "4/4 double-sided colour cards",
      "AQ coating and 12 pt stock options",
      "Postcard-size card options",
    ],
    pricing: startingFrom(
      7000,
      "Legacy full-colour cards from $70",
      old("fullcolorbusi"),
    ),
    imageAlt: "Vibrant full-colour business cards spread across a surface.",
    imagePrompt:
      "A set of vibrant full-colour business cards spread across a clean white surface, with bold photography blocks and illustrated abstract design elements.",
    metaTitle: "Colour Business Cards in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Full-colour business cards that make an impact. Printed in Vaughan for businesses across the GTA. Premium stock and finishes available. Request a quote.",
    related: [
      ref("printing", "business-cards"),
      ref("printing", "colour-postcards"),
      ref("printing", "flyers"),
    ],
  }),
  service({
    categorySlug: "printing",
    slug: "large-format-printing",
    name: "Large Format Printing",
    displayOrder: 6,
    shortDescription:
      "Vivid large-format printing for banners, posters, displays, and more. Any size, full colour, built to make an impact.",
    headline: "Large Format Printing for Banners, Posters, and Displays",
    capabilities: [
      "Outdoor and indoor wide-format printing",
      "Paper, vinyl, backlit film, transparency, and banner materials",
      "Mounting and laminating options",
      "Full-colour and text-only output",
    ],
    pricing: tiered(
      "Legacy outdoor output from $7/sq ft",
      "Old-site large format pricing lists outdoor full-colour output from $12 to $19/sq ft by material, text-only discounts down to $7/sq ft, mounting at $5/sq ft plus board cost, and laminating at $7/sq ft.",
      old("largeformat"),
    ),
    imageAlt: "Freshly printed large-format banner being unrolled.",
    imagePrompt:
      "A technician carefully unrolling a freshly printed large-format banner in a print shop, with vivid abstract colour fields and crisp edges.",
    metaTitle: "Large Format Printing in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Vivid large-format printing for banners, posters, displays, and signage in Vaughan and the GTA. Any size, full colour. Request a quote from Mr. Sign and Print.",
    related: [
      ref("signs", "banner"),
      ref("printing", "full-colour-brochures"),
      ref("printing", "colour-postcards"),
    ],
  }),
  service({
    categorySlug: "printing",
    slug: "colour-postcards",
    name: "Colour Postcards",
    displayOrder: 7,
    shortDescription:
      "Full-colour postcards for direct mail, promotions, events, and real estate. A high-impact, low-cost marketing tool.",
    headline: "Full-Colour Postcards for Promotions and Direct Mail",
    capabilities: [
      "Multiple postcard sizes",
      "Single-sided and double-sided colour printing",
      "Direct mail and event promotion use",
      "Real estate and local business marketing",
    ],
    pricing: startingFrom(
      9500,
      "Legacy postcards from $95 for 1000",
      old("postcards"),
    ),
    imageAlt: "Glossy full-colour postcards arranged in a fan.",
    imagePrompt:
      "A collection of full-colour glossy postcards arranged in a fan on a light surface, each with different abstract promotional image blocks.",
    metaTitle: "Colour Postcards in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Full-colour printed postcards for direct mail, promotions, and events in Vaughan and the GTA. High-gloss finish, fast turnaround. Request a quote.",
    related: [
      ref("printing", "flyers"),
      ref("printing", "business-cards"),
      ref("printing", "brochures"),
    ],
  }),
  service({
    categorySlug: "printing",
    slug: "menu-boxes",
    name: "Menu Boxes",
    displayOrder: 8,
    shortDescription:
      "Printed menus for restaurants, cafes, and food businesses. Full-colour, laminated, and built to survive daily use.",
    headline: "Printed Restaurant Menus for Daily Use",
    capabilities: [
      "Full-colour restaurant menus",
      "Laminated menu options",
      "Folded and flat menu layouts",
      "Restaurant, cafe, and food service use",
    ],
    pricing: requestQuote(),
    imageAlt: "Full-colour printed restaurant menus.",
    imagePrompt:
      "A stack of folded full-colour printed restaurant menus fanned out on a restaurant table, with abstract food photography blocks and brand colour panels.",
    metaTitle: "Printed Restaurant Menus in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom printed menus for restaurants and cafes in Vaughan and the GTA. Full-colour, laminated, and built for daily use. Request a quote from Mr. Sign and Print.",
    related: [
      ref("printing", "full-colour-brochures"),
      ref("printing", "flyers"),
      ref("printing", "colour-postcards"),
    ],
  }),
  service({
    categorySlug: "printing",
    slug: "full-colour-brochures",
    name: "Full Colour Brochures",
    displayOrder: 9,
    shortDescription:
      "Full-colour brochures that tell your story with impact. Multiple fold options and sizes available.",
    headline: "Full-Colour Brochures With Rich, Professional Output",
    capabilities: [
      "8.5 inch by 11 inch and 11 inch by 17 inch formats",
      "One-sided and both-sided colour options",
      "80 lb and 100 lb stock options",
      "Quantity tiers for business campaigns",
    ],
    pricing: tiered(
      "Legacy brochure tiers from $383",
      "Old-site full-colour brochure tables list 8.5x11 and 11x17 options from 500 to 5000 quantity, with one-sided and both-sided pricing by stock.",
      old("colorbrochures"),
    ),
    imageAlt: "Folded full-colour brochure with full-bleed photography.",
    imagePrompt:
      "A folded full-colour brochure opened to show vibrant full-bleed photography blocks inside, with a bold graphic cover nearby.",
    metaTitle: "Full Colour Brochures in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Full-colour brochures with rich photography and bold design for Vaughan businesses. Multiple sizes and fold options. Request a quote from Mr. Sign and Print.",
    related: [
      ref("printing", "brochures"),
      ref("printing", "colour-postcards"),
      ref("printing", "flyers"),
    ],
  }),
  service({
    categorySlug: "printing",
    slug: "stamps",
    name: "Stamps",
    displayOrder: 10,
    shortDescription:
      "Custom rubber stamps for address labels, branding, document marking, and business use. Self-inking and traditional options.",
    headline: "Custom Rubber Stamps for Business Use",
    capabilities: [
      "Address and logo stamps",
      "Self-inking rubber stamps",
      "Document marking stamps",
      "Business branding and office use",
    ],
    pricing: requestQuote(),
    imageAlt: "Self-inking rubber stamp impression on a card.",
    imagePrompt:
      "A custom self-inking rubber stamp pressed onto a white card, leaving a clean abstract blue impression beside office stationery.",
    metaTitle: "Custom Rubber Stamps in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom self-inking and traditional rubber stamps for businesses in Vaughan and the GTA. Address stamps, logo stamps, and more. Request a quote from Mr. Sign and Print.",
    related: [
      ref("printing", "business-cards"),
      ref("printing", "invoices"),
      ref("printing", "brochures"),
    ],
  }),
  service({
    categorySlug: "printing",
    slug: "flyers",
    name: "Flyers",
    displayOrder: 11,
    shortDescription:
      "Eye-catching flyers for promotions, events, and business advertising. Printed in full colour on quality paper stock.",
    headline: "Flyers for Promotions, Events, and Local Advertising",
    capabilities: [
      "Single-page promotional flyers",
      "Colour and black ink options",
      "Typesetting and layout support",
      "Small event runs and larger advertising runs",
    ],
    pricing: tiered(
      "Legacy flyer tables by size and quantity",
      "Old-site flyer tables include many size and quantity combinations, with type setting from $55 to $75, standard colour charges from $35, and colour paper from $15 per 1000.",
      old("flyers"),
    ),
    imageAlt: "Stack of freshly printed single-page flyers.",
    imagePrompt:
      "A small stack of freshly printed single-page flyers, each showing bold abstract promotional shapes and bright colour blocks for a local business.",
    metaTitle: "Custom Flyers in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Full-colour printed flyers for promotions, events, and businesses in Vaughan and the GTA. Fast turnaround, competitive pricing. Request a quote.",
    related: [
      ref("printing", "colour-postcards"),
      ref("printing", "brochures"),
      ref("printing", "business-cards"),
    ],
  }),
  service({
    categorySlug: "printing",
    slug: "weddings",
    name: "Weddings",
    displayOrder: 12,
    shortDescription:
      "Elegant printed wedding suites including invitations, RSVP cards, programs, and menus. Every detail, done beautifully.",
    headline: "Wedding Printing for Invitations, Programs, and Menus",
    capabilities: [
      "Save the date cards and invitations",
      "RSVP cards and envelopes",
      "Programs and printed menus",
      "Coordinated print suites",
    ],
    pricing: requestQuote(),
    imageAlt: "Printed wedding suite arranged on linen.",
    imagePrompt:
      "A complete printed wedding suite arranged on soft cream linen: save the date card, invitation, RSVP card, envelopes, and subtle floral accent.",
    metaTitle: "Wedding Printing in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Beautiful printed wedding suites including invitations, RSVP cards, programs, and more in Vaughan and the GTA. Request a quote from Mr. Sign and Print.",
    related: [
      ref("printing", "invitations"),
      ref("printing", "colour-postcards"),
      ref("printing", "brochures"),
    ],
  }),
];
