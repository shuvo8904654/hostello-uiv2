import { PublicLayout } from "@/components/layout/PublicLayout";
import { useRoute, Link } from "wouter";
import { HOSTELS, Review } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Wifi, Users, ShieldCheck, BedDouble, Calendar as CalendarIcon, CheckCircle, MessageSquare, User, X, Check, Package } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Input } from "@/components/ui/input";

export default function HostelDetail() {
  const [match, params] = useRoute("/hostel/:id");
  const [hostel, setHostel] = useState(HOSTELS.find(h => h.id === params?.id));
  const { toast } = useToast();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  
  // Booking State
  const [date, setDate] = useState<Date>();
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [isBookingSuccessOpen, setIsBookingSuccessOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" });

  if (!hostel) return <div>Hostel not found</div>;

  const handleBook = () => {
    if (!date) {
      toast({
        title: "Select a date",
        description: "Please select a check-in date to continue.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedPackage) {
        toast({
          title: "Select a package",
          description: "Please select a package to continue.",
          variant: "destructive"
        });
        return;
    }

    // Open Sign Up modal instead of direct success
    setIsSignUpOpen(true);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpData.name || !signUpData.email || !signUpData.password) {
        toast({
            title: "Missing information",
            description: "Please fill in all fields to create your account.",
            variant: "destructive"
        });
        return;
    }

    setIsSignUpOpen(false);
    
    toast({
        title: "Account Created! 🎉",
        description: "Welcome to Hostello. Completing your booking...",
    });

    // Proceed to booking success
    setTimeout(() => {
        setIsBookingSuccessOpen(true);
    }, 500);
  };

  const confirmBooking = () => {
    setIsBookingSuccessOpen(false);
    toast({
      title: "Booking Confirmed! 🎉",
      description: "We've sent the details to your email.",
    });
    // Reset form
    setDate(undefined);
    setSelectedRoom("");
    setSelectedPackage("");
  };

  const handleSubmitReview = () => {
    if (!newReview.comment.trim()) return;
    
    const review: Review = {
      id: `new-${Date.now()}`,
      user: 'You (Verified Tenant)',
      rating: newReview.rating,
      date: 'Just now',
      comment: newReview.comment,
      avatar: 'ME'
    };

    // Update local state to show new review immediately
    const updatedHostel = {
       ...hostel,
       reviewsList: [review, ...hostel.reviewsList],
       reviews: hostel.reviews + 1
    };
    setHostel(updatedHostel);
    
    setIsReviewOpen(false);
    setNewReview({ rating: 5, comment: '' });
    
    toast({
      title: "Review Posted! ⭐",
      description: "Thank you for sharing your experience.",
    });
  };

  return (
    <PublicLayout>
      {/* Image Gallery */}
      <div className="h-[500px] grid grid-cols-4 grid-rows-2 gap-2">
        <div className="col-span-2 row-span-2 relative group overflow-hidden">
          <img src={hostel.images[0]} alt={hostel.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="col-span-1 row-span-1 relative overflow-hidden">
          <img src={hostel.images[1]} alt="Room" className="w-full h-full object-cover" />
        </div>
        <div className="col-span-1 row-span-1 relative overflow-hidden">
          <img src={hostel.images[2]} alt="Common Area" className="w-full h-full object-cover" />
        </div>
        <div className="col-span-2 row-span-1 relative overflow-hidden">
          <img src={hostel.images[3] || hostel.images[0]} alt="Detail" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-10">
            <div>
              <div className="flex items-center justify-between mb-2">
                 <h1 className="text-4xl font-bold text-foreground">{hostel.name}</h1>
                 <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                   <Star className="h-4 w-4 fill-current" />
                   {hostel.rating} ({hostel.reviews} reviews)
                 </div>
              </div>
              <div className="flex items-center text-muted-foreground text-lg mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                {hostel.location}, {hostel.city}
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-sm py-1 px-3">{hostel.type}</Badge>
                <Badge variant="outline" className="text-sm py-1 px-3">Verified Owner</Badge>
              </div>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-xl font-bold mb-3">About this place</h3>
              <p className="text-muted-foreground leading-relaxed">{hostel.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hostel.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Available Rooms</h3>
              <div className="space-y-4">
                {hostel.rooms.map(room => (
                  <div key={room.id} className="flex justify-between items-center p-4 border rounded-xl hover:border-primary/50 transition-colors bg-card">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-muted rounded-lg flex items-center justify-center">
                        <BedDouble className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{room.name}</h4>
                        <p className="text-sm text-muted-foreground">{room.type} • {room.capacity > 1 ? `Sleeps ${room.capacity}` : 'Single Occupancy'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">৳{room.price}<span className="text-sm text-muted-foreground font-normal">/month</span></div>
                      <div className="text-xs text-green-600 font-medium">{room.available} rooms left</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Packages Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">Packages & Offers</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {hostel.packages.map((pkg, index) => (
                  <div key={index} className="p-4 border rounded-xl hover:border-primary/50 transition-colors bg-primary/5">
                    <div className="flex justify-between items-start mb-2">
                       <div>
                          <h4 className="font-bold text-lg">{pkg.name}</h4>
                          <Badge variant="outline" className="mt-1 bg-background">{pkg.duration}</Badge>
                       </div>
                       <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div className="mt-4">
                       <div className="text-2xl font-bold text-primary">৳{pkg.price}</div>
                       <p className="text-xs text-muted-foreground">Best value for {pkg.duration.toLowerCase()} stays</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section - Public */}
            <div className="pt-8 border-t">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-2xl font-bold">Verified Tenant Reviews</h3>
              </div>
              
              <div className="grid gap-6">
                 {hostel.reviewsList.length > 0 ? (
                    hostel.reviewsList.map((review) => (
                       <div key={review.id} className="flex gap-4 p-4 border rounded-lg bg-card">
                          <Avatar>
                             <AvatarImage src={review.avatar} />
                             <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                             <div className="flex items-center justify-between mb-1">
                                <div>
                                   <h4 className="font-bold inline mr-2">{review.user}</h4>
                                   <Badge variant="secondary" className="text-[10px] h-5 px-1 bg-green-100 text-green-700 hover:bg-green-100 font-normal border-green-200">Verified Tenant</Badge>
                                </div>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                             </div>
                             <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                   <Star 
                                      key={i} 
                                      className={cn("h-4 w-4", i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30")} 
                                   />
                                ))}
                             </div>
                             <p className="text-muted-foreground">{review.comment}</p>
                          </div>
                       </div>
                    ))
                 ) : (
                    <div className="text-center py-12 text-muted-foreground">
                       <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                       <p>No reviews yet.</p>
                    </div>
                 )}
              </div>
            </div>

          </div>

          {/* Booking Card */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-card border rounded-2xl p-6 shadow-lg">
              <div className="mb-6">
                <span className="text-sm text-muted-foreground">Starts from</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">৳{hostel.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {/* Date Picker */}
                <div className="space-y-2">
                   <Label>Check-in Date</Label>
                   <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Room Type Selection */}
                <div className="space-y-2">
                  <Label>Select Room</Label>
                  <Select value={selectedRoom} onValueChange={(v) => { setSelectedRoom(v); setSelectedPackage(""); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a room type" />
                    </SelectTrigger>
                    <SelectContent>
                      {hostel.rooms.map(room => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.name} - ৳{room.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Package Selection */}
                <div className="space-y-2">
                  <Label>Select Package</Label>
                  <Select value={selectedPackage} onValueChange={(v) => { setSelectedPackage(v); setSelectedRoom(""); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a package" />
                    </SelectTrigger>
                    <SelectContent>
                      {hostel.packages.map((pkg, index) => (
                        <SelectItem key={index} value={pkg.name}>
                          {pkg.name} ({pkg.duration}) - ৳{pkg.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4 bg-muted/50 p-3 rounded-lg border">
                        <div className="mt-0.5"><CheckCircle className="h-4 w-4 text-green-600" /></div>
                        <div>
                            <span className="font-medium text-foreground">Pay on Arrival</span>
                            <p className="text-xs mt-1">Book now to reserve your spot. Payment is collected directly by the owner when you check in.</p>
                        </div>
                    </div>
                </div>

                <Button size="lg" className="w-full font-bold text-lg" onClick={handleBook}>Book Now</Button>
                <Button variant="outline" className="w-full">Message Owner</Button>
              </div>
            </div>
          </div>

            {/* Booking Success Modal */}
          <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold">Create Tenant Account</DialogTitle>
                    <DialogDescription className="text-center">
                        You need a Hostello account to manage your booking and communicate with the owner.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSignUp} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                            id="name" 
                            placeholder="John Doe" 
                            value={signUpData.name}
                            onChange={(e) => setSignUpData({...signUpData, name: e.target.value})}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="john@example.com" 
                            value={signUpData.email}
                            onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            placeholder="Create a password" 
                            value={signUpData.password}
                            onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                            required
                        />
                    </div>
                    <div className="pt-2">
                        <Button type="submit" className="w-full text-lg font-bold">
                            Create Account & Continue
                        </Button>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                        Already have an account? <Button variant="link" className="p-0 h-auto font-semibold" onClick={() => {
                            setIsSignUpOpen(false);
                            setIsBookingSuccessOpen(true); // Mock login flow
                        }}>Log in</Button>
                    </div>
                </form>
            </DialogContent>
          </Dialog>

          {/* Booking Success Modal */}
          <Dialog open={isBookingSuccessOpen} onOpenChange={setIsBookingSuccessOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <DialogTitle className="text-center text-xl">Booking Request Received!</DialogTitle>
                <DialogDescription className="text-center pt-2">
                  Your booking for <strong>{hostel.name}</strong> is pending confirmation.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                 <div className="bg-muted/30 p-4 rounded-lg space-y-3 text-sm">
                    <div className="flex justify-between">
                       <span className="text-muted-foreground">Check-in Date:</span>
                       <span className="font-medium">{date ? format(date, "MMMM do, yyyy") : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-muted-foreground">Payable Amount:</span>
                       <span className="font-bold text-primary">
                          {selectedPackage
                            ? `৳${hostel.packages.find(p => p.name === selectedPackage)?.price}`
                            : selectedRoom 
                                ? `৳${hostel.rooms.find(r => r.id === selectedRoom)?.price}` 
                                : `Starts from ৳${hostel.price}`}
                       </span>
                    </div>
                 </div>
                 <div className="text-center text-sm text-muted-foreground px-4">
                    To confirm this booking, please visit the property on the check-in date and pay the owner directly.
                 </div>
              </div>
              <DialogFooter className="sm:justify-center">
                <Button type="button" className="w-full sm:w-auto" onClick={confirmBooking}>
                  I Understand, Confirm Booking
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </PublicLayout>
  );
}
