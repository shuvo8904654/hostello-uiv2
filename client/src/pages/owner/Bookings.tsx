import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle, 
  Download, 
  Save, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  LogIn, 
  LogOut, 
  CreditCard, 
  Ban, 
  Search, 
  Filter
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

// Enhanced Mock Data
const BOOKINGS = [
  { 
    id: 1, 
    guest: "Rahim Ahmed", 
    room: "101", 
    status: "Confirmed", 
    checkIn: "2024-08-20", 
    checkOut: "2024-08-25", 
    type: "Online",
    email: "rahim.ahmed@example.com",
    phone: "+8801712345678",
    totalAmount: 5000,
    paidAmount: 5000,
    paymentStatus: "Paid"
  },
  { 
    id: 2, 
    guest: "Fatima Khan", 
    room: "204", 
    status: "Pending", 
    checkIn: "2024-08-21", 
    checkOut: "2024-08-23", 
    type: "Online",
    email: "fatima.k@example.com",
    phone: "+8801812345678",
    totalAmount: 3000,
    paidAmount: 0,
    paymentStatus: "Pending"
  },
  { 
    id: 3, 
    guest: "Guest (Walk-in)", 
    room: "105", 
    status: "Checked-In", 
    checkIn: "2024-08-22", 
    checkOut: "2024-08-24", 
    type: "Offline",
    email: "walkin@hostel.com",
    phone: "+8801912345678",
    totalAmount: 2000,
    paidAmount: 1000,
    paymentStatus: "Partial"
  },
  { 
    id: 4, 
    guest: "Karim Ullah", 
    room: "302", 
    status: "Checked-Out", 
    checkIn: "2024-08-15", 
    checkOut: "2024-08-18", 
    type: "Online",
    email: "karim@example.com",
    phone: "+8801612345678",
    totalAmount: 4500,
    paidAmount: 4500,
    paymentStatus: "Paid"
  },
];

export default function OwnerBookings() {
  const { toast } = useToast();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  const handleExport = () => {
    toast({
      title: "Exporting Bookings",
      description: "Your bookings report is being generated and will download shortly.",
    });
  };

  const handleApprove = (id: number) => {
    toast({
      title: "Booking Approved",
      description: `Booking #${id} has been confirmed and the guest notified.`,
    });
  };

  const handleReject = () => {
    toast({
      title: "Booking Rejected",
      description: "The booking request has been declined.",
      variant: "destructive",
    });
    setIsRejectOpen(false);
  };

  const handleCheckIn = (id: number) => {
    toast({
      title: "Guest Checked In",
      description: `Guest for booking #${id} has been checked in successfully.`,
    });
  };

  const handleCheckOut = (id: number) => {
    toast({
      title: "Guest Checked Out",
      description: `Guest for booking #${id} has been checked out. Room is now available.`,
    });
  };

  const openDetails = (booking: any) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  const openRejectDialog = (booking: any) => {
    setSelectedBooking(booking);
    setIsRejectOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed': return <Badge className="bg-green-600 hover:bg-green-700">Confirmed</Badge>;
      case 'Pending': return <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">Pending</Badge>;
      case 'Checked-In': return <Badge className="bg-blue-600 hover:bg-blue-700">Checked-In</Badge>;
      case 'Checked-Out': return <Badge variant="outline" className="text-muted-foreground">Checked-Out</Badge>;
      case 'Cancelled': return <Badge variant="destructive">Cancelled</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bookings & Reservations</h2>
          <p className="text-muted-foreground">Manage online and offline bookings, check-ins, and payments.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={handleExport}><Download className="h-4 w-4 mr-2"/> Export</Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2"/> New Booking</Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
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
                      <Label>Check-in Date</Label>
                      <Input type="date" />
                   </div>
                   <div className="space-y-2">
                      <Label>Check-out Date</Label>
                      <Input type="date" />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <Label>Room Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single Bed</SelectItem>
                          <SelectItem value="shared">Shared Room</SelectItem>
                          <SelectItem value="private">Private Room</SelectItem>
                        </SelectContent>
                      </Select>
                   </div>
                   <div className="space-y-2">
                      <Label>Room Number</Label>
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
                </div>
                <div className="space-y-2">
                   <Label>Total Amount (৳)</Label>
                   <Input type="number" placeholder="0.00" />
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
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" className="rounded-md border w-full flex justify-center" />
            <div className="mt-6 space-y-4">
               <div className="flex items-center justify-between">
                 <h4 className="text-sm font-medium">Upcoming Check-ins</h4>
                 <Badge variant="outline" className="text-xs">Today</Badge>
               </div>
               {BOOKINGS.filter(b => b.status === 'Confirmed' || b.status === 'Pending').slice(0, 3).map(b => (
                 <div key={b.id} className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => openDetails(b)}>
                    <div className="flex items-center gap-3">
                       <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User className="h-4 w-4"/>
                       </div>
                       <div>
                          <div className="text-sm font-medium leading-none">{b.guest}</div>
                          <div className="text-xs text-muted-foreground mt-1">Room {b.room}</div>
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="text-xs font-medium">{b.checkIn}</div>
                       <Badge variant="secondary" className="text-[10px] h-5 mt-1">{b.status}</Badge>
                    </div>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
             <div className="flex flex-col space-y-4">
               <div className="flex justify-between items-center">
                 <CardTitle>All Bookings</CardTitle>
                 <Tabs defaultValue="all" className="w-auto">
                   <TabsList>
                     <TabsTrigger value="all">All</TabsTrigger>
                     <TabsTrigger value="online">Online</TabsTrigger>
                     <TabsTrigger value="offline">Offline</TabsTrigger>
                   </TabsList>
                 </Tabs>
               </div>
               
               {/* Filters */}
               <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search guests, rooms..." className="pl-8" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="checked-in">Checked In</SelectItem>
                      <SelectItem value="checked-out">Checked Out</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
             </div>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {BOOKINGS.map(booking => (
                  <div key={booking.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4 bg-card hover:bg-muted/20 transition-colors">
                     <div className="flex gap-4 cursor-pointer flex-1" onClick={() => openDetails(booking)}>
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                           <CalendarIcon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold truncate">{booking.guest}</h4>
                              {getStatusBadge(booking.status)}
                           </div>
                           <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1"><Badge variant="outline" className="h-5 px-1 font-normal">{booking.type}</Badge></span>
                              <span>Room {booking.room}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {booking.checkIn} - {booking.checkOut}</span>
                           </div>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        {booking.status === 'Pending' ? (
                           <>
                             <Button size="sm" variant="outline" className="text-destructive hover:text-destructive border-destructive/20" onClick={() => openRejectDialog(booking)}>Reject</Button>
                             <Button size="sm" onClick={() => handleApprove(booking.id)}>Approve</Button>
                           </>
                        ) : (
                           <DropdownMenu>
                             <DropdownMenuTrigger asChild>
                               <Button variant="ghost" size="icon">
                                 <MoreHorizontal className="h-4 w-4" />
                               </Button>
                             </DropdownMenuTrigger>
                             <DropdownMenuContent align="end" className="w-48">
                               <DropdownMenuLabel>Actions</DropdownMenuLabel>
                               <DropdownMenuItem onClick={() => openDetails(booking)}>
                                 <Eye className="mr-2 h-4 w-4" /> View Details
                               </DropdownMenuItem>
                               <DropdownMenuItem>
                                 <Edit className="mr-2 h-4 w-4" /> Edit Booking
                               </DropdownMenuItem>
                               <DropdownMenuSeparator />
                               
                               {booking.status === 'Confirmed' && (
                                 <>
                                    <DropdownMenuItem onClick={() => handleCheckIn(booking.id)}>
                                      <LogIn className="mr-2 h-4 w-4 text-green-600" /> Check In
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                                      <Ban className="mr-2 h-4 w-4" /> Cancel Booking
                                    </DropdownMenuItem>
                                 </>
                               )}
                               
                               {booking.status === 'Checked-In' && (
                                  <DropdownMenuItem onClick={() => handleCheckOut(booking.id)}>
                                    <LogOut className="mr-2 h-4 w-4 text-orange-600" /> Check Out
                                  </DropdownMenuItem>
                               )}

                               <DropdownMenuSeparator />
                               <DropdownMenuItem>
                                 <CreditCard className="mr-2 h-4 w-4" /> Record Payment
                               </DropdownMenuItem>
                             </DropdownMenuContent>
                           </DropdownMenu>
                        )}
                     </div>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Full details for booking #{selectedBooking?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="grid gap-4 py-2">
              <div className="flex items-center justify-between pb-4 border-b">
                 <div>
                    <h3 className="font-bold text-lg">{selectedBooking.guest}</h3>
                    <p className="text-sm text-muted-foreground">{selectedBooking.email}</p>
                    <p className="text-sm text-muted-foreground">{selectedBooking.phone}</p>
                 </div>
                 <div className="text-right">
                    {getStatusBadge(selectedBooking.status)}
                    <p className="text-xs text-muted-foreground mt-2">{selectedBooking.type} Booking</p>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                 <div>
                    <Label className="text-xs text-muted-foreground">Check In</Label>
                    <p className="font-medium">{selectedBooking.checkIn}</p>
                 </div>
                 <div>
                    <Label className="text-xs text-muted-foreground">Check Out</Label>
                    <p className="font-medium">{selectedBooking.checkOut}</p>
                 </div>
                 <div>
                    <Label className="text-xs text-muted-foreground">Room</Label>
                    <p className="font-medium">Room {selectedBooking.room}</p>
                 </div>
                 <div>
                    <Label className="text-xs text-muted-foreground">Guests</Label>
                    <p className="font-medium">1 Adult</p>
                 </div>
              </div>

              <div className="bg-muted/30 p-3 rounded-md space-y-2">
                 <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="font-medium">৳{selectedBooking.totalAmount}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Paid</span>
                    <span className="font-medium text-green-600">৳{selectedBooking.paidAmount}</span>
                 </div>
                 <div className="flex justify-between text-sm border-t pt-2">
                    <span className="font-medium">Due</span>
                    <span className="font-bold text-destructive">৳{selectedBooking.totalAmount - selectedBooking.paidAmount}</span>
                 </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
             <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Close</Button>
             {selectedBooking?.status === 'Confirmed' && (
                <Button onClick={() => {
                   handleCheckIn(selectedBooking.id);
                   setIsDetailsOpen(false);
                }}>Check In Guest</Button>
             )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
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
             <Button variant="outline" onClick={() => setIsRejectOpen(false)}>Cancel</Button>
             <Button variant="destructive" onClick={handleReject}>Confirm Reject</Button>
           </DialogFooter>
         </DialogContent>
      </Dialog>

    </DashboardLayout>
  );
}
