import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle2, Clock, PenTool, Plus, Save } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ISSUES = [
  { id: 1, title: "Leaking Tap", room: "101", priority: "High", status: "Pending", assignedTo: "Rahim Mia" },
  { id: 2, title: "WiFi Signal Weak", room: "204", priority: "Medium", status: "In Progress", assignedTo: "Abdul Karim" },
  { id: 3, title: "Bulb Replacement", room: "305", priority: "Low", status: "Resolved", assignedTo: "Rahim Mia" },
];

export default function OwnerMaintenance() {
  const { toast } = useToast();

  const handleCreateRequest = () => {
    toast({
      title: "Request Created",
      description: "Maintenance request has been logged and assigned.",
    });
  };

  const handleUpdateStatus = () => {
    toast({
      title: "Status Updated",
      description: "Maintenance request status has been updated.",
    });
  };

  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Maintenance</h2>
          <p className="text-muted-foreground">Track and assign maintenance requests.</p>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2"/> New Request</Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Log Maintenance Request</SheetTitle>
              <SheetDescription>Create a new ticket for repairs or issues.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
               <div className="space-y-2">
                  <Label>Issue Title</Label>
                  <Input placeholder="e.g. AC not cooling" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label>Room Number</Label>
                     <Input placeholder="e.g. 304" />
                  </div>
                  <div className="space-y-2">
                     <Label>Priority</Label>
                     <Select>
                        <SelectTrigger>
                           <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="low">Low</SelectItem>
                           <SelectItem value="medium">Medium</SelectItem>
                           <SelectItem value="high">High (Emergency)</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>
               <div className="space-y-2">
                  <Label>Assign To</Label>
                  <Select>
                     <SelectTrigger>
                        <SelectValue placeholder="Select Staff" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="rahim">Rahim Mia (Maintenance)</SelectItem>
                        <SelectItem value="karim">Abdul Karim (Manager)</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
               <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Details about the issue..." className="h-24" />
               </div>
            </div>
            <SheetFooter>
               <SheetClose asChild>
                  <Button onClick={handleCreateRequest}>Create Request</Button>
               </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
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
                     
                     <Sheet>
                       <SheetTrigger asChild>
                         <Button variant="ghost" size="sm">Details</Button>
                       </SheetTrigger>
                       <SheetContent>
                         <SheetHeader>
                           <SheetTitle>Request Details</SheetTitle>
                           <SheetDescription>Update status or add comments.</SheetDescription>
                         </SheetHeader>
                         <div className="py-6 space-y-6">
                            <div>
                               <h4 className="text-sm font-medium text-muted-foreground mb-1">Issue</h4>
                               <p className="text-lg font-semibold">{issue.title}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                               <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Room</h4>
                                  <p>{issue.room}</p>
                               </div>
                               <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Priority</h4>
                                  <Badge variant={issue.priority === 'High' ? 'destructive' : 'secondary'}>{issue.priority}</Badge>
                               </div>
                            </div>
                            
                            <div className="space-y-2">
                               <Label>Update Status</Label>
                               <Select defaultValue={issue.status.toLowerCase().replace(' ', '-')}>
                                  <SelectTrigger>
                                     <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                     <SelectItem value="pending">Pending</SelectItem>
                                     <SelectItem value="in-progress">In Progress</SelectItem>
                                     <SelectItem value="resolved">Resolved</SelectItem>
                                  </SelectContent>
                               </Select>
                            </div>

                            <div className="space-y-2">
                               <Label>Add Note</Label>
                               <Textarea placeholder="Add internal note..." />
                            </div>
                         </div>
                         <SheetFooter>
                            <SheetClose asChild>
                               <Button onClick={handleUpdateStatus}>Save Changes</Button>
                            </SheetClose>
                         </SheetFooter>
                       </SheetContent>
                     </Sheet>
                  </div>
               </div>
             ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
