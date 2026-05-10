import { prisma } from "@mrsign/db/src/client";
import Link from "next/link";

import { requireActiveAdminSession } from "@/lib/admin-session";

import { AdminShell } from "@/components/admin/admin-shell";
import { ServiceStatusToggle } from "@/components/admin/service-status-toggle";

export const metadata = { title: "Services" };

export default async function AdminServicesPage() {
  const admin = await requireActiveAdminSession();
  const categories = await prisma.serviceCategory.findMany({
    orderBy: { displayOrder: "asc" },
    include: {
      services: {
        orderBy: { displayOrder: "asc" },
        include: { pricing: true },
      },
    },
  });

  return (
    <AdminShell
      title="Services"
      description="Manage services, pricing, and visibility across Signs, Printing, and Design."
      adminName={admin.name ?? undefined}
    >
      <div className="grid gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/services/new"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1936D4] px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition-colors hover:bg-[#151515] hover:!text-white focus-visible:bg-[#151515] focus-visible:!text-white active:scale-[0.98]"
          >
            Add service
          </Link>
        </div>

        {categories.map((category) => (
          <div
            key={category.id}
            className="overflow-hidden rounded-[1.75rem] border border-[#151515]/10 bg-white"
          >
            <div className="border-b border-[#151515]/10 px-5 py-4 md:px-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1936D4]">
                {category.name}
              </p>
              <h2 className="mt-2 text-xl font-black uppercase leading-tight">
                {category.name} services
              </h2>
            </div>
            {category.services.length === 0 ? (
              <div className="px-5 py-6 text-center md:px-6">
                <p className="text-sm font-semibold text-[#151515]/55">
                  No services in this category.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#151515]/10 text-[10px] font-black uppercase tracking-[0.22em] text-[#151515]/55">
                      <th className="px-5 py-3 md:px-6">Name</th>
                      <th className="px-5 py-3 md:px-6">Slug</th>
                      <th className="px-5 py-3 md:px-6">Pricing</th>
                      <th className="px-5 py-3 md:px-6">Active</th>
                      <th className="px-5 py-3 md:px-6">Featured</th>
                      <th className="px-5 py-3 md:px-6">Order</th>
                      <th className="px-5 py-3 md:px-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#151515]/10">
                    {category.services.map((service) => (
                      <tr
                        key={service.id}
                        className="transition-colors hover:bg-[#F3F4F6]"
                      >
                        <td className="px-5 py-3 text-sm font-black text-[#151515] md:px-6">
                          {service.name}
                        </td>
                        <td className="px-5 py-3 text-xs font-bold text-[#151515]/45 md:px-6">
                          {service.slug}
                        </td>
                        <td className="px-5 py-3 text-xs font-bold text-[#151515]/45 md:px-6">
                          {service.pricing?.type
                            .replace(/_/g, " ")
                            .toLowerCase() ?? "No pricing"}
                        </td>
                        <td className="px-5 py-3 md:px-6">
                          <ServiceStatusToggle
                            serviceId={service.id}
                            field="active"
                            value={service.isActive}
                          />
                        </td>
                        <td className="px-5 py-3 md:px-6">
                          <ServiceStatusToggle
                            serviceId={service.id}
                            field="featured"
                            value={service.isFeatured}
                          />
                        </td>
                        <td className="px-5 py-3 text-sm font-bold text-[#151515]/55 md:px-6">
                          {service.displayOrder}
                        </td>
                        <td className="px-5 py-3 md:px-6">
                          <a
                            href={`/admin/services/${service.id}`}
                            className="inline-flex min-h-9 items-center rounded-full border border-[#151515]/15 px-3 py-1 text-xs font-black uppercase tracking-wide transition-colors hover:bg-[#1936D4] hover:!text-white hover:border-[#1936D4] focus-visible:bg-[#1936D4] focus-visible:!text-white focus-visible:border-[#1936D4]"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
