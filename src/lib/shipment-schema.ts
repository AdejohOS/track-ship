import * as z from "zod";

export const CreateShipmentSchema = z.object({
  senderName: z
    .string()
    .min(5, "Sender name must be at least 5 characters.")
    .max(32, "Sender name must be at most 32 characters."),
  senderAddress: z
    .string()
    .min(10, "Sender address must be at least 10 characters.")
    .max(100, "Sender address must be at most 100 characters."),
  senderPhone: z
    .string()
    .min(10, "Sender phone must be at least 10 characters.")
    .max(15, "Sender phone must be at most 15 characters."),
  receiverName: z
    .string()
    .min(5, "Receiver name must be at least 5 characters.")
    .max(32, "Receiver name must be at most 32 characters."),
  receiverAddress: z
    .string()
    .min(10, "Receiver address must be at least 10 characters.")
    .max(100, "Receiver address must be at most 100 characters."),
  receiverPhone: z
    .string()
    .min(10, "Receiver phone must be at least 10 characters.")
    .max(15, "Receiver phone must be at most 15 characters."),
  origin: z
    .string()
    .min(5, "Origin must be at least 5 characters.")
    .max(32, "Origin must be at most 32 characters."),
  destination: z
    .string()
    .min(5, "Destination must be at least 5 characters.")
    .max(32, "Destination must be at most 32 characters."),
  weight: z
    .number()
    .min(0.1, "Weight must be at least 0.1 kg.")
    .max(10000, "Weight must be at most 10000 kg."),

  carrier: z.enum(["DHL", "UPS", "FedEx"]),
  serviceType: z.enum(["economy", "standard", "express", "premium"]),
  cost: z
    .number()
    .min(0, "Cost must be at least 0")
    .max(100000000, "Cost is too large"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters.")
    .max(200, "Description must be at most 200 characters.")
    .optional()
    .or(z.literal("")),
  status: z.enum(["pending", "in_transit", "out_for_delivery", "delivered"]),
  deliveryDate: z.string().refine((date) => {
    const parsedDate = Date.parse(date);
    return !isNaN(parsedDate);
  }, "Invalid date format. Please use a valid date string."),
});

export type CreateShipmentValues = z.infer<typeof CreateShipmentSchema>;

export const UpdateShipmentSchema = z.object({
  senderName: z
    .string()
    .min(5, "Sender name must be at least 5 characters.")
    .max(32, "Sender name must be at most 32 characters."),
  senderAddress: z
    .string()
    .min(10, "Sender address must be at least 10 characters.")
    .max(100, "Sender address must be at most 100 characters."),
  senderPhone: z
    .string()
    .min(10, "Sender phone must be at least 10 characters.")
    .max(15, "Sender phone must be at most 15 characters."),
  receiverName: z
    .string()
    .min(5, "Receiver name must be at least 5 characters.")
    .max(32, "Receiver name must be at most 32 characters."),
  receiverAddress: z
    .string()
    .min(10, "Receiver address must be at least 10 characters.")
    .max(100, "Receiver address must be at most 100 characters."),
  receiverPhone: z
    .string()
    .min(10, "Receiver phone must be at least 10 characters.")
    .max(15, "Receiver phone must be at most 15 characters."),
  origin: z
    .string()
    .min(5, "Origin must be at least 5 characters.")
    .max(32, "Origin must be at most 32 characters."),
  destination: z
    .string()
    .min(5, "Destination must be at least 5 characters.")
    .max(32, "Destination must be at most 32 characters."),
  weight: z
    .number()
    .min(0.1, "Weight must be at least 0.1 kg.")
    .max(10000, "Weight must be at most 10000 kg."),

  carrier: z.enum(["DHL", "UPS", "FedEx"]),
  serviceType: z.enum(["economy", "standard", "express", "premium"]),
  cost: z
    .number()
    .min(0, "Cost must be at least 0")
    .max(100000000, "Cost is too large"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters.")
    .max(200, "Description must be at most 200 characters.")
    .optional()
    .or(z.literal("")),
  status: z.enum(["pending", "in_transit", "out_for_delivery", "delivered"]),
  deliveryDate: z.string().refine((date) => {
    const parsedDate = Date.parse(date);
    return !isNaN(parsedDate);
  }, "Invalid date format. Please use a valid date string."),
});

export type UpdateShipmentValues = z.infer<typeof UpdateShipmentSchema>;
