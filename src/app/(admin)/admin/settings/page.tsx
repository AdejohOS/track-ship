"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  SaveIcon,
  BellIcon,
  LockIcon,
  PaletteIcon,
  MailIcon,
} from "lucide-react";
import { AdminHeader } from "../_components/admin-header";

export default function SettingsPage() {
  const [companySettings, setCompanySettings] = useState({
    companyName: "ShipTrack Inc.",
    email: "admin@shiptrack.com",
    phone: "+1-800-SHIP-TRACK",
    address: "123 Logistics Ave, Transportation City, TC 12345",
    website: "https://www.shiptrack.com",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,
    delayedShipmentAlerts: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    ipWhitelist: "",
  });

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanySettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (key: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof notificationSettings],
    }));
  };

  const handleSecurityChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setSecuritySettings((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col h-full">
      <AdminHeader
        title="Settings"
        description="Manage system settings and preferences"
      />

      <div className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="company" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md bg-muted">
            <TabsTrigger value="company" className="gap-2">
              <span>Company</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <BellIcon className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <LockIcon className="w-4 h-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          {/* Company Settings */}
          <TabsContent value="company" className="mt-6 space-y-6">
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Company Information
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Update your company details
                </p>
              </div>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="companyName">Company Name</FieldLabel>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={companySettings.companyName}
                    onChange={handleCompanyChange}
                  />
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email Address</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={companySettings.email}
                    onChange={handleCompanyChange}
                  />
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                  <Input
                    id="phone"
                    name="phone"
                    value={companySettings.phone}
                    onChange={handleCompanyChange}
                  />
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="address">Address</FieldLabel>
                  <Input
                    id="address"
                    name="address"
                    value={companySettings.address}
                    onChange={handleCompanyChange}
                  />
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="website">Website</FieldLabel>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={companySettings.website}
                    onChange={handleCompanyChange}
                  />
                </Field>
              </FieldGroup>

              <div className="pt-4 border-t border-border">
                <Button className="gap-2">
                  <SaveIcon className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="mt-6 space-y-6">
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Notification Preferences
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Control how you receive notifications
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    key: "emailNotifications",
                    label: "Email Notifications",
                    description: "Receive notifications via email",
                  },
                  {
                    key: "smsNotifications",
                    label: "SMS Notifications",
                    description: "Receive notifications via SMS",
                  },
                  {
                    key: "pushNotifications",
                    label: "Push Notifications",
                    description: "Receive browser push notifications",
                  },
                  {
                    key: "weeklyReports",
                    label: "Weekly Reports",
                    description: "Get weekly summary reports",
                  },
                  {
                    key: "delayedShipmentAlerts",
                    label: "Delayed Shipment Alerts",
                    description: "Alert when shipments are delayed",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={
                          notificationSettings[
                            item.key as keyof typeof notificationSettings
                          ] as boolean
                        }
                        onChange={() => handleNotificationToggle(item.key)}
                      />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                    </label>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <Button className="gap-2">
                  <SaveIcon className="w-4 h-4" />
                  Save Preferences
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="mt-6 space-y-6">
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Security Settings
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your account security
                </p>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-sm text-blue-900 font-medium">
                  Password Management
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  Change your password regularly to keep your account secure
                </p>
                <Button variant="outline" className="mt-3 gap-2">
                  Change Password
                </Button>
              </div>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="sessionTimeout">
                    Session Timeout (minutes)
                  </FieldLabel>
                  <Input
                    id="sessionTimeout"
                    name="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={handleSecurityChange}
                    min="5"
                    max="240"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Automatically log out after inactivity
                  </p>
                </Field>
              </FieldGroup>

              <div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium text-foreground">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={securitySettings.twoFactorEnabled}
                      onChange={(e) =>
                        setSecuritySettings((prev) => ({
                          ...prev,
                          twoFactorEnabled: e.target.checked,
                        }))
                      }
                    />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>
              </div>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="ipWhitelist">
                    IP Whitelist (Optional)
                  </FieldLabel>
                  <textarea
                    id="ipWhitelist"
                    name="ipWhitelist"
                    value={securitySettings.ipWhitelist}
                    onChange={handleSecurityChange}
                    placeholder="Enter IP addresses, one per line (e.g., 192.168.1.1)"
                    rows={4}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Restrict access to these IP addresses only
                  </p>
                </Field>
              </FieldGroup>

              <div className="pt-4 border-t border-border">
                <Button className="gap-2">
                  <SaveIcon className="w-4 h-4" />
                  Save Security Settings
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
