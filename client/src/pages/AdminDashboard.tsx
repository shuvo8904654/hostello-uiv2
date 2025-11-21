import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Users, Building2, TrendingUp, MapPin, DollarSign, Home } from "lucide-react";

// Mock Data
const revenueData = [
  { name: 'Jan', revenue: 250000 },
  { name: 'Feb', revenue: 280000 },
  { name: 'Mar', revenue: 320000 },
  { name: 'Apr', revenue: 310000 },
  { name: 'May', revenue: 350000 },
  { name: 'Jun', revenue: 420000 },
];

const cityData = [
  { name: 'Dhaka', value: 450 },
  { name: 'Chittagong', value: 120 },
  { name: 'Sylhet', value: 80 },
  { name: 'Rajshahi', value: 40 },
];

const occupancyTrendData = [
  { name: 'Jan', rate: 65 },
  { name: 'Feb', rate: 68 },
  { name: 'Mar', rate: 75 },
  { name: 'Apr', rate: 72 },
  { name: 'May', rate: 78 },
  { name: 'Jun', rate: 85 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AdminDashboard() {
  return (
    <DashboardLayout type="admin">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Platform Analytics</h2>
        <p className="text-muted-foreground">Overview of platform performance and growth metrics.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,240</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +12% this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hostels</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85</div>
            <p className="text-xs text-muted-foreground">Across 8 cities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">112</div>
            <p className="text-xs text-muted-foreground">27 multi-property owners</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳4.2M</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +8% vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Revenue Growth</CardTitle>
            <CardDescription>Monthly platform revenue (BDT)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `৳${value/1000}k`} />
                <Tooltip formatter={(value) => `৳${value}`} />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>City Performance</CardTitle>
            <CardDescription>Hostel distribution by city</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#0f172a" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mb-8">
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Occupancy Stats</CardTitle>
                <CardDescription>Average occupancy rates across platform</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] flex items-center justify-center">
                <div className="relative flex items-center justify-center h-40 w-40 rounded-full border-8 border-muted">
                    <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent border-l-transparent rotate-45"></div>
                    <div className="text-center">
                        <span className="text-3xl font-bold">78%</span>
                        <p className="text-xs text-muted-foreground">Occupied</p>
                    </div>
                </div>
            </CardContent>
        </Card>
        
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Booking Stats</CardTitle>
                <CardDescription>Recent booking activity</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">24h</div>
                            <div>
                                <p className="font-medium">New Bookings (24h)</p>
                                <p className="text-sm text-muted-foreground">42 bookings confirmed</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">৳185k</p>
                            <p className="text-xs text-muted-foreground">Volume</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">7d</div>
                            <div>
                                <p className="font-medium">Pending Approvals</p>
                                <p className="text-sm text-muted-foreground">Wait time avg: 4h</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">18</p>
                            <p className="text-xs text-muted-foreground">Bookings</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">30d</div>
                            <div>
                                <p className="font-medium">Completion Rate</p>
                                <p className="text-sm text-muted-foreground">Successful stays</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">94%</p>
                            <p className="text-xs text-muted-foreground">+2% vs last mo</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

      {/* Detailed Occupancy Analytics */}
      <div className="grid gap-6 grid-cols-1 mb-8">
        <Card>
            <CardHeader>
                <CardTitle>Occupancy Trends</CardTitle>
                <CardDescription>Platform-wide occupancy rates over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={occupancyTrendData}>
                        <defs>
                            <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Area type="monotone" dataKey="rate" stroke="#2563eb" fillOpacity={1} fill="url(#colorRate)" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
