import { Timeline } from "./timeline";
import { TrackingCard } from "./tracking-card";

export const TrackingResult = () => {
  const trackingData = {
    trackingId: "SHP-2024-001",
    status: "in-transit" as const,
    sender: "Acme Industries",
    receiver: "Tech Solutions Inc.",
    origin: "Los Angeles, CA",
    destination: "New York, NY",
    deliveryDate: "March 28, 2024",
  };

  const timelineEvents = [
    {
      id: "1",
      title: "Package Picked Up",
      description: "Your shipment has been collected from the sender location.",
      location: "Los Angeles, CA",
      timestamp: "2024-03-24 09:30 AM",
      completed: true,
    },
    {
      id: "2",
      title: "In Transit",
      description: "Your package is on the way to the distribution center.",
      location: "Phoenix Distribution Hub",
      timestamp: "2024-03-25 02:15 PM",
      completed: true,
    },
    {
      id: "3",
      title: "At Distribution Center",
      description: "Package received at our distribution facility.",
      location: "Dallas, TX",
      timestamp: "2024-03-26 08:45 AM",
      completed: true,
    },
    {
      id: "4",
      title: "Out for Delivery",
      description: "Your package is on the delivery truck.",
      location: "New York, NY",
      timestamp: "2024-03-27 06:30 AM",
      completed: false,
    },
    {
      id: "5",
      title: "Delivered",
      description: "Package successfully delivered.",
      location: "New York, NY",
      timestamp: "Expected 2024-03-28",
      completed: false,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Track Your Shipment
          </h2>
          <p className="text-muted-foreground">
            Real-time updates on your package with detailed location history
          </p>
        </div>

        {/* Tracking Card and Timeline */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TrackingCard {...trackingData} />
          </div>
          <div className="lg:col-span-2">
            <Timeline events={timelineEvents} />
          </div>
        </div>
      </div>
    </section>
  );
};
