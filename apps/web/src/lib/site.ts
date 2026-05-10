import {
  businessHours,
  contactPage,
  galleryPage,
  homePage,
  locationPage,
  primaryActions,
  publicNavigation,
  quotePage,
  serviceCategories as contentCategories,
  siteContact,
} from "@mrsign/content";
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
  Users,
} from "lucide-react";

export {
  businessHours,
  contactPage,
  galleryPage,
  homePage,
  locationPage,
  primaryActions,
  publicNavigation,
  quotePage,
  siteContact,
};

export const primaryNavigation = publicNavigation.filter((item) =>
  ["/signs", "/printing", "/design"].includes(item.href),
);

export const secondaryNavigation = publicNavigation.filter((item) =>
  ["/gallery", "/location", "/contact"].includes(item.href),
);

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

const categoryDecor = {
  signs: {
    cta: "Explore signs",
    accent: "yellow",
    icon: Megaphone,
    samples: ["Channel Letters", "Window Lettering", "Banners"],
  },
  printing: {
    cta: "Explore printing",
    accent: "blue",
    icon: Printer,
    samples: ["Business Cards", "Flyers", "Large Format"],
  },
  design: {
    cta: "Explore design",
    accent: "red",
    icon: Brush,
    samples: ["Logos", "Type Setting", "Silk Screens"],
  },
} as const;

export const serviceCategories: ServiceCategory[] = contentCategories.map(
  (category) => {
    const decor = categoryDecor[category.slug];

    return {
      href: category.route,
      label: category.name,
      eyebrow: category.eyebrow,
      title: category.headline,
      description: category.description,
      cta: decor.cta,
      accent: decor.accent,
      icon: decor.icon,
      samples: [...decor.samples],
    };
  },
);

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
      "Use generated project-managed image paths for public service imagery.",
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
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/login", label: "Login", icon: ShieldCheck },
];

export const statusStateContent = {
  loading: {
    title: "Preparing the workspace",
    description:
      "The public page shell is ready while live request handling is prepared.",
    icon: Sparkles,
  },
  empty: {
    title: "Direct contact available",
    description: "Use the shop phone or email for active quote requests.",
    icon: FileText,
  },
  error: {
    title: "No live submission yet",
    description:
      "Form validation and stored request handling are intentionally out of scope for this static launch layer.",
    icon: ShieldCheck,
  },
};
