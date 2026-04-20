import { prisma } from "@/lib/prisma";
import { AdminHeader } from "../../_components/admin-header";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { AdminShipment } from "./_components/admin-shipment";

export default async function ShipmentDetailPage({
  params,
}: {
  params: Promise<{ shipmentId: string }>;
}) {
  const { shipmentId } = await params;
  const shipment = await prisma.shipment.findFirst({
    where: { id: shipmentId },
  });

  if (!shipment) {
    return (
      <div className="flex flex-col h-full">
        <AdminHeader
          title="Shipment Not Found"
          description="The requested shipment does not exist"
        />
        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="p-12 text-center max-w-md">
            <h1 className="text-2xl font-bold text-foreground mb-4">Error</h1>
            <p className="text-muted-foreground mb-6">
              Shipment <span className="font-bold">{shipmentId}</span> not found
              in the system.
            </p>
            <Link href="/admin/shipments">
              <Button className="gap-2">
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Shipments
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AdminHeader
        title="Shipment Details"
        description="View and manage shipment details"
      />
      <AdminShipment shipment={shipment} />
    </div>
  );
}
