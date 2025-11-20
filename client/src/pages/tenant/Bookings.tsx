import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BOOKINGS } from "@/lib/mockData";
import { Calendar, MapPin, Download, FileText, AlertCircle, Clock, CreditCard, ChevronRight, LogOut, PenTool } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function TenantBookings() {
  return (
    <DashboardLayout type="tenant">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">My Bookings</h2>
        <p className="text-muted-foreground">View and manage your accommodation history.</p>
      </div>

      <div className="space-y-6">
        {BOOKINGS.map((booking) => (
          <Card key={booking.id}>
            <CardHeader className="pb-4 border-b bg-muted/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">{booking.hostelName}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {booking.roomType}
                  </div>
                </div>
                <Badge className={booking.status === 'Active' ? 'bg-green-600' : 'bg-muted text-muted-foreground'}>
                  {booking.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground font-medium uppercase">Dates</span>
                  <div className="flex items-center gap-2 font-medium">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {booking.checkIn} — {booking.checkOut}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground font-medium uppercase">Payment</span>
                  <div className="font-medium">৳{booking.price} / month</div>
                </div>
                <div className="flex items-center md:justify-end gap-3">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Receipt
                  </Button>
                  
                  {booking.status === 'Active' && (
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button size="sm">Manage Booking</Button>
                      </SheetTrigger>
                      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                        <SheetHeader className="mb-6">
                          <SheetTitle>Manage Booking</SheetTitle>
                          <SheetDescription>
                            {booking.hostelName} • {booking.roomType}
                          </SheetDescription>
                        </SheetHeader>

                        <Tabs defaultValue="actions" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="actions">Actions</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="payments">Payments</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="actions" className="mt-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <Button variant="outline" className="h-24 flex flex-col gap-2 items-center justify-center hover:bg-primary/5 border-dashed">
                                <AlertCircle className="h-6 w-6 text-orange-500" />
                                <span>Report Issue</span>
                              </Button>
                              <Button variant="outline" className="h-24 flex flex-col gap-2 items-center justify-center hover:bg-primary/5 border-dashed">
                                <Clock className="h-6 w-6 text-blue-500" />
                                <span>Extend Stay</span>
                              </Button>
                              <Button variant="outline" className="h-24 flex flex-col gap-2 items-center justify-center hover:bg-primary/5 border-dashed">
                                <PenTool className="h-6 w-6 text-purple-500" />
                                <span>Sign Documents</span>
                              </Button>
                              <Button variant="outline" className="h-24 flex flex-col gap-2 items-center justify-center hover:bg-destructive/5 border-dashed hover:border-destructive/50 hover:text-destructive">
                                <LogOut className="h-6 w-6" />
                                <span>Notice to Vacate</span>
                              </Button>
                            </div>

                            <div className="space-y-4">
                              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Quick Actions</h4>
                              <div className="space-y-2">
                                <Button variant="ghost" className="w-full justify-between">
                                  <span className="flex items-center gap-2"><Download className="h-4 w-4" /> Download Rental Agreement</span>
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </Button>
                                <Separator />
                                <Button variant="ghost" className="w-full justify-between">
                                  <span className="flex items-center gap-2"><FileText className="h-4 w-4" /> View House Rules</span>
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </Button>
                                <Separator />
                                <Button variant="ghost" className="w-full justify-between">
                                  <span className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> Update Payment Method</span>
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </Button>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="details" className="mt-6 space-y-6">
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Check-in Date</span>
                                  <p className="font-medium">{booking.checkIn}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Check-out Date</span>
                                  <p className="font-medium">{booking.checkOut}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Monthly Rent</span>
                                  <p className="font-medium">৳{booking.price}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Security Deposit</span>
                                  <p className="font-medium">৳{booking.price * 2}</p>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div>
                                <span className="text-muted-foreground text-sm">Amenities included</span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <Badge variant="secondary">WiFi</Badge>
                                  <Badge variant="secondary">Cleaning</Badge>
                                  <Badge variant="secondary">Electricity</Badge>
                                  <Badge variant="secondary">Water</Badge>
                                </div>
                              </div>

                              <Separator />

                              <div>
                                <span className="text-muted-foreground text-sm">Property Manager</span>
                                <div className="flex items-center gap-3 mt-3">
                                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold">
                                    PM
                                  </div>
                                  <div>
                                    <p className="font-medium">Hostel Admin</p>
                                    <p className="text-xs text-muted-foreground">admin@hostel.com</p>
                                  </div>
                                  <Button variant="outline" size="sm" className="ml-auto">Contact</Button>
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="payments" className="mt-6">
                            <div className="space-y-4">
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm font-medium">Next Payment Due</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold">৳{booking.price}</div>
                                  <p className="text-xs text-muted-foreground">Due on Aug 25, 2025</p>
                                  <Button className="w-full mt-4">Pay Now</Button>
                                </CardContent>
                              </Card>

                              <div>
                                <h4 className="text-sm font-medium mb-3">Payment History</h4>
                                <div className="space-y-3">
                                  {[1,2,3].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                                      <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                          <CreditCard className="h-4 w-4" />
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">Rent Payment</p>
                                          <p className="text-xs text-muted-foreground">July {25-i}, 2025</p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-sm font-medium">৳{booking.price}</p>
                                        <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">Paid</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                        
                        <SheetFooter className="mt-8">
                          <SheetClose asChild>
                             <Button variant="outline" className="w-full">Close</Button>
                          </SheetClose>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
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
