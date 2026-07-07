import printingBrochuresJson from "../../content/services/printing/brochures.json";
import printingBusinessCardsJson from "../../content/services/printing/business-cards.json";
import printingColourBusinessCardsJson from "../../content/services/printing/colour-business-cards.json";
import printingColourPostcardsJson from "../../content/services/printing/colour-postcards.json";
import printingFlyersJson from "../../content/services/printing/flyers.json";
import printingFullColourBrochuresJson from "../../content/services/printing/full-colour-brochures.json";
import printingInvitationsJson from "../../content/services/printing/invitations.json";
import printingInvoicesJson from "../../content/services/printing/invoices.json";
import printingLargeFormatPrintingJson from "../../content/services/printing/large-format-printing.json";
import printingMenuBoxesJson from "../../content/services/printing/menu-boxes.json";
import printingStampsJson from "../../content/services/printing/stamps.json";
import printingWeddingsJson from "../../content/services/printing/weddings.json";
import signsAwningsJson from "../../content/services/signs/awnings.json";
import signsBannerJson from "../../content/services/signs/banner.json";
import signsBuildersSignsJson from "../../content/services/signs/builders-signs.json";
import signsChannelLettersJson from "../../content/services/signs/channel-letters.json";
import signsCoroplastJson from "../../content/services/signs/coroplast.json";
import signsCutOutLettersJson from "../../content/services/signs/cut-out-letters.json";
import signsDirectionalSignsJson from "../../content/services/signs/directional-signs.json";
import signsFabricSignsJson from "../../content/services/signs/fabric-signs.json";
import signsIlluminatedBoxesJson from "../../content/services/signs/illuminated-boxes.json";
import signsIndoorWallGraphicsJson from "../../content/services/signs/indoor-wall-graphics.json";
import signsLedSignsJson from "../../content/services/signs/led-signs.json";
import signsMagneticSignsJson from "../../content/services/signs/magnetic-signs.json";
import signsMenuBoxesJson from "../../content/services/signs/menu-boxes.json";
import signsNeonJson from "../../content/services/signs/neon.json";
import signsPlasticLawnSignsJson from "../../content/services/signs/plastic-lawn-signs.json";
import signsPushThroughSignsJson from "../../content/services/signs/push-through-signs.json";
import signsPylonSignsJson from "../../content/services/signs/pylon-signs.json";
import signsRealEstateSignsJson from "../../content/services/signs/real-estate-signs.json";
import signsReceptionSignsJson from "../../content/services/signs/reception-signs.json";
import signsSandwichBoardsJson from "../../content/services/signs/sandwich-boards.json";
import signsTFrameSiteSignsJson from "../../content/services/signs/t-frame-site-signs.json";
import signsTeardropFlagsJson from "../../content/services/signs/teardrop-flags.json";
import signsTrafficAndStreetSignsJson from "../../content/services/signs/traffic-and-street-signs.json";
import signsVerticalStandsIndoorJson from "../../content/services/signs/vertical-stands-indoor.json";
import signsVerticalStandsOutdoorJson from "../../content/services/signs/vertical-stands-outdoor.json";
import signsVinylCuttingJson from "../../content/services/signs/vinyl-cutting.json";
import signsWindowFrostingJson from "../../content/services/signs/window-frosting.json";
import signsWindowLetteringJson from "../../content/services/signs/window-lettering.json";
import servicesElectricalTroubleshootingJson from "../../content/services/services/electrical-troubleshooting.json";
import servicesEmergencySignServiceJson from "../../content/services/services/emergency-sign-service.json";
import servicesLedLightingReplacementJson from "../../content/services/services/led-lighting-replacement.json";
import servicesSignCleaningJson from "../../content/services/services/sign-cleaning.json";
import servicesSignRepairsJson from "../../content/services/services/sign-repairs.json";
import servicesVinylGraphicReplacementJson from "../../content/services/services/vinyl-graphic-replacement.json";
import type { JsonService, ServiceDetail } from "../types";

function imageFromJson(image: JsonService["image"]): ServiceDetail["image"] {
  return {
    path: image.src,
    alt: image.alt,
    prompt: image.prompt,
  };
}

function serviceFromJson(service: JsonService): ServiceDetail {
  return {
    ...service,
    route: `/${service.categorySlug}/${service.slug}`,
    eyebrow: service.categorySlug,
    image: imageFromJson(service.image),
  };
}

const serviceJson = [
  printingBrochuresJson,
  printingBusinessCardsJson,
  printingColourBusinessCardsJson,
  printingColourPostcardsJson,
  printingFlyersJson,
  printingFullColourBrochuresJson,
  printingInvitationsJson,
  printingInvoicesJson,
  printingLargeFormatPrintingJson,
  printingMenuBoxesJson,
  printingStampsJson,
  printingWeddingsJson,
  signsAwningsJson,
  signsBannerJson,
  signsBuildersSignsJson,
  signsChannelLettersJson,
  signsCoroplastJson,
  signsCutOutLettersJson,
  signsDirectionalSignsJson,
  signsFabricSignsJson,
  signsIlluminatedBoxesJson,
  signsIndoorWallGraphicsJson,
  signsLedSignsJson,
  signsMagneticSignsJson,
  signsMenuBoxesJson,
  signsNeonJson,
  signsPlasticLawnSignsJson,
  signsPushThroughSignsJson,
  signsPylonSignsJson,
  signsRealEstateSignsJson,
  signsReceptionSignsJson,
  signsSandwichBoardsJson,
  signsTFrameSiteSignsJson,
  signsTeardropFlagsJson,
  signsTrafficAndStreetSignsJson,
  signsVerticalStandsIndoorJson,
  signsVerticalStandsOutdoorJson,
  signsVinylCuttingJson,
  signsWindowFrostingJson,
  signsWindowLetteringJson,
  servicesElectricalTroubleshootingJson,
  servicesEmergencySignServiceJson,
  servicesLedLightingReplacementJson,
  servicesSignCleaningJson,
  servicesSignRepairsJson,
  servicesVinylGraphicReplacementJson,
] as JsonService[];

export const services = serviceJson
  .map(serviceFromJson)
  .filter((service) => service.status === "published")
  .sort(
    (a, b) =>
      a.displayOrder - b.displayOrder ||
      a.categorySlug.localeCompare(b.categorySlug) ||
      a.name.localeCompare(b.name),
  );

export const featuredServiceRefs = services
  .filter((service) => service.featured)
  .map((service) => ({
    categorySlug: service.categorySlug,
    serviceSlug: service.slug,
  }));
