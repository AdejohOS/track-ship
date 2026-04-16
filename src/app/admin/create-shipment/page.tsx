import { Card } from "@/components/ui/card";

import { AdminHeader } from "../_components/admin-header";
import { CreateShipmentForm } from "./_components/create-shipment-form";

export default function CreateShipmentPage() {
  return (
    <div className="flex flex-col h-full">
      <AdminHeader
        title="Create Shipment"
        description="Add a new shipment to the system"
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl space-y-6">
          <Card>
            <CreateShipmentForm />
          </Card>
        </div>
      </div>
    </div>
  );
}
