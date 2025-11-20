import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, MapPin, Star, Trash2, ArrowRight, Info } from "lucide-react";
import { useLocation } from "wouter";
import { HOSTELS } from "@/lib/mockData";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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

        {/* Mobile Layout (Vertical Stack - No horizontal scroll) */}
        <div className="block md:hidden space-y-8">
            {/* Feature: Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-4">
                    {hostelsToCompare.map(hostel => (
                        <div key={hostel.id} className="border-b last:border-0 pb-6 last:pb-0 relative">
                             <Button 
                                variant="ghost" 
                                size="icon" 
                                className="absolute top-0 right-0 text-muted-foreground hover:text-destructive -mt-2 -mr-2"
                                onClick={() => removeFromCompare(hostel.id)}
                             >
                                <Trash2 className="h-4 w-4" />
                             </Button>
                             <div className="flex gap-4">
                                 <img src={hostel.image} className="w-20 h-20 rounded-lg object-cover shrink-0" alt={hostel.name} />
                                 <div>
                                     <h3 className="font-bold text-base leading-tight mb-1">
                                        <a href={`/hostel/${hostel.id}`} className="hover:underline">{hostel.name}</a>
                                     </h3>
                                     <div className="flex items-center gap-1 text-sm mb-1">
                                        <Star className="h-3 w-3 fill-primary text-primary" />
                                        <span className="font-bold">{hostel.rating}</span>
                                     </div>
                                     <div className="text-lg font-bold text-primary">
                                        ৳{hostel.price}<span className="text-xs font-normal text-muted-foreground">/mo</span>
                                     </div>
                                 </div>
                             </div>
                             <div className="mt-3 flex gap-2">
                                <Button size="sm" className="flex-1" onClick={() => setLocation(`/hostel/${hostel.id}`)}>Book Now</Button>
                                <Button size="sm" variant="outline" className="flex-1" onClick={() => setLocation(`/hostel/${hostel.id}`)}>Details</Button>
                             </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Feature: Type & Location */}
            <Card>
                <CardHeader><CardTitle className="text-lg">Details</CardTitle></CardHeader>
                <CardContent className="space-y-4 p-4">
                    {hostelsToCompare.map(hostel => (
                        <div key={hostel.id} className="flex justify-between items-center border-b last:border-0 pb-4 last:pb-0">
                            <span className="font-bold text-sm w-1/3 truncate">{hostel.name}</span>
                            <div className="text-right">
                                <Badge variant="outline" className="mb-1">{hostel.type}</Badge>
                                <div className="text-xs text-muted-foreground flex justify-end items-center">
                                    <MapPin className="h-3 w-3 mr-1" /> {hostel.location}
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Feature: Amenities */}
            <Card>
                <CardHeader><CardTitle className="text-lg">Amenities</CardTitle></CardHeader>
                <CardContent className="space-y-6 p-4">
                    {allAmenities.map(amenity => (
                        <div key={amenity} className="border-b last:border-0 pb-4 last:pb-0">
                            <h4 className="font-medium text-sm mb-2 text-muted-foreground">{amenity}</h4>
                            <div className="grid grid-cols-1 gap-2">
                                {hostelsToCompare.map(hostel => {
                                    const hasAmenity = hostel.amenities.includes(amenity);
                                    return (
                                        <div key={hostel.id} className="flex items-center justify-between text-sm p-2 bg-muted/20 rounded">
                                            <span className="truncate w-2/3 pr-2 font-medium">{hostel.name}</span>
                                            {hasAmenity ? (
                                                <div className="flex items-center text-green-600 text-xs font-bold">
                                                    <Check className="h-4 w-4 mr-1" /> Yes
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-muted-foreground text-xs">
                                                    <X className="h-4 w-4 mr-1" /> No
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
             
            {/* Feature: Room Types */}
            <Card>
                <CardHeader><CardTitle className="text-lg">Room Types</CardTitle></CardHeader>
                <CardContent className="space-y-4 p-4">
                    {hostelsToCompare.map(hostel => (
                        <div key={hostel.id} className="space-y-2 border-b last:border-0 pb-4 last:pb-0">
                            <h4 className="font-bold text-sm">{hostel.name}</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
                                {hostel.rooms.map(room => (
                                    <li key={room.id}>{room.name}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden md:block overflow-x-auto pb-4">
          <table className="w-full border-collapse min-w-[800px]">
            <thead className="sticky top-0 z-20 shadow-sm">
              <tr>
                <th className="p-4 text-left w-32 sm:w-48 bg-background border-b border-r sticky left-0 z-30 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  <span className="hidden sm:inline">Features</span>
                </th>
                {hostelsToCompare.map(hostel => (
                  <th key={hostel.id} className="p-4 text-left min-w-[250px] border-b relative align-top bg-background">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 text-muted-foreground hover:text-destructive z-10"
                      onClick={() => removeFromCompare(hostel.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    
                    {/* Desktop Header (Full Details) */}
                    <div className="hidden md:block pr-8">
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
                <td className="p-4 font-medium border-b border-r sticky left-0 bg-background z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Monthly Rent</td>
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
                <td className="p-4 font-medium border-b border-r sticky left-0 bg-background z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Type</td>
                {hostelsToCompare.map(hostel => (
                  <td key={hostel.id} className="p-4 border-b align-top">
                    <Badge variant="outline">{hostel.type} Hostel</Badge>
                  </td>
                ))}
              </tr>

               {/* Room Types Row */}
               <tr className="hover:bg-muted/10">
                <td className="p-4 font-medium border-b border-r sticky left-0 bg-background z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Room Types</td>
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
                <td colSpan={hostelsToCompare.length + 1} className="p-4 bg-muted/30 font-bold border-y sticky left-0 z-10">Amenities</td>
              </tr>
              
              {allAmenities.map(amenity => (
                <tr key={amenity} className="hover:bg-muted/10">
                  <td className="p-4 font-medium border-b border-r sticky left-0 bg-background z-10 text-sm shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">{amenity}</td>
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
                <td className="p-4 font-medium border-b border-r sticky left-0 bg-background z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Description</td>
                {hostelsToCompare.map(hostel => (
                  <td key={hostel.id} className="p-4 border-b align-top text-sm text-muted-foreground leading-relaxed min-w-[250px]">
                    {hostel.description}
                  </td>
                ))}
              </tr>
              
              {/* Action Row */}
              <tr>
                <td className="p-4 border-r sticky left-0 bg-background z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]"></td>
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
