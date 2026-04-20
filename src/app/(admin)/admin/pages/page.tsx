"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  EditIcon,
  SaveIcon,
  TrashIcon,
  PlusIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { AdminHeader } from "../_components/admin-header";

export default function PagesPage() {
  const [editingPage, setEditingPage] = useState<string | null>(null);
  const [pages, setPages] = useState([
    {
      id: "about",
      title: "About Us",
      content:
        "ShipTrack is a leading logistics and shipping company dedicated to providing professional, transparent tracking solutions for businesses of all sizes.",
    },
    {
      id: "services",
      title: "Services",
      content:
        "We offer comprehensive logistics services including express delivery, secure handling, 24/7 support, and advanced analytics for shipment management.",
    },
    {
      id: "contact",
      title: "Contact Us",
      content:
        "Email: support@shiptrack.com | Phone: +1-800-SHIP-TRACK | Address: 123 Logistics Ave, Transportation City, TC 12345",
    },
    {
      id: "faq",
      title: "FAQ",
      content:
        "Q: How can I track my shipment? A: Use our tracking tool with your tracking ID. Q: What areas do you serve? A: We provide services nationwide with international options.",
    },
  ]);

  const [formData, setFormData] = useState({ title: "", content: "" });

  const handleEdit = (page: (typeof pages)[0]) => {
    setEditingPage(page.id);
    setFormData({ title: page.title, content: page.content });
  };

  const handleSave = () => {
    if (editingPage) {
      setPages(
        pages.map((p) =>
          p.id === editingPage
            ? { ...p, title: formData.title, content: formData.content }
            : p,
        ),
      );
      setEditingPage(null);
      setFormData({ title: "", content: "" });
    }
  };

  const handleCancel = () => {
    setEditingPage(null);
    setFormData({ title: "", content: "" });
  };

  return (
    <div className="flex flex-col h-full">
      <AdminHeader
        title="Pages & Content"
        description="Edit and manage website pages and content"
      />

      <div className="flex-1 overflow-y-auto p-6">
        {editingPage ? (
          // Edit Mode
          <div className="max-w-4xl space-y-6">
            <Button onClick={handleCancel} variant="outline" className="gap-2">
              <ArrowLeftIcon className="w-4 h-4" />
              Back
            </Button>

            <Card className="p-6 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Edit: {pages.find((p) => p.id === editingPage)?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Update page content and settings
                </p>
              </div>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="title">Page Title</FieldLabel>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Page title"
                  />
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="content">Page Content</FieldLabel>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    rows={14}
                    placeholder="Enter your page content here..."
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {formData.content.length} characters
                  </p>
                </Field>
              </FieldGroup>

              <div className="pt-4 border-t border-border flex gap-3">
                <Button onClick={handleSave} className="gap-2">
                  <SaveIcon className="w-4 h-4" />
                  Save Changes
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          // View Mode
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  All Pages ({pages.length})
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage website content and pages
                </p>
              </div>
              <Button className="gap-2">
                <PlusIcon className="w-4 h-4" />
                Create Page
              </Button>
            </div>

            <div className="grid gap-4">
              {pages.map((page) => (
                <Card
                  key={page.id}
                  className="p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-foreground">
                          {page.title}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                          {page.id}
                        </span>
                      </div>
                      <p className="text-muted-foreground line-clamp-2 text-sm">
                        {page.content}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        onClick={() => handleEdit(page)}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <EditIcon className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
