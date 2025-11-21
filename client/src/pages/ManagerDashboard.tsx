import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HOSTELS } from "@/lib/mockData";
import { BarChart as BarChartIcon, Users, ArrowUpRight, DollarSign, TrendingUp, PieChart as PieChartIcon, Activity, Building2, BedDouble, AlertCircle, CreditCard, Utensils, Shield, Armchair, Wrench, MessageSquare, Calendar, Bell, Star } from "lucide-react";
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

const recentReviews = [
  { id: 1, user: "Rahim A.", rating: 5, comment: "Great facilities and food!", date: "2 days ago" },
  { id: 2, user: "Karim S.", rating: 3, comment: "AC was leaking yesterday.", date: "1 day ago" },
];

export default function ManagerDashboard() {
  return (
    <DashboardLayout type="manager">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Property Manager Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, Manager. Managing: <span className="font-semibold text-primary">Dhaka Hub</span></p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon"><Bell className="h-4 w-4" /></Button>
          <Link href="/dashboard/manager/bookings">
            <Button>+ New Booking</Button>
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Property Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳85,000</div>
            <p className="text-xs text-muted-foreground text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Occupancy</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground text-green-600 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <BedDouble className="h-3 w-3" /> 45 Total Beds
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="flex gap-2 mt-1">
              <p className="text-xs text-muted-foreground text-orange-600 flex items-center">
                 2 Maintenance
              </p>
              <span className="text-xs text-muted-foreground">•</span>
               <p className="text-xs text-muted-foreground text-blue-600 flex items-center">
                 3 Bookings
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operational Updates */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-8">
        <Card className="bg-orange-50/50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mess & Food</CardTitle>
              <Utensils className="h-4 w-4 text-orange-600" />
           </CardHeader>
           <CardContent>
              <div className="mb-2">
                 <span className="text-xs font-medium text-muted-foreground uppercase">Today's Menu</span>
                 <p className="font-medium truncate">Chicken Biryani (Lunch), Roti & Veg (Dinner)</p>
              </div>
              <div className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
                 <AlertCircle className="h-3 w-3 text-orange-600" />
                 <span className="text-orange-700 dark:text-orange-400 font-medium">Low Stock: Oil (5L)</span>
              </div>
              <Button size="sm" variant="ghost" className="w-full h-8 text-orange-700 hover:text-orange-800 hover:bg-orange-100">Update Menu</Button>
           </CardContent>
        </Card>

        <Card className="bg-purple-50/50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance Status</CardTitle>
              <Wrench className="h-4 w-4 text-purple-600" />
           </CardHeader>
           <CardContent>
              <div className="flex justify-between items-end mb-2">
                 <div className="text-2xl font-bold">2</div>
                 <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">Open Tickets</Badge>
              </div>
              <div className="text-xs text-muted-foreground mb-3">
                 Room 104 AC Repair due today
              </div>
              <Link href="/dashboard/manager/maintenance">
                 <Button size="sm" variant="ghost" className="w-full h-8 text-purple-700 hover:text-purple-800 hover:bg-purple-100">View All Tickets</Button>
              </Link>
           </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7 mb-8">
        {/* Revenue Chart */}
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Property Revenue</CardTitle>
            <CardDescription>Monthly revenue performance.</CardDescription>
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

      {/* Secondary Charts & Actions */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Recent Activity - Replaces Income/Expense for Manager as they focus more on ops */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your branch.</CardDescription>
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
                         <p className="text-sm font-medium">{i % 2 === 0 ? 'New Booking Confirmed - Room 204' : 'Maintenance Ticket Resolved - AC Repair'}</p>
                         <p className="text-xs text-muted-foreground">{i} hours ago</p>
                      </div>
                   </div>
                   <Button variant="ghost" size="sm">View</Button>
                </div>
              ))}
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
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={tenantDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
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
            <div className="flex flex-col gap-2 w-full px-4 mt-2">
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
            <div className="mt-6 w-full">
               <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Quick Actions</h4>
               <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="w-full text-xs">Add Tenant</Button>
                  <Button variant="outline" size="sm" className="w-full text-xs">Check In</Button>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community & Feedback - New Section */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>Latest feedback for your branch.</CardDescription>
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
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{review.date}</p>
                   </div>
                ))}
             </div>
             <Link href="/dashboard/manager/reviews">
                <Button variant="ghost" size="sm" className="w-full mt-2">View All Reviews</Button>
             </Link>
          </CardContent>
        </Card>

        <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-400">Roommate Matching</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
           </CardHeader>
           <CardContent>
              <div className="flex items-center gap-4 mb-6">
                 <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">5</div>
                 <p className="text-xs text-blue-600/80 font-medium">New matches this week</p>
              </div>
              
              <div className="space-y-3">
                 <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pending Requests</span>
                    <span className="font-medium">3</span>
                 </div>
                 <div className="w-full bg-blue-200/50 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                 </div>
                 <p className="text-xs text-muted-foreground pt-2">
                    You have 3 pending roommate requests to review.
                 </p>
              </div>
           </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
