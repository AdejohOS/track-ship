"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilterIcon, XIcon } from "lucide-react";

interface SearchFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

export interface FilterState {
  status: string[];
  carrier: string[];
  dateRange: "all" | "7days" | "30days" | "90days";
  sortBy: "recent" | "oldest" | "a-z";
}

export function SearchFilters({ onFilterChange, onReset }: SearchFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    carrier: [],
    dateRange: "all",
    sortBy: "recent",
  });

  const [isOpen, setIsOpen] = useState(false);

  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "in-transit",
      label: "In Transit",
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "out-for-delivery",
      label: "Out for Delivery",
      color: "bg-purple-100 text-purple-800",
    },
    {
      value: "delivered",
      label: "Delivered",
      color: "bg-green-100 text-green-800",
    },
  ];

  const carrierOptions = [
    { value: "economy", label: "ShipTrack Economy" },
    { value: "standard", label: "ShipTrack Standard" },
    { value: "express", label: "ShipTrack Express" },
    { value: "premium", label: "ShipTrack Premium" },
  ];

  const handleStatusToggle = (status: string) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];

    const newFilters = { ...filters, status: newStatuses };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCarrierToggle = (carrier: string) => {
    const newCarriers = filters.carrier.includes(carrier)
      ? filters.carrier.filter((c) => c !== carrier)
      : [...filters.carrier, carrier];

    const newFilters = { ...filters, carrier: newCarriers };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateRangeChange = (range: typeof filters.dateRange) => {
    const newFilters = { ...filters, dateRange: range };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sort: typeof filters.sortBy) => {
    const newFilters = { ...filters, sortBy: sort };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const activeFiltersCount =
    filters.status.length +
    filters.carrier.length +
    (filters.dateRange !== "all" ? 1 : 0);

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="w-full justify-start gap-2"
        >
          <FilterIcon className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-auto bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-bold">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Sidebar */}
      <Card
        className={`p-6 h-fit ${
          !isOpen ? "hidden lg:block" : "block"
        } transition-all duration-200 lg:sticky lg:top-6`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-foreground text-lg">Filters</h3>
          {isOpen && (
            <button onClick={() => setIsOpen(false)} className="lg:hidden">
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* Status Filter */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">
              Shipment Status
            </h4>
            <div className="space-y-2">
              {statusOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.status.includes(option.value)}
                    onChange={() => handleStatusToggle(option.value)}
                    className="w-4 h-4 rounded border-border cursor-pointer"
                  />
                  <span className="text-sm text-foreground">
                    {option.label}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${option.color}`}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Carrier Filter */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">
              Carrier
            </h4>
            <div className="space-y-2">
              {carrierOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.carrier.includes(option.value)}
                    onChange={() => handleCarrierToggle(option.value)}
                    className="w-4 h-4 rounded border-border cursor-pointer"
                  />
                  <span className="text-sm text-foreground">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">
              Date Range
            </h4>
            <div className="space-y-2">
              {[
                { value: "all" as const, label: "All Time" },
                { value: "7days" as const, label: "Last 7 Days" },
                { value: "30days" as const, label: "Last 30 Days" },
                { value: "90days" as const, label: "Last 90 Days" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="dateRange"
                    checked={filters.dateRange === option.value}
                    onChange={() => handleDateRangeChange(option.value)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-sm text-foreground">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">
              Sort By
            </h4>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                handleSortChange(e.target.value as typeof filters.sortBy)
              }
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="a-z">Customer Name (A-Z)</option>
            </select>
          </div>

          {/* Reset Button */}
          {activeFiltersCount > 0 && (
            <Button
              onClick={() => {
                setFilters({
                  status: [],
                  carrier: [],
                  dateRange: "all",
                  sortBy: "recent",
                });
                onReset();
              }}
              variant="outline"
              className="w-full"
            >
              Reset Filters
            </Button>
          )}
        </div>
      </Card>
    </>
  );
}
