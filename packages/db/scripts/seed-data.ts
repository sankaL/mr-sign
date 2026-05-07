export type SeedService = {
  name: string;
  slug: string;
  shortDescription: string;
  imageAlt: string;
};

export type SeedCategory = {
  name: string;
  slug: string;
  description: string;
  services: SeedService[];
};

export const seedCategories: SeedCategory[] = [
  {
    name: "Signs",
    slug: "signs",
    description:
      "Storefront visibility, banners, boards, vehicle graphics, lettering, and custom sign work for Vaughan and the GTA.",
    services: [
      {
        name: "Awnings",
        slug: "awnings",
        shortDescription:
          "Custom-branded fabric and metal awnings that protect your entrance and promote your business at the same time.",
        imageAlt: "Fabric business awning over a storefront entrance.",
      },
      {
        name: "Plate Directory Board",
        slug: "plate-directory-board",
        shortDescription:
          "Professional directory boards for office buildings, plazas, and multi-tenant properties.",
        imageAlt: "Multi-tenant directory board mounted in a building lobby.",
      },
      {
        name: "Banner",
        slug: "banner",
        shortDescription:
          "Custom vinyl banners in any size for events, promotions, trade shows, and outdoor advertising.",
        imageAlt: "Large vinyl banner with bold promotional graphics.",
      },
      {
        name: "Plastic Lawn Signs",
        slug: "plastic-lawn-signs",
        shortDescription:
          "Lightweight, weather-resistant plastic lawn signs for real estate, construction, and local advertising.",
        imageAlt: "Corrugated plastic lawn signs staked into grass.",
      },
      {
        name: "Channel Letters",
        slug: "channel-letters",
        shortDescription:
          "Custom illuminated channel letters for commercial storefronts and plazas.",
        imageAlt: "LED illuminated channel letters on a storefront facade.",
      },
      {
        name: "Real Estate Signs",
        slug: "real-estate-signs",
        shortDescription:
          "Custom real estate signs and frames for agents and brokers across Vaughan and the GTA.",
        imageAlt: "Installed real estate post sign in front of a home.",
      },
      {
        name: "Changeable Letters",
        slug: "changeable-letters",
        shortDescription:
          "Manual changeable letter signs for businesses, schools, and community organizations.",
        imageAlt: "Outdoor reader board sign with removable letters.",
      },
      {
        name: "Sandwich Boards",
        slug: "sandwich-boards",
        shortDescription:
          "Portable A-frame sandwich board signs for sidewalk advertising and promotions.",
        imageAlt: "A-frame sandwich board sign on a sidewalk.",
      },
      {
        name: "Coroplast",
        slug: "coroplast",
        shortDescription:
          "Lightweight, waterproof coroplast signs for temporary or semi-permanent outdoor use.",
        imageAlt: "Stack of freshly printed coroplast signs.",
      },
      {
        name: "T-Frame / Site Signs",
        slug: "t-frame-site-signs",
        shortDescription:
          "Large-format T-frame and site signs for construction projects, developments, and commercial properties.",
        imageAlt: "T-frame construction site sign at a project entrance.",
      },
      {
        name: "Cut-out Letters",
        slug: "cut-out-letters",
        shortDescription:
          "Dimensional cut-out letters in metal, acrylic, or PVC for lobbies, boardrooms, and storefronts.",
        imageAlt: "Metal dimensional letters mounted on an interior wall.",
      },
      {
        name: "Vertical Stands (Indoor)",
        slug: "vertical-stands-indoor",
        shortDescription:
          "Indoor vertical banner stands for trade shows, events, lobbies, and in-store promotions.",
        imageAlt: "Retractable banner stand set up indoors.",
      },
      {
        name: "Illuminated Boxes",
        slug: "illuminated-boxes",
        shortDescription:
          "Backlit illuminated sign boxes for storefronts, plazas, and interior branding.",
        imageAlt: "Backlit lightbox sign mounted on a commercial wall.",
      },
      {
        name: "Vertical Stands (Outdoor)",
        slug: "vertical-stands-outdoor",
        shortDescription:
          "Durable outdoor vertical banner stands designed to handle Canadian weather.",
        imageAlt: "Double-sided outdoor banner stand near a plaza entrance.",
      },
      {
        name: "Magnetic Signs",
        slug: "magnetic-signs",
        shortDescription:
          "Custom magnetic vehicle signs you can put on and take off as needed.",
        imageAlt: "Magnetic business signs mounted on vehicle doors.",
      },
      {
        name: "Vehicle Lettering",
        slug: "vehicle-lettering",
        shortDescription:
          "Vinyl lettering and graphics for cars, vans, trucks, and trailers.",
        imageAlt: "Service van with vinyl lettering and business graphics.",
      },
      {
        name: "Menu Boxes",
        slug: "menu-boxes",
        shortDescription:
          "Backlit and non-illuminated outdoor menu boxes for restaurants and food service businesses.",
        imageAlt: "Outdoor restaurant menu display box.",
      },
      {
        name: "Vinyl Cutting",
        slug: "vinyl-cutting",
        shortDescription:
          "Precision vinyl cutting for lettering, logos, decals, and graphics.",
        imageAlt: "Vinyl cutter producing a logo decal.",
      },
      {
        name: "Neon",
        slug: "neon",
        shortDescription:
          "Custom neon signs for storefronts, restaurants, and interior spaces.",
        imageAlt: "Bright neon sign glowing in a storefront window.",
      },
      {
        name: "Window Lettering",
        slug: "window-lettering",
        shortDescription:
          "Professional vinyl window lettering for storefronts, offices, and retail locations.",
        imageAlt: "Retail storefront window with vinyl lettering.",
      },
    ],
  },
  {
    name: "Printing",
    slug: "printing",
    description:
      "Business cards, flyers, brochures, menus, invoices, invitations, stamps, and large format printing.",
    services: [
      {
        name: "Brochures",
        slug: "brochures",
        shortDescription:
          "Professionally printed brochures with folded formats and custom sizes available.",
        imageAlt: "Tri-fold brochure printed on glossy stock.",
      },
      {
        name: "Invitations",
        slug: "invitations",
        shortDescription:
          "Custom-printed invitations for corporate events, celebrations, grand openings, and more.",
        imageAlt: "Printed event invitation card with matching envelope.",
      },
      {
        name: "Business Cards",
        slug: "business-cards",
        shortDescription:
          "Sharp, full-colour business cards on quality card stock in the finish of your choice.",
        imageAlt: "Fanned stack of matte-finish business cards.",
      },
      {
        name: "Invoices",
        slug: "invoices",
        shortDescription:
          "Custom-printed invoice books and forms for your business.",
        imageAlt: "Printed invoice booklet on a desk.",
      },
      {
        name: "Colour Business Cards",
        slug: "colour-business-cards",
        shortDescription:
          "Full-colour business cards that show off your brand, your work, or your personality.",
        imageAlt: "Vibrant full-colour business cards spread across a surface.",
      },
      {
        name: "Large Format Printing",
        slug: "large-format-printing",
        shortDescription:
          "Vivid large-format printing for banners, posters, displays, and more.",
        imageAlt: "Freshly printed large-format banner being unrolled.",
      },
      {
        name: "Colour Postcards",
        slug: "colour-postcards",
        shortDescription:
          "Full-colour postcards for direct mail, promotions, events, and real estate.",
        imageAlt: "Glossy full-colour postcards arranged in a fan.",
      },
      {
        name: "Menu Boxes",
        slug: "menu-boxes",
        shortDescription:
          "Printed menus for restaurants, cafes, and food businesses.",
        imageAlt: "Full-colour printed restaurant menus.",
      },
      {
        name: "Full Colour Brochures",
        slug: "full-colour-brochures",
        shortDescription:
          "Full-colour brochures with multiple fold options and sizes available.",
        imageAlt: "Folded full-colour brochure with full-bleed photography.",
      },
      {
        name: "Stamps",
        slug: "stamps",
        shortDescription:
          "Custom rubber stamps for address labels, branding, document marking, and business use.",
        imageAlt: "Self-inking rubber stamp impression on a card.",
      },
      {
        name: "Flyers",
        slug: "flyers",
        shortDescription:
          "Eye-catching flyers for promotions, events, and business advertising.",
        imageAlt: "Stack of freshly printed single-page flyers.",
      },
      {
        name: "Weddings",
        slug: "weddings",
        shortDescription:
          "Elegant printed wedding suites including invitations, RSVP cards, programs, and menus.",
        imageAlt: "Printed wedding suite arranged on linen.",
      },
    ],
  },
  {
    name: "Design",
    slug: "design",
    description:
      "Logo design, production artwork, typesetting, engraving layouts, apparel graphics, and website design.",
    services: [
      {
        name: "Electronic Signs",
        slug: "electronic-signs",
        shortDescription:
          "Design and setup for programmable electronic LED signs.",
        imageAlt: "Outdoor LED electronic message board on a pylon sign.",
      },
      {
        name: "Taxi's Roof Signs",
        slug: "taxi-roof-signs",
        shortDescription:
          "Custom-designed and produced illuminated taxi roof signs.",
        imageAlt: "Backlit taxi roof sign mounted on a cab.",
      },
      {
        name: "Engraving (Plaque)",
        slug: "engraving-plaque",
        shortDescription:
          "Custom engraved plaques for awards, memorials, building dedications, and professional recognition.",
        imageAlt: "Engraved bronze plaque mounted on a wood backing.",
      },
      {
        name: "Traffic Signs",
        slug: "traffic-signs",
        shortDescription:
          "Custom traffic and regulatory signs for private properties, parking lots, and industrial sites.",
        imageAlt: "Stack of custom aluminum traffic signs.",
      },
      {
        name: "Logos",
        slug: "logos",
        shortDescription:
          "Professional logo design with usable files for print, signage, and the web.",
        imageAlt: "Logo design work shown on a computer screen.",
      },
      {
        name: "T-Shirts and Caps",
        slug: "t-shirts-caps",
        shortDescription:
          "Custom logo printing and design for T-shirts, polo shirts, caps, and branded apparel.",
        imageAlt: "Printed T-shirts and embroidered cap with company logo.",
      },
      {
        name: "Magnetic (Fridge)",
        slug: "magnetic-fridge",
        shortDescription:
          "Custom-designed business fridge magnets for low-cost brand promotion.",
        imageAlt: "Business fridge magnet on a refrigerator door.",
      },
      {
        name: "Type Setting",
        slug: "type-setting",
        shortDescription:
          "Professional typesetting for signs, menus, publications, and print materials.",
        imageAlt: "Professional type layout shown on a design screen.",
      },
      {
        name: "Silk Screens",
        slug: "silk-screens",
        shortDescription:
          "Silk screen printing for T-shirts, apparel, bags, and promotional materials.",
        imageAlt: "Silk screen printing setup applying ink to a T-shirt.",
      },
      {
        name: "Websites",
        slug: "websites",
        shortDescription:
          "Simple, professional website design for small businesses in Vaughan and the GTA.",
        imageAlt: "Responsive business website displayed on several devices.",
      },
    ],
  },
];
