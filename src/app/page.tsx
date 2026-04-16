import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Services } from "@/components/services";
import { TrackingResult } from "@/components/trecking-result";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TrackingResult />
      <Services />
      <Footer />
    </div>
  );
}
