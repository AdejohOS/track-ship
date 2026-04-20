"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function TrackHeader() {
  const router = useRouter();
  return (
    <div className="bg-linear-to-r from-primary to-primary/80 text-primary-foreground py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-primary-foreground hover:text-primary-foreground/80 mb-4 gap-2"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </Button>
        <h1 className="text-3xl md:text-4xl font-bold">Tracking Details</h1>
        <p className="mt-2 text-primary-foreground/90">
          Track your shipment in real-time with complete visibility
        </p>
      </div>
    </div>
  );
}
