import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle2, Clock, PenTool, Plus } from "lucide-react";

const ISSUES = [
  { id: 1, title: "Leaking Tap", room: "101", priority: "High", status: "Pending", assignedTo: "Rahim Mia" },
  { id: 2, title: "WiFi Signal Weak", room: "204", priority: "Medium", status: "In Progress", assignedTo: "Abdul Karim" },
  { id: 3, title: "Bulb Replacement", room: "305", priority: "Low", status: "Resolved", assignedTo: "Rahim Mia" },
];

export default function OwnerMaintenance() {
  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Maintenance</h2>
          <p className="text-muted-foreground">Track and assign maintenance requests.</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2"/> New Request</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
           <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Pending</CardTitle></CardHeader>
           <CardContent><div className="text-2xl font-bold text-orange-500">5</div></CardContent>
        </Card>
        <Card>
           <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">In Progress</CardTitle></CardHeader>
           <CardContent><div className="text-2xl font-bold text-blue-500">3</div></CardContent>
        </Card>
        <Card>
           <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Resolved (This Month)</CardTitle></CardHeader>
           <CardContent><div className="text-2xl font-bold text-green-500">12</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
           <Tabs defaultValue="all" className="w-full">
             <div className="flex justify-between items-center">
               <CardTitle>Requests</CardTitle>
               <TabsList>
                 <TabsTrigger value="all">All</TabsTrigger>
                 <TabsTrigger value="pending">Pending</TabsTrigger>
                 <TabsTrigger value="resolved">Resolved</TabsTrigger>
               </TabsList>
             </div>
           </Tabs>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
             {ISSUES.map(issue => (
               <div key={issue.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                     <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        issue.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-muted text-muted-foreground'
                     }`}>
                        <AlertCircle className="h-5 w-5" />
                     </div>
                     <div>
                        <h4 className="font-bold">{issue.title}</h4>
                        <p className="text-sm text-muted-foreground">Room {issue.room} • Assigned to {issue.assignedTo}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <Badge variant={issue.status === 'Pending' ? 'destructive' : 'outline'}>{issue.status}</Badge>
                     <Button variant="ghost" size="sm">Details</Button>
                  </div>
               </div>
             ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
