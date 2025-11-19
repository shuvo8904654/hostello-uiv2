import { PublicLayout } from "@/components/layout/PublicLayout";
import { HostelCard } from "@/components/HostelCard";
import { HOSTELS, CITIES, AMENITIES } from "@/lib/mockData";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";

export default function Search() {
  return (
    <PublicLayout>
      <div className="bg-muted/30 border-b py-8">
        <div className="container mx-auto px-4">
           <h1 className="text-3xl font-bold mb-4">Find your perfect student home</h1>
           <div className="flex gap-4 max-w-2xl">
             <div className="relative flex-1">
               <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
               <Input className="pl-10 bg-background" placeholder="Search by location, city, or hostel name..." />
             </div>
             <Button>Search</Button>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </h3>
            
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">Price Range (Monthly)</Label>
                <Slider defaultValue={[5000]} max={20000} step={500} className="mb-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>৳2k</span>
                  <span>৳20k+</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium mb-2 block">City</Label>
                {CITIES.map((city) => (
                  <div key={city} className="flex items-center space-x-2">
                    <Checkbox id={`city-${city}`} />
                    <label htmlFor={`city-${city}`} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {city}
                    </label>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium mb-2 block">Amenities</Label>
                {AMENITIES.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox id={`amenity-${amenity}`} />
                    <label htmlFor={`amenity-${amenity}`} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground text-sm">{HOSTELS.length} hostels found</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort by:</span>
              <select className="bg-transparent font-medium outline-none">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOSTELS.map(hostel => (
              <HostelCard key={hostel.id} hostel={hostel} />
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
