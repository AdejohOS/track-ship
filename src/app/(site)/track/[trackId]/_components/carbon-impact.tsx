"use client";

import { Card } from "@/components/ui/card";
import { LeafIcon, TrendingDownIcon } from "lucide-react";

interface CarbonImpactProps {
  weight: number;
  distance: number;
  carrier: string;
}

const carrierEmissionFactors: Record<string, number> = {
  FedEx: 0.18,
  DHL: 0.17,
  UPS: 0.19,
  Default: 0.2,
};

const serviceMultiplier: Record<string, number> = {
  express: 1.3,
  premium: 1.1,
  standard: 1,
};

export function CarbonImpact({ weight, distance, carrier }: CarbonImpactProps) {
  const weightKg = weight;
  const baseFactor =
    carrierEmissionFactors[carrier] ?? carrierEmissionFactors.Default;
  const multiplier = 1; // or pass serviceType later

  const carbonEmissions = (weight * distance * baseFactor * multiplier) / 1000;
  const treesNeeded = Math.ceil(carbonEmissions / 21); // 1 tree absorbs ~21kg CO2/year

  return (
    <Card className="p-6 bg-linearto-br from-green-50 to-emerald-50 border-green-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <LeafIcon className="w-6 h-6 text-green-600" />
          <h3 className="font-bold text-lg text-foreground">Carbon Impact</h3>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100">
          <TrendingDownIcon className="w-4 h-4 text-green-600" />
          <span className="text-xs font-semibold text-green-700">
            Eco-Friendly
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">CO2 Emissions</p>
          <p className="text-2xl font-bold text-green-700">
            {carbonEmissions.toFixed(2)} kg
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            For this shipment
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Distance</p>
          <p className="text-2xl font-bold text-green-700">{distance} km</p>
          <p className="text-xs text-muted-foreground mt-1">Total route</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Equivalent to</p>
          <p className="text-2xl font-bold text-green-700">
            {treesNeeded} trees
          </p>
          <p className="text-xs text-muted-foreground mt-1">Needed to offset</p>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-white/50 border border-green-100">
        <p className="text-sm text-green-900">
          By choosing our{" "}
          {carrier === "express"
            ? "Express"
            : carrier === "premium"
              ? "Premium"
              : "Standard"}{" "}
          service, you&apos;re helping reduce carbon emissions. We partner with
          carbon offset programs to neutralize 100% of shipping emissions.
        </p>
      </div>
    </Card>
  );
}
