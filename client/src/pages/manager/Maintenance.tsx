import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

const REQUESTS = [
  { id: 1, title: "Leaking Faucet", room: "101", status: "Open", priority: "High", date: "2024-08-20", description: "Bathroom faucet is dripping constantly." },
  { id: 2, title: "WiFi Signal Weak", room: "204", status: "In Progress", priority: "Medium", date: "2024-08-19", description: "Internet disconnects frequently." },
  { id: 3, title: "Light Bulb Fuse", room: "105", status: "Resolved", priority: "Low", date: "2024-08-18", description: "Main light not working." },
];

export default function ManagerMaintenance() {
  const { toast } = useToast();

  const handleStatusChange = (id: number, status: string) => {
     toast({
        title: "Status Updated",
        description: `Request #${id} marked as ${status}.`
     });
  };

  return (
    <DashboardLayout type="manager">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Maintenance Requests</h2>
          <p className="text-muted-foreground">Track and resolve maintenance issues for Dhaka Hub.</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2"/> Log Issue</Button>
          </SheetTrigger>
          <SheetContent>
             <SheetHeader>
                <SheetTitle>Log Maintenance Issue</SheetTitle>
                <SheetDescription>Record a new issue reported by a tenant or staff.</SheetDescription>
             </SheetHeader>
             <div className="grid gap-4 py-4">
                <div className="space-y-2">
                   <Label>Issue Title</Label>
                   <Input placeholder="e.g. Broken Lock" />
                </div>
                <div className="space-y-2">
                   <Label>Room / Area</Label>
                   <Input placeholder="e.g. Room 302 or Kitchen" />
                </div>
                <div className="space-y-2">
                   <Label>Description</Label>
                   <Textarea placeholder="Describe the issue in detail..." />
                </div>
             </div>
             <SheetFooter>
                <SheetClose asChild>
                   <Button>Submit Ticket</Button>
                </SheetClose>
             </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-4">
        {REQUESTS.map((req) => (
          <Card key={req.id}>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-start gap-4">
                   <div className={`p-2 rounded-full shrink-0 ${req.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                      <Wrench className="h-5 w-5" />
                   </div>
                   <div>
                      <div className="flex items-center gap-2 mb-1">
                         <h3 className="font-semibold">{req.title}</h3>
                         <Badge variant={req.status === 'Open' ? 'destructive' : req.status === 'Resolved' ? 'default' : 'secondary'}>
                            {req.status}
                         </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{req.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                         <span className="flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {req.priority} Priority</span>
                         <span>•</span>
                         <span>Room {req.room}</span>
                         <span>•</span>
                         <span>{req.date}</span>
                      </div>
                   </div>
                </div>
                <div className="flex sm:flex-col gap-2 justify-end">
                   {req.status !== 'Resolved' && (
                      <Button size="sm" variant="outline" onClick={() => handleStatusChange(req.id, 'Resolved')}>
                         <CheckCircle className="h-4 w-4 mr-2" /> Mark Resolved
                      </Button>
                   )}
                   {req.status === 'Open' && (
                      <Button size="sm" variant="ghost" onClick={() => handleStatusChange(req.id, 'In Progress')}>
                         <Clock className="h-4 w-4 mr-2" /> Start Work
                      </Button>
                   )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
