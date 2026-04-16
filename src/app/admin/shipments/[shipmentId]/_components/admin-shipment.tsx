"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeftIcon,
  BarChart3Icon,
  DollarSignIcon,
  MapIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Shipment } from "@/generated/prisma/client";
import { Timeline } from "@/components/timeline";
import { AdminShipmentDetails } from "./admin-shipment-details";

interface AdminShipmentProps {
  shipment: Shipment;
}

export const AdminShipment = ({ shipment }: AdminShipmentProps) => {
  const router = useRouter();

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="w-fit gap-2"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Shipments
      </Button>
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Distance</p>
              <p className="font-bold text-foreground">1,200 km</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSignIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Revenue</p>
              <p className="font-bold text-foreground">$245.00</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3Icon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Efficiency</p>
              <p className="font-bold text-foreground">98%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUpIcon className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">On-Time</p>
              <p className="font-bold text-foreground">Yes</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Details and Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipment Details */}
          <AdminShipmentDetails shipment={shipment} />

          {/* Tracking Timeline */}
          <Card>
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">
                Tracking Timeline
              </h3>
            </div>
          </Card>
        </div>

        {/* Right Column - Admin Panel */}
        <div></div>
      </div>
    </div>
  );
};
