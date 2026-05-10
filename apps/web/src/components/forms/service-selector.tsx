"use client";

import { Search, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import type { ServiceSelectGroup } from "./customer-request-types";

type ServiceSelectorProps = {
  serviceGroups: ServiceSelectGroup[];
  defaultSelected?: string;
  error?: string;
};

type FlatService = {
  value: string;
  label: string;
  category: string;
};

export function ServiceSelector({
  serviceGroups,
  defaultSelected,
  error,
}: ServiceSelectorProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(() => {
    if (defaultSelected) return new Set([defaultSelected]);
    return new Set();
  });

  // Flatten all services for easier filtering
  const allServices = useMemo<FlatService[]>(() => {
    return serviceGroups.flatMap((group) =>
      group.options.map((option) => ({
        value: option.value,
        label: option.label,
        category: group.label,
      })),
    );
  }, [serviceGroups]);

  // Filter services by active tab and search query
  const filteredServices = useMemo(() => {
    let services = allServices;
    if (activeTab !== "all") {
      services = services.filter(
        (s) => s.category.toLowerCase() === activeTab.toLowerCase(),
      );
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      services = services.filter((s) =>
        s.label.toLowerCase().includes(query),
      );
    }
    return services;
  }, [allServices, activeTab, searchQuery]);

  // Count selected per category
  const selectedCountByTab = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    for (const group of serviceGroups) {
      const catKey = group.label.toLowerCase();
      counts[catKey] = 0;
      for (const option of group.options) {
        if (selected.has(option.value)) {
          counts[catKey]++;
          counts.all++;
        }
      }
    }
    return counts;
  }, [serviceGroups, selected]);

  const toggleService = useCallback((value: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  }, []);

  const removeService = useCallback((value: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(value);
      return next;
    });
  }, []);

  const tabs = [
    { key: "all", label: "All" },
    ...serviceGroups.map((g) => ({
      key: g.label.toLowerCase(),
      label: g.label,
    })),
  ];

  const selectedServices = allServices.filter((s) => selected.has(s.value));

  return (
    <fieldset className="grid gap-3">
      <legend className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#151515]/55">
        Services
      </legend>

      {/* Hidden inputs for form submission */}
      {selectedServices.map((s) => (
        <input key={s.value} type="hidden" name="services" value={s.value} />
      ))}

      {/* Category tabs */}
      <div className="service-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`service-tab ${activeTab === tab.key ? "service-tab-active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            {selectedCountByTab[tab.key] > 0 && (
              <span className="service-tab-count">
                {selectedCountByTab[tab.key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="service-search">
        <Search className="service-search-icon" />
        <input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search services"
        />
      </div>

      {/* Service list */}
      <div className="service-list">
        {filteredServices.length === 0 ? (
          <div className="service-list-empty">
            No services found
            {searchQuery.trim() ? ` matching "${searchQuery}"` : ""}
          </div>
        ) : (
          filteredServices.map((service) => (
            <label key={service.value} className="service-list-item">
              <input
                type="checkbox"
                checked={selected.has(service.value)}
                onChange={() => toggleService(service.value)}
              />
              <span>{service.label}</span>
              {activeTab === "all" && (
                <span className="service-list-item-cat">
                  {service.category}
                </span>
              )}
            </label>
          ))
        )}
      </div>

      {/* Selected service chips */}
      {selectedServices.length > 0 && (
        <div className="service-chips">
          {selectedServices.map((service) => (
            <span key={service.value} className="service-chip">
              {service.label}
              <button
                type="button"
                aria-label={`Remove ${service.label}`}
                onClick={() => removeService(service.value)}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {error && (
        <p className="text-xs font-black leading-5 text-[#E51B23]">{error}</p>
      )}
    </fieldset>
  );
}
