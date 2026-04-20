import { prisma } from "@/lib/prisma";

export async function getShipmentStats() {
  const [total, inTransit, delivered, pending] = await Promise.all([
    prisma.shipment.count(),
    prisma.shipment.count({ where: { status: "in_transit" } }),
    prisma.shipment.count({ where: { status: "delivered" } }),
    prisma.shipment.count({ where: { status: "pending" } }),
  ]);

  return {
    total,
    inTransit,
    delivered,
    pending,
  };
}
