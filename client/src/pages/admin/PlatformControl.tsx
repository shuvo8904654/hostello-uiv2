import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Megaphone, Save } from "lucide-react";

export default function AdminPlatformControl() {
  return (
    <DashboardLayout type="admin">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Platform Control</h2>
        <p className="text-muted-foreground">Manage global settings, pricing, and announcements.</p>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Global Pricing & Commissions</CardTitle>
                    <CardDescription>Set the base platform fees and commission rates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label>Standard Commission Rate (%)</Label>
                        <div className="flex gap-2">
                            <Input defaultValue="5" type="number" />
                            <Button variant="secondary">Update</Button>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label>Premium Listing Fee ($/month)</Label>
                        <div className="flex gap-2">
                            <Input defaultValue="29.99" type="number" />
                            <Button variant="secondary">Update</Button>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Enable Dynamic Pricing</Label>
                            <p className="text-sm text-muted-foreground">Adjust fees based on demand</p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Booking Rules</CardTitle>
                    <CardDescription>Configure global booking policies.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Require ID Verification</Label>
                            <p className="text-sm text-muted-foreground">Tenants must verify ID before booking</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Instant Booking</Label>
                            <p className="text-sm text-muted-foreground">Allow owners to enable instant booking</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Announcement System</CardTitle>
                    <CardDescription>Broadcast messages to all owners or tenants.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label>Target Audience</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option>All Users</option>
                            <option>Property Owners Only</option>
                            <option>Tenants Only</option>
                        </select>
                    </div>
                    <div className="grid gap-2">
                        <Label>Subject</Label>
                        <Input placeholder="Announcement Title" />
                    </div>
                    <div className="grid gap-2">
                        <Label>Message</Label>
                        <textarea className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Type your announcement here..." />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <Switch id="email-notif" />
                        <Label htmlFor="email-notif">Send via Email</Label>
                    </div>
                    <Button className="w-full gap-2">
                        <Megaphone className="h-4 w-4" /> Broadcast Announcement
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
