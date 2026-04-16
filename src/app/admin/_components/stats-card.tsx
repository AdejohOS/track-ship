"use client";

import { Card } from "@/components/ui/card";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
}

export function StatsCard({ label, value, change, icon }: StatsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2 text-sm">
              {change >= 0 ? (
                <>
                  <TrendingUpIcon className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">+{change}%</span>
                </>
              ) : (
                <>
                  <TrendingDownIcon className="w-4 h-4 text-red-600" />
                  <span className="text-red-600">{change}%</span>
                </>
              )}
              <span className="text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className="text-primary opacity-10">{icon}</div>
      </div>
    </Card>
  );
}
