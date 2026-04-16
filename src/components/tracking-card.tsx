"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PackageIcon, MapPinIcon, CalendarIcon } from "lucide-react";

interface TrackingCardProps {
  trackingId: string;
  status: "pending" | "in-transit" | "out-for-delivery" | "delivered";
  sender: string;
  receiver: string;
  origin: string;
  destination: string;
  deliveryDate: string;
}

export function TrackingCard({
  trackingId,
  status,
  sender,
  receiver,
  origin,
  destination,
  deliveryDate,
}: TrackingCardProps) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "in-transit": "bg-blue-100 text-blue-800",
    "out-for-delivery": "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
  };

  const statusLabels = {
    pending: "Pending",
    "in-transit": "In Transit",
    "out-for-delivery": "Out for Delivery",
    delivered: "Delivered",
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">Tracking ID</p>
          <p className="text-lg font-mono font-bold text-foreground">
            {trackingId}
          </p>
        </div>
        <Badge className={statusColors[status]}>{statusLabels[status]}</Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground">From</p>
          <p className="font-medium text-foreground">{sender}</p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPinIcon className="w-4 h-4" />
            {origin}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground">To</p>
          <p className="font-medium text-foreground">{receiver}</p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPinIcon className="w-4 h-4" />
            {destination}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-secondary/10 rounded-lg">
        <CalendarIcon className="w-5 h-5 text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Expected Delivery</p>
          <p className="font-semibold text-foreground">{deliveryDate}</p>
        </div>
      </div>
    </Card>
  );
}
