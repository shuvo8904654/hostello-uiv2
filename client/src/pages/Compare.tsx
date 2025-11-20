import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, MapPin, Star, Trash2, ArrowRight, Info } from "lucide-react";
import { useLocation } from "wouter";
import { HOSTELS } from "@/lib/mockData";
import { useEffect, useState } from "react";

export default function Compare() {
  const [location, setLocation] = useLocation();
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ids = params.get("ids")?.split(",") || [];
    setCompareIds(ids.filter(Boolean));
  }, [window.location.search]);

  const hostelsToCompare = HOSTELS.filter(h => compareIds.includes(h.id));

  const removeFromCompare = (id: string) => {
    const newIds = compareIds.filter(i => i !== id);
    const params = new URLSearchParams(window.location.search);
    if (newIds.length > 0) {
      params.set("ids", newIds.join(","));
      setLocation(`/compare?${params.toString()}`);
    } else {
      setLocation("/compare");
    }
  };

  const allAmenities = Array.from(new Set(hostelsToCompare.flatMap(h => h.amenities)));

  if (compareIds.length === 0) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto space-y-6">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Info className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold">Compare Hostels</h1>
            <p className="text-muted-foreground">
              Select hostels from the search page to compare their features, prices, and amenities side-by-side.
            </p>
            <Button onClick={() => setLocation("/search")} size="lg">
              Browse Hostels
            </Button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Compare Hostels</h1>
          <p className="text-muted-foreground">
            Comparing {hostelsToCompare.length} property{hostelsToCompare.length !== 1 ? 'ies' : ''}
          </p>
        </div>

        <div className="overflow-x-auto pb-4">
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="p-4 text-left w-48 bg-muted/30 border-b border-r sticky left-0 z-10">Features</th>
                {hostelsToCompare.map(hostel => (
                  <th key={hostel.id} className="p-4 text-left min-w-[250px] border-b relative align-top bg-card">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCompare(hostel.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="pr-8">
                      <img 
                        src={hostel.image} 
                        alt={hostel.name} 
                        className="w-full h-32 object-cover rounded-lg mb-3" 
                      />
                      <h3 className="font-bold text-lg leading-tight mb-1">
                        <a href={`/hostel/${hostel.id}`} className="hover:underline">{hostel.name}</a>
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3 mr-1" /> {hostel.location}, {hostel.city}
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-bold">{hostel.rating}</span>
                        <span className="text-muted-foreground text-sm">({hostel.reviews} reviews)</span>
                      </div>
                      <Button size="sm" className="w-full" onClick={() => setLocation(`/hostel/${hostel.id}`)}>
                        View Details
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Price Row */}
              <tr className="hover:bg-muted/10">
                <td className="p-4 font-medium border-b border-r sticky left-0 bg-background z-10">Monthly Rent</td>
                {hostelsToCompare.map(hostel => (
                  <td key={hostel.id} className="p-4 border-b align-top">
                    <div className="text-xl font-bold text-primary">
                      ৳{hostel.price}
                      <span className="text-sm font-normal text-muted-foreground">/mo</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Starting form</p>
                  </td>
                ))}
              </tr>

              {/* Type Row */}
              <tr className="hover:bg-muted/10">
                <td className="p-4 font-medium border-b border-r sticky left-0 bg-background z-10">Type</td>
                {hostelsToCompare.map(hostel => (
                  <td key={hostel.id} className="p-4 border-b align-top">
                    <Badge variant="outline">{hostel.type} Hostel</Badge>
                  </td>
                ))}
              </tr>

               {/* Room Types Row */}
               <tr className="hover:bg-muted/10">
                <td className="p-4 font-medium border-b border-r sticky left-0 bg-background z-10">Room Types</td>
                {hostelsToCompare.map(hostel => (
                  <td key={hostel.id} className="p-4 border-b align-top text-sm">
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {hostel.rooms.map(room => (
                        <li key={room.id}>{room.name}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Amenities Section */}
              <tr>
                <td colSpan={hostelsToCompare.length + 1} className="p-4 bg-muted/30 font-bold border-y">Amenities</td>
              </tr>
              
              {allAmenities.map(amenity => (
                <tr key={amenity} className="hover:bg-muted/10">
                  <td className="p-4 font-medium border-b border-r sticky left-0 bg-background z-10 text-sm">{amenity}</td>
                  {hostelsToCompare.map(hostel => {
                    const hasAmenity = hostel.amenities.includes(amenity);
                    return (
                      <td key={hostel.id} className="p-4 border-b text-center">
                        {hasAmenity ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <div className="h-1 w-4 bg-muted mx-auto rounded-full" /> // Dash for "No"
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Description Row */}
              <tr className="hover:bg-muted/10">
                <td className="p-4 font-medium border-b border-r sticky left-0 bg-background z-10">Description</td>
                {hostelsToCompare.map(hostel => (
                  <td key={hostel.id} className="p-4 border-b align-top text-sm text-muted-foreground leading-relaxed min-w-[250px]">
                    {hostel.description}
                  </td>
                ))}
              </tr>
              
              {/* Action Row */}
              <tr>
                <td className="p-4 border-r sticky left-0 bg-background z-10"></td>
                {hostelsToCompare.map(hostel => (
                  <td key={hostel.id} className="p-4 pt-6">
                    <Button className="w-full" size="lg" onClick={() => setLocation(`/hostel/${hostel.id}`)}>
                      Book Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </PublicLayout>
  );
}
