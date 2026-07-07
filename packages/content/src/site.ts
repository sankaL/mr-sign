import siteJson from "../content/site.json";
import type {
  BusinessHour,
  GeneratedImageAsset,
  HomePageContent,
  NavigationItem,
  PageContent,
  SiteAction,
  SiteContact,
} from "./types";

type SiteJson = {
  siteContact: SiteContact;
  businessHours: BusinessHour[];
  publicNavigation: NavigationItem[];
  primaryActions: {
    call: SiteAction;
    email: SiteAction;
    services: SiteAction;
    contact: SiteAction;
    directions: SiteAction;
  };
  pages: {
    home: HomePageContent;
    location: PageContent;
    contact: PageContent;
    gallery: PageContent;
    about: PageContent;
    faqs: PageContent;
  };
};

function normalizePage(page: PageContent): PageContent {
  if (!page.image) return page;

  const image = page.image as GeneratedImageAsset & { src?: string };

  return {
    ...page,
    image: {
      path: image.path ?? image.src,
      alt: image.alt,
      prompt: image.prompt,
    },
  };
}

function normalizeHomePage(page: HomePageContent): HomePageContent {
  return {
    ...normalizePage(page),
    featuredImages: page.featuredImages.map((image) => ({
      path: image.path,
      alt: image.alt,
      prompt: image.prompt,
    })),
  } as HomePageContent;
}

const site = siteJson as SiteJson;

export const siteContact = site.siteContact;
export const businessHours = site.businessHours;
export const publicNavigation = site.publicNavigation;
export const primaryActions = site.primaryActions;

export const homePage = normalizeHomePage(site.pages.home);
export const locationPage = normalizePage(site.pages.location);
export const contactPage = normalizePage(site.pages.contact);
export const galleryPage = normalizePage(site.pages.gallery);
export const aboutPage = normalizePage(site.pages.about);
export const faqsPage = normalizePage(site.pages.faqs);
