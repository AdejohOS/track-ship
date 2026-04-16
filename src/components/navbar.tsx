"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                TS
              </span>
            </div>
            <span className="font-bold text-xl text-foreground">
              Track-Ship
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#home"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="#services"
              className="text-foreground hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="#about"
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          <Button className="bg-primary hover:bg-accent text-primary-foreground">
            <Link href="/track">Track Shipment</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
