import { prisma } from "@mrsign/db/src/client";

export type DashboardStats = {
  newQuoteCount: number;
  newContactCount: number;
  totalRequestCount: number;
  statusCounts: Array<{ status: string; count: number }>;
  typeCounts: Array<{ type: string; count: number }>;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const [
    newQuoteCount,
    newContactCount,
    totalRequestCount,
    statusCounts,
    typeCounts,
  ] = await Promise.all([
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
    prisma.customerRequest.groupBy({
      by: ["type"],
      _count: { type: true },
      orderBy: { type: "asc" },
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
    typeCounts: typeCounts.map((group) => ({
      type: group.type,
      count: group._count.type,
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
  try {
    const services = await prisma.service.findMany({
      where: {
        status: "ACTIVE",
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
  } catch {
    return [];
  }
}

/* ─── Request trend data ─────────────────────── */

export type RequestTrendPoint = {
  date: string;
  count: number;
};

export async function getRequestTrends(
  startDate: Date,
): Promise<RequestTrendPoint[]> {
  const rows = await prisma.$queryRaw<Array<{ date: Date; count: bigint }>>`
    SELECT DATE("submittedAt") AS date, COUNT(*) AS count
    FROM "customer_requests"
    WHERE "submittedAt" >= ${startDate}
    GROUP BY DATE("submittedAt")
    ORDER BY date ASC
  `;

  return rows.map((row) => ({
    date: row.date.toISOString().slice(0, 10),
    count: Number(row.count),
  }));
}

/* ─── Paginated request list ─────────────────── */

export type PaginatedRequests = {
  items: Array<{
    id: string;
    requestCode: string;
    type: string;
    status: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    submittedAt: Date;
  }>;
  totalCount: number;
};

export type RequestSortField =
  | "submittedAt"
  | "requestCode"
  | "type"
  | "status"
  | "firstName";

const validRequestTypes = new Set(["QUOTE", "ORDER", "CONTACT"]);
const validRequestStatuses = new Set([
  "NEW",
  "UNDER_REVIEW",
  "QUOTE_SENT",
  "AWAITING_CUSTOMER_APPROVAL",
  "APPROVED",
  "IN_PRODUCTION",
  "READY_FOR_PICKUP",
  "COMPLETED",
  "CANCELLED",
]);

function validValues(
  value: string | string[] | undefined,
  allowed: Set<string>,
) {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.filter((item) => allowed.has(item));
}

export async function getRequestsPage(
  page: number,
  perPage: number,
  filters: {
    q?: string;
    type?: string | string[];
    status?: string | string[];
    sort?: RequestSortField;
    order?: "asc" | "desc";
  },
): Promise<PaginatedRequests> {
  const where: Record<string, unknown> = {};

  /* Search by request code, customer name, or email */
  if (filters.q) {
    const q = filters.q;
    where.OR = [
      { requestCode: { contains: q, mode: "insensitive" } },
      { firstName: { contains: q, mode: "insensitive" } },
      { lastName: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
    ];
  }

  /* Multi-value type filter */
  const types = validValues(filters.type, validRequestTypes);
  if (types.length > 0) {
    if (types.length === 1) {
      where.type = types[0];
    } else if (types.length > 1) {
      where.type = { in: types };
    }
  }

  /* Multi-value status filter */
  const statuses = validValues(filters.status, validRequestStatuses);
  if (statuses.length > 0) {
    if (statuses.length === 1) {
      where.status = statuses[0];
    } else if (statuses.length > 1) {
      where.status = { in: statuses };
    }
  }

  /* Sort */
  const sortField = filters.sort ?? "submittedAt";
  const sortOrder = filters.order ?? "desc";
  const orderBy: Record<string, string> = { [sortField]: sortOrder };

  const [items, totalCount] = await Promise.all([
    prisma.customerRequest.findMany({
      where,
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        requestCode: true,
        type: true,
        status: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        submittedAt: true,
      },
    }),
    prisma.customerRequest.count({ where }),
  ]);

  return { items, totalCount };
}
