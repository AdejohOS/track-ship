"use client";

import { Card } from "@/components/ui/card";
import { TruckIcon, ShieldIcon, ClockIcon, BarChart3Icon } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: TruckIcon,
      title: "Express Delivery",
      description:
        "Fast and reliable shipping with guaranteed delivery windows and real-time tracking.",
    },
    {
      icon: ShieldIcon,
      title: "Secure Handling",
      description:
        "Your packages are handled with care using the latest security and protection standards.",
    },
    {
      icon: ClockIcon,
      title: "24/7 Support",
      description:
        "Our customer support team is available round the clock to assist with any inquiries.",
    },
    {
      icon: BarChart3Icon,
      title: "Advanced Analytics",
      description:
        "Detailed insights and reports on your shipments for better logistics management.",
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive logistics solutions designed to meet all your shipping
            needs with professional excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow border-border hover:border-primary/30"
              >
                <Icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
