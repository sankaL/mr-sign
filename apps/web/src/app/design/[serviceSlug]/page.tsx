import { getService, getServicesByCategory } from "@mrsign/content";
import type { Metadata } from "next";

import { ServiceDetailPage } from "@/components/site/service-detail-page";

type ServicePageProps = {
  params: Promise<{
    serviceSlug: string;
  }>;
};

export function generateStaticParams() {
  return getServicesByCategory("design").map((service) => ({
    serviceSlug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = getService("design", serviceSlug);

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
