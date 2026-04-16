"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  UpdateShipmentSchema,
  type UpdateShipmentValues,
} from "@/lib/shipment-schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createShipmentAction, updateShipmentAction } from "@/actions/actions";
import { Loader2 } from "lucide-react";

type Shipment = {
  id: string;
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  origin: string;
  destination: string;
  weight: number;
  carrier: "DHL" | "UPS" | "FedEx";
  serviceType: "economy" | "standard" | "express" | "premium";
  cost: number;
  status: "pending" | "in_transit" | "out_for_delivery" | "delivered";
  deliveryDate: Date;
  description: string | null;
};

interface AdminUpdateShipmentFormProps {
  initialShipment: Shipment;
}

export const AdminUpdateShipmentForm = ({
  initialShipment,
}: AdminUpdateShipmentFormProps) => {
  const router = useRouter();
  const defaultValues: UpdateShipmentValues = {
    senderName: initialShipment.senderName,
    senderAddress: initialShipment.senderAddress,
    senderPhone: initialShipment.senderPhone,
    receiverName: initialShipment.receiverName,
    receiverAddress: initialShipment.receiverAddress,
    receiverPhone: initialShipment.receiverPhone,
    origin: initialShipment.origin,
    destination: initialShipment.destination,
    weight: initialShipment.weight,
    carrier: initialShipment.carrier,
    serviceType: initialShipment.serviceType,
    cost: initialShipment.cost,
    status: initialShipment.status,
    deliveryDate:
      typeof initialShipment.deliveryDate === "string"
        ? initialShipment.deliveryDate
        : new Date(initialShipment.deliveryDate).toISOString().split("T")[0],
    description: initialShipment.description ?? "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: UpdateShipmentSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await updateShipmentAction(initialShipment.id, value);
      if (res.success) {
        form.reset();
        toast.success("Shipment updated successfully!");
        router.push("/admin/shipments");
      } else {
        toast.error(res?.message || "Failed");
      }
    },
  });

  return (
    <div>
      <form
        id="shipment-creation-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="p-6 space-y-8"
      >
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <fieldset
              disabled={isSubmitting}
              className={`space-y-8 transition-opacity duration-200 ${
                isSubmitting ? "opacity-60 pointer-events-none" : ""
              }`}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground">
                  Sender Information
                </h3>
                <FieldGroup>
                  <form.Field
                    name="senderName"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Sender Name
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Mike Johnson"
                            autoComplete="off"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                  <form.Field
                    name="senderAddress"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="123 Main St, Los Angeles, CA"
                            autoComplete="off"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                  <form.Field
                    name="senderPhone"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="+1 (555) 123-4567"
                            autoComplete="off"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </FieldGroup>
              </div>

              <div className="border-t border-border" />

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground">
                  Receiver Information
                </h3>
                <FieldGroup>
                  <form.Field
                    name="receiverName"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Full Name
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            autoComplete="off"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                  <form.Field
                    name="receiverAddress"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            autoComplete="off"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                  <form.Field
                    name="receiverPhone"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            autoComplete="off"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </FieldGroup>
              </div>

              <div className="border-t border-border" />

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground">
                  Shipment Details
                </h3>

                <FieldGroup>
                  <div className="grid md:grid-cols-2 gap-4">
                    <form.Field
                      name="origin"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Origin City
                            </FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              autoComplete="off"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                    <form.Field
                      name="destination"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Destination City
                            </FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              autoComplete="off"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  </div>
                </FieldGroup>

                <FieldGroup>
                  <div className="grid md:grid-cols-2 gap-4">
                    <form.Field
                      name="weight"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Weight (kg)
                            </FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={
                                Number.isNaN(field.state.value)
                                  ? ""
                                  : field.state.value
                              }
                              type="number"
                              step={0.1}
                              onBlur={field.handleBlur}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.handleChange(
                                  value === "" ? 0 : parseFloat(value),
                                );
                              }}
                              aria-invalid={isInvalid}
                              autoComplete="off"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                    <form.Field
                      name="carrier"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Carrier Type
                            </FieldLabel>
                            <Select
                              value={field.state.value}
                              onValueChange={(value) =>
                                field.handleChange(
                                  value as "DHL" | "UPS" | "FedEx",
                                )
                              }
                            >
                              <SelectTrigger id="carrier">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="DHL">DHL</SelectItem>
                                <SelectItem value="UPS">UPS</SelectItem>
                                <SelectItem value="FedEx">FedEx</SelectItem>
                              </SelectContent>
                            </Select>
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  </div>
                </FieldGroup>

                <FieldGroup>
                  <div className="grid md:grid-cols-2 gap-4">
                    <form.Field
                      name="cost"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Cost ($)
                            </FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={
                                Number.isNaN(field.state.value)
                                  ? ""
                                  : field.state.value
                              }
                              type="number"
                              step={1}
                              onBlur={field.handleBlur}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.handleChange(
                                  value === "" ? 0 : parseFloat(value),
                                );
                              }}
                              aria-invalid={isInvalid}
                              autoComplete="off"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                    <form.Field
                      name="serviceType"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Service Type
                            </FieldLabel>
                            <Select
                              value={field.state.value}
                              onValueChange={(value) =>
                                field.handleChange(
                                  value as
                                    | "economy"
                                    | "standard"
                                    | "express"
                                    | "premium",
                                )
                              }
                            >
                              <SelectTrigger id="serviceType">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="economy">Economy</SelectItem>
                                <SelectItem value="standard">
                                  Standard
                                </SelectItem>
                                <SelectItem value="express">Express</SelectItem>
                                <SelectItem value="premium">Premium</SelectItem>
                              </SelectContent>
                            </Select>
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  </div>
                </FieldGroup>

                <FieldGroup>
                  <div className="grid md:grid-cols-2 gap-4">
                    <form.Field
                      name="status"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Initial Status
                            </FieldLabel>
                            <Select
                              value={field.state.value}
                              onValueChange={(value) =>
                                field.handleChange(
                                  value as
                                    | "pending"
                                    | "in_transit"
                                    | "out_for_delivery"
                                    | "delivered",
                                )
                              }
                            >
                              <SelectTrigger id="status">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in_transit">
                                  In Transit
                                </SelectItem>
                                <SelectItem value="out_for_delivery">
                                  Out for Delivery
                                </SelectItem>
                                <SelectItem value="delivered">
                                  Delivered
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                    <form.Field
                      name="deliveryDate"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Expected Delivery Date
                            </FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              type="date"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              autoComplete="off"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  </div>
                </FieldGroup>

                <FieldGroup>
                  <form.Field
                    name="description"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Package Description
                          </FieldLabel>
                          <Textarea
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            autoComplete="off"
                            rows={4}
                            placeholder="Package contents and special handling instructions..."
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </FieldGroup>
              </div>
            </fieldset>
          )}
        </form.Subscribe>
      </form>
      <Field orientation="horizontal" className="justify-end p-6">
        <form.Subscribe
          selector={(state) => state.isSubmitting}
          children={(isSubmitting) => (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isSubmitting}
              >
                Clear Form
              </Button>

              <Button
                type="submit"
                className="gap-2"
                form="shipment-creation-form"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSubmitting ? "Updating..." : "Update Shipment"}
              </Button>
            </>
          )}
        />
      </Field>
    </div>
  );
};
