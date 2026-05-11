import type { PageContent } from "./types";

export const siteContact = {
  businessName: "Mr. Sign and Print",
  phone: "(416) 512-9353",
  phoneHref: "tel:14165129353",
  secondaryPhone: "(905) 761-8970",
  secondaryPhoneHref: "tel:19057618970",
  fax: "(905) 761-8969",
  email: "order@mrsignandprint.net",
  emailHref: "mailto:order@mrsignandprint.net",
  address: "399 Four Valley Dr. Unit 3, Vaughan, Ontario L4K 5X5",
  streetAddress: "399 Four Valley Dr., Unit 3",
  locality: "Vaughan",
  region: "Ontario",
  postalCode: "L4K 5X5",
  country: "Canada",
  shortAddress: "399 Four Valley Dr. Unit 3, Vaughan",
  serviceArea: "Vaughan, Concord, and the GTA",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=399%20Four%20Valley%20Dr%20Unit%203%20Vaughan%20Ontario%20L4K%205X5",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=399%20Four%20Valley%20Dr%20Unit%203%20Vaughan%20Ontario%20L4K%205X5&output=embed",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=399%20Four%20Valley%20Dr%20Unit%203%20Vaughan%20Ontario%20L4K%205X5",
} as const;

export const businessHours = [
  { day: "Monday", hours: "9:00 AM to 5:00 PM" },
  { day: "Tuesday", hours: "9:00 AM to 5:00 PM" },
  { day: "Wednesday", hours: "9:00 AM to 5:00 PM" },
  { day: "Thursday", hours: "9:00 AM to 5:00 PM" },
  { day: "Friday", hours: "9:00 AM to 5:00 PM" },
  { day: "Saturday", hours: "By appointment" },
  { day: "Sunday", hours: "Closed" },
] as const;

export const publicNavigation = [
  { href: "/signs", label: "Signs" },
  { href: "/printing", label: "Printing" },
  { href: "/design", label: "Design" },
  { href: "/request-quote", label: "Request Quote" },
  { href: "/gallery", label: "Gallery" },
  { href: "/location", label: "Location" },
  { href: "/contact", label: "Contact" },
] as const;

export const primaryActions = {
  quote: { href: "/request-quote", label: "Request Quote" },
  services: { href: "/signs", label: "Browse Services" },
  call: { href: siteContact.phoneHref, label: "Call for Quote" },
  directions: { href: siteContact.directionsUrl, label: "Get Directions" },
} as const;

export const homePage: PageContent = {
  route: "/",
  seo: {
    title: "Mr. Sign and Print | Custom Signs, Printing & Design in Vaughan",
    description:
      "Mr. Sign and Print is Vaughan's trusted sign shop for custom signs, printing, and graphic design. Serving the GTA since 2000. Request a quote today.",
    socialTitle: "Mr. Sign and Print - Custom Signs & Printing in Vaughan",
    socialDescription:
      "From channel letters and vehicle lettering to business cards and banners, we bring your brand to life. Based in Vaughan, serving the entire GTA.",
  },
  eyebrow: "Mr. Sign and Print | Vaughan, Ontario",
  headline: "Your Neighbourhood Sign and Print Shop in Vaughan",
  subheadline:
    "From custom signs and banners to business cards and graphic design, Mr. Sign and Print has been helping local businesses stand out since 2000.",
  image: {
    path: "/images/generated/home-hero.png",
    alt: "Finished sign and print work arranged in a Vaughan sign shop setting.",
    prompt:
      "A wide-format editorial photo for a local sign and print shop website. Show a Vaughan-area storefront with illuminated channel letters above the entrance, a cleanly lettered white work vehicle parked outside, and a few print samples visible near the door. Authentic small business production feel, bright practical daylight, blue red and yellow accents, no readable text, no logos, no watermarks.",
  },
};

export const locationPage: PageContent = {
  route: "/location",
  seo: {
    title: "Find Us in Vaughan | Mr. Sign and Print - Sign and Print Shop",
    description:
      "Visit Mr. Sign and Print at 399 Four Valley Dr., Unit 3, Vaughan, Ontario. View our hours, get directions, and contact us. Serving Vaughan and the GTA since 2000.",
    socialTitle: "Find Mr. Sign and Print in Vaughan, Ontario",
    socialDescription:
      "Located at 399 Four Valley Dr., Unit 3, Vaughan. Call, get directions, or request a quote online. Serving the GTA since 2000.",
  },
  eyebrow: "Location",
  headline: "Visit Us in Vaughan",
  subheadline:
    "We are conveniently located in Vaughan and serve businesses throughout the Greater Toronto Area. Stop by, give us a call, or get in touch online.",
};

export const contactPage: PageContent = {
  route: "/contact",
  seo: {
    title: "Contact Us | Mr. Sign and Print - Vaughan Sign and Print Shop",
    description:
      "Get in touch with Mr. Sign and Print in Vaughan. Call, email, or fill out our contact form. We are happy to answer questions about signs, printing, and design services.",
    socialTitle: "Contact Mr. Sign and Print | Vaughan Sign and Print Shop",
    socialDescription:
      "Questions about signs, printing, or design services in Vaughan and the GTA? Reach out and our team will get back to you quickly.",
  },
  eyebrow: "Contact",
  headline: "Get in Touch",
  subheadline:
    "Have a question about a product or service? Want to check on a quote? Just want to say hello? We would love to hear from you.",
};

export const galleryPage: PageContent = {
  route: "/gallery",
  seo: {
    title: "Gallery | Mr. Sign and Print - Signs, Printing & Design Work",
    description:
      "Browse a project-style gallery of Mr. Sign and Print services, including signs, printing, and design work for Vaughan and the GTA.",
    socialTitle: "Mr. Sign and Print Gallery",
    socialDescription:
      "A visual gallery of sign, print, and design services available from Mr. Sign and Print in Vaughan.",
  },
  eyebrow: "Gallery",
  headline: "A Visual Look at What We Make",
  subheadline:
    "Explore representative sign, print, and design work from across the services we offer to businesses in Vaughan and the GTA.",
};

export const quotePage: PageContent = {
  route: "/request-quote",
  seo: {
    title: "Request a Quote | Mr. Sign and Print - Vaughan Sign and Print Shop",
    description:
      "Prepare the details for a free quote from Mr. Sign and Print in Vaughan. Call or email the shop with service, size, quantity, and timing details.",
  },
  eyebrow: "Request quote",
  headline: "Request a Free Quote",
  subheadline:
    "Use this page to gather the details we need: service, size, quantity, deadline, and contact information. No account, checkout, payment, or file upload is required.",
};
