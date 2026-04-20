"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EditIcon, TrashIcon, CheckCircleIcon } from "lucide-react";
import { AdminHeader } from "../_components/admin-header";

export default function UpdatesPage() {
  const [formData, setFormData] = useState({
    trackingId: "",
    location: "",
    status: "in-transit",
    timestamp: "",
    notes: "",
  });

  const [updates, setUpdates] = useState([
    {
      id: 1,
      trackingId: "SHP-2024-001",
      location: "Chicago Distribution Hub",
      status: "in-transit",
      timestamp: "2024-03-26 08:45 AM",
      notes: "Package in transit",
    },
    {
      id: 2,
      trackingId: "SHP-2024-002",
      location: "Boston, MA",
      status: "delivered",
      timestamp: "2024-03-25 02:30 PM",
      notes: "Delivered successfully",
    },
    {
      id: 3,
      trackingId: "SHP-2024-003",
      location: "Seattle, WA",
      status: "pending",
      timestamp: "2024-03-24 10:00 AM",
      notes: "Awaiting pickup",
    },
  ]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUpdate = {
      id: updates.length + 1,
      ...formData,
    };
    setUpdates([newUpdate, ...updates]);
    setFormData({
      trackingId: "",
      location: "",
      status: "in-transit",
      timestamp: "",
      notes: "",
    });
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "in-transit": "bg-blue-100 text-blue-800",
    "out-for-delivery": "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
  };

  const statusLabels = {
    pending: "Pending",
    "in-transit": "In Transit",
    "out-for-delivery": "Out for Delivery",
    delivered: "Delivered",
  };

  return (
    <div className="flex flex-col h-full">
      <AdminHeader
        title="Tracking Updates"
        description="Add and manage shipment tracking updates in real-time"
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Update Form */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">
              Add Tracking Update
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="trackingId">Tracking ID</FieldLabel>
                  <Input
                    id="trackingId"
                    name="trackingId"
                    value={formData.trackingId}
                    onChange={handleChange}
                    required
                    placeholder="SHP-2024-001"
                  />
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="location">Location</FieldLabel>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="City or Hub Name"
                  />
                </Field>
              </FieldGroup>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="status">Status</FieldLabel>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-transit">In Transit</option>
                    <option value="out-for-delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="timestamp">Timestamp</FieldLabel>
                  <Input
                    id="timestamp"
                    name="timestamp"
                    type="datetime-local"
                    value={formData.timestamp}
                    onChange={handleChange}
                    required
                  />
                </Field>
              </FieldGroup>
            </div>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="notes">Notes</FieldLabel>
                <Input
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Additional details about this update..."
                />
              </Field>
            </FieldGroup>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-primary hover:bg-accent">
                Add Update
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setFormData({
                    trackingId: "",
                    location: "",
                    status: "in-transit",
                    timestamp: "",
                    notes: "",
                  })
                }
              >
                Clear
              </Button>
            </div>
          </form>
        </Card>

        {/* Updates List */}
        <Card>
          <div className="p-6 border-b border-border">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                Tracking Update History
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {updates.length} total updates
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking ID</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {updates.length > 0 ? (
                  updates.map((update) => (
                    <TableRow
                      key={update.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-mono font-semibold text-primary">
                        {update.trackingId}
                      </TableCell>
                      <TableCell className="font-medium">
                        {update.location}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            statusColors[
                              update.status as keyof typeof statusColors
                            ]
                          }
                        >
                          {
                            statusLabels[
                              update.status as keyof typeof statusLabels
                            ]
                          }
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {update.timestamp}
                      </TableCell>
                      <TableCell className="text-sm max-w-xs truncate">
                        {update.notes}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <Button variant="ghost" size="sm" title="Edit">
                            <EditIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Delete"
                            className="text-destructive hover:text-destructive"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <p className="text-muted-foreground font-medium">
                        No updates yet
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Add your first tracking update above
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
