"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, DownloadIcon, ImageIcon } from "lucide-react";

interface ProofOfDeliveryProps {
  status: string;
  deliveryDate?: Date | string;
  recipient?: string;
  signature?: boolean;
  photos?: string[];
}

export function ProofOfDelivery({
  status,
  deliveryDate,
  recipient,
  signature = false,
  photos = [],
}: ProofOfDeliveryProps) {
  const isDelivered = status === "delivered";

  if (!isDelivered) {
    return (
      <Card className="p-6 bg-gray-50 border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <ImageIcon className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-bold text-lg text-foreground">
            Proof of Delivery
          </h3>
        </div>
        <p className="text-muted-foreground text-sm">
          Proof of delivery documentation will appear here once the package is
          delivered.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <CheckCircleIcon className="w-5 h-5 text-green-600" />
        <h3 className="font-bold text-lg text-foreground">Proof of Delivery</h3>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Delivered On</p>
            <p className="font-semibold text-foreground">
              {deliveryDate
                ? new Date(deliveryDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Received By</p>
            <p className="font-semibold text-foreground">
              {recipient || "Package Delivered"}
            </p>
          </div>
        </div>

        {signature && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Signature</p>
            <div className="h-20 bg-white border border-dashed border-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-400 text-sm">Digital Signature</span>
            </div>
          </div>
        )}

        {photos.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Delivery Photos
            </p>
            <div className="grid grid-cols-3 gap-3">
              {photos.map((photo, idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center"
                >
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-4 border-t border-gray-200">
          <Button variant="outline" className="flex-1 gap-2">
            <DownloadIcon className="w-4 h-4" />
            Download Receipt
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <DownloadIcon className="w-4 h-4" />
            Download Label
          </Button>
        </div>
      </div>
    </Card>
  );
}
