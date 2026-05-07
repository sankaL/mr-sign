import type { LucideIcon } from "lucide-react";
import {
  Brush,
  ClipboardCheck,
  FileText,
  Hammer,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  Printer,
  Ruler,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const siteContact = {
  businessName: "Mr. Sign and Print",
  phone: "(416) 512-9353",
  phoneHref: "tel:14165129353",
  secondaryPhone: "(905) 761-8970",
  secondaryPhoneHref: "tel:19057618970",
  email: "order@mrsignandprint.net",
  emailHref: "mailto:order@mrsignandprint.net",
  address: "399 Four Valley Dr. Unit 3, Vaughan, Ontario L4K 5X5",
  shortAddress: "399 Four Valley Dr. Unit 3, Vaughan",
  serviceArea: "Vaughan and the GTA",
};

export const publicNavigation = [
  { href: "/signs", label: "Signs" },
  { href: "/printing", label: "Printing" },
  { href: "/design", label: "Design" },
  { href: "/request-quote", label: "Request Quote" },
  { href: "/order-online", label: "Order Online" },
  { href: "/location", label: "Location" },
  { href: "/contact", label: "Contact" },
] as const;

export const primaryActions = {
  quote: { href: "/request-quote", label: "Request Quote" },
  order: { href: "/order-online", label: "Order Online" },
  services: { href: "/signs", label: "Browse Services" },
  call: { href: siteContact.phoneHref, label: "Call for Quote" },
};

export type ServiceCategory = {
  href: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  accent: "blue" | "red" | "yellow";
  icon: LucideIcon;
  samples: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    href: "/signs",
    label: "Signs",
    eyebrow: "Street visibility",
    title: "Storefront signs and shop graphics",
    description:
      "Channel letters, banners, window lettering, lawn signs, sandwich boards, and exterior sign work for local businesses.",
    cta: "Plan a sign job",
    accent: "yellow",
    icon: Megaphone,
    samples: ["Channel Letters", "Window Lettering", "Banners"],
  },
  {
    href: "/printing",
    label: "Printing",
    eyebrow: "Production print",
    title: "Printed materials with practical turnaround",
    description:
      "Business cards, flyers, brochures, menus, invoices, invitations, postcards, stamps, and large format printing.",
    cta: "Start a print request",
    accent: "blue",
    icon: Printer,
    samples: ["Business Cards", "Flyers", "Large Format"],
  },
  {
    href: "/design",
    label: "Design",
    eyebrow: "Artwork support",
    title: "Design help before the job goes to production",
    description:
      "Logos, typesetting, layout help, sign-ready artwork, engraving layouts, T-shirt graphics, and production file support.",
    cta: "Get design help",
    accent: "red",
    icon: Brush,
    samples: ["Logos", "Type Setting", "Silk Screens"],
  },
];

export const featuredWorkflows = [
  {
    title: "Quote Intake",
    description:
      "Collect service, size, quantity, deadline, and contact details without payments or file uploads.",
    icon: ClipboardCheck,
  },
  {
    title: "Production Notes",
    description:
      "Show clear service paths and leave detailed production management for later admin phases.",
    icon: Ruler,
  },
  {
    title: "Codebase Assets",
    description:
      "Use branded graphic tiles now, with project-managed image paths ready for future owned photos.",
    icon: FileText,
  },
];

export const contactMethods = [
  { label: siteContact.phone, href: siteContact.phoneHref, icon: Phone },
  { label: siteContact.email, href: siteContact.emailHref, icon: Mail },
  { label: siteContact.shortAddress, href: "/location", icon: MapPin },
];

export const adminNavigation = [
  { href: "/admin", label: "Dashboard", icon: Hammer },
  { href: "/admin/login", label: "Login", icon: ShieldCheck },
];

export const statusStateContent = {
  loading: {
    title: "Preparing the workspace",
    description:
      "The page shell is ready while the next phase connects real data.",
    icon: Sparkles,
  },
  empty: {
    title: "Nothing to show yet",
    description:
      "This area is reserved for Phase 3 and later data-backed workflows.",
    icon: FileText,
  },
  error: {
    title: "This view needs attention",
    description:
      "Use inline errors here when forms and admin actions arrive in later phases.",
    icon: ShieldCheck,
  },
};
