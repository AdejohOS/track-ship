"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SearchIcon,
  DownloadIcon,
  FilterIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AdminHeader } from "../../_components/admin-header";

import { useRouter } from "next/navigation";
import { formatDate, formatUSD } from "@/lib/utils";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { deleteShipmentAction } from "@/actions/actions";
import { toast } from "sonner";

type Shipment = {
  id: string;
  trackingNumber: string;
  senderName: string;
  receiverName: string;
  status: "pending" | "in_transit" | "out_for_delivery" | "delivered";
  origin: string;
  destination: string;
  weight: number;
  carrier: string;
  createdAt: Date;
  cost: number;
};

interface ShipmentsProps {
  allShipments: Shipment[];
}

export default function Shipments({ allShipments }: ShipmentsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [loading, setLoading] = useState(false);

  const shipments = [
    {
      id: "SHP-2024-001",
      customer: "Acme Industries",
      status: "in-transit",
      origin: "Los Angeles, CA",
      destination: "New York, NY",
      date: "2024-03-24",
      weight: "25 kg",
      carrier: "ShipTrack Express",
      cost: "$245.00",
    },
    {
      id: "SHP-2024-002",
      customer: "Tech Solutions Inc.",
      status: "delivered",
      origin: "Chicago, IL",
      destination: "Boston, MA",
      date: "2024-03-23",
      weight: "15 kg",
      carrier: "ShipTrack Standard",
      cost: "$135.00",
    },
    {
      id: "SHP-2024-003",
      customer: "Global Logistics",
      status: "pending",
      origin: "Seattle, WA",
      destination: "Miami, FL",
      date: "2024-03-22",
      weight: "40 kg",
      carrier: "ShipTrack Express",
      cost: "$385.00",
    },
    {
      id: "SHP-2024-004",
      customer: "Enterprise Solutions",
      status: "out-for-delivery",
      origin: "Denver, CO",
      destination: "San Francisco, CA",
      date: "2024-03-21",
      weight: "30 kg",
      carrier: "ShipTrack Economy",
      cost: "$198.00",
    },
    {
      id: "SHP-2024-005",
      customer: "StartUp Ventures",
      status: "delivered",
      origin: "Austin, TX",
      destination: "Portland, OR",
      date: "2024-03-20",
      weight: "20 kg",
      carrier: "ShipTrack Standard",
      cost: "$165.00",
    },
    {
      id: "SHP-2024-006",
      customer: "Global Trading Co.",
      status: "in-transit",
      origin: "Houston, TX",
      destination: "Dallas, TX",
      date: "2024-03-19",
      weight: "55 kg",
      carrier: "ShipTrack Express",
      cost: "$425.00",
    },
    {
      id: "SHP-2024-007",
      customer: "Logistics Partners",
      status: "delivered",
      origin: "Phoenix, AZ",
      destination: "Las Vegas, NV",
      date: "2024-03-18",
      weight: "32 kg",
      carrier: "ShipTrack Standard",
      cost: "$289.00",
    },
  ];

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    in_transit: "bg-blue-100 text-blue-800",
    out_for_delivery: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
  };

  const statusLabels = {
    pending: "Pending",
    in_transit: "In Transit",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
  };

  const filteredShipments = allShipments.filter((s) => {
    const matchesSearch =
      s.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.receiverName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || s.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const router = useRouter();

  const handleDelete = async (shipmentId: string) => {
    try {
      setLoading(true);
      await deleteShipmentAction(shipmentId);
      toast.success("Shipment deleted successfully");
      setLoading(false);
    } catch (error) {
      toast.error("Failed to delete shipment");
      setLoading(false);
    }
  };
  return (
    <div>
      <AdminHeader
        title="Shipments"
        description="View, manage, and track all shipments"
      />
      <div className="flex-1 overflow-y-auto p-6">
        <Card>
          {/* Header with Search and Actions */}
          <div className="p-6 border-b border-border space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  All Shipments
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {filteredShipments.length} of {shipments.length} shipments
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <DownloadIcon className="w-4 h-4" />
                  Export CSV
                </Button>
                <Link href="/admin/create-shipment">
                  <Button className="gap-2">
                    <PlusIcon className="w-4 h-4" />
                    New Shipment
                  </Button>
                </Link>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="grid md:grid-cols-3 gap-3">
              <div className="md:col-span-2 relative">
                <Input
                  type="text"
                  placeholder="Search by ID or customer name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground appearance-none pr-10 cursor-pointer hover:bg-muted transition-colors"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_transit">In Transit</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
                <FilterIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Carrier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.length > 0 ? (
                  filteredShipments.map((shipment) => (
                    <TableRow
                      key={shipment.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-mono font-semibold text-primary">
                        {shipment.trackingNumber}
                      </TableCell>
                      <TableCell className="font-medium">
                        {shipment.senderName}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {shipment.origin} → {shipment.destination}
                      </TableCell>
                      <TableCell className="text-sm">
                        {shipment.weight} kg
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {shipment.carrier}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            statusColors[
                              shipment.status as keyof typeof statusColors
                            ]
                          }
                        >
                          {
                            statusLabels[
                              shipment.status as keyof typeof statusLabels
                            ]
                          }
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatUSD(shipment.cost)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(shipment.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            title="View"
                            onClick={() =>
                              router.push(`/admin/shipments/${shipment.id}`)
                            }
                          >
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Edit"
                            onClick={() =>
                              router.push(
                                `/admin/shipments/${shipment.id}/edit`,
                              )
                            }
                          >
                            <EditIcon className="w-4 h-4" />
                          </Button>

                          <ConfirmDialog
                            title="Delete Shipment"
                            description="are you sure you want to delete this shippment? This action cannot be undone."
                            onConfirm={() => handleDelete(shipment.id)}
                            trigger={
                              <Button
                                variant="ghost"
                                size="sm"
                                title="Delete"
                                className="text-destructive hover:text-destructive"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </Button>
                            }
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-12">
                      <div className="flex flex-col items-center gap-2">
                        <SearchIcon className="w-8 h-8 text-muted-foreground/40" />
                        <p className="text-muted-foreground font-medium">
                          No shipments found
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Try adjusting your filters or create a new shipment
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredShipments.length} of {shipments.length} shipments
            </p>
            <div className="flex gap-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
