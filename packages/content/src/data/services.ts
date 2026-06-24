import designElectronicSignsJson from "../../content/services/design/electronic-signs.json";
import designEngravingPlaqueJson from "../../content/services/design/engraving-plaque.json";
import designLogosJson from "../../content/services/design/logos.json";
import designMagneticFridgeJson from "../../content/services/design/magnetic-fridge.json";
import designSilkScreensJson from "../../content/services/design/silk-screens.json";
import designTShirtsCapsJson from "../../content/services/design/t-shirts-caps.json";
import designTaxiRoofSignsJson from "../../content/services/design/taxi-roof-signs.json";
import designTrafficSignsJson from "../../content/services/design/traffic-signs.json";
import designTypeSettingJson from "../../content/services/design/type-setting.json";
import designWebsitesJson from "../../content/services/design/websites.json";
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
import signsChangeableLettersJson from "../../content/services/signs/changeable-letters.json";
import signsChannelLettersJson from "../../content/services/signs/channel-letters.json";
import signsCoroplastJson from "../../content/services/signs/coroplast.json";
import signsCutOutLettersJson from "../../content/services/signs/cut-out-letters.json";
import signsIlluminatedBoxesJson from "../../content/services/signs/illuminated-boxes.json";
import signsMagneticSignsJson from "../../content/services/signs/magnetic-signs.json";
import signsMenuBoxesJson from "../../content/services/signs/menu-boxes.json";
import signsNeonJson from "../../content/services/signs/neon.json";
import signsPlasticLawnSignsJson from "../../content/services/signs/plastic-lawn-signs.json";
import signsPlateDirectoryBoardJson from "../../content/services/signs/plate-directory-board.json";
import signsRealEstateSignsJson from "../../content/services/signs/real-estate-signs.json";
import signsSandwichBoardsJson from "../../content/services/signs/sandwich-boards.json";
import signsTFrameSiteSignsJson from "../../content/services/signs/t-frame-site-signs.json";
import signsVehicleLetteringJson from "../../content/services/signs/vehicle-lettering.json";
import signsVerticalStandsIndoorJson from "../../content/services/signs/vertical-stands-indoor.json";
import signsVerticalStandsOutdoorJson from "../../content/services/signs/vertical-stands-outdoor.json";
import signsVinylCuttingJson from "../../content/services/signs/vinyl-cutting.json";
import signsWindowLetteringJson from "../../content/services/signs/window-lettering.json";
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
  designElectronicSignsJson,
  designEngravingPlaqueJson,
  designLogosJson,
  designMagneticFridgeJson,
  designSilkScreensJson,
  designTShirtsCapsJson,
  designTaxiRoofSignsJson,
  designTrafficSignsJson,
  designTypeSettingJson,
  designWebsitesJson,
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
  signsChangeableLettersJson,
  signsChannelLettersJson,
  signsCoroplastJson,
  signsCutOutLettersJson,
  signsIlluminatedBoxesJson,
  signsMagneticSignsJson,
  signsMenuBoxesJson,
  signsNeonJson,
  signsPlasticLawnSignsJson,
  signsPlateDirectoryBoardJson,
  signsRealEstateSignsJson,
  signsSandwichBoardsJson,
  signsTFrameSiteSignsJson,
  signsVehicleLetteringJson,
  signsVerticalStandsIndoorJson,
  signsVerticalStandsOutdoorJson,
  signsVinylCuttingJson,
  signsWindowLetteringJson,
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
