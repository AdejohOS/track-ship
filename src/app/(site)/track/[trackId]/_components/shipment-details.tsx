"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPinIcon,
  WeightIcon,
  TruckIcon,
  CalendarIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

type Shipment = {
  id: string;
  trackingNumber: string;
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  origin: string;
  destination: string;
  createdAt: Date;
  deliveryDate: Date;
  weight: number;
  carrier: "DHL" | "UPS" | "FedEx";
  serviceType: "economy" | "standard" | "express" | "premium";
  status: "pending" | "in_transit" | "out_for_delivery" | "delivered";
};

interface ShipmentDetailsProps {
  shipment: Shipment;
}

export function ShipmentDetails({ shipment }: ShipmentDetailsProps) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "in-transit": "bg-blue-100 text-blue-800",
    "out-for-delivery": "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
  };

  return (
    <div className="space-y-6">
      {/* Quick Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Current Status</p>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-foreground capitalize">
                {shipment.status.replace("-", " ")}
              </h2>
              <Badge
                className={
                  statusColors[shipment.status as keyof typeof statusColors]
                }
              >
                {shipment.status === "in_transit"
                  ? "In Transit"
                  : shipment.status === "pending"
                    ? "Pending"
                    : shipment.status === "out_for_delivery"
                      ? "Out for Delivery"
                      : shipment.status.charAt(0).toUpperCase() +
                        shipment.status.slice(1)}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-2">Tracking ID</p>
            <p className="font-mono font-bold text-lg text-primary">
              {shipment.trackingNumber}
            </p>
          </div>
        </div>
      </Card>

      {/* Route Information */}
      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4 text-foreground">
          Route Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Origin */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <MapPinIcon className="w-5 h-5 text-primary" />
              <p className="font-semibold text-foreground">From</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-semibold text-foreground">{shipment.origin}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Shipped On</p>
              <p className="font-semibold text-foreground">
                {formatDate(shipment.createdAt)}
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <MapPinIcon className="w-5 h-5 text-green-600" />
              <p className="font-semibold text-foreground">To</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-semibold text-foreground">
                {shipment.destination}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expected Delivery</p>
              <p className="font-semibold text-foreground">
                {formatDate(shipment.deliveryDate)}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Shipment Details */}
      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4 text-foreground">
          Shipment Details
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <WeightIcon className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Weight</p>
            </div>
            <p className="font-semibold text-foreground">{shipment.weight}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TruckIcon className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Carrier</p>
            </div>
            <p className="font-semibold text-foreground">{shipment.carrier}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Service Type</p>
            </div>
            <p className="font-semibold text-foreground capitalize">
              {shipment.serviceType}
            </p>
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sender */}
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4 text-foreground">
            Sender Information
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Name</p>
              <p className="font-semibold text-foreground">
                {shipment.senderName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Address</p>
              <p className="font-semibold text-foreground">
                {shipment.senderAddress}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-4 h-4 text-muted-foreground" />
              <p className="font-semibold text-foreground">
                {shipment.senderPhone}
              </p>
            </div>
          </div>
        </Card>

        {/* Receiver */}
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4 text-foreground">
            Receiver Information
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Name</p>
              <p className="font-semibold text-foreground">
                {shipment.receiverName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Address</p>
              <p className="font-semibold text-foreground">
                {shipment.receiverAddress}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-4 h-4 text-muted-foreground" />
              <p className="font-semibold text-foreground">
                {shipment.receiverPhone}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
