import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { Bell, Lock, User, CreditCard } from "lucide-react";

export default function SettingsPage() {
  const [location] = useLocation();
  const type = location.includes('tenant') ? 'tenant' : location.includes('owner') ? 'owner' : 'admin';

  return (
    <DashboardLayout type={type}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account preferences and security.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2"><User className="h-4 w-4" /> Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2"><Lock className="h-4 w-4" /> Security</TabsTrigger>
          {type === 'owner' && <TabsTrigger value="billing" className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> Billing</TabsTrigger>}
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and public profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Johnson" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" defaultValue="alex@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+44 7700 900077" />
              </div>
              <div className="pt-4">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how and when you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive updates about your bookings via email.</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <div className="font-medium">SMS Notifications</div>
                  <div className="text-sm text-muted-foreground">Get urgent alerts on your phone.</div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <div className="font-medium">Marketing Emails</div>
                  <div className="text-sm text-muted-foreground">Receive offers and newsletters.</div>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and account security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPass">Current Password</Label>
                <Input id="currentPass" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPass">New Password</Label>
                <Input id="newPass" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPass">Confirm New Password</Label>
                <Input id="confirmPass" type="password" />
              </div>
              <div className="pt-4">
                <Button variant="destructive">Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
             <CardHeader>
               <CardTitle>Payment Methods</CardTitle>
               <CardDescription>Manage how you receive payments.</CardDescription>
             </CardHeader>
             <CardContent>
               <div className="text-sm text-muted-foreground">Billing settings available for property owners only.</div>
             </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
