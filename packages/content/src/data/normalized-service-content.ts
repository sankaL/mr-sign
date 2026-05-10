import { requestQuote, startingFrom } from "../pricing";
import type { CategorySlug, PublicPricing } from "../types";

type ServiceOverride = {
  shortDescription: string;
  body: string[];
  capabilities: string[];
  pricing: PublicPricing;
};

const quotePricing = requestQuote(
  undefined,
  "Request a quote for pricing for this specific service.",
);

const key = (categorySlug: CategorySlug, serviceSlug: string) =>
  `${categorySlug}/${serviceSlug}`;

export const serviceContentOverrides = new Map<string, ServiceOverride>([
  [
    key("signs", "awnings"),
    {
      shortDescription:
        "Custom awnings that work as storefront signs, shaped to fit your entrance and carry your brand clearly.",
      body: [
        "Awnings are often used as the main front sign for a store, installed above the entrance and often spanning most of the storefront width.",
        "They work well when the shape and presence of the sign matter as much as the message. Each awning combines a metal skeleton, vinyl skin, and applied or washed-out lettering.",
      ],
      capabilities: [
        "Metal skeletons shaped for the storefront entrance",
        "Vinyl awning skins with branded lettering",
        "Lighting and electrical equipment inside the structure",
        "Storefront awnings for retail, restaurant, and plaza units",
      ],
      pricing: startingFrom(3500, "Base service price", undefined, "per sq ft"),
    },
  ],
  [
    key("signs", "plate-directory-board"),
    {
      shortDescription:
        "Directory boards and name plates for offices, plazas, doors, walls, and multi-tenant buildings.",
      body: [
        "Plate and directory boards help visitors find the right office, company, suite, or department without confusion.",
        "Names can be engraved, silk screened, or vinyl lettered on materials such as plastic, PVC, aluminum, and other plate surfaces.",
      ],
      capabilities: [
        "Single name plates for doors and walls",
        "Multi-tenant directory boards",
        "Engraved, silk screened, or vinyl-lettered plates",
        "Replacement plates as tenants or staff change",
      ],
      pricing: startingFrom(4500, "Base service price", undefined, "per plate"),
    },
  ],
  [
    key("signs", "banner"),
    {
      shortDescription:
        "Rollable vinyl banners for events, storefront promotions, fences, openings, and temporary outdoor messages.",
      body: [
        "Banners are easy to install, easy to store, and available in a wide range of sizes, colours, and material thicknesses.",
        "They are a practical choice for sales, openings, events, trade shows, and temporary outdoor advertising.",
      ],
      capabilities: [
        "Indoor and outdoor vinyl banner production",
        "Common stocked banner heights",
        "Grommet and hanging options",
        "Temporary promotions, events, and fence signage",
      ],
      pricing: startingFrom(500, "Base service price", undefined, "per sq ft"),
    },
  ],
  [
    key("signs", "plastic-lawn-signs"),
    {
      shortDescription:
        "Two-sided plastic lawn sign bags with wire frames for contractors, real estate, campaigns, and local advertising.",
      body: [
        "Plastic lawn signs are made for outdoor placement and local visibility, with printed bags mounted on wire frames.",
        "They are a flexible low-cost option for neighbourhood campaigns, service businesses, contractors, garage sales, and real estate promotion.",
      ],
      capabilities: [
        "Two-sided printed lawn sign bags",
        "Wire frames for quick outdoor placement",
        "Neighbourhood, contractor, campaign, and garage sale use",
        "Small starter batches and larger quantity runs",
      ],
      pricing: startingFrom(
        28000,
        "Base service price",
        undefined,
        "per starter batch",
      ),
    },
  ],
  [
    key("signs", "channel-letters"),
    {
      shortDescription:
        "Dimensional channel letters for storefronts, with illuminated options for high-visibility commercial signs.",
      body: [
        "Channel letters give storefronts a dimensional sign with separate letter forms mounted to the building face.",
        "They are a strong choice for plazas and commercial buildings that need clear visibility from the street, including illuminated builds when required.",
      ],
      capabilities: [
        "Dimensional channel letter fabrication",
        "Illuminated letter options",
        "Commercial storefront and plaza signs",
        "Material, face, trim, and finish coordination",
      ],
      pricing: startingFrom(
        28200,
        "Base service price",
        undefined,
        "per letter",
      ),
    },
  ],
  [
    key("signs", "real-estate-signs"),
    {
      shortDescription:
        "Custom real estate sign panels, posts, riders, and frames for agents and brokerages.",
      body: [
        "Real estate signs use coroplast or similar sign boards mounted into vertical stands, posts, or hanging frames.",
        "They are built for listing visibility, open houses, directional signs, agent branding, and brokerage consistency.",
      ],
      capabilities: [
        "Listing panels and post signs",
        "Open house and directional signs",
        "Coroplast sign board options",
        "Agent and brokerage branding",
      ],
      pricing: quotePricing,
    },
  ],
  [
    key("signs", "changeable-letters"),
    {
      shortDescription:
        "Manual changeable letter signs for schools, community groups, storefronts, and message boards.",
      body: [
        "Changeable letter signs let businesses and organizations update messages without replacing the entire sign.",
        "They are useful for announcements, hours, community messages, promotions, and simple outdoor or indoor reader boards.",
      ],
      capabilities: [
        "Reader boards and message panels",
        "Manual letter sets",
        "Indoor and outdoor sign options",
        "Replacement letters and layout support",
      ],
      pricing: quotePricing,
    },
  ],
  [
    key("signs", "sandwich-boards"),
    {
      shortDescription:
        "Portable sidewalk signs with metal or wood frames for restaurants, retail shops, and street-level promotions.",
      body: [
        "Sandwich boards are portable signs that can be brought in and out each day for sidewalk visibility.",
        "Metal frames are lighter and support replaceable inserts, while wooden boards are heavier and more resistant to wind.",
      ],
      capabilities: [
        "Metal A-frame sandwich boards",
        "Wooden board options",
        "Replaceable inserts",
        "Sidewalk promotions for restaurants and retail",
      ],
      pricing: startingFrom(
        12500,
        "Base service price",
        undefined,
        "per sign package",
      ),
    },
  ],
  [
    key("signs", "coroplast"),
    {
      shortDescription:
        "Temporary indoor and outdoor coroplast signs for campaigns, events, job sites, and local promotions.",
      body: [
        "Coroplast is a lightweight waterproof material commonly used for temporary indoor and outdoor signs.",
        "Small quantities can be produced with vinyl lettering, while larger quantities can be produced with screen printing when the job calls for it.",
      ],
      capabilities: [
        "Temporary indoor and outdoor signs",
        "Vinyl lettering for small quantities",
        "Screen printing for larger quantities",
        "Common sheet and thickness options",
      ],
      pricing: startingFrom(
        3500,
        "Base service price",
        undefined,
        "minimum order",
      ),
    },
  ],
  [
    key("signs", "t-frame-site-signs"),
    {
      shortDescription:
        "Large job site and construction signs with plywood, coroplast, aluminum, or custom frame options.",
      body: [
        "T-frame and site signs are built for construction projects, developments, property entrances, and heavy-duty outdoor messages.",
        "They can use plywood backgrounds, coroplast panels, metallic frames, legs, extensions, and changeable letter components depending on the job.",
      ],
      capabilities: [
        "Construction and development site signs",
        "Plywood and coroplast backgrounds",
        "A-frame and T-frame structures",
        "Legs, inserts, and extension options",
      ],
      pricing: startingFrom(
        15000,
        "Base service price",
        undefined,
        "per background panel",
      ),
    },
  ],
  [
    key("signs", "cut-out-letters"),
    {
      shortDescription:
        "Dimensional cut-out letters for storefronts, office walls, lobbies, reception areas, and display surfaces.",
      body: [
        "Cut-out letters create a dimensional look for walls, storefronts, reception areas, and professional interiors.",
        "They can be produced in materials such as metal, acrylic, and PVC, with mounting selected for the surface and location.",
      ],
      capabilities: [
        "Metal, acrylic, and PVC letters",
        "Interior lobby and boardroom signage",
        "Exterior storefront lettering",
        "Flush-mounted and spaced installations",
      ],
      pricing: quotePricing,
    },
  ],
  [
    key("signs", "vertical-stands-indoor"),
    {
      shortDescription:
        "Self-standing indoor display stands for lobbies, showrooms, trade shows, and point-of-sale messages.",
      body: [
        "Indoor vertical stands hold printed inserts in a self-standing frame for clean presentation inside stores, lobbies, and events.",
        "They can be built with round or square bases and support common poster-size inserts.",
      ],
      capabilities: [
        "Round base and square base display stands",
        "Poster and insert support",
        "Chrome and black stand options",
        "Lobby, conference, and trade show use",
      ],
      pricing: startingFrom(7500, "Base service price", undefined, "per stand"),
    },
  ],
  [
    key("signs", "illuminated-boxes"),
    {
      shortDescription:
        "Illuminated sign boxes for storefronts, plazas, and commercial entrances where visibility matters.",
      body: [
        "Illuminated boxes are commonly used as main front signs for stores and plaza units.",
        "Each box combines a cabinet, plastic face, frame, lighting equipment, and lettering so the whole face can carry the message.",
      ],
      capabilities: [
        "Indoor and outdoor illuminated box signs",
        "Cabinet, face, frame, and lighting components",
        "Vinyl lettering on the sign face",
        "Storefront and plaza installations",
      ],
      pricing: startingFrom(3500, "Base service price", undefined, "per sq ft"),
    },
  ],
  [
    key("signs", "vertical-stands-outdoor"),
    {
      shortDescription:
        "Outdoor vertical stands and frames for sidewalk, roadside, seasonal, and property entrance signage.",
      body: [
        "Outdoor vertical stands provide freestanding sign visibility without permanent building installation.",
        "They can be used with frame-only setups, one-sided signs, two-sided signs, crane-style stands, and wire step stakes.",
      ],
      capabilities: [
        "Small, medium, and large outdoor stand formats",
        "Frame-only and lettered sign packages",
        "One-sided and two-sided options",
        "Wire stands for economical outdoor placement",
      ],
      pricing: startingFrom(5500, "Base service price", undefined, "per frame"),
    },
  ],
  [
    key("signs", "magnetic-signs"),
    {
      shortDescription:
        "Removable magnetic vehicle signs for contractors, mobile services, and temporary business branding.",
      body: [
        "Magnetic signs let a vehicle carry business branding when needed and return to regular use afterward.",
        "They are useful for contractors, service vehicles, and businesses that need flexible vehicle identification without permanent lettering.",
      ],
      capabilities: [
        "Removable door magnets",
        "One-colour and two-colour lettering",
        "Passenger car and pickup truck formats",
        "Care guidance for vehicle-safe use",
      ],
      pricing: startingFrom(4000, "Base service price", undefined, "per sign"),
    },
  ],
  [
    key("signs", "vehicle-lettering"),
    {
      shortDescription:
        "Vinyl vehicle lettering for cars, vans, trucks, cube vans, doors, rear panels, and curved surfaces.",
      body: [
        "Vehicle lettering turns a car, van, or truck into a moving sign while it is parked or driving.",
        "Layouts can be built for doors, side panels, rear doors, curved panels, pickup trucks, mini vans, trucks, and cube vans.",
      ],
      capabilities: [
        "Passenger car and pickup door lettering",
        "Van, truck, and cube van lettering packages",
        "One-colour and two-colour vinyl layouts",
        "Side, rear, and curved panel lettering",
      ],
      pricing: startingFrom(
        9500,
        "Base service price",
        undefined,
        "per door set",
      ),
    },
  ],
  [
    key("signs", "menu-boxes"),
    {
      shortDescription:
        "Outdoor menu display boxes for restaurants, takeout counters, cafes, patios, and service windows.",
      body: [
        "Menu boxes protect and present menu information outside a restaurant, cafe, or service window.",
        "They can be illuminated or non-illuminated depending on the location, hours, and visibility needs.",
      ],
      capabilities: [
        "Illuminated and non-illuminated display boxes",
        "Weather-protected menu display",
        "Restaurant entry and patio use",
        "Menu panel replacement support",
      ],
      pricing: quotePricing,
    },
  ],
  [
    key("signs", "vinyl-cutting"),
    {
      shortDescription:
        "Custom vinyl letters, logos, decals, and shapes cut for windows, vehicles, walls, and sign panels.",
      body: [
        "Vinyl cutting turns line artwork into clean letters, logos, and shapes that can be weeded, masked, and applied.",
        "It is used for windows, signs, vehicles, walls, and other smooth surfaces where crisp lettering is needed.",
      ],
      capabilities: [
        "Vinyl letters, logos, and decals",
        "Cutting, peeling, masking, and application support",
        "Window, wall, and vehicle applications",
        "Small and large letter heights",
      ],
      pricing: startingFrom(
        2500,
        "Base service price",
        undefined,
        "minimum order",
      ),
    },
  ],
  [
    key("signs", "neon"),
    {
      shortDescription:
        "Neon signs and accents for storefronts, windows, interiors, borders, and illuminated display work.",
      body: [
        "Neon signs are used when a business wants a bright, memorable sign that is visible during the day and at night.",
        "Applications include main front signs, window signs, interior signs, border accents, and complementary lighting for existing storefront signs.",
      ],
      capabilities: [
        "Main storefront neon signs",
        "Window and interior neon signs",
        "Carrier boards and transformer support",
        "Borders and accent neon",
      ],
      pricing: startingFrom(
        2600,
        "Base service price",
        undefined,
        "per letter",
      ),
    },
  ],
  [
    key("signs", "window-lettering"),
    {
      shortDescription:
        "Vinyl window lettering for storefront glass, business hours, logos, messages, and promotional displays.",
      body: [
        "Window lettering uses cut vinyl logos and text applied directly to commercial glass.",
        "It is useful for business hours, service lists, promotional messages, and pedestrian-level branding at the front of a store.",
      ],
      capabilities: [
        "Vinyl lettering applied directly to glass",
        "Business hours, logos, and promotional graphics",
        "Interior and exterior application options",
        "Layout and cutting-only options",
      ],
      pricing: startingFrom(500, "Base service price", undefined, "per sq ft"),
    },
  ],
  [
    key("printing", "brochures"),
    {
      shortDescription:
        "Printed brochures in common business sizes with one-sided or double-sided colour options.",
      body: [
        "Brochures give customers a compact printed overview of your products, services, offer, or event.",
        "We print practical brochure formats with stock, size, side, and quantity options suited to business campaigns.",
      ],
      capabilities: [
        "Common brochure sizes",
        "One-sided and double-sided colour printing",
        "Coated and uncoated stock options",
        "Short and long run quantities",
      ],
      pricing: startingFrom(
        38300,
        "Base service price",
        undefined,
        "per starter run",
      ),
    },
  ],
  [
    key("printing", "invitations"),
    {
      shortDescription:
        "Custom printed invitations for events, openings, celebrations, announcements, and business occasions.",
      body: [
        "Invitations can be produced for corporate events, celebrations, grand openings, private events, and announcements.",
        "We can help match the print format, stock, finish, and quantity to the tone of the occasion.",
      ],
      capabilities: [
        "Single-panel and folded invitation cards",
        "Full-colour printing on quality card stock",
        "Matching envelope options",
        "Small and large quantity runs",
      ],
      pricing: quotePricing,
    },
  ],
  [
    key("printing", "business-cards"),
    {
      shortDescription:
        "Business cards printed on practical stocks with one-colour, standard colour, or full-colour options.",
      body: [
        "Business cards are still one of the most direct printed tools for sharing your name, contact details, and brand.",
        "Options include raised or flat offset printing, one-sided or double-sided cards, standard stocks, gloss stocks, and full-colour layouts.",
      ],
      capabilities: [
        "Standard business card sizing",
        "Raised, flat, and full-colour options",
        "One-sided and double-sided printing",
        "Multiple stock and finish options",
      ],
      pricing: startingFrom(
        3800,
        "Base service price",
        undefined,
        "per starter batch",
      ),
    },
  ],
  [
    key("printing", "invoices"),
    {
      shortDescription:
        "Custom invoice books and business forms prepared for daily business use.",
      body: [
        "Invoice books and forms keep customer, job, and payment details organized in a format your team can use every day.",
        "Layouts can include your business information, line-item areas, notes, numbering needs, and contact details.",
      ],
      capabilities: [
        "Invoice books and business forms",
        "Professional header and line-item layouts",
        "Single-sheet and booklet options",
        "Custom business information and branding",
      ],
      pricing: quotePricing,
    },
  ],
  [
    key("printing", "colour-business-cards"),
    {
      shortDescription:
        "Full-colour business cards for sharper branding, photography, colour blocks, and double-sided layouts.",
      body: [
        "Colour business cards are useful when your card needs to show brand colours, imagery, or a more polished visual impression.",
        "They can be printed single-sided or double-sided on coated card stock with a clean business finish.",
      ],
      capabilities: [
        "Single-sided colour cards",
        "Double-sided colour cards",
        "Coated card stock options",
        "Business card and postcard-style formats",
      ],
      pricing: startingFrom(
        7000,
        "Base service price",
        undefined,
        "per starter batch",
      ),
    },
  ],
  [
    key("printing", "large-format-printing"),
    {
      shortDescription:
        "Large format output for posters, banners, display panels, backlit film, vinyl, and paper graphics.",
      body: [
        "Large format printing covers posters, banners, display graphics, and oversized materials that need crisp colour at a larger scale.",
        "Output can be produced on paper, photo paper, adhesive paper, vinyl, backlit film, transparency, banner material, and static cling.",
      ],
      capabilities: [
        "Outdoor and indoor wide-format printing",
        "Paper, vinyl, backlit film, transparency, and banner materials",
        "Mounting and laminating options",
        "Full-colour and text-only output",
      ],
      pricing: startingFrom(700, "Base service price", undefined, "per sq ft"),
    },
  ],
  [
    key("printing", "colour-postcards"),
    {
      shortDescription:
        "Full-colour postcards for direct mail, promotions, real estate, events, and compact handouts.",
      body: [
        "Colour postcards are useful for direct mail, leave-behinds, announcements, promotions, event reminders, and real estate campaigns.",
        "They can be produced in multiple sizes with single-sided or double-sided colour layouts.",
      ],
      capabilities: [
        "Multiple postcard sizes",
        "Single-sided and double-sided colour printing",
        "Direct mail and event promotion use",
        "Real estate and local business marketing",
      ],
      pricing: startingFrom(
        9500,
        "Base service price",
        undefined,
        "per starter batch",
      ),
    },
  ],
  [
    key("printing", "menu-boxes"),
    {
      shortDescription:
        "Printed menu materials for restaurants, cafes, takeout counters, and food service businesses.",
      body: [
        "Printed menus need to be easy to read, durable enough for daily handling, and visually consistent with the restaurant brand.",
        "We can produce flat, folded, laminated, and full-colour menu pieces for food service settings.",
      ],
      capabilities: [
        "Full-colour restaurant menus",
        "Laminated menu options",
        "Folded and flat menu layouts",
        "Restaurant, cafe, and food service use",
      ],
      pricing: quotePricing,
    },
  ],
  [
    key("printing", "full-colour-brochures"),
    {
      shortDescription:
        "Full-colour brochures for product sheets, service overviews, event programs, and business promotions.",
      body: [
        "Full-colour brochures combine images, colour, and structured information in a compact printed piece.",
        "They are useful for sales materials, product information, event handouts, service menus, and local campaigns.",
      ],
      capabilities: [
        "Common brochure sizes",
        "One-sided and both-sided colour options",
        "Coated stock options",
        "Business campaign quantities",
      ],
      pricing: startingFrom(
        38300,
        "Base service price",
        undefined,
        "per starter run",
      ),
    },
  ],
  [
    key("printing", "stamps"),
    {
      shortDescription:
        "Custom stamps for addresses, document marking, branding, office workflows, and repeated business details.",
      body: [
        "Custom rubber stamps save time on repeated office details, document marking, addresses, approvals, and branding.",
        "Stamp options can be matched to the impression size, daily use, and business information needed.",
      ],
      capabilities: [
        "Address and logo stamps",
        "Self-inking rubber stamps",
        "Document marking stamps",
        "Business branding and office use",
      ],
      pricing: quotePricing,
    },
  ],
  [
    key("printing", "flyers"),
    {
      shortDescription:
        "Printed flyers for promotions, events, price lists, announcements, menus, and local advertising.",
      body: [
        "Flyers are a flexible print format for promotions, events, menus, neighbourhood advertising, and simple business information.",
        "They can be printed in different sizes, ink configurations, quantities, and paper choices depending on the campaign.",
      ],
      capabilities: [
        "Single-page promotional flyers",
        "Colour and black ink options",
        "Typesetting and layout support",
        "Small event runs and larger advertising runs",
      ],
      pricing: startingFrom(
        2588,
        "Base service price",
        undefined,
        "per starter run",
      ),
    },
  ],
  [
    key("printing", "weddings"),
    {
      shortDescription:
        "Wedding print pieces for invitations, RSVP cards, programs, menus, signage, and coordinated event stationery.",
      body: [
        "Wedding printing brings the invitation, ceremony, reception, and guest information into one coordinated visual style.",
        "Pieces can include invitations, RSVP cards, programs, menus, table items, and other printed materials for the day.",
      ],
      capabilities: [
        "Save the date cards and invitations",
        "RSVP cards and envelopes",
        "Programs and printed menus",
        "Coordinated print suites",
      ],
      pricing: quotePricing,
    },
  ],
  [
    key("design", "electronic-signs"),
    {
      shortDescription:
        "Design and setup support for programmable electronic signs, LED displays, and changeable digital messages.",
      body: [
        "Electronic signs need clear layouts that stay readable at distance and work within the limits of the display system.",
        "We help prepare message graphics, text layouts, static screens, and update-ready designs for digital sign use.",
      ],
      capabilities: [
        "Graphic and text layout for LED message boards",
        "Animated and static content design",
        "Formatting for common electronic sign systems",
        "Content updates and revisions",
      ],
      pricing: quotePricing,
    },
  ],
  [
    key("design", "taxi-roof-signs"),
    {
      shortDescription:
        "Taxi and driving school roof signs with acrylic panels and clear lettering for vehicle-top visibility.",
      body: [
        "Taxi roof signs are built for clear vehicle-top identification in daily use.",
        "They can be supplied as blank roof signs or finished with vinyl lettering for taxi and driving school branding.",
      ],
      capabilities: [
        "White acrylic taxi roof signs",
        "Vinyl lettering for sign panels",
        "Taxi and driving school branding",
        "Replacement panel support",
      ],
      pricing: startingFrom(
        18000,
        "Base service price",
        undefined,
        "per blank sign",
      ),
    },
  ],
  [
    key("design", "engraving-plaque"),
    {
      shortDescription:
        "Engraved plaques for awards, recognition, dedications, offices, memorials, and professional displays.",
      body: [
        "Engraved plaques create a permanent and professional display for names, awards, dedications, and recognition.",
        "Material, backing, size, layout, and mounting can be chosen to match the use and location.",
      ],
      capabilities: [
        "Brass, aluminum, and acrylic plaque options",
        "Custom engraved text and logos",
        "Wood, metal, and acrylic backing options",
        "Wall-mount and desk-mount configurations",
      ],
      pricing: quotePricing,
    },
  ],
  [
    key("design", "traffic-signs"),
    {
      shortDescription:
        "Custom aluminum traffic, parking, and regulatory signs for private properties and commercial sites.",
      body: [
        "Traffic signs help direct vehicles and pedestrians on private properties, parking lots, industrial sites, and business locations.",
        "Options include printed aluminum signs, blank panels, posts, and common parking or directional formats.",
      ],
      capabilities: [
        "Traffic and parking signs",
        "Aluminum sign panels",
        "Post and hardware options",
        "Private property and directional signs",
      ],
      pricing: startingFrom(5500, "Base service price", undefined, "per sign"),
    },
  ],
  [
    key("design", "logos"),
    {
      shortDescription:
        "Logo and artwork preparation for print, signage, business cards, vehicle graphics, and online use.",
      body: [
        "A logo has to work across signs, print materials, vehicles, magnets, websites, and small-format stationery.",
        "We can create new logo artwork, clean up existing artwork, prepare production files, and adapt designs for real sign and print output.",
      ],
      capabilities: [
        "Custom logo concepts",
        "Artwork cleanup for production",
        "Print-ready and sign-ready files",
        "Colour and one-colour logo versions",
      ],
      pricing: startingFrom(
        5000,
        "Base service price",
        undefined,
        "per custom logo",
      ),
    },
  ],
  [
    key("design", "t-shirts-caps"),
    {
      shortDescription:
        "Custom T-shirt and cap graphics using heat transfer, inkjet transfer, or silk screen production methods.",
      body: [
        "T-shirts and caps can be produced using heat transfer, inkjet transfer, or silk screening depending on quantity, colours, and durability needs.",
        "This service covers artwork placement, print method selection, garment graphics, and production preparation.",
      ],
      capabilities: [
        "Heat transfer graphics",
        "Inkjet transfer graphics",
        "Silk screen apparel printing",
        "T-shirt, cap, and promotional apparel layouts",
      ],
      pricing: startingFrom(
        750,
        "Base service price",
        undefined,
        "per imprint",
      ),
    },
  ],
  [
    key("design", "magnetic-fridge"),
    {
      shortDescription:
        "Custom fridge magnets for business promotions, service reminders, calendars, and local customer handouts.",
      body: [
        "Fridge magnets keep your business information visible in homes, offices, and customer workspaces.",
        "Options include business card magnets, round magnets, calendar magnets, and other promotional shapes.",
      ],
      capabilities: [
        "Business card magnets",
        "Round magnet options",
        "Calendar-style magnets",
        "Promotional handouts for local customers",
      ],
      pricing: startingFrom(350, "Base service price", undefined, "per magnet"),
    },
  ],
  [
    key("design", "type-setting"),
    {
      shortDescription:
        "Typesetting and layout support for flyers, menus, business cards, envelopes, letterheads, and print files.",
      body: [
        "Typesetting makes printed material easier to read, align, and produce cleanly.",
        "We can prepare layout and text for flyers, menus, business cards, envelopes, letterheads, artwork files, and other production pieces.",
      ],
      capabilities: [
        "Flyer and menu layout",
        "Business card and envelope setup",
        "Scanning, cutting, and file preparation",
        "Production-ready text layout",
      ],
      pricing: startingFrom(
        3500,
        "Base service price",
        undefined,
        "per layout",
      ),
    },
  ],
  [
    key("design", "silk-screens"),
    {
      shortDescription:
        "Silk screen setup and printing support for apparel, bags, promotional materials, and repeatable graphics.",
      body: [
        "Silk screening is useful for sharper, more durable graphics on larger apparel and promotional runs.",
        "The process can include artwork layout, film, screen preparation, colour planning, and the final screen print.",
      ],
      capabilities: [
        "Silk screen setup for apparel",
        "Film and screen preparation",
        "Single-colour and multi-colour jobs",
        "T-shirts, bags, and promotional materials",
      ],
      pricing: startingFrom(
        750,
        "Base service price",
        undefined,
        "per imprint",
      ),
    },
  ],
  [
    key("design", "websites"),
    {
      shortDescription:
        "Simple business website design that helps customers find your services, contact details, and brand online.",
      body: [
        "A website gives customers a convenient way to understand your company, find your services, and contact you.",
        "The process includes clarifying the goal, gathering information, organizing content, structuring the pages, and building a practical site.",
      ],
      capabilities: [
        "Home page design",
        "Extra page design",
        "Website structure planning",
        "Maintenance and management by contract",
      ],
      pricing: startingFrom(5000, "Base service price", undefined, "per setup"),
    },
  ],
]);

export function getServiceContentOverride(
  categorySlug: CategorySlug,
  serviceSlug: string,
) {
  return serviceContentOverrides.get(key(categorySlug, serviceSlug));
}
