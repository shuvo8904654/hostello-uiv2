import { PublicLayout } from "@/components/layout/PublicLayout";
import { useRoute, Link } from "wouter";
import { HOSTELS, Review } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Wifi, Users, ShieldCheck, BedDouble, Calendar as CalendarIcon, CheckCircle, MessageSquare, User, X, Check } from "lucide-react";
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

export default function HostelDetail() {
  const [match, params] = useRoute("/hostel/:id");
  const [hostel, setHostel] = useState(HOSTELS.find(h => h.id === params?.id));
  const { toast } = useToast();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  
  // Booking State
  const [date, setDate] = useState<Date>();
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [isBookingSuccessOpen, setIsBookingSuccessOpen] = useState(false);

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

    setIsBookingSuccessOpen(true);
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

            {/* Reviews Section */}
            <div id="reviews" className="border-t pt-8">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Star className="h-6 w-6 fill-primary text-primary" /> 
                    {hostel.rating} · {hostel.reviews} Reviews
                  </h3>
                  
                  <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                     <DialogTrigger asChild>
                        <Button variant="outline">Write a Review</Button>
                     </DialogTrigger>
                     <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                           <DialogTitle>Rate your stay</DialogTitle>
                           <DialogDescription>Share your experience at {hostel.name} to help others.</DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                           <div className="space-y-2">
                              <Label>Rating</Label>
                              <div className="flex gap-2">
                                 {[1, 2, 3, 4, 5].map((star) => (
                                    <button 
                                       key={star} 
                                       type="button"
                                       onClick={() => setNewReview({...newReview, rating: star})}
                                       className="focus:outline-none"
                                    >
                                       <Star 
                                          className={`h-8 w-8 ${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                                       />
                                    </button>
                                 ))}
                              </div>
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="comment">Your Review</Label>
                              <Textarea 
                                 id="comment" 
                                 placeholder="Tell us about the room, amenities, and overall vibe..." 
                                 value={newReview.comment}
                                 onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                                 rows={4}
                              />
                           </div>
                        </div>
                        <DialogFooter>
                           <Button onClick={handleSubmitReview}>Post Review</Button>
                        </DialogFooter>
                     </DialogContent>
                  </Dialog>
               </div>

               {/* Rating Breakdown Mockup */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 mb-8">
                  <div className="flex items-center justify-between text-sm">
                     <span>Cleanliness</span>
                     <div className="flex items-center gap-2 w-1/2">
                        <Progress value={95} className="h-2" />
                        <span className="text-muted-foreground">4.9</span>
                     </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span>Communication</span>
                     <div className="flex items-center gap-2 w-1/2">
                        <Progress value={90} className="h-2" />
                        <span className="text-muted-foreground">4.8</span>
                     </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span>Check-in</span>
                     <div className="flex items-center gap-2 w-1/2">
                        <Progress value={98} className="h-2" />
                        <span className="text-muted-foreground">5.0</span>
                     </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span>Accuracy</span>
                     <div className="flex items-center gap-2 w-1/2">
                        <Progress value={85} className="h-2" />
                        <span className="text-muted-foreground">4.5</span>
                     </div>
                  </div>
               </div>

               {/* Reviews Grid */}
               <div className="grid md:grid-cols-2 gap-6">
                  {hostel.reviewsList && hostel.reviewsList.length > 0 ? (
                     hostel.reviewsList.map((review) => (
                        <div key={review.id} className="p-4 rounded-xl bg-muted/30 space-y-3">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <Avatar>
                                    <AvatarFallback>{review.avatar || review.user[0]}</AvatarFallback>
                                 </Avatar>
                                 <div>
                                    <p className="font-semibold text-sm">{review.user}</p>
                                    <p className="text-xs text-muted-foreground">{review.date}</p>
                                 </div>
                              </div>
                              <div className="flex items-center">
                                 <Star className="h-3 w-3 fill-primary text-primary mr-1" />
                                 <span className="font-medium text-sm">{review.rating}</span>
                              </div>
                           </div>
                           <p className="text-sm text-muted-foreground leading-relaxed">
                              {review.comment}
                           </p>
                        </div>
                     ))
                  ) : (
                     <div className="col-span-2 text-center py-8 text-muted-foreground">
                        No reviews yet. Be the first to share your experience!
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
                  <Select value={selectedRoom} onValueChange={setSelectedRoom}>
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
                          {selectedRoom 
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
