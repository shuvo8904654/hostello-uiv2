import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BOOKINGS } from "@/lib/mockData";
import { Calendar, MapPin, Download, FileText, AlertCircle, Clock, CreditCard, ChevronRight, LogOut, PenTool, Upload, Star, MessageSquare } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function TenantBookings() {
  const [date, setDate] = useState<string>("");
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmitReview = () => {
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback! Your review has been posted.",
    });
    setRating(0);
    setComment("");
  };

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

                  {booking.status === 'Completed' && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="secondary">
                          <Star className="h-4 w-4 mr-2" /> Leave Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Rate Your Stay</DialogTitle>
                          <DialogDescription>
                            How was your experience at {booking.hostelName}?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label>Rating</Label>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-8 w-8 cursor-pointer transition-colors ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30 hover:text-yellow-400"}`}
                                  onClick={() => setRating(star)}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Your Review</Label>
                            <Textarea 
                              placeholder="Tell us what you liked or didn't like..." 
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="h-32"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleSubmitReview} disabled={rating === 0}>Submit Review</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                  
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
                              {/* Report Issue Dialog */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" className="h-24 flex flex-col gap-2 items-center justify-center hover:bg-primary/5 border-dashed">
                                    <AlertCircle className="h-6 w-6 text-orange-500" />
                                    <span>Report Issue</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Report an Issue</DialogTitle>
                                    <DialogDescription>
                                      Describe the problem you're facing. We'll alert the property manager.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                      <Label>Category</Label>
                                      <Select>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="plumbing">Plumbing</SelectItem>
                                          <SelectItem value="electrical">Electrical</SelectItem>
                                          <SelectItem value="furniture">Furniture/Appliance</SelectItem>
                                          <SelectItem value="internet">Internet/WiFi</SelectItem>
                                          <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Description</Label>
                                      <Textarea placeholder="Please provide details about the issue..." className="h-24" />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Photos (Optional)</Label>
                                      <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 cursor-pointer">
                                        <Upload className="h-6 w-6 mb-2" />
                                        <span className="text-xs">Click to upload photos</span>
                                      </div>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button type="submit">Submit Report</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              {/* Extend Stay Dialog */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" className="h-24 flex flex-col gap-2 items-center justify-center hover:bg-primary/5 border-dashed">
                                    <Clock className="h-6 w-6 text-blue-500" />
                                    <span>Extend Stay</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Request to Extend Stay</DialogTitle>
                                    <DialogDescription>
                                      Current checkout date: {booking.checkOut}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                      <Label>New Checkout Date</Label>
                                      <Input type="date" />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Reason (Optional)</Label>
                                      <Textarea placeholder="Any specific notes for the manager?" />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button type="submit">Send Request</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              {/* Sign Documents Dialog */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" className="h-24 flex flex-col gap-2 items-center justify-center hover:bg-primary/5 border-dashed">
                                    <PenTool className="h-6 w-6 text-purple-500" />
                                    <span>Sign Documents</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Pending Documents</DialogTitle>
                                    <DialogDescription>
                                      Please review and sign the following documents.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4 space-y-4">
                                    <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/10">
                                      <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded flex items-center justify-center">
                                          <FileText className="h-4 w-4" />
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">House Rules Acknowledgement</p>
                                          <p className="text-xs text-muted-foreground">Required by management</p>
                                        </div>
                                      </div>
                                      <Button size="sm">Sign Now</Button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/10">
                                      <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded flex items-center justify-center">
                                          <FileText className="h-4 w-4" />
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">Updated Lease Terms</p>
                                          <p className="text-xs text-muted-foreground">Added on Nov 15</p>
                                        </div>
                                      </div>
                                      <Button size="sm" variant="outline">View</Button>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline">Close</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              {/* Notice to Vacate Dialog */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" className="h-24 flex flex-col gap-2 items-center justify-center hover:bg-destructive/5 border-dashed hover:border-destructive/50 hover:text-destructive">
                                    <LogOut className="h-6 w-6" />
                                    <span>Notice to Vacate</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle className="text-destructive">Notice to Vacate</DialogTitle>
                                    <DialogDescription>
                                      We're sorry to see you go. Please let us know when you plan to move out.
                                      Note: A 30-day notice is typically required.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                      <Label>Planned Move-out Date</Label>
                                      <Input type="date" />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Reason for Leaving</Label>
                                      <Select>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select reason" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="end">Lease Ended</SelectItem>
                                          <SelectItem value="relocation">Relocating</SelectItem>
                                          <SelectItem value="expensive">Too Expensive</SelectItem>
                                          <SelectItem value="issues">Property Issues</SelectItem>
                                          <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Feedback (Optional)</Label>
                                      <Textarea placeholder="Any feedback on your stay?" />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="destructive">Submit Notice</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
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
