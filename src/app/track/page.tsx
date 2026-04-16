"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { SearchIcon } from "lucide-react";

export default function TrackingSearchPage() {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState("");

  const handleTrack = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleaned = trackingId.trim().toUpperCase();
    if (!cleaned) return;

    router.push(`/track/${encodeURIComponent(cleaned)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="bg-linear-to-b from-primary/10 to-background border-b border-border min-h-[70vh] flex items-center justify-center">
          {" "}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 text-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Track Shipments
                </h1>
                <p className="text-muted-foreground mt-2">
                  Search and manage your shipments with real-time updates
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleTrack} className="flex gap-3">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search by tracking ID"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      className="h-12 pl-12  border border-border/90"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!trackingId.trim()}
                    className="h-12 px-6"
                  >
                    Track
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground mt-2">
                  Try: "TS-OJC25Z4L"
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
