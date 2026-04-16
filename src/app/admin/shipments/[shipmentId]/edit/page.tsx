import { AdminHeader } from "@/app/admin/_components/admin-header";
import { Card } from "@/components/ui/card";
import { AdminUpdateShipmentForm } from "./_components/admin-update-shipment-form";
import { prisma } from "@/lib/prisma";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function EditShipmentPage({
  params,
}: {
  params: Promise<{ shipmentId: string }>;
}) {
  const { shipmentId } = await params;

  const initialShipment = await prisma.shipment.findUnique({
    where: {
      id: shipmentId,
    },
  });

  if (!initialShipment) {
    return (
      <div className="flex flex-col h-full">
        <AdminHeader
          title="Shipment Not Found"
          description="The requested shipment for edit does not exist"
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
        title="Edit Shipment"
        description="Here you can edit the details of the shipment."
      />
      <div className="flex-1 overflow-y-auto p-6">
        <Card>
          <AdminUpdateShipmentForm initialShipment={initialShipment} />
        </Card>
      </div>
    </div>
  );
}
