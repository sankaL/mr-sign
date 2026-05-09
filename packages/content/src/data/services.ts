import { designServices } from "./design";
import { printingServices } from "./printing";
import { signsServices } from "./signs";

export const services = [
  ...signsServices,
  ...printingServices,
  ...designServices,
] as const;

export const featuredServiceRefs = [
  { categorySlug: "signs", serviceSlug: "channel-letters" },
  { categorySlug: "signs", serviceSlug: "vehicle-lettering" },
  { categorySlug: "printing", serviceSlug: "business-cards" },
  { categorySlug: "signs", serviceSlug: "banner" },
] as const;
