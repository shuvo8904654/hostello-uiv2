import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HOSTELS } from "@/lib/mockData";
import { BarChart as BarChartIcon, Users, ArrowUpRight, DollarSign, TrendingUp, PieChart as PieChartIcon, Activity, Building2, BedDouble, AlertCircle, CreditCard, Utensils, Shield, Armchair, Star } from "lucide-react";
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

const recentReviews = [
  { id: 1, user: "Rahim A.", rating: 5, comment: "Great facilities and food!", date: "2 days ago", property: "Dhaka Hub" },
  { id: 2, user: "Sarah K.", rating: 4, comment: "WiFi could be faster in common area.", date: "5 days ago", property: "Uttara Girls" },
];

export default function OwnerDashboard() {
  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Owner Dashboard</h2>
          <p className="text-muted-foreground">Manage your properties, staff, and track performance.</p>
        </div>
        <div className="flex gap-2">
           <Link href="/dashboard/owner/staff">
              <Button variant="outline">Manage Staff</Button>
           </Link>
           <Link href="/dashboard/owner/properties/new">
              <Button>+ Add Property</Button>
           </Link>
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
            <CardTitle className="text-sm font-medium">Properties & Capacity</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{HOSTELS.length} Hostels</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <BedDouble className="h-3 w-3" /> 120 Rooms / 450 Beds
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <div className="flex gap-2 mt-1">
              <p className="text-xs text-muted-foreground text-orange-600 flex items-center">
                 12 Verifications
              </p>
              <span className="text-xs text-muted-foreground">•</span>
               <p className="text-xs text-muted-foreground text-blue-600 flex items-center">
                 13 Bookings
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operational Updates - New Section */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-8">
        <Card className="bg-orange-50/50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mess & Food</CardTitle>
              <Utensils className="h-4 w-4 text-orange-600" />
           </CardHeader>
           <CardContent>
              <div className="mb-2">
                 <span className="text-xs font-medium text-muted-foreground uppercase">Tonight's Menu</span>
                 <p className="font-medium truncate">Rice, Fish Curry, Vegetable, Dal</p>
              </div>
              <div className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
                 <AlertCircle className="h-3 w-3 text-orange-600" />
                 <span className="text-orange-700 dark:text-orange-400 font-medium">Low Stock: Rice (50kg)</span>
              </div>
              <Link href="/dashboard/owner/food">
                 <Button size="sm" variant="ghost" className="w-full h-8 text-orange-700 hover:text-orange-800 hover:bg-orange-100">Manage Menu</Button>
              </Link>
           </CardContent>
        </Card>

        <Card className="bg-purple-50/50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inventory Status</CardTitle>
              <Armchair className="h-4 w-4 text-purple-600" />
           </CardHeader>
           <CardContent>
              <div className="flex justify-between items-end mb-2">
                 <div className="text-2xl font-bold">28</div>
                 <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">Maintenance Due</Badge>
              </div>
              <div className="text-xs text-muted-foreground mb-3">
                 12 Warranties expiring this month
              </div>
              <Link href="/dashboard/owner/inventory">
                 <Button size="sm" variant="ghost" className="w-full h-8 text-purple-700 hover:text-purple-800 hover:bg-purple-100">Check Assets</Button>
              </Link>
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
               <CardTitle>Property Performance</CardTitle>
               <CardDescription>Overview of metrics by property manager.</CardDescription>
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

      {/* Community & Feedback - New Section */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>Latest feedback from tenants.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {recentReviews.map((review) => (
                   <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex justify-between items-start mb-1">
                         <div className="font-medium text-sm">{review.user}</div>
                         <div className="flex items-center text-yellow-500">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="text-xs ml-1 text-muted-foreground">{review.rating}.0</span>
                         </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">"{review.comment}"</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{review.property} • {review.date}</p>
                   </div>
                ))}
             </div>
             <Link href="/dashboard/owner/reviews">
                <Button variant="ghost" size="sm" className="w-full mt-2">View All Reviews</Button>
             </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
