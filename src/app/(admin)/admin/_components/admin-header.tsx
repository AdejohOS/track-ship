"use client";

import {
  BellIcon,
  UserCircleIcon,
  SearchIcon,
  HelpCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
    variant?: "default" | "outline" | "secondary";
  };
}

export function AdminHeader({ title, description, action }: AdminHeaderProps) {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-20">
      <div className="flex items-center justify-between p-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-2 text-sm">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-3 ml-8">
          <div className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-lg bg-muted border border-border">
            <SearchIcon className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm outline-none placeholder:text-muted-foreground w-48"
            />
          </div>

          <Button variant="ghost" size="icon" title="Help">
            <HelpCircleIcon className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            title="Notifications"
          >
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </Button>

          <div className="w-px h-6 bg-border" />

          <Button variant="ghost" size="icon" title="Account">
            <UserCircleIcon className="w-5 h-5" />
          </Button>

          {action && (
            <Button
              onClick={action.onClick}
              variant={action.variant || "default"}
              className="gap-2 ml-2"
            >
              {action.label}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
