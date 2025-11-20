import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar as CalendarIcon, Clock, User, CheckCircle, XCircle, Download, Save } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const BOOKINGS = [
  { id: 1, guest: "Rahim Ahmed", room: "101", status: "Confirmed", date: "2024-08-20", type: "Online" },
  { id: 2, guest: "Fatima Khan", room: "204", status: "Pending", date: "2024-08-21", type: "Online" },
  { id: 3, guest: "Guest (Walk-in)", room: "105", status: "Confirmed", date: "2024-08-22", type: "Offline" },
];

export default function OwnerBookings() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Exporting Bookings",
      description: "Your bookings report is being generated and will download shortly.",
    });
  };

  const handleApprove = () => {
    toast({
      title: "Booking Approved",
      description: "The booking has been confirmed and the guest notified.",
    });
  };

  const handleReject = () => {
    toast({
      title: "Booking Rejected",
      description: "The booking request has been declined.",
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bookings & Reservations</h2>
          <p className="text-muted-foreground">Manage online and offline bookings.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}><Download className="h-4 w-4 mr-2"/> Export</Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2"/> New Booking</Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>New Booking</SheetTitle>
                <SheetDescription>
                  Create a manual booking for walk-in guests or offline reservations.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Guest Name</Label>
                  <Input placeholder="Enter full name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input placeholder="+880..." />
                  </div>
                  <div className="space-y-2">
                     <Label>Email (Optional)</Label>
                     <Input placeholder="guest@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <Label>Room</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select room" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="101">Room 101 (Available)</SelectItem>
                          <SelectItem value="102">Room 102 (Available)</SelectItem>
                          <SelectItem value="205">Room 205 (Available)</SelectItem>
                        </SelectContent>
                      </Select>
                   </div>
                   <div className="space-y-2">
                      <Label>Duration</Label>
                      <Select defaultValue="monthly">
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                   </div>
                </div>
                <div className="space-y-2">
                   <Label>Payment Status</Label>
                   <Select defaultValue="pending">
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending Payment</SelectItem>
                        <SelectItem value="partial">Partial Payment</SelectItem>
                      </SelectContent>
                   </Select>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                   <Button type="submit">Confirm Booking</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" className="rounded-md border w-full flex justify-center" />
            <div className="mt-4 space-y-2">
               <div className="text-sm font-medium">Upcoming Check-ins</div>
               {BOOKINGS.map(b => (
                 <div key={b.id} className="flex items-center justify-between p-2 border rounded bg-background">
                    <div className="flex items-center gap-2">
                       <User className="h-4 w-4 text-muted-foreground"/>
                       <span className="text-sm font-medium">{b.guest}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">{b.date}</Badge>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
             <div className="flex justify-between items-center">
               <CardTitle>Booking Requests</CardTitle>
               <Tabs defaultValue="all">
                 <TabsList>
                   <TabsTrigger value="all">All</TabsTrigger>
                   <TabsTrigger value="online">Online</TabsTrigger>
                   <TabsTrigger value="offline">Offline</TabsTrigger>
                 </TabsList>
               </Tabs>
             </div>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {BOOKINGS.map(booking => (
                  <div key={booking.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4">
                     <div className="flex gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                           <CalendarIcon className="h-6 w-6" />
                        </div>
                        <div>
                           <h4 className="font-bold">{booking.guest}</h4>
                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="secondary" className="h-5">{booking.type}</Badge>
                              <span>Room {booking.room} • {booking.date}</span>
                           </div>
                        </div>
                     </div>
                     
                     <div className="flex gap-2 w-full sm:w-auto">
                        {booking.status === 'Pending' ? (
                           <>
                             <Dialog>
                               <DialogTrigger asChild>
                                 <Button size="sm" variant="outline" className="flex-1 sm:flex-none text-destructive hover:text-destructive border-destructive/20">Reject</Button>
                               </DialogTrigger>
                               <DialogContent>
                                 <DialogHeader>
                                   <DialogTitle>Reject Booking Request</DialogTitle>
                                   <DialogDescription>
                                     Are you sure you want to reject this request? This action cannot be undone.
                                   </DialogDescription>
                                 </DialogHeader>
                                 <div className="py-2">
                                   <Label>Reason for Rejection</Label>
                                   <Input placeholder="e.g., Room unavailable, Incomplete profile" className="mt-2" />
                                 </div>
                                 <DialogFooter>
                                   <Button variant="outline" onClick={() => {}}>Cancel</Button>
                                   <Button variant="destructive" onClick={handleReject}>Confirm Reject</Button>
                                 </DialogFooter>
                               </DialogContent>
                             </Dialog>
                             <Button size="sm" className="flex-1 sm:flex-none" onClick={handleApprove}>Approve</Button>
                           </>
                        ) : (
                           <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'} className="bg-green-600">
                              {booking.status}
                           </Badge>
                        )}
                     </div>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
