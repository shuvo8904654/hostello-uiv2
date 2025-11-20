import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HOSTELS } from "@/lib/mockData";
import { BarChart as BarChartIcon, Users, ArrowUpRight, DollarSign, Bell, Calendar, Wrench, MessageSquare } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const revenueData = [
  { name: "Jan", total: 5000 },
  { name: "Feb", total: 7000 },
  { name: "Mar", total: 6500 },
  { name: "Apr", total: 8000 },
  { name: "May", total: 9500 },
  { name: "Jun", total: 11000 },
];

export default function ManagerDashboard() {
  return (
    <DashboardLayout type="manager">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Branch Manager Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, Manager. Managing: <span className="font-semibold text-primary">Dhaka Hub</span></p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon"><Bell className="h-4 w-4" /></Button>
          <Button>+ New Booking</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Occupancy</CardTitle>
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
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground text-orange-600 mt-1">Requires approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">Open tickets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">From tenants</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mb-8">
        {/* Recent Activity */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                   <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                         {i % 2 === 0 ? 'Bk' : 'Mt'}
                      </div>
                      <div>
                         <p className="text-sm font-medium">{i % 2 === 0 ? 'New Booking Confirmed' : 'Maintenance Request Resolved'}</p>
                         <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                   </div>
                   <Button variant="ghost" size="sm">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-1">
           <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
           </CardHeader>
           <CardContent className="flex flex-col gap-3">
              <Button variant="outline" className="justify-start"><Users className="mr-2 h-4 w-4"/> Add Tenant</Button>
              <Button variant="outline" className="justify-start"><Calendar className="mr-2 h-4 w-4"/> Check In Guest</Button>
              <Button variant="outline" className="justify-start"><Wrench className="mr-2 h-4 w-4"/> Report Issue</Button>
              <Button variant="outline" className="justify-start"><MessageSquare className="mr-2 h-4 w-4"/> Broadcast Message</Button>
           </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
