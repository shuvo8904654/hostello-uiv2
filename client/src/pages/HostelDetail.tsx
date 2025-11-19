import { PublicLayout } from "@/components/layout/PublicLayout";
import { useRoute, Link } from "wouter";
import { HOSTELS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Wifi, Users, ShieldCheck, BedDouble, Calendar, CheckCircle } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/hooks/use-toast";

export default function HostelDetail() {
  const [match, params] = useRoute("/hostel/:id");
  const hostel = HOSTELS.find(h => h.id === params?.id);
  const { toast } = useToast();

  if (!hostel) return <div>Hostel not found</div>;

  const handleBook = () => {
    toast({
      title: "Request Sent! 🚀",
      description: "The owner will review your booking request shortly.",
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
          <div className="md:col-span-2 space-y-8">
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
                {hostel.city} • Near {hostel.university}
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
                      <div className="text-xl font-bold text-primary">£{room.price}<span className="text-sm text-muted-foreground font-normal">/week</span></div>
                      <div className="text-xs text-green-600 font-medium">{room.available} rooms left</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-card border rounded-2xl p-6 shadow-lg">
              <div className="mb-6">
                <span className="text-sm text-muted-foreground">Starts from</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">£{hostel.price}</span>
                  <span className="text-muted-foreground">/week</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <div className="border rounded-lg p-3">
                    <label className="text-xs text-muted-foreground block mb-1">Check-in</label>
                    <div className="font-medium flex items-center gap-2"><Calendar className="h-4 w-4" /> Sep 1</div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <label className="text-xs text-muted-foreground block mb-1">Duration</label>
                    <div className="font-medium">52 Weeks</div>
                  </div>
                </div>
                <Button size="lg" className="w-full font-bold text-lg" onClick={handleBook}>Request to Book</Button>
                <Button variant="outline" className="w-full">Message Owner</Button>
              </div>
              
              <div className="text-center text-xs text-muted-foreground">
                You won't be charged yet
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
