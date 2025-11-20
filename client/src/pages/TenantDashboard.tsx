import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HOSTELS } from "@/lib/mockData";
import { Clock, Home, DollarSign, Users, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function TenantDashboard() {
  return (
    <DashboardLayout type="tenant">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, Rahim! 👋</h2>
        <p className="text-muted-foreground">Here's what's happening with your accommodation.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Booking</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Dhaka Student Hub</div>
            <p className="text-xs text-muted-foreground">Room 304 • Moving in Sep 1</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳5,000.00</div>
            <p className="text-xs text-muted-foreground">Due Aug 25, 2025</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Hostels</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Saved</div>
            <p className="text-xs text-muted-foreground">2 Price drops recently</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Roommate Finder</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12 Matches</div>
            <Link href="/dashboard/tenant/roommates">
              <Button variant="link" className="p-0 h-auto text-xs text-primary/80 hover:text-primary">
                Find roommates <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Your Booking Request</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex items-start gap-4 p-4 border rounded-lg bg-muted/10">
                <img src={HOSTELS[0].image} className="w-20 h-20 rounded-md object-cover" alt="Hostel" />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold">{HOSTELS[0].name}</h4>
                    <Badge className="bg-yellow-500/15 text-yellow-700 hover:bg-yellow-500/25 border-yellow-200">Pending Approval</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Private AC Room • Monthly</p>
                  <div className="text-sm font-medium">Applied on Nov 18, 2025</div>
                </div>
             </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recommended for you</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {HOSTELS.slice(1,3).map(hostel => (
                  <div key={hostel.id} className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <img src={hostel.image} className="w-12 h-12 rounded-md object-cover" alt="Hostel" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{hostel.name}</h4>
                      <p className="text-xs text-muted-foreground">{hostel.location}, {hostel.city}</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
