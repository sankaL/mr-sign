import { prisma } from "@mrsign/db/src/client";

export type DashboardStats = {
  newQuoteCount: number;
  newContactCount: number;
  totalRequestCount: number;
  statusCounts: Array<{ status: string; count: number }>;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const [newQuoteCount, newContactCount, totalRequestCount, statusCounts] =
    await Promise.all([
      prisma.customerRequest.count({
        where: { type: "QUOTE", status: "NEW" },
      }),
      prisma.customerRequest.count({
        where: { type: "CONTACT", status: "NEW" },
      }),
      prisma.customerRequest.count(),
      prisma.customerRequest.groupBy({
        by: ["status"],
        _count: { status: true },
        orderBy: { status: "asc" },
      }),
    ]);

  return {
    newQuoteCount,
    newContactCount,
    totalRequestCount,
    statusCounts: statusCounts.map((group) => ({
      status: group.status,
      count: group._count.status,
    })),
  };
}

export type RecentRequest = {
  id: string;
  requestCode: string;
  type: string;
  status: string;
  firstName: string;
  lastName: string;
  submittedAt: Date;
};

export async function getRecentRequests(limit = 10): Promise<RecentRequest[]> {
  return prisma.customerRequest.findMany({
    take: limit,
    orderBy: { submittedAt: "desc" },
    select: {
      id: true,
      requestCode: true,
      type: true,
      status: true,
      firstName: true,
      lastName: true,
      submittedAt: true,
    },
  });
}

export type ServiceAttention = {
  id: string;
  name: string;
  categoryName: string;
  pricingType: string;
};

export async function getServicesNeedingAttention(): Promise<
  ServiceAttention[]
> {
  const services = await prisma.service.findMany({
    where: {
      isActive: true,
      OR: [{ pricing: { type: "REQUEST_QUOTE" } }, { pricing: null }],
    },
    select: {
      id: true,
      name: true,
      category: { select: { name: true } },
      pricing: { select: { type: true } },
    },
    orderBy: [{ category: { displayOrder: "asc" } }, { displayOrder: "asc" }],
    take: 20,
  });

  return services.map((s) => ({
    id: s.id,
    name: s.name,
    categoryName: s.category.name,
    pricingType: s.pricing?.type ?? "No pricing",
  }));
}
