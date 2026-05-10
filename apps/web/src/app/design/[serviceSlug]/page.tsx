import type { Metadata } from "next";

import { ServiceDetailPage } from "@/components/site/service-detail-page";
import {
  getPublicService,
  getPublicStaticServiceParams,
} from "@/lib/public-services";

type ServicePageProps = {
  params: Promise<{
    serviceSlug: string;
  }>;
};

export async function generateStaticParams() {
  return getPublicStaticServiceParams("design");
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = await getPublicService("design", serviceSlug);

  return {
    title: service?.seo.title ?? "Design Service",
    description: service?.seo.description,
    openGraph: {
      title: service?.seo.title,
      description: service?.seo.description,
      images: service?.image.path ? [{ url: service.image.path }] : undefined,
    },
  };
}

export default async function DesignServicePage({ params }: ServicePageProps) {
  const { serviceSlug } = await params;

  return <ServiceDetailPage categorySlug="design" serviceSlug={serviceSlug} />;
}
