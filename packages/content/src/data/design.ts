import { requestQuote, startingFrom, tiered } from "../pricing";
import type { ServiceDetail } from "../types";
import { ref, service } from "./service-utils";

const old = (page: string) => `https://mrsignandprint.net/${page}.html`;

export const designServices: ServiceDetail[] = [
  service({
    categorySlug: "design",
    slug: "electronic-signs",
    name: "Electronic Signs",
    displayOrder: 1,
    shortDescription:
      "Design and setup for programmable electronic LED signs. We handle the graphics, content layout, and formatting for your digital display.",
    headline: "Electronic Sign Design That Keeps Your Message Fresh",
    capabilities: [
      "Graphic and text layout for LED message boards",
      "Animated and static content design",
      "Formatting for common electronic sign systems",
      "Content updates and revisions",
    ],
    pricing: requestQuote(),
    imageAlt: "Outdoor LED electronic message board on a pylon sign.",
    imagePrompt:
      "An outdoor programmable LED sign mounted on a pylon at a commercial plaza entrance, displaying bright abstract amber-on-black message blocks.",
    metaTitle: "Electronic Sign Design in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom design and setup for programmable electronic LED signs in Vaughan and the GTA. We create the graphics so your sign looks sharp. Request a quote.",
    related: [
      ref("signs", "illuminated-boxes"),
      ref("signs", "channel-letters"),
      ref("design", "logos"),
    ],
  }),
  service({
    categorySlug: "design",
    slug: "taxi-roof-signs",
    name: "Taxi's Roof Signs",
    displayOrder: 2,
    shortDescription:
      "Custom-designed and produced illuminated taxi roof signs. Clear, bright, and built for continuous use.",
    headline: "Custom Taxi Roof Signs Designed and Built to Stand Out",
    capabilities: [
      "Full graphic design for roof sign panels",
      "Backlit sign panel production",
      "Replacement panels",
      "Durable construction for continuous vehicle use",
    ],
    pricing: startingFrom(18000, "Starting from $180 blank", old("taxi")),
    imageAlt: "Backlit taxi roof sign mounted on a cab.",
    imagePrompt:
      "A well-lit taxi at a street corner at night, with an illuminated roof sign showing abstract company-name blocks on a coloured background.",
    metaTitle: "Taxi Roof Signs in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom-designed and produced illuminated taxi roof signs in Vaughan and the GTA. Clear branding, built for continuous use. Request a quote from Mr. Sign and Print.",
    related: [
      ref("signs", "vehicle-lettering"),
      ref("signs", "magnetic-signs"),
      ref("signs", "vinyl-cutting"),
    ],
  }),
  service({
    categorySlug: "design",
    slug: "engraving-plaque",
    name: "Engraving (Plaque)",
    displayOrder: 3,
    shortDescription:
      "Custom engraved plaques for awards, memorials, building dedications, and professional recognition.",
    headline: "Custom Engraved Plaques for Awards and Recognition",
    capabilities: [
      "Brass, aluminum, and acrylic plaque options",
      "Custom engraved text and logos",
      "Wood, metal, and acrylic backing options",
      "Wall-mount and desk-mount configurations",
    ],
    pricing: requestQuote(),
    imageAlt: "Engraved bronze plaque mounted on a wood backing.",
    imagePrompt:
      "A close-up of a polished brass engraved plaque mounted on a dark walnut backing, with abstract dedication lines and a small emblem shape.",
    metaTitle: "Custom Engraved Plaques in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom engraved plaques for awards, dedications, and professional recognition in Vaughan and the GTA. Quality materials and clean engraving. Request a quote.",
    related: [
      ref("signs", "cut-out-letters"),
      ref("signs", "plate-directory-board"),
      ref("design", "logos"),
    ],
  }),
  service({
    categorySlug: "design",
    slug: "traffic-signs",
    name: "Traffic Signs",
    displayOrder: 4,
    shortDescription:
      "Custom traffic and regulatory signs for private properties, parking lots, and industrial sites across Vaughan and the GTA.",
    headline: "Custom Traffic and Regulatory Signs for Private Properties",
    capabilities: [
      "12 inch by 18 inch and 18 inch by 24 inch traffic signs",
      "Blank aluminum sign panels",
      "Posts and hardware options",
      "Parking, private property, and directional signs",
    ],
    pricing: startingFrom(
      3500,
      "Starting from $35 each in quantity",
      old("traffic"),
    ),
    imageAlt: "Stack of custom aluminum traffic signs.",
    imagePrompt:
      "A row of freshly made custom aluminum regulatory signs lined up in a print shop, using abstract warning symbols, arrows, and colour panels.",
    metaTitle: "Custom Traffic Signs in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom traffic and parking signs for private properties and commercial sites in Vaughan and the GTA. Reflective, durable aluminum. Request a quote from Mr. Sign and Print.",
    related: [
      ref("signs", "plate-directory-board"),
      ref("signs", "t-frame-site-signs"),
      ref("signs", "coroplast"),
    ],
  }),
  service({
    categorySlug: "design",
    slug: "logos",
    name: "Logos",
    displayOrder: 5,
    shortDescription:
      "Professional logo design that captures your brand. We deliver usable files for print, signage, and the web.",
    headline: "Logo Design That Works in Print, Signs, and Online",
    capabilities: [
      "Custom logo concepts",
      "Print-ready and sign-ready file support",
      "Colour and one-colour logo versions",
      "Artwork cleanup for production",
    ],
    pricing: startingFrom(
      5000,
      "Custom logo work from $50 and up",
      old("logos"),
    ),
    imageAlt: "Logo design work shown on a computer screen.",
    imagePrompt:
      "A computer screen showing a logo in progress in a vector design program, with multiple abstract colour variations and a printed colour proof beside the monitor.",
    metaTitle: "Logo Design in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Professional logo design for small businesses in Vaughan and the GTA. We deliver print-ready and digital files so your logo works everywhere. Request a quote.",
    related: [
      ref("design", "websites"),
      ref("design", "type-setting"),
      ref("printing", "business-cards"),
    ],
  }),
  service({
    categorySlug: "design",
    slug: "t-shirts-caps",
    name: "T-Shirts and Caps",
    displayOrder: 6,
    shortDescription:
      "Custom logo printing and design for T-shirts, polo shirts, caps, and branded apparel for businesses and events.",
    headline: "Custom T-Shirts and Caps for Teams, Staff, and Events",
    capabilities: [
      "Heat transfer and inkjet transfer options",
      "Silk screening for larger quantities",
      "Apparel logo placement and sizing",
      "Cap, shirt, and promotional apparel graphics",
    ],
    pricing: tiered(
      "Legacy apparel tiers by quantity and method",
      "Old-site apparel pricing includes heat transfer and silk screen tables with item, setup, layout, film, screen, and colour charges that vary by quantity and method.",
      old("tshirt"),
    ),
    imageAlt: "Printed T-shirts and embroidered cap with company logo.",
    imagePrompt:
      "A flat-lay of two printed T-shirts and a matching embroidered cap on a clean white surface, with abstract company logo marks on the chest and cap.",
    metaTitle: "Custom T-Shirts and Caps in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom logo printing on T-shirts, polo shirts, and caps for businesses and events in Vaughan and the GTA. Request a quote from Mr. Sign and Print.",
    related: [
      ref("design", "silk-screens"),
      ref("design", "logos"),
      ref("design", "magnetic-fridge"),
    ],
  }),
  service({
    categorySlug: "design",
    slug: "magnetic-fridge",
    name: "Magnetic (Fridge)",
    displayOrder: 7,
    shortDescription:
      "Custom-designed business fridge magnets. A low-cost promotional item your customers will keep and use all year.",
    headline: "Custom Fridge Magnets for Everyday Brand Visibility",
    capabilities: [
      "Business card magnets",
      "Round, house, car, and calendar-style magnets",
      "Base price and additional ink tiers",
      "Promotional handouts for local customers",
    ],
    pricing: startingFrom(
      350,
      "Business card magnets from $3.50 each",
      old("fridge"),
      "per magnet",
    ),
    imageAlt: "Business fridge magnet on a refrigerator door.",
    imagePrompt:
      "A flat calendar-style fridge magnet held against a white refrigerator door, showing abstract business logo blocks, phone-line shapes, and a small calendar grid.",
    metaTitle: "Custom Fridge Magnets in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom business fridge magnets for promotions and brand awareness in Vaughan and the GTA. Printed in full colour. Request a quote from Mr. Sign and Print.",
    related: [
      ref("printing", "business-cards"),
      ref("design", "t-shirts-caps"),
      ref("design", "logos"),
    ],
  }),
  service({
    categorySlug: "design",
    slug: "type-setting",
    name: "Type Setting",
    displayOrder: 8,
    shortDescription:
      "Professional typesetting for signs, menus, publications, and print materials. Clean, readable, and production-ready.",
    headline: "Typesetting That Makes Print and Signs Easier to Read",
    capabilities: [
      "Flyer and menu layout",
      "Business card and envelope setup",
      "Scanning, cutting, and file preparation",
      "Production-ready text layout",
    ],
    pricing: startingFrom(
      3500,
      "Typesetting and layout from $35 and up",
      old("typesetting"),
    ),
    imageAlt: "Professional type layout shown on a design screen.",
    imagePrompt:
      "A close-up of a screen showing a professional type layout for a sign or printed menu, with careful alignment guides and abstract text lines.",
    metaTitle: "Professional Typesetting in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Professional typesetting for signs, menus, publications, and print materials in Vaughan and the GTA. Clean, readable, and production-ready. Request a quote.",
    related: [
      ref("design", "logos"),
      ref("design", "silk-screens"),
      ref("printing", "full-colour-brochures"),
    ],
  }),
  service({
    categorySlug: "design",
    slug: "silk-screens",
    name: "Silk Screens",
    displayOrder: 9,
    shortDescription:
      "Silk screen printing for T-shirts, apparel, bags, and promotional materials. Bold, durable, and made to last.",
    headline: "Silk Screen Printing for Bold Apparel and Promotional Work",
    capabilities: [
      "Silk screen setup for apparel",
      "Film and screen preparation",
      "Single-colour and multi-colour jobs",
      "T-shirts, bags, and promotional materials",
    ],
    pricing: tiered(
      "Legacy screen setup from $30 per colour",
      "Old-site silk screen pricing includes film and screen setup from $30 to $50 per colour, layout charges, and per-item prices by quantity and apparel type.",
      old("tshirt"),
    ),
    imageAlt: "Silk screen printing setup applying ink to a T-shirt.",
    imagePrompt:
      "A silk screen printing setup in a workshop, with a squeegee pulling ink across a screen frame onto a white T-shirt and a sharp abstract logo impression.",
    metaTitle: "Silk Screen Printing in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Silk screen printing for T-shirts, apparel, bags, and promotional materials in Vaughan and the GTA. Bold, durable results. Request a quote from Mr. Sign and Print.",
    related: [
      ref("design", "t-shirts-caps"),
      ref("design", "logos"),
      ref("signs", "vinyl-cutting"),
    ],
  }),
  service({
    categorySlug: "design",
    slug: "websites",
    name: "Websites",
    displayOrder: 10,
    shortDescription:
      "Simple, professional website design for small businesses in Vaughan and the GTA. Built to represent you online as well as your signs do in person.",
    headline: "Small Business Website Design for Vaughan Companies",
    capabilities: [
      "Home page design",
      "Extra page design",
      "Account setup guidance",
      "Website maintenance by contract",
    ],
    pricing: startingFrom(
      5000,
      "Setup from $50, home page design $250",
      old("webdesign"),
    ),
    imageAlt: "Responsive business website displayed on several devices.",
    imagePrompt:
      "A laptop, tablet, and smartphone arranged together, each displaying the same small business website layout with abstract service cards and navigation blocks.",
    metaTitle: "Small Business Website Design in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Simple, professional website design for small businesses in Vaughan and the GTA. Represent your business online as well as your signs do in person. Request a quote.",
    related: [
      ref("design", "logos"),
      ref("design", "type-setting"),
      ref("printing", "business-cards"),
    ],
  }),
];
