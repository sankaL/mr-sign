import {
  aboutPage,
  businessHours,
  contactPage,
  faqsPage,
  galleryPage,
  homePage,
  locationPage,
  primaryActions,
  publicNavigation,
  serviceCategories as contentCategories,
  siteContact,
} from "@mrsign/content";
import type { LucideIcon } from "lucide-react";
import {
  Brush,
  ClipboardCheck,
  FileText,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  Printer,
  Ruler,
  ShieldCheck,
} from "lucide-react";

export {
  aboutPage,
  businessHours,
  contactPage,
  faqsPage,
  galleryPage,
  homePage,
  locationPage,
  primaryActions,
  publicNavigation,
  siteContact,
};

export const primaryNavigation = publicNavigation.filter((item) =>
  ["/signs", "/printing", "/services"].includes(item.href),
);

export const secondaryNavigation = publicNavigation.filter((item) =>
  ["/gallery", "/about-us", "/contact"].includes(item.href),
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
  services: {
    cta: "Explore services",
    accent: "red",
    icon: Brush,
    samples: [
      "Sign Repairs",
      "LED and Lighting Replacement",
      "Emergency Sign Service",
    ],
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
    title: "Direct Contact",
    description:
      "Help customers call, email, or visit with service, size, quantity, deadline, and artwork details.",
    icon: ClipboardCheck,
  },
  {
    title: "Service Guidance",
    description:
      "Show clear service paths and practical details without account, checkout, or upload flows.",
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

export const statusStateContent = {
  loading: {
    title: "Preparing the service details",
    description: "The public page shell is ready while content loads.",
    icon: FileText,
  },
  empty: {
    title: "Direct contact available",
    description: "Use the shop phone or email for current pricing questions.",
    icon: FileText,
  },
  error: {
    title: "No online submission",
    description:
      "Online forms and stored requests are intentionally out of scope for this static site.",
    icon: ShieldCheck,
  },
};
