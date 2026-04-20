import { Hero } from "@/components/hero";

import { Services } from "@/components/services";
import { TrackingResult } from "@/components/trecking-result";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <TrackingResult />
      <Services />
    </div>
  );
}
