import type { Metadata } from "next";

import { ServiceDetailPage } from "@/components/site/service-detail-page";
import {
  getPublicService,
  getPublicStaticServiceParams,
} from "@/lib/public-services";
import { buildServiceMetadata } from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{
    serviceSlug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getPublicStaticServiceParams("signs");
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = await getPublicService("signs", serviceSlug);

  return buildServiceMetadata(service, "Sign Service", `/signs/${serviceSlug}`);
}

export default async function SignsServicePage({ params }: ServicePageProps) {
  const { serviceSlug } = await params;

  return <ServiceDetailPage categorySlug="signs" serviceSlug={serviceSlug} />;
}
