import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HOSTELS } from "@/lib/mockData";
import { BarChart as BarChartIcon, Users, ArrowUpRight, DollarSign } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { name: "Jan", total: 12000 },
  { name: "Feb", total: 21000 },
  { name: "Mar", total: 18000 },
  { name: "Apr", total: 24000 },
  { name: "May", total: 32000 },
  { name: "Jun", total: 45000 },
];

export default function OwnerDashboard() {
  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Owner Dashboard</h2>
          <p className="text-muted-foreground">Manage your properties and track performance.</p>
        </div>
        <Button>+ Add New Property</Button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳1,24,500</div>
            <p className="text-xs text-muted-foreground text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +4% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground mt-1">All properties live</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground text-orange-600 mt-1">Requires action</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7 mb-8">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-0 sm:pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `৳${value}`} width={60} />
                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Booking Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
                 <div className="flex items-center gap-3 overflow-hidden">
                   <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground shrink-0">RA</div>
                   <div className="min-w-0">
                     <div className="font-medium truncate">Rahim Ahmed</div>
                     <div className="text-xs text-muted-foreground truncate">Dhaka Hub • Room 101</div>
                   </div>
                 </div>
                 <div className="flex gap-2 w-full sm:w-auto shrink-0">
                   <Button size="sm" variant="outline" className="text-xs px-2 h-8 flex-1 sm:flex-none">Decline</Button>
                   <Button size="sm" className="text-xs px-2 h-8 flex-1 sm:flex-none">Accept</Button>
                 </div>
               </div>
               <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
                 <div className="flex items-center gap-3 overflow-hidden">
                   <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground shrink-0">FK</div>
                   <div className="min-w-0">
                     <div className="font-medium truncate">Fatima Khan</div>
                     <div className="text-xs text-muted-foreground truncate">Uttara Girls • Bed 2</div>
                   </div>
                 </div>
                 <div className="flex gap-2 w-full sm:w-auto shrink-0">
                   <Button size="sm" variant="outline" className="text-xs px-2 h-8 flex-1 sm:flex-none">Decline</Button>
                   <Button size="sm" className="text-xs px-2 h-8 flex-1 sm:flex-none">Accept</Button>
                 </div>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
