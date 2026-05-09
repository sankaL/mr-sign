import { requestQuote, startingFrom, tiered } from "../pricing";
import type { ServiceDetail } from "../types";
import { ref, service } from "./service-utils";

const old = (page: string) => `https://mrsignandprint.net/${page}.html`;

export const signsServices: ServiceDetail[] = [
  service({
    categorySlug: "signs",
    slug: "awnings",
    name: "Awnings",
    displayOrder: 1,
    shortDescription:
      "Custom-branded fabric and metal awnings that protect your entrance and promote your business at the same time.",
    headline: "Custom Awnings for Vaughan Businesses",
    body: [
      "An awning protects your entrance from rain and sun while putting your brand name where every passerby can see it.",
      "We build awnings for retail shops, restaurants, offices, and commercial plazas across Vaughan and the GTA.",
    ],
    capabilities: [
      "Custom fabric awnings with printed graphics or lettering",
      "Metal and aluminum frame awnings",
      "Colour matching for existing branding",
      "Professional installation in Vaughan and the GTA",
    ],
    pricing: tiered(
      "Legacy tiers from $35 to $60/sq ft",
      "Old-site awning pricing lists $60/sq ft down to $35/sq ft depending on height and width. Lettering is included, with extra charges possible by project.",
      old("awnings"),
    ),
    imageAlt: "Fabric business awning over a storefront entrance.",
    imagePrompt:
      "A close-up photo of a freshly installed deep navy fabric awning on a retail storefront, with clean white abstract lettering shapes on the valance.",
    metaTitle: "Custom Awnings in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom fabric and metal awnings for businesses in Vaughan and the GTA. Built to last and branded to impress. Request a quote from Mr. Sign and Print.",
    related: [
      ref("signs", "channel-letters"),
      ref("signs", "window-lettering"),
      ref("signs", "illuminated-boxes"),
    ],
  }),
  service({
    categorySlug: "signs",
    slug: "plate-directory-board",
    name: "Plate Directory Board",
    displayOrder: 2,
    shortDescription:
      "Professional directory boards for office buildings, plazas, and multi-tenant properties.",
    headline: "Directory Boards That Keep Visitors Moving",
    capabilities: [
      "Individual tenant or office name plates",
      "Wall-mounted and freestanding board options",
      "Vinyl lettering or engraved plate options",
      "Replacement and extra plates as tenants change",
    ],
    pricing: tiered(
      "Legacy plate tiers from $45",
      "Old-site plate and directory board pricing starts around $45 for smaller plates, with larger plates and extra mounting hardware priced separately.",
      old("namedirectory"),
    ),
    imageAlt: "Multi-tenant directory board mounted in a building lobby.",
    imagePrompt:
      "A black-framed multi-tenant directory board mounted in a clean building lobby, with neat blank name-plate rows and brushed metal accents.",
    metaTitle: "Directory Boards in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Professional plate directory boards for office buildings and commercial plazas in Vaughan and the GTA. Custom-built. Request a quote today.",
    related: [
      ref("signs", "cut-out-letters"),
      ref("signs", "illuminated-boxes"),
      ref("signs", "vertical-stands-indoor"),
    ],
  }),
  service({
    categorySlug: "signs",
    slug: "banner",
    name: "Banner",
    displayOrder: 3,
    shortDescription:
      "Custom vinyl banners in any size for events, promotions, trade shows, and outdoor advertising.",
    headline: "Custom Vinyl Banners for Promotions and Events",
    capabilities: [
      "Indoor and outdoor vinyl banner production",
      "Common stocked banner heights",
      "Bold promotional graphics",
      "Grommet and hanging options",
    ],
    pricing: tiered(
      "Legacy tiers from $5 to $10/sq ft",
      "0-10 sq ft: $10/sq ft; 10-20: $9; 20-30: $8; 30-40: $7; 40-50: $6; 50-60: $5. Final price can vary by text quantity.",
      old("banners"),
    ),
    imageAlt: "Large vinyl banner with bold promotional graphics.",
    imagePrompt:
      "A large vibrant vinyl banner hanging on a storefront fence outside a commercial plaza, with bold abstract graphics and colour blocks.",
    metaTitle: "Custom Banners in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom vinyl banners in any size for events, promotions, and outdoor advertising in Vaughan and the GTA. Fast turnaround. Request a quote from Mr. Sign and Print.",
    related: [
      ref("signs", "coroplast"),
      ref("signs", "t-frame-site-signs"),
      ref("signs", "plastic-lawn-signs"),
    ],
    isFeatured: true,
  }),
  service({
    categorySlug: "signs",
    slug: "plastic-lawn-signs",
    name: "Plastic Lawn Signs",
    displayOrder: 4,
    shortDescription:
      "Lightweight, weather-resistant plastic lawn signs ideal for real estate, construction, and local advertising.",
    headline: "Plastic Lawn Signs for Local Advertising",
    capabilities: [
      "22 inch by 18 inch double-sided lawn sign bags",
      "Wire frames for fast outdoor placement",
      "Contractor, service, garage sale, and campaign uses",
      "Volume quantities from small runs to large runs",
    ],
    pricing: tiered(
      "Legacy bag and wire volume tiers",
      "Old-site tiers list 22x18 double-sided bags from $280 for 25 bags, wires from $75 for 25, and bags plus wires from $355 for 25, with volume tiers up to 1000.",
      old("plasticlawn"),
    ),
    imageAlt: "Corrugated plastic lawn signs staked into grass.",
    imagePrompt:
      "A row of 18 by 24 inch corrugated plastic lawn signs staked into a neat front lawn on a residential street, with bold abstract blocks instead of readable text.",
    metaTitle: "Plastic Lawn Signs in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom corrugated plastic lawn signs for businesses, real estate, and events in Vaughan and the GTA. Affordable, weatherproof, and fast. Request a quote.",
    related: [
      ref("signs", "coroplast"),
      ref("signs", "real-estate-signs"),
      ref("signs", "t-frame-site-signs"),
    ],
  }),
  service({
    categorySlug: "signs",
    slug: "channel-letters",
    name: "Channel Letters",
    displayOrder: 5,
    shortDescription:
      "Custom illuminated channel letters for commercial storefronts and plazas. Front-lit, back-lit, or halo-lit options available.",
    headline: "Channel Letter Signs That Make Your Storefront Visible",
    capabilities: [
      "Front-lit channel letters",
      "Back-lit and halo-lit options",
      "Storefront and plaza installations",
      "Colour, trim, and finish coordination",
    ],
    pricing: requestQuote(old("channellettering")),
    imageAlt: "LED illuminated channel letters on a storefront facade.",
    imagePrompt:
      "A close-up night-time photo of bright red LED illuminated channel letters mounted on a dark brick storefront facade, shot from a low commercial-street angle.",
    metaTitle: "Channel Letter Signs in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom illuminated channel letters for storefronts and commercial buildings in Vaughan and the GTA. Front-lit, back-lit, and halo options. Request a quote.",
    related: [
      ref("signs", "illuminated-boxes"),
      ref("signs", "awnings"),
      ref("signs", "neon"),
    ],
    isFeatured: true,
  }),
  service({
    categorySlug: "signs",
    slug: "real-estate-signs",
    name: "Real Estate Signs",
    displayOrder: 6,
    shortDescription:
      "Custom real estate signs and frames for agents and brokers across Vaughan and the GTA.",
    headline: "Real Estate Signs for Listings and Open Houses",
    capabilities: [
      "Real estate post signs",
      "Listing panels and riders",
      "Open house and directional signs",
      "Agent and brokerage branding",
    ],
    pricing: requestQuote(old("realstate")),
    imageAlt: "Installed real estate post sign in front of a home.",
    imagePrompt:
      "A professionally installed real estate post sign in front of a detached home in a Vaughan neighbourhood, with clean abstract branding panels and no readable text.",
    metaTitle: "Real Estate Signs in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom real estate signs and posts for agents and brokers in Vaughan and the GTA. Fast turnaround, professional quality. Request a quote from Mr. Sign and Print.",
    related: [
      ref("signs", "plastic-lawn-signs"),
      ref("signs", "coroplast"),
      ref("signs", "magnetic-signs"),
    ],
  }),
  service({
    categorySlug: "signs",
    slug: "changeable-letters",
    name: "Changeable Letters",
    displayOrder: 7,
    shortDescription:
      "Manual changeable letter signs for businesses, schools, and community organizations. Update your message anytime.",
    headline: "Changeable Letter Signs for Messages That Move",
    capabilities: [
      "Reader boards and message panels",
      "Manual letter sets",
      "Indoor and outdoor sign options",
      "Replacement letters and layout support",
    ],
    pricing: requestQuote(),
    imageAlt: "Outdoor reader board sign with removable letters.",
    imagePrompt:
      "A black outdoor reader board sign with removable white letter rows outside a school or community building, showing abstract unreadable character blocks.",
    metaTitle: "Changeable Letter Signs in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Manual changeable letter signs for businesses, schools, and community organizations in Vaughan and the GTA. Update your message anytime. Request a quote.",
    related: [
      ref("signs", "sandwich-boards"),
      ref("signs", "menu-boxes"),
      ref("signs", "plate-directory-board"),
    ],
  }),
  service({
    categorySlug: "signs",
    slug: "sandwich-boards",
    name: "Sandwich Boards",
    displayOrder: 8,
    shortDescription:
      "Portable A-frame sandwich board signs for sidewalk advertising and promotions. Perfect for restaurants and retail shops.",
    headline: "Sandwich Board Signs for Sidewalk Visibility",
    capabilities: [
      "A-frame and wooden board options",
      "Frame-only or frame plus sign packages",
      "Single-location retail and restaurant use",
      "Replaceable insert options",
    ],
    pricing: tiered(
      "Legacy packages from $45",
      "Old-site packages list frame-only options from $45 to $75, frame plus signs from $125 to $245, and wooden board plus lettering packages from $225 to $295.",
      old("sandwich"),
    ),
    imageAlt: "A-frame sandwich board sign on a sidewalk.",
    imagePrompt:
      "An A-frame sandwich board sign placed on a sidewalk outside a cafe, with bold abstract chalk-style graphic blocks on a dark panel.",
    metaTitle: "Sandwich Board Signs in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom A-frame sandwich board signs for restaurants, retailers, and events in Vaughan and the GTA. Portable and eye-catching. Request a quote.",
    related: [
      ref("signs", "banner"),
      ref("signs", "changeable-letters"),
      ref("signs", "vertical-stands-outdoor"),
    ],
  }),
  service({
    categorySlug: "signs",
    slug: "coroplast",
    name: "Coroplast",
    displayOrder: 9,
    shortDescription:
      "Lightweight, waterproof coroplast signs for temporary or semi-permanent outdoor use. A cost-effective choice for campaigns and events.",
    headline: "Coroplast Signs for Fast, Durable Outdoor Messaging",
    capabilities: [
      "4 mm coroplast panels",
      "One-sided and two-sided options",
      "Outdoor campaign and event signage",
      "Small and large format quantities",
    ],
    pricing: tiered(
      "Legacy tiers from $6 to $11/sq ft",
      "Old-site vinyl lettering on 4 mm coroplast lists $11/sq ft for 1-5 sq ft with a $35 minimum, then $10, $9, $8, $7, and $6/sq ft at larger sizes.",
      old("coroplast"),
    ),
    imageAlt: "Stack of freshly printed coroplast signs.",
    imagePrompt:
      "A stack of freshly printed coroplast signs in bright colours leaning against a print shop wall, with one panel facing forward using abstract promotional shapes.",
    metaTitle: "Coroplast Signs in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom coroplast signs for businesses and events in Vaughan and the GTA. Lightweight, waterproof, and affordable. Request a quote from Mr. Sign and Print.",
    related: [
      ref("signs", "plastic-lawn-signs"),
      ref("signs", "banner"),
      ref("signs", "real-estate-signs"),
    ],
  }),
  service({
    categorySlug: "signs",
    slug: "t-frame-site-signs",
    name: "T-Frame / Site Signs",
    displayOrder: 10,
    shortDescription:
      "Large-format T-frame and site signs for construction projects, developments, and commercial properties.",
    headline: "T-Frame and Site Signs for Construction Visibility",
    capabilities: [
      "Construction and development site signs",
      "Plywood and coroplast backgrounds",
      "Letter sets and changeable panels",
      "Ground inserts, legs, and extensions",
    ],
    pricing: tiered(
      "Legacy site-sign tiers from $150",
      "Old-site T-frame pricing lists A-frame signs from $300 to $500 by size, plywood backgrounds from $150 to $400, legs at $250 per pair, letters from $0.95 to $3.75 each, and extensions by square foot.",
      old("tframe"),
    ),
    imageAlt: "T-frame construction site sign at a project entrance.",
    imagePrompt:
      "A T-frame construction site sign planted at the entrance of a commercial project, featuring abstract builder branding and colour blocks.",
    metaTitle: "T-Frame and Site Signs in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Large-format T-frame and construction site signs for builders and developers in Vaughan and the GTA. Professionally printed. Request a quote.",
    related: [
      ref("signs", "banner"),
      ref("signs", "coroplast"),
      ref("signs", "plastic-lawn-signs"),
    ],
  }),
  service({
    categorySlug: "signs",
    slug: "cut-out-letters",
    name: "Cut-out Letters",
    displayOrder: 11,
    shortDescription:
      "Dimensional cut-out letters in metal, acrylic, or PVC. A premium look for lobbies, boardrooms, and storefronts.",
    headline: "Dimensional Cut-Out Letters for Walls and Storefronts",
    capabilities: [
      "Metal, acrylic, and PVC letters",
      "Interior lobby and boardroom signage",
      "Exterior storefront lettering",
      "Flush-mounted and spaced installations",
    ],
    pricing: requestQuote(),
    imageAlt: "Metal dimensional letters mounted on an interior wall.",
    imagePrompt:
      "Large metallic dimensional cut-out letters mounted flush against a polished stone wall inside a corporate lobby, shot close enough to show depth and shadow.",
    metaTitle: "Cut-Out Letter Signs in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Dimensional cut-out letters in metal, acrylic, and PVC for storefronts and offices in Vaughan and the GTA. Premium signage, custom-built. Request a quote.",
    related: [
      ref("signs", "channel-letters"),
      ref("signs", "plate-directory-board"),
      ref("signs", "vinyl-cutting"),
    ],
  }),
  service({
    categorySlug: "signs",
    slug: "vertical-stands-indoor",
    name: "Vertical Stands (Indoor)",
    displayOrder: 12,
    shortDescription:
      "Indoor vertical banner stands for trade shows, events, lobbies, and in-store promotions.",
    headline: "Indoor Vertical Stands for Events and Lobbies",
    capabilities: [
      "Round base and square base display stands",
      "22 inch by 28 inch insert support",
      "Chrome and black stand options",
      "Lobby, conference, and trade show use",
    ],
    pricing: startingFrom(
      7500,
      "Starting from $75 stand-only",
      old("verticalin"),
    ),
    imageAlt: "Retractable banner stand set up indoors.",
    imagePrompt:
      "A sleek silver retractable banner stand set up inside a modern conference room, displaying abstract corporate colour blocks.",
    metaTitle: "Indoor Vertical Banner Stands in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Indoor retractable and fixed vertical banner stands for trade shows, events, and offices in Vaughan and the GTA. Request a quote from Mr. Sign and Print.",
    related: [
      ref("signs", "vertical-stands-outdoor"),
      ref("signs", "banner"),
      ref("signs", "plate-directory-board"),
    ],
  }),
  service({
    categorySlug: "signs",
    slug: "illuminated-boxes",
    name: "Illuminated Boxes",
    displayOrder: 13,
    shortDescription:
      "Backlit illuminated sign boxes for storefronts, plazas, and interior branding. Custom-built to your specifications.",
    headline: "Illuminated Sign Boxes for Storefronts and Plazas",
    capabilities: [
      "Indoor and outdoor illuminated box signs",
      "Plastic faces and aluminum frames",
      "Vinyl lettering on the face panel",
      "Storefront and plaza installations",
    ],
    pricing: tiered(
      "Legacy tiers from $35 to $60/sq ft",
      "Old-site custom illuminated box pricing lists frame and face options plus custom box tiers from $60/sq ft down to $35/sq ft by size.",
      old("illuminatedesign"),
    ),
    imageAlt: "Backlit lightbox sign mounted on a commercial wall.",
    imagePrompt:
      "A square backlit lightbox sign mounted on the exterior wall of a commercial plaza unit at night, glowing with abstract logo shapes.",
    metaTitle: "Illuminated Sign Boxes in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom backlit illuminated sign boxes for storefronts and plazas in Vaughan and the GTA. Built and installed by Mr. Sign and Print. Request a quote.",
    related: [
      ref("signs", "channel-letters"),
      ref("signs", "awnings"),
      ref("signs", "neon"),
    ],
  }),
  service({
    categorySlug: "signs",
    slug: "vertical-stands-outdoor",
    name: "Vertical Stands (Outdoor)",
    displayOrder: 14,
    shortDescription:
      "Durable outdoor vertical banner stands designed to handle Canadian weather. Great for seasonal promotions and events.",
    headline: "Outdoor Vertical Stands Built for Street-Level Promotions",
    capabilities: [
      "Small, medium, and large outdoor stand formats",
      "Frame-only and lettered sign packages",
      "One-sided and two-sided options",
      "Wire stands for economical outdoor signs",
    ],
    pricing: tiered(
      "Legacy packages from $55",
      "Old-site outdoor stand packages list frame-only options from $55 to $185, one-sided sign packages from $95 to $291, two-sided packages from $135 to $406, and wire frames from $5.",
      old("verticalout"),
    ),
    imageAlt: "Double-sided outdoor banner stand near a plaza entrance.",
    imagePrompt:
      "A double-sided outdoor banner stand positioned near the entrance of a commercial plaza, featuring full-colour abstract business graphics.",
    metaTitle: "Outdoor Vertical Banner Stands in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Durable outdoor vertical banner stands for Vaughan businesses and events. Built for Canadian weather. Request a quote from Mr. Sign and Print.",
    related: [
      ref("signs", "banner"),
      ref("signs", "vertical-stands-indoor"),
      ref("signs", "sandwich-boards"),
    ],
  }),
  service({
    categorySlug: "signs",
    slug: "magnetic-signs",
    name: "Magnetic Signs",
    displayOrder: 15,
    shortDescription:
      "Custom magnetic vehicle signs you can put on and take off as needed. A flexible and affordable option for business promotion.",
    headline: "Magnetic Vehicle Signs for Flexible Promotion",
    capabilities: [
      "Door magnets for cars, vans, and trucks",
      "One-colour and two-colour lettering",
      "Removable business branding",
      "Square-foot and common-size pricing options",
    ],
    pricing: startingFrom(
      4000,
      "Starting from $40 per sign",
      old("magneticsigns"),
    ),
    imageAlt: "Magnetic business signs mounted on vehicle doors.",
    imagePrompt:
      "Two matching magnetic signs mounted on the front doors of a white SUV, displaying abstract logo blocks and clean colour bands.",
    metaTitle: "Magnetic Vehicle Signs in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom magnetic vehicle signs for cars and vans in Vaughan and the GTA. Easy on, easy off. Request a quote from Mr. Sign and Print.",
    related: [
      ref("signs", "vehicle-lettering"),
      ref("signs", "vinyl-cutting"),
      ref("signs", "real-estate-signs"),
    ],
  }),
  service({
    categorySlug: "signs",
    slug: "vehicle-lettering",
    name: "Vehicle Lettering",
    displayOrder: 16,
    shortDescription:
      "Turn any vehicle into a moving advertisement. Vinyl lettering and graphics for cars, vans, trucks, and trailers.",
    headline: "Vehicle Lettering That Works While You Drive",
    capabilities: [
      "Passenger car and pickup door lettering",
      "Van, truck, and cube van lettering packages",
      "One-colour and two-colour vinyl layouts",
      "Side, rear, and curved panel lettering",
    ],
    pricing: startingFrom(
      9500,
      "Starting from $95 for two doors",
      old("vahicle"),
    ),
    imageAlt: "Service van with vinyl lettering and business graphics.",
    imagePrompt:
      "A white service van with full-colour vinyl lettering layout across the side door and rear panel, using abstract business graphics and no readable text.",
    metaTitle: "Vehicle Lettering in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom vinyl vehicle lettering and graphics for cars, vans, and trucks in Vaughan and the GTA. Turn your vehicle into a moving billboard. Request a quote.",
    related: [
      ref("signs", "magnetic-signs"),
      ref("signs", "vinyl-cutting"),
      ref("signs", "banner"),
    ],
    isFeatured: true,
  }),
  service({
    categorySlug: "signs",
    slug: "menu-boxes",
    name: "Menu Boxes",
    displayOrder: 17,
    shortDescription:
      "Backlit and non-illuminated outdoor menu boxes for restaurants and food service businesses.",
    headline: "Outdoor Menu Boxes for Restaurants and Food Service",
    capabilities: [
      "Illuminated and non-illuminated display boxes",
      "Weather-protected menu display",
      "Restaurant entry and patio use",
      "Menu panel replacement support",
    ],
    pricing: requestQuote(),
    imageAlt: "Outdoor restaurant menu display box.",
    imagePrompt:
      "An illuminated outdoor menu display box mounted beside a restaurant entrance, with sealed frame and abstract menu blocks behind glass.",
    metaTitle: "Outdoor Menu Boxes in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom outdoor menu display boxes for restaurants in Vaughan and the GTA. Backlit and non-illuminated options. Request a quote from Mr. Sign and Print.",
    related: [
      ref("signs", "illuminated-boxes"),
      ref("signs", "changeable-letters"),
      ref("signs", "sandwich-boards"),
    ],
  }),
  service({
    categorySlug: "signs",
    slug: "vinyl-cutting",
    name: "Vinyl Cutting",
    displayOrder: 18,
    shortDescription:
      "Precision vinyl cutting for lettering, logos, decals, and graphics. Suitable for windows, walls, vehicles, and more.",
    headline: "Precision Vinyl Cutting for Lettering and Decals",
    capabilities: [
      "Vinyl letters, logos, and decals",
      "Window, wall, and vehicle applications",
      "Layout, masking, and application options",
      "Small and large letter heights",
    ],
    pricing: startingFrom(2500, "Minimum order $25", old("vinylcutting")),
    imageAlt: "Vinyl cutter producing a logo decal.",
    imagePrompt:
      "A vinyl cutter in action with a spool of red vinyl feeding through the machine and a freshly cut abstract logo decal visible on the cutting mat.",
    metaTitle: "Vinyl Cutting in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Precision vinyl cutting for lettering, logos, decals, and graphics in Vaughan and the GTA. Mr. Sign and Print delivers clean, professional results. Request a quote.",
    related: [
      ref("signs", "window-lettering"),
      ref("signs", "vehicle-lettering"),
      ref("signs", "magnetic-signs"),
    ],
  }),
  service({
    categorySlug: "signs",
    slug: "neon",
    name: "Neon",
    displayOrder: 19,
    shortDescription:
      "Custom neon signs for storefronts, restaurants, and interior spaces. Classic appeal with lasting impact.",
    headline: "Custom Neon Signs for Bright, Classic Visibility",
    capabilities: [
      "Main storefront neon signs",
      "Window and interior neon signs",
      "Carrier boards and transformer support",
      "Borders and accent neon",
    ],
    pricing: startingFrom(
      7500,
      "Legacy carrier boards from $75",
      old("neonsigns"),
    ),
    imageAlt: "Bright neon sign glowing in a storefront window.",
    imagePrompt:
      "A vibrant neon sign glowing in orange and pink inside the window of a Vaughan-area cafe, with abstract tube lettering shapes and warm reflections.",
    metaTitle: "Custom Neon Signs in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Custom neon signs for storefronts, restaurants, and interior spaces in Vaughan and the GTA. Eye-catching and memorable. Request a quote from Mr. Sign and Print.",
    related: [
      ref("signs", "channel-letters"),
      ref("signs", "illuminated-boxes"),
      ref("signs", "window-lettering"),
    ],
  }),
  service({
    categorySlug: "signs",
    slug: "window-lettering",
    name: "Window Lettering",
    displayOrder: 20,
    shortDescription:
      "Professional vinyl window lettering for storefronts, offices, and retail locations. A clean, affordable alternative to painted glass.",
    headline: "Window Lettering for Storefronts and Offices",
    capabilities: [
      "Vinyl lettering applied directly to glass",
      "Business hours, logos, and promotional graphics",
      "Layout and cutting-only options",
      "Floor-level application support",
    ],
    pricing: startingFrom(
      10000,
      "Application from $15/sq ft, $100 minimum",
      old("windowlettering"),
    ),
    imageAlt: "Retail storefront window with vinyl lettering.",
    imagePrompt:
      "A large retail storefront window with vinyl lettering applied directly to the glass, showing abstract business-hour blocks and a clean logo mark shape.",
    metaTitle: "Window Lettering in Vaughan | Mr. Sign and Print",
    metaDescription:
      "Professional vinyl window lettering for storefronts and offices in Vaughan and the GTA. Clean, affordable, and long-lasting. Request a quote.",
    related: [
      ref("signs", "vinyl-cutting"),
      ref("signs", "awnings"),
      ref("signs", "channel-letters"),
    ],
  }),
];
