"use client";

import { CheckCircleIcon, CircleIcon } from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  timestamp: string | Date;
  completed: boolean;
}

interface TimelineProps {
  events?: TimelineEvent[];
}

export function Timeline({ events = [] }: TimelineProps) {
  if (events.length === 0) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground">
          No tracking updates yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              {event.completed ? (
                <CheckCircleIcon className="w-6 h-6 text-primary" />
              ) : (
                <CircleIcon className="w-6 h-6 text-border" />
              )}
              {index < events.length - 1 && (
                <div className="w-0.5 h-12 bg-border mt-2" />
              )}
            </div>

            <div className="flex-1 pb-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold text-foreground">{event.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {event.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <span className="font-medium">📍</span>
                    {event.location}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(event.timestamp))}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
