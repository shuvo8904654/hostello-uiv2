import { Hostel } from "@/lib/mockData";
import { MapPin, Star, Wifi, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface HostelCardProps {
  hostel: Hostel;
}

export function HostelCard({ hostel }: HostelCardProps) {
  return (
    <div className="group rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={hostel.image} 
          alt={hostel.name} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-foreground px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          {hostel.rating}
        </div>
        <Badge className="absolute top-3 left-3 bg-primary/90 hover:bg-primary">
          {hostel.type}
        </Badge>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">{hostel.name}</h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-3 w-3 mr-1" />
              {hostel.location}, {hostel.city}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-3 mb-4 flex-wrap">
          {hostel.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="text-[10px] bg-muted px-2 py-1 rounded-full text-muted-foreground font-medium uppercase tracking-wide">
              {amenity}
            </span>
          ))}
          {hostel.amenities.length > 3 && (
            <span className="text-[10px] bg-muted px-2 py-1 rounded-full text-muted-foreground font-medium">
              +{hostel.amenities.length - 3}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-xs text-muted-foreground block">Starts from</span>
            <span className="text-lg font-bold text-primary">৳{hostel.price}</span>
            <span className="text-xs text-muted-foreground">/month</span>
          </div>
          <Link href={`/hostel/${hostel.id}`} className={cn(buttonVariants({ size: "sm" }), "rounded-full px-4")}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
