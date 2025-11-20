import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HOSTELS } from "@/lib/mockData";
import { BarChart as BarChartIcon, Users, ArrowUpRight, DollarSign, TrendingUp, PieChart as PieChartIcon, Activity, Building2 } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, LineChart, Line, PieChart, Pie, Cell, Tooltip, AreaChart, Area } from "recharts";
import { Link } from "wouter";

const revenueData = [
  { name: "Jan", total: 12000 },
  { name: "Feb", total: 21000 },
  { name: "Mar", total: 18000 },
  { name: "Apr", total: 24000 },
  { name: "May", total: 32000 },
  { name: "Jun", total: 45000 },
];

const occupancyData = [
  { name: "Week 1", rate: 85 },
  { name: "Week 2", rate: 88 },
  { name: "Week 3", rate: 92 },
  { name: "Week 4", rate: 90 },
];

const tenantDistribution = [
  { name: "Students", value: 75, color: "#e11d48" }, // primary
  { name: "Professionals", value: 25, color: "#0f172a" }, // foreground
];

const expensesData = [
  { name: "Jan", income: 15000, expense: 5000 },
  { name: "Feb", income: 25000, expense: 8000 },
  { name: "Mar", income: 22000, expense: 6000 },
  { name: "Apr", income: 30000, expense: 9000 },
  { name: "May", income: 40000, expense: 12000 },
  { name: "Jun", income: 55000, expense: 15000 },
];

const MANAGERS = [
  { id: 1, name: "Abdul Karim", branch: "Dhaka Hub", email: "abdul.k@hostello.com", status: "Active" },
  { id: 2, name: "Fatima Hasan", branch: "Uttara Girls", email: "fatima.h@hostello.com", status: "Active" },
];

export default function OwnerDashboard() {
  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Owner Dashboard</h2>
          <p className="text-muted-foreground">Manage your properties and track performance.</p>
        </div>
        <div className="flex gap-2">
           <Link href="/dashboard/owner/staff">
              <Button variant="outline">Manage Staff & Managers</Button>
           </Link>
           <Button>+ Add New Property</Button>
        </div>
      </div>

      {/* Key Metrics */}
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
            <CardTitle className="text-sm font-medium">Active Managers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MANAGERS.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Managing {HOSTELS.length} properties</p>
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

      {/* Charts Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7 mb-8">
        {/* Revenue Chart */}
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue breakdown for the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-0 sm:pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={revenueData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `৳${value}`} width={60} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Occupancy Trends */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Occupancy Trends</CardTitle>
            <CardDescription>Weekly occupancy rates.</CardDescription>
          </CardHeader>
          <CardContent>
             <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={occupancyData}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} width={40} />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <Area type="monotone" dataKey="rate" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRate)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Manager Overview Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mb-8">
         <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
               <CardTitle>Branch Performance</CardTitle>
               <CardDescription>Overview of metrics by branch manager.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {MANAGERS.map((manager) => (
                     <div key={manager.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {manager.name.split(' ').map(n => n[0]).join('')}
                           </div>
                           <div>
                              <h4 className="font-semibold">{manager.branch}</h4>
                              <p className="text-sm text-muted-foreground">Manager: {manager.name}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-8 text-sm">
                           <div className="hidden sm:block text-right">
                              <p className="text-muted-foreground">Occupancy</p>
                              <p className="font-medium text-green-600">94%</p>
                           </div>
                           <div className="hidden sm:block text-right">
                              <p className="text-muted-foreground">Revenue (Mo)</p>
                              <p className="font-medium">৳85,000</p>
                           </div>
                           <Button variant="outline" size="sm">View Report</Button>
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Income vs Expenses */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
             <CardTitle>Income vs Expenses</CardTitle>
             <CardDescription>Comparative financial analysis.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={expensesData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `৳${value}`} width={60} />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <Line type="monotone" dataKey="income" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="expense" stroke="hsl(var(--foreground))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4 text-sm">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span>Income</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-foreground"></div>
                  <span>Expenses</span>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Tenant Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Tenant Demographics</CardTitle>
            <CardDescription>Distribution by occupation.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={tenantDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {tenantDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 w-full px-8">
               {tenantDistribution.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span>{item.name}</span>
                     </div>
                     <span className="font-bold">{item.value}%</span>
                  </div>
               ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
