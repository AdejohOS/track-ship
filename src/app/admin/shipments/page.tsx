import { prisma } from "@/lib/prisma";
import Shipments from "./_components/shipments";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ShipmentsPage() {
  const shipments = await prisma.shipment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      trackingNumber: true,
      senderName: true,
      receiverName: true,
      origin: true,
      destination: true,
      weight: true,
      cost: true,
      carrier: true,
      status: true,
      createdAt: true,
    },
  });
  return (
    <div className="flex flex-col h-full">
      <Shipments allShipments={shipments} />
    </div>
  );
}
