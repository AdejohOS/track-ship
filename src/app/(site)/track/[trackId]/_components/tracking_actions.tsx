"use client";

import { Button } from "@/components/ui/button";
import {
  BellIcon,
  CheckIcon,
  MapIcon,
  PrinterIcon,
  Share2Icon,
} from "lucide-react";
import { useState } from "react";

type TrackingActionsProps = {
  trackingNumber: string;
  destination: string;
  currentLocation?: string | null;
  status: string;
};

export function TrackingActions({
  trackingNumber,
  destination,
  currentLocation,
  status,
}: TrackingActionsProps) {
  const [copied, setCopied] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");

  const trackingUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/track/${trackingNumber}`
      : "";

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Track Shipment ${trackingNumber}`,
          text: `Track shipment ${trackingNumber}`,
          url: trackingUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(trackingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleViewMap = () => {
    const location = currentLocation || destination;
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(mapUrl, "_blank", "noopener,noreferrer");
  };

  const handleNotifications = async () => {
    if (!("Notification" in window)) {
      setNotifyMessage("This browser does not support notifications.");
      return;
    }

    if (Notification.permission === "granted") {
      new Notification("Shipment notifications enabled", {
        body: `You will be notified about updates for ${trackingNumber}. Current status: ${status}.`,
      });
      setNotifyMessage("Notifications enabled.");
      return;
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        new Notification("Shipment notifications enabled", {
          body: `You will be notified about updates for ${trackingNumber}. Current status: ${status}.`,
        });
        setNotifyMessage("Notifications enabled.");
      } else {
        setNotifyMessage("Notification permission was denied.");
      }
      return;
    }

    setNotifyMessage("Notification permission was denied.");
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="gap-2" onClick={handleShare}>
          {copied ? (
            <CheckIcon className="w-4 h-4" />
          ) : (
            <Share2Icon className="w-4 h-4" />
          )}
          {copied ? "Copied Link" : "Share Tracking"}
        </Button>

        <Button variant="outline" className="gap-2" onClick={handlePrint}>
          <PrinterIcon className="w-4 h-4" />
          Print Details
        </Button>

        <Button
          variant="outline"
          className="gap-2"
          onClick={handleNotifications}
        >
          <BellIcon className="w-4 h-4" />
          Set Notifications
        </Button>

        <Button variant="outline" className="gap-2" onClick={handleViewMap}>
          <MapIcon className="w-4 h-4" />
          View Map
        </Button>
      </div>

      {notifyMessage && (
        <p className="text-sm text-muted-foreground">{notifyMessage}</p>
      )}
    </div>
  );
}
