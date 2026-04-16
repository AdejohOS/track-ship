"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EditIcon,
  SaveIcon,
  XIcon,
  HistoryIcon,
  UserIcon,
  AlertCircleIcon,
} from "lucide-react";
import { useState } from "react";
import { Shipment } from "@/generated/prisma/client";

type ShipmentHistoryItem = {
  id: string;
  status: string;
  location: string;
  notes?: string;
  timestamp: string;
};

type ShipmentWithHistory = Shipment & {
  history: ShipmentHistoryItem[];
};

interface AdminShipmentPanelProps {
  shipment: ShipmentWithHistory;
  onUpdate?: (updates: Partial<ShipmentWithHistory>) => void;
}

export function AdminShipmentPanel({
  shipment,
  onUpdate,
}: AdminShipmentPanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(shipment.status);

  const handleSave = () => {
    onUpdate?.({ status });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertCircleIcon className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-lg text-foreground">
              Admin Controls
            </h3>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="gap-2"
            >
              <EditIcon className="w-4 h-4" />
              Edit
            </Button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Update Status
              </label>
              <Select
                value={status}
                onValueChange={(value) =>
                  setStatus(
                    value as
                      | "pending"
                      | "in-transit"
                      | "out-for-delivery"
                      | "delivered",
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="out-for-delivery">
                    Out for Delivery
                  </SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} className="gap-2 flex-1">
                <SaveIcon className="w-4 h-4" />
                Save Changes
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="gap-2 flex-1"
              >
                <XIcon className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Current Status
              </p>
              <Badge className="text-sm">
                {status === "in-transit"
                  ? "In Transit"
                  : status === "out-for-delivery"
                    ? "Out for Delivery"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Last Modified
              </p>
              <p className="font-semibold text-foreground">
                {new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }).format(new Date(shipment.updatedAt))}
              </p>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <UserIcon className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg text-foreground">
            Customer Information
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Sender</p>
            <p className="font-semibold text-foreground">
              {shipment.senderName}
            </p>
            <p className="text-sm text-muted-foreground">
              {shipment.senderPhone}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Receiver</p>
            <p className="font-semibold text-foreground">
              {shipment.receiverName}
            </p>
            <p className="text-sm text-muted-foreground">
              {shipment.receiverPhone}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <HistoryIcon className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg text-foreground">Activity Log</h3>
        </div>

        <div className="space-y-3">
          {shipment.history.slice(0, 5).map((entry) => (
            <div
              key={entry.id}
              className="pb-3 border-b border-border last:border-b-0"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-foreground">{entry.status}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {entry.location}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }).format(new Date(entry.timestamp))}
                </p>
              </div>
              {entry.notes && (
                <p className="text-sm text-muted-foreground mt-2">
                  {entry.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
