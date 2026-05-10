"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { AdminPagination } from "@/components/admin/admin-pagination";
import { MultiSelectDropdown } from "@/components/admin/multi-select-dropdown";
import { ServiceStatusToggle } from "@/components/admin/service-status-toggle";

type ServiceRow = {
  id: string;
  name: string;
  slug: string;
  typeName: string;
  pricingLabel: string | null;
  status: "DRAFT" | "ACTIVE" | "INACTIVE";
  isFeatured: boolean;
  displayOrder: number;
};

type SortField =
  | "name"
  | "typeName"
  | "slug"
  | "status"
  | "isFeatured"
  | "displayOrder";
type SortOrder = "asc" | "desc";

type ServicesTableProps = {
  services: ServiceRow[];
  typeOptions: string[];
};

const PER_PAGE = 20;

function statusBadgeClass(status: string) {
  switch (status) {
    case "DRAFT":
      return "badge badge-draft";
    case "ACTIVE":
      return "badge badge-approved";
    case "INACTIVE":
      return "badge badge-cancelled";
    default:
      return "badge";
  }
}

export function ServicesTable({ services, typeOptions }: ServicesTableProps) {
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedFeatured, setSelectedFeatured] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>("displayOrder");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [page, setPage] = useState(1);

  function resetPage() {
    setPage(1);
  }

  function handleSort(field: SortField) {
    resetPage();
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }

  const filtered = useMemo(() => {
    let result = services;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.slug.toLowerCase().includes(q),
      );
    }

    if (selectedTypes.length > 0) {
      result = result.filter((s) => selectedTypes.includes(s.typeName));
    }

    if (selectedStatus.length > 0) {
      result = result.filter((s) => selectedStatus.includes(s.status ?? "DRAFT"));
    }

    if (selectedFeatured.length > 0 && selectedFeatured.length < 2) {
      const wantFeatured = selectedFeatured.includes("featured");
      result = result.filter((s) => s.isFeatured === wantFeatured);
    }

    return result;
  }, [services, search, selectedTypes, selectedStatus, selectedFeatured]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      let aVal: string | number | boolean = (a[sortField] ?? "") as string | number | boolean;
      let bVal: string | number | boolean = (b[sortField] ?? "") as string | number | boolean;

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (typeof aVal === "boolean") {
        aVal = aVal ? 1 : 0;
        bVal = bVal ? 1 : 0;
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [filtered, sortField, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedServices = sorted.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const typeDropdownOptions = typeOptions.map((t) => ({
    value: t,
    label: t,
  }));

  const statusDropdownOptions = [
    { value: "DRAFT", label: "Draft" },
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
  ];

  const featuredDropdownOptions = [
    { value: "featured", label: "Featured" },
    { value: "not-featured", label: "Not featured" },
  ];

  return (
    <div className="grid gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#151515]/35"
            strokeWidth={2}
          />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              resetPage();
            }}
            className="h-9 w-full rounded-lg border border-[#151515]/10 bg-white pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-[#151515]/35 focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <MultiSelectDropdown
            label="Type"
            options={typeDropdownOptions}
            selected={selectedTypes}
            onChange={(nextTypes) => {
              setSelectedTypes(nextTypes);
              resetPage();
            }}
          />
          <MultiSelectDropdown
            label="Status"
            options={statusDropdownOptions}
            selected={selectedStatus}
            onChange={(nextStatus) => {
              setSelectedStatus(nextStatus);
              resetPage();
            }}
          />
          <MultiSelectDropdown
            label="Featured"
            options={featuredDropdownOptions}
            selected={selectedFeatured}
            onChange={(nextFeatured) => {
              setSelectedFeatured(nextFeatured);
              resetPage();
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        <div className="admin-card-header flex items-center justify-between">
          <div>
            <p className="admin-card-title">All services</p>
            <p className="admin-card-subtitle">
              {sorted.length} of {services.length} service
              {services.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
        {sorted.length === 0 ? (
          <div className="admin-card-body py-6 text-center">
            <p className="text-sm text-[#151515]/45">
              No services match the current filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <SortableHeader
                    label="Name"
                    field="name"
                    currentField={sortField}
                    currentOrder={sortOrder}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    label="Type"
                    field="typeName"
                    currentField={sortField}
                    currentOrder={sortOrder}
                    onSort={handleSort}
                  />
                  <th>Slug</th>
                  <th>Pricing</th>
                  <SortableHeader
                    label="Status"
                    field="status"
                    currentField={sortField}
                    currentOrder={sortOrder}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    label="Featured"
                    field="isFeatured"
                    currentField={sortField}
                    currentOrder={sortOrder}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    label="Order"
                    field="displayOrder"
                    currentField={sortField}
                    currentOrder={sortOrder}
                    onSort={handleSort}
                  />
                  <th />
                </tr>
              </thead>
              <tbody>
                {paginatedServices.map((service) => (
                  <tr key={service.id}>
                    <td className="font-semibold">
                      <div className="flex items-center gap-2">
                        {service.name}
                        {service.status === "DRAFT" ? (
                          <span className="text-[10px] font-bold uppercase tracking-wide text-amber-600">
                            Draft
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge badge-${service.typeName.toLowerCase()}`}
                      >
                        {service.typeName}
                      </span>
                    </td>
                    <td className="text-xs text-[#151515]/45">
                      {service.slug}
                    </td>
                    <td>
                      <span className="text-xs text-[#151515]/55">
                        {service.pricingLabel ?? (
                          <span className="badge badge-under-review">
                            No pricing
                          </span>
                        )}
                      </span>
                    </td>
                    <td>
                      <span className={statusBadgeClass(service.status ?? "DRAFT")}>
                        {(service.status ?? "DRAFT").charAt(0) +
                          (service.status ?? "DRAFT").slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td>
                      <ServiceStatusToggle
                        serviceId={service.id}
                        field="featured"
                        value={service.isFeatured}
                      />
                    </td>
                    <td className="text-sm text-[#151515]/50">
                      {service.displayOrder}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {service.status === "DRAFT" ? (
                          <Link
                            href={`/admin/services/${service.id}`}
                            className="inline-flex h-8 items-center rounded-lg bg-[#3b82f6] px-3 text-xs font-semibold !text-white transition-colors hover:bg-[#1d4ed8]"
                          >
                            Continue
                          </Link>
                        ) : (
                          <Link
                            href={`/admin/services/${service.id}`}
                            className="inline-flex h-8 items-center rounded-lg border border-[#151515]/10 px-3 text-xs font-semibold transition-colors hover:bg-[#151515] hover:text-white"
                          >
                            Edit
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {sorted.length > PER_PAGE ? (
          <div className="border-t border-[#151515]/6 px-5 py-4">
            <AdminPagination
              totalItems={sorted.length}
              perPage={PER_PAGE}
              currentPage={currentPage}
              basePath="/admin/services"
              onPageChange={setPage}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* --- Sortable column header --- */

function SortableHeader({
  label,
  field,
  currentField,
  currentOrder,
  onSort,
}: {
  label: string;
  field: SortField;
  currentField: SortField;
  currentOrder: SortOrder;
  onSort: (field: SortField) => void;
}) {
  const isActive = currentField === field;
  return (
    <th
      className="sortable"
      data-sort={isActive ? currentOrder : undefined}
      onClick={() => onSort(field)}
    >
      {label}
      <span className="sort-indicator">
        <span className="sort-arrow sort-arrow-up" />
        <span className="sort-arrow sort-arrow-down" />
      </span>
    </th>
  );
}
