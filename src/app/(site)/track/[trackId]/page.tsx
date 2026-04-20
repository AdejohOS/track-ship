import { prisma } from "@/lib/prisma";
import React from "react";
import { Footer } from "./_components/footer";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  BellIcon,
  MapIcon,
  PrinterIcon,
  ShareIcon,
} from "lucide-react";
import { TrackHeader } from "./_components/track-header";
import { DeliveryCountdown } from "./_components/delievery-countdown";
import { ShipmentDetails } from "./_components/shipment-details";
import { ProofOfDelivery } from "./_components/proof-of-delivery";
import { Timeline } from "@/components/timeline";
import { CarbonImpact } from "./_components/carbon-impact";
import { TrackingActions } from "./_components/tracking_actions";
import { getDistance } from "@/lib/utils";

const TrackingDetailsPage = async ({
  params,
}: {
  params: Promise<{ trackId: string }>;
}) => {
  const { trackId } = await params;

  const shipment = await prisma.shipment.findUnique({
    where: { trackingNumber: trackId },
    include: {
      history: {
        orderBy: {
          timestamp: "asc",
        },
      },
    },
  });

  if (!shipment) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20 px-4">
          <Card className="p-12 text-center max-w-md">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Shipment Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The tracking ID: <span className="font-bold">{trackId}</span> does
              not exist in our system.
            </p>
            <Link href="/track">
              <Button className="gap-2">
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Search
              </Button>
            </Link>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const distanceKm = 1200;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <TrackHeader />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <DeliveryCountdown
            deliveryDate={shipment.deliveryDate}
            status={shipment.status}
          />
          <TrackingActions
            trackingNumber={shipment.trackingNumber}
            destination={shipment.destination}
            currentLocation={shipment.origin}
            status={shipment.status}
          />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Shipment Details */}
              <ShipmentDetails shipment={shipment} />

              {/* Timeline */}
              <Card>
                <div className="p-6 border-b border-border">
                  <h3 className="text-lg font-bold text-foreground">
                    Tracking History
                  </h3>
                </div>
                <Timeline events={shipment.history ?? []} />
              </Card>

              {/* Proof of Delivery */}
              {shipment.status === "delivered" && (
                <ProofOfDelivery
                  status={shipment.status}
                  deliveryDate={shipment.deliveryDate}
                  recipient={shipment.receiverName}
                  signature={true}
                  photos={["photo1", "photo2"]}
                />
              )}
            </div>
            <div className="space-y-6">
              <CarbonImpact
                weight={shipment.weight}
                distance={getDistance(shipment.origin, shipment.destination)}
                carrier={shipment.carrier}
              />

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 text-foreground">
                  Quick Facts
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Tracking ID
                    </span>
                    <span className="font-mono font-semibold text-primary">
                      {shipment.trackingNumber}
                    </span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <span className="text-sm text-muted-foreground">
                      Service Type
                    </span>
                    <p className="font-semibold text-foreground capitalize">
                      {shipment.carrier.split("-").join(" ")}
                    </p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <span className="text-sm text-muted-foreground">
                      Shipped From
                    </span>
                    <p className="font-semibold text-foreground">
                      {shipment.origin}
                    </p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <span className="text-sm text-muted-foreground">
                      Shipping To
                    </span>
                    <p className="font-semibold text-foreground">
                      {shipment.destination}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Support Card */}
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="font-bold text-lg mb-3 text-foreground">
                  Need Help?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our support team is available 24/7 to assist you with any
                  questions about your shipment.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrackingDetailsPage;
