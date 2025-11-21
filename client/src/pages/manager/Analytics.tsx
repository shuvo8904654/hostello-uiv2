import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Download, Calendar } from "lucide-react";

const occupancyData = [
  { name: "Week 1", rate: 85 },
  { name: "Week 2", rate: 88 },
  { name: "Week 3", rate: 92 },
  { name: "Week 4", rate: 90 },
];

const tenantTypeData = [
  { name: 'Students', count: 45 },
  { name: 'Professionals', count: 15 },
  { name: 'Others', count: 5 },
];

export default function ManagerAnalytics() {
  return (
    <DashboardLayout type="manager">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Property Analytics</h2>
          <p className="text-muted-foreground">Deep dive into Dhaka Hub performance.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline"><Calendar className="mr-2 h-4 w-4"/> Date Range</Button>
           <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Export Report</Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-8">
         <Card>
            <CardHeader>
               <CardTitle>Occupancy Trend</CardTitle>
               <CardDescription>Weekly occupancy rate for this month.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={occupancyData}>
                    <defs>
                      <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tickFormatter={(value) => `${value}%`} />
                    <Tooltip />
                    <Area type="monotone" dataKey="rate" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRate)" />
                  </AreaChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>
         
         <Card>
            <CardHeader>
               <CardTitle>Tenant Distribution</CardTitle>
               <CardDescription>Breakdown by tenant type.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tenantTypeData} layout="vertical">
                     <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                     <XAxis type="number" axisLine={false} tickLine={false} />
                     <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} />
                     <Tooltip />
                     <Bar dataKey="count" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={30} />
                  </BarChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>
      </div>
    </DashboardLayout>
  );
}
