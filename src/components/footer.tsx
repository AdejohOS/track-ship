"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-secondary-foreground rounded-lg flex items-center justify-center">
                <span className="text-secondary font-bold text-sm">ST</span>
              </div>
              <span className="font-bold text-lg">ShipTrack</span>
            </div>
            <p className="text-sm opacity-80">
              Your trusted partner for professional logistics and shipping
              solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Tracking
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-secondary-foreground/20 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
          <p>&copy; {currentYear} ShipTrack. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:opacity-100">
              Twitter
            </Link>
            <Link href="#" className="hover:opacity-100">
              LinkedIn
            </Link>
            <Link href="#" className="hover:opacity-100">
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
