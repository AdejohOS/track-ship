"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Hero() {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();

    const cleaned = trackingId.trim().toUpperCase();
    if (!cleaned) return;

    router.push(`/track/${encodeURIComponent(cleaned)}`);
  };

  return (
    <section
      id="home"
      className="relative py-24 md:pb-40 md:pt-24 min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: "url(/images/hero-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white text-balance leading-tight">
              Track Every Package,
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
                Everywhere
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto text-balance leading-relaxed">
              Real-time tracking, transparent pricing, and professional
              logistics support for businesses worldwide. Know where your
              shipment is at every moment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto pt-4">
            <div className="flex-1 relative">
              <form action="" onSubmit={handleTrack} id="tracking-form">
                <Input
                  type="text"
                  placeholder="Enter tracking ID (e.g., SHP-2024-001)"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="w-full h-12 bg-white/95 border-0 text-foreground placeholder:text-muted-foreground rounded-lg shadow-lg focus:bg-white"
                />
              </form>
              <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
            <Button
              form="tracking-form"
              onClick={handleTrack}
              className="h-12 px-8 bg-primary hover:bg-accent text-primary-foreground font-semibold rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              Track Shipment
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>500K+ packages tracked daily</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>98% on-time delivery rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>Global coverage, local expertise</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
