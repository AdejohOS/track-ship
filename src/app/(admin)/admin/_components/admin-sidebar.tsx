"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGridIcon,
  PackageIcon,
  PlusIcon,
  EditIcon,
  FileTextIcon,
  LogOutIcon,
  SettingsIcon,
  BarChart3Icon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const mainNavItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutGridIcon,
    },
  ];

  const operationsNavItems = [
    {
      label: "Shipments",
      href: "/admin/shipments",
      icon: PackageIcon,
    },
    {
      label: "Create Shipment",
      href: "/admin/create-shipment",
      icon: PlusIcon,
    },
    {
      label: "Updates",
      href: "/admin/updates",
      icon: EditIcon,
    },
  ];

  const contentNavItems = [
    {
      label: "Pages",
      href: "/admin/pages",
      icon: FileTextIcon,
    },
    {
      label: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3Icon,
    },
  ];

  const settingsNavItems = [
    {
      label: "Settings",
      href: "/admin/settings",
      icon: SettingsIcon,
    },
  ];

  const NavLink = ({ item }: { item: (typeof mainNavItems)[0] }) => {
    const Icon = item.icon;
    const isActive =
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname === item.href || pathname.startsWith(item.href + "/");

    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all duration-200",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50",
        )}
      >
        <Icon className="w-5 h-5 shrink-0" />
        <span>{item.label}</span>
      </Link>
    );
  };

  const NavSection = ({
    title,
    items,
  }: {
    title: string;
    items: typeof mainNavItems;
  }) => {
    return (
      <div className="space-y-2">
        <p className="px-4 py-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wide">
          {title}
        </p>
        <div className="space-y-1">
          {items.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-border flex items-center px-4 z-40">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            <XIcon className="w-6 h-6 text-foreground" />
          ) : (
            <MenuIcon className="w-6 h-6 text-foreground" />
          )}
        </button>
        <div className="flex-1 flex items-center gap-3 ml-4">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground font-bold text-xs">
              ST
            </span>
          </div>
          <p className="font-bold text-foreground text-sm">ShipTrack</p>
        </div>
      </div>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      <aside
        className={cn(
          "h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0 overflow-hidden transition-all duration-300 ease-in-out z-40",
          "md:w-64 md:translate-x-0",
          isMobileOpen
            ? "w-64 translate-x-0"
            : "w-64 -translate-x-full md:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="h-16 border-b border-sidebar-border items-center px-6 shrink-0 hidden md:flex">
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 bg-linear-to-br from-sidebar-primary to-sidebar-accent rounded-xl flex items-center justify-center shrink-0 shadow-lg">
              <span className="text-sidebar-primary-foreground font-bold text-sm">
                ST
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground text-sm truncate">
                ShipTrack
              </p>
              <p className="text-xs text-sidebar-foreground/60">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="h-16 border-b border-sidebar-border flex items-center px-6 shrink-0 md:hidden">
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 bg-linear-to-br from-sidebar-primary to-sidebar-accent rounded-xl flex items-center justify-center shrink-0 shadow-lg">
              <span className="text-sidebar-primary-foreground font-bold text-sm">
                ST
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground text-sm truncate">
                ShipTrack
              </p>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 hover:bg-sidebar-accent/30 rounded-lg transition-colors"
            >
              <XIcon className="w-5 h-5 text-sidebar-foreground" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
          <NavSection title="Main" items={mainNavItems} />
          <NavSection title="Operations" items={operationsNavItems} />
          <NavSection title="Content" items={contentNavItems} />
          <NavSection title="System" items={settingsNavItems} />
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border shrink-0 space-y-2">
          <div className="px-4 py-3 rounded-lg bg-sidebar-accent/20 border border-sidebar-accent/30 hidden md:block">
            <p className="text-xs font-semibold text-sidebar-foreground">
              Admin User
            </p>
            <p className="text-xs text-sidebar-foreground/60 mt-1">
              admin@shiptrack.io
            </p>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/40 font-medium transition-colors text-sm">
            <LogOutIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
