"use server";

import { prisma } from "@/lib/prisma";
import {
  CreateShipmentSchema,
  CreateShipmentValues,
  UpdateShipmentSchema,
  UpdateShipmentValues,
} from "@/lib/shipment-schema";
import { revalidatePath } from "next/cache";

export async function createShipmentAction(values: CreateShipmentValues) {
  try {
    const validatedData = CreateShipmentSchema.safeParse(values);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Invalid shipment data",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const {
      senderName,
      senderAddress,
      senderPhone,
      receiverName,
      receiverAddress,
      receiverPhone,
      origin,
      destination,
      weight,
      carrier,
      cost,
      serviceType,
      description,
      status,
      deliveryDate,
    } = validatedData.data;

    const trackingNumber = `TS-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    const parsedDeliveryDate = deliveryDate ? new Date(deliveryDate) : null;

    if (!parsedDeliveryDate || isNaN(parsedDeliveryDate.getTime())) {
      return {
        success: false,
        message: "Please provide a valid delivery date",
      };
    }

    const shipment = await prisma.shipment.create({
      data: {
        trackingNumber,
        senderName,
        senderAddress,
        senderPhone,
        receiverName,
        receiverAddress,
        receiverPhone,
        origin,
        destination,
        weight,
        cost,
        serviceType,
        carrier,
        description,
        status,
        deliveryDate: parsedDeliveryDate,

        history: {
          create: [
            {
              status,
              title: "Shipment Created",
              description: "Shipment has been created successfully.",
              location: origin,
              completed: true,
            },
          ],
        },
      },
    });
    revalidatePath("/admin/shipments");
    return {
      success: true,
      message: "Shipment created successfully",
      trackingNumber: shipment.trackingNumber,
      shipmentId: shipment.id,
    };
  } catch (error) {
    console.error("Create shipment error:", error);

    return {
      success: false,
      message: "Something went wrong while creating the shipment",
    };
  }
}

export async function updateShipmentAction(
  shipmentId: string,
  values: UpdateShipmentValues,
) {
  try {
    const validatedData = UpdateShipmentSchema.safeParse(values);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Invalid shipment data",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const {
      senderName,
      senderAddress,
      senderPhone,
      receiverName,
      receiverAddress,
      receiverPhone,
      origin,
      destination,
      weight,
      carrier,
      cost,
      serviceType,
      description,
      status,
      deliveryDate,
    } = validatedData.data;

    const parsedDeliveryDate = deliveryDate ? new Date(deliveryDate) : null;

    if (!parsedDeliveryDate || isNaN(parsedDeliveryDate.getTime())) {
      return {
        success: false,
        message: "Please provide a valid delivery date",
      };
    }

    const shipment = await prisma.shipment.update({
      where: { id: shipmentId },
      data: {
        senderName,
        senderAddress,
        senderPhone,
        receiverName,
        receiverAddress,
        receiverPhone,
        origin,
        destination,
        weight,
        cost,
        serviceType,
        carrier,
        description,
        status,
        deliveryDate: parsedDeliveryDate,
        history: {
          create: {
            status,
            title: "Shipment Updated",
            description: `Shipment status changed to ${status}`,
            location: destination,
            completed: true,
          },
        },
      },
    });

    revalidatePath("/admin/shipments");
    revalidatePath(`/admin/shipments/${shipmentId}`);
    revalidatePath(`/admin/shipments/${shipmentId}/edit`);

    return {
      success: true,
      message: "Shipment updated successfully",
      shipmentId: shipment.id,
    };
  } catch (error) {
    console.error("Update shipment error:", error);

    return {
      success: false,
      message: "Something went wrong while updating the shipment",
    };
  }
}

export async function deleteShipmentAction(shipmentId: string) {
  try {
    await prisma.shipment.delete({
      where: { id: shipmentId },
    });

    revalidatePath("/admin/shipments");
    revalidatePath(`/admin/shipments/${shipmentId}`);
    return {
      success: true,
      message: "Shipment deleted successfully",
    };
  } catch (error) {
    console.error("Delete shipment error:", error);
    return {
      success: false,
      message: "Failed to delete shipment",
    };
  }
}
