import { prisma } from "../src/client.js";
import { generateRequestCode } from "../src/request-codes.js";
import { getServicesByCategory, serviceCategories } from "@mrsign/content";

type RequestSeed = {
  type: "QUOTE" | "ORDER" | "CONTACT";
  status:
    | "NEW"
    | "UNDER_REVIEW"
    | "QUOTE_SENT"
    | "AWAITING_CUSTOMER_APPROVAL"
    | "APPROVED"
    | "IN_PRODUCTION"
    | "READY_FOR_PICKUP"
    | "COMPLETED"
    | "CANCELLED";
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName?: string;
  preferredContactMethod?: "PHONE" | "EMAIL" | "EITHER";
  reasonForContact?: string;
  quantity?: number;
  sizeDetails?: string;
  materialDetails?: string;
  colorPreferences?: string;
  artworkStatus?:
    | "WILL_EMAIL_FILES"
    | "NEEDS_DESIGN_HELP"
    | "HAS_ROUGH_IDEA"
    | "NOT_APPLICABLE";
  desiredCompletionDate?: Date;
  projectDetails: string;
  serviceSlugs: string[];
  submittedAt: Date;
};

const firstNames = [
  "James",
  "Maria",
  "Robert",
  "Jennifer",
  "Michael",
  "Linda",
  "David",
  "Patricia",
  "Richard",
  "Elizabeth",
  "Joseph",
  "Susan",
  "Thomas",
  "Jessica",
  "Charles",
  "Sarah",
  "Christopher",
  "Karen",
  "Daniel",
  "Nancy",
  "Matthew",
  "Lisa",
  "Anthony",
  "Betty",
  "Mark",
  "Margaret",
  "Donald",
  "Sandra",
  "Steven",
  "Ashley",
  "Paul",
  "Dorothy",
  "Andrew",
  "Kimberly",
  "Joshua",
  "Emily",
  "Kenneth",
  "Donna",
  "Kevin",
  "Michelle",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
];

const companyNames = [
  "Vaughan Auto Repair",
  "Maple Leaf Landscaping",
  "GTA Home Renovations",
  "North York Dental Clinic",
  "Richmond Hill Bakery",
  "Markham Tech Solutions",
  "Thornhill Pharmacy",
  "Concord Construction",
  "Woodbridge Pizza",
  "Kleinburg Cafe",
  "Aurora Fitness Centre",
  "Newmarket Pet Store",
  "King Township Farm Supply",
  "Vaughan Mills Retail Co.",
  "York Region Plumbing",
  "Toronto East Electricians",
  "Barrie Roofing Services",
  "Mississauga Moving Company",
  "Brampton Auto Glass",
  "Oakville Yoga Studio",
];

const projectDetailsTemplates = {
  QUOTE: [
    "Looking for a quote on {service} for our business storefront. We need something professional and eye-catching.",
    "Would like pricing for {service} for an upcoming event. Need it by {month}.",
    "Requesting a quote for {service}. We are a new business opening in {area} and need signage.",
    "Need a quote for {service} for our company vehicle fleet. Approximately {qty} vehicles.",
    "Looking for pricing on {service} for our restaurant. Want to update our current signage.",
    "Quote needed for {service} for a real estate open house. Need something quick and professional.",
    "Interested in {service} for our office building. Multi-tenant directory needed.",
    "Requesting quote for {service} for our construction site. Need multiple signs.",
    "Looking for {service} for our retail location. Want something modern and clean.",
    "Need pricing for {service} for a community event. Budget-conscious but quality matters.",
  ],
  ORDER: [
    "Ready to order {service}. We have our artwork files ready to send. Size: {size}.",
    "Placing an order for {service}. Quantity: {qty}. Need it completed by {month}.",
    "Order for {service} with our company logo. Colors: {color}. Material preference: {material}.",
    "Would like to order {service} for our storefront. Dimensions approximately {size}.",
    "Ordering {service} for our fleet vehicles. {qty} vehicles total, all same design.",
    "Need to order {service} for an upcoming grand opening. Rush order if possible.",
    "Placing order for {service}. We are a returning customer, please reference our previous work.",
    "Order for {service} with custom design. Will email artwork files separately.",
    "Want to order {service} for our trade show booth. Need it by {month}.",
    "Ordering {service} for multiple locations. {qty} units needed across different sites.",
  ],
  CONTACT: [
    "General inquiry about {service}. Not sure what options are available for our needs.",
    "Question about turnaround time for {service}. Need it urgently.",
    "Wondering if you offer {service} for small businesses. What are the minimum order quantities?",
    "Looking for information on {service} pricing and available sizes.",
    "Need advice on the best type of {service} for outdoor use in Canadian weather.",
    "Inquiry about {service}. Do you handle installation or just production?",
    "Question about {service} for a non-profit organization. Any discounts available?",
    "Would like to discuss a custom {service} project. Can we schedule a consultation?",
    "Asking about {service} warranty and durability. How long does it typically last?",
    "General question about {service}. First time ordering signage, need guidance.",
  ],
};

const areas = [
  "Vaughan",
  "Woodbridge",
  "Thornhill",
  "Maple",
  "Kleinburg",
  "Concord",
  "Richmond Hill",
  "Markham",
  "North York",
  "Toronto",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const sizes = [
  '24" x 36"',
  '36" x 48"',
  '48" x 96"',
  "3ft x 6ft",
  "4ft x 8ft",
  '18" x 24"',
  "Custom size, approximately 2m x 1m",
  "Standard storefront size",
];

const materials = [
  "Aluminum",
  "Acrylic",
  "Corrugated plastic",
  "Vinyl",
  "Fabric",
  "LED illuminated",
  "PVC",
  "Coroplast",
];

const colors = [
  "Red and white",
  "Blue and silver",
  "Black and gold",
  "Green and white",
  "Full colour",
  "Company brand colors (will provide Pantone)",
  "Monochrome",
  "Bright and eye-catching",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function replaceTemplateVars(
  template: string,
  vars: Record<string, string>,
): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, "g"), value);
  }
  return result;
}

function generateRequestsForYear(
  year: number,
  allServiceSlugs: string[],
): RequestSeed[] {
  const requests: RequestSeed[] = [];

  // Distribution: more recent years have more requests
  const countByYear: Record<number, number> = {
    2022: 25,
    2023: 45,
    2024: 70,
    2025: 90,
    2026: 30, // partial year
  };

  const count = countByYear[year] || 40;

  // Type distribution: 50% QUOTE, 30% ORDER, 20% CONTACT
  const typeWeights: Array<"QUOTE" | "ORDER" | "CONTACT"> = [
    ...Array(5).fill("QUOTE"),
    ...Array(3).fill("ORDER"),
    ...Array(2).fill("CONTACT"),
  ];

  // Status distribution varies by request age
  const getStatusForDate = (submittedAt: Date): RequestSeed["status"] => {
    const now = new Date();
    const daysAgo = (now.getTime() - submittedAt.getTime()) / (1000 * 60 * 60 * 24);

    if (daysAgo < 7) {
      return pickRandom(["NEW", "NEW", "UNDER_REVIEW", "QUOTE_SENT"]);
    } else if (daysAgo < 30) {
      return pickRandom([
        "UNDER_REVIEW",
        "QUOTE_SENT",
        "AWAITING_CUSTOMER_APPROVAL",
        "APPROVED",
        "IN_PRODUCTION",
      ]);
    } else if (daysAgo < 90) {
      return pickRandom([
        "IN_PRODUCTION",
        "READY_FOR_PICKUP",
        "COMPLETED",
        "COMPLETED",
        "CANCELLED",
      ]);
    } else {
      return pickRandom([
        "COMPLETED",
        "COMPLETED",
        "COMPLETED",
        "CANCELLED",
        "READY_FOR_PICKUP",
      ]);
    }
  };

  for (let i = 0; i < count; i++) {
    const type = pickRandom(typeWeights);
    const firstName = pickRandom(firstNames);
    const lastName = pickRandom(lastNames);
    const emailDomain = pickRandom([
      "gmail.com",
      "yahoo.ca",
      "outlook.com",
      "hotmail.com",
      "rogers.com",
      "bell.net",
      "sympatico.ca",
    ]);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@${emailDomain}`;
    const phone = Math.random() > 0.3
      ? `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
      : undefined;
    const companyName = Math.random() > 0.5 ? pickRandom(companyNames) : undefined;
    const preferredContactMethod = pickRandom([
      "PHONE",
      "EMAIL",
      "EMAIL",
      "EITHER",
    ]);

    // Random date within the year
    const month = Math.floor(Math.random() * 12);
    const day = Math.floor(Math.random() * 28) + 1;
    const submittedAt = new Date(year, month, day, Math.floor(Math.random() * 12), Math.floor(Math.random() * 60));

    // Skip future dates
    if (submittedAt > new Date()) continue;

    const serviceSlugs = pickRandomN(allServiceSlugs, Math.floor(Math.random() * 3) + 1);
    const primaryService = serviceSlugs[0];

    const templateVars = {
      service: primaryService.replace(/-/g, " "),
      month: pickRandom(months),
      area: pickRandom(areas),
      qty: String(Math.floor(Math.random() * 20) + 1),
      size: pickRandom(sizes),
      material: pickRandom(materials),
      color: pickRandom(colors),
    };

    const projectDetails = replaceTemplateVars(
      pickRandom(projectDetailsTemplates[type]),
      templateVars,
    );

    const status = getStatusForDate(submittedAt);

    const desiredCompletionDate = status !== "CANCELLED" && status !== "COMPLETED"
      ? new Date(submittedAt.getTime() + (Math.floor(Math.random() * 30) + 7) * 24 * 60 * 60 * 1000)
      : undefined;

    const artworkStatus = pickRandom([
      "WILL_EMAIL_FILES",
      "NEEDS_DESIGN_HELP",
      "HAS_ROUGH_IDEA",
      "NOT_APPLICABLE",
      "NOT_APPLICABLE",
    ]);

    const request: RequestSeed = {
      type,
      status,
      firstName,
      lastName,
      email,
      phone,
      companyName,
      preferredContactMethod,
      reasonForContact: type === "CONTACT" ? projectDetails.slice(0, 100) : undefined,
      quantity: type === "ORDER" ? Math.floor(Math.random() * 50) + 1 : undefined,
      sizeDetails: Math.random() > 0.5 ? pickRandom(sizes) : undefined,
      materialDetails: Math.random() > 0.5 ? pickRandom(materials) : undefined,
      colorPreferences: Math.random() > 0.5 ? pickRandom(colors) : undefined,
      artworkStatus,
      desiredCompletionDate,
      projectDetails,
      serviceSlugs,
      submittedAt,
    };

    requests.push(request);
  }

  return requests;
}

async function main() {
  console.log("Seeding request data...");

  // Collect all service slugs
  const allServiceSlugs: string[] = [];
  for (const category of serviceCategories) {
    const services = getServicesByCategory(category.slug);
    for (const service of services) {
      allServiceSlugs.push(service.slug);
    }
  }

  console.log(`Found ${allServiceSlugs.length} services available`);

  // Build service slug to ID map
  const serviceMap = new Map<string, string>();
  const services = await prisma.service.findMany({
    select: { id: true, slug: true },
  });
  for (const service of services) {
    serviceMap.set(service.slug, service.id);
  }

  // Generate requests for multiple years
  const years = [2022, 2023, 2024, 2025, 2026];
  const allRequests: RequestSeed[] = [];

  for (const year of years) {
    const yearRequests = generateRequestsForYear(year, allServiceSlugs);
    allRequests.push(...yearRequests);
  }

  console.log(`Generated ${allRequests.length} requests to seed`);

  // Sort by submittedAt to maintain chronological order
  allRequests.sort((a, b) => a.submittedAt.getTime() - b.submittedAt.getTime());

  let created = 0;
  let skipped = 0;

  for (const req of allRequests) {
    try {
      // Generate request code with the historical date
      const requestCode = await generateRequestCode(prisma, req.type, req.submittedAt);

      // Find service IDs
      const serviceIds = req.serviceSlugs
        .map((slug) => serviceMap.get(slug))
        .filter((id): id is string => id !== undefined);

      if (serviceIds.length === 0) {
        console.warn(`No services found for request, skipping`);
        skipped++;
        continue;
      }

      await prisma.customerRequest.create({
        data: {
          requestCode,
          type: req.type,
          status: req.status,
          firstName: req.firstName,
          lastName: req.lastName,
          email: req.email,
          phone: req.phone,
          companyName: req.companyName,
          preferredContactMethod: req.preferredContactMethod,
          reasonForContact: req.reasonForContact,
          quantity: req.quantity,
          sizeDetails: req.sizeDetails,
          materialDetails: req.materialDetails,
          colorPreferences: req.colorPreferences,
          artworkStatus: req.artworkStatus,
          desiredCompletionDate: req.desiredCompletionDate,
          projectDetails: req.projectDetails,
          submittedAt: req.submittedAt,
          services: {
            create: serviceIds.map((serviceId) => ({
              serviceId,
            })),
          },
        },
      });

      created++;

      if (created % 20 === 0) {
        console.log(`Created ${created} requests...`);
      }
    } catch (error) {
      // Skip duplicates (same request code)
      if (
        error instanceof Error &&
        error.message.includes("Unique constraint")
      ) {
        skipped++;
      } else {
        console.error(`Error creating request for ${req.firstName} ${req.lastName}:`, error);
      }
    }
  }

  console.log(`\nSeeding complete!`);
  console.log(`Created: ${created}`);
  console.log(`Skipped: ${skipped}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
