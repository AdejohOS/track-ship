import Link from "next/link";

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
import {
  PackageIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  AlertCircleIcon,
} from "lucide-react";
import { AdminHeader } from "./_components/admin-header";
import { StatsCard } from "./_components/stats-card";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { getShipmentStats } from "@/hooks/hook";

export default async function Dashboard() {
  const recentShipments = await prisma.shipment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const stats = await getShipmentStats();

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

  return (
    <div className="flex flex-col h-full">
      <AdminHeader
        title="Dashboard"
        description="Monitor shipments, analytics, and logistics operations"
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            label="Total Shipments"
            value={stats.total.toLocaleString()}
            change={12}
            icon={<PackageIcon className="w-8 h-8" />}
          />
          <StatsCard
            label="In Transit"
            value={stats.inTransit.toLocaleString()}
            change={5}
            icon={<TruckIcon className="w-8 h-8" />}
          />
          <StatsCard
            label="Delivered"
            value={stats.delivered.toLocaleString()}
            change={18}
            icon={<CheckCircleIcon className="w-8 h-8" />}
          />
          <StatsCard
            label="Pending"
            value={stats.pending.toLocaleString()}
            change={-3}
            icon={<ClockIcon className="w-8 h-8" />}
          />
        </div>

        {/* Quick Insights & Alerts */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Key Metrics */}
          <Card className="lg:col-span-2">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <TrendingUpIcon className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">
                  Performance Metrics
                </h3>
              </div>
            </div>
            <div className="p-6 grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  On-Time Delivery Rate
                </p>
                <p className="text-2xl font-bold text-foreground">98.2%</p>
                <p className="text-xs text-green-600">↑ 1.2% from last month</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Avg. Delivery Time
                </p>
                <p className="text-2xl font-bold text-foreground">2.4 days</p>
                <p className="text-xs text-green-600">↓ 0.3 days improvement</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">$184,200</p>
                <p className="text-xs text-green-600">↑ 24% from last month</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Active Customers
                </p>
                <p className="text-2xl font-bold text-foreground">428</p>
                <p className="text-xs text-green-600">↑ 45 new customers</p>
              </div>
            </div>
          </Card>

          {/* Alerts */}
          <Card>
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <AlertCircleIcon className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold text-foreground">Alerts</h3>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                <p className="text-sm font-medium text-orange-900">
                  Delayed Shipments
                </p>
                <p className="text-xs text-orange-700 mt-1">
                  3 shipments delayed by 2+ hours
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-sm font-medium text-blue-900">
                  New Customers
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  12 new sign-ups today
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                <p className="text-sm font-medium text-green-900">
                  Maintenance
                </p>
                <p className="text-xs text-green-700 mt-1">
                  All systems operational
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Shipments Table */}
        <Card>
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                Recent Shipments
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Latest 5 shipments
              </p>
            </div>
            <Link href="/admin/shipments">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRightIcon className="w-4 h-4" />
              </Button>
            </Link>
          </div>
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
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentShipments.map((shipment) => (
                  <TableRow key={shipment.id}>
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
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(shipment.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Link href={`/admin/shipments/${shipment.id}`}>
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
