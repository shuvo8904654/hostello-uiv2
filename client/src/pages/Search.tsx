import { PublicLayout } from "@/components/layout/PublicLayout";
import { HostelCard } from "@/components/HostelCard";
import { HOSTELS, CITIES, AMENITIES } from "@/lib/mockData";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search as SearchIcon, 
  SlidersHorizontal, 
  MapPin, 
  ListFilter,
  LayoutGrid,
  LayoutList,
  Map as MapIcon,
  X
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearch } from "wouter";

export default function Search() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  
  const [searchQuery, setSearchQuery] = useState(params.get("location") || "");
  const [selectedCity, setSelectedCity] = useState(params.get("city") || "");

  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const city = params.get("city");
    const location = params.get("location");
    
    if (city) setSelectedCity(city);
    if (location) setSearchQuery(location);
  }, [searchString]);

  return (
    <PublicLayout>
      {/* Hero Search Section */}
      <div className="bg-primary/5 border-b">
        <div className="container mx-auto px-4 py-12">
           <h1 className="text-4xl font-bold mb-6 tracking-tight">Find your perfect student home</h1>
           
           <div className="bg-background p-4 rounded-xl shadow-lg border max-w-4xl flex flex-col md:flex-row gap-4">
             <div className="relative flex-1">
               <SearchIcon className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
               <Input 
                 className="pl-10 h-12 border-none bg-muted/30 text-lg focus-visible:ring-0" 
                 placeholder="Search by location, university, or hostel name..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
             </div>
             
             <div className="w-px bg-border hidden md:block mx-2"></div>
             
             <div className="relative w-full md:w-64">
               <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
               <Select value={selectedCity} onValueChange={setSelectedCity}>
                 <SelectTrigger className="pl-10 h-12 border-none bg-muted/30 text-lg focus:ring-0 shadow-none">
                   <SelectValue placeholder="Select City" />
                 </SelectTrigger>
                 <SelectContent>
                   {CITIES.map(city => (
                     <SelectItem key={city} value={city}>{city}</SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>

             <Button size="lg" className="h-12 px-8 text-lg font-medium">Search</Button>
           </div>

           <div className="mt-6 flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span>Popular searches:</span>
              <Badge variant="secondary" className="hover:bg-primary/10 cursor-pointer transition-colors">Near NSU</Badge>
              <Badge variant="secondary" className="hover:bg-primary/10 cursor-pointer transition-colors">Bashundhara R/A</Badge>
              <Badge variant="secondary" className="hover:bg-primary/10 cursor-pointer transition-colors">Female Only</Badge>
              <Badge variant="secondary" className="hover:bg-primary/10 cursor-pointer transition-colors">AC Rooms</Badge>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block w-72 space-y-8 flex-shrink-0 sticky top-24 h-fit">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <ListFilter className="h-5 w-5" /> Filters
              </h3>
              <Button variant="link" className="text-xs h-auto p-0 text-muted-foreground">Reset all</Button>
            </div>
            
            <div className="space-y-8">
              <div>
                <Label className="text-sm font-medium mb-4 block">Price Range (Monthly)</Label>
                <Slider defaultValue={[5000]} max={20000} step={500} className="mb-6" />
                <div className="flex items-center gap-4">
                  <div className="border rounded px-3 py-2 flex-1 text-center">
                    <span className="text-xs text-muted-foreground block">Min</span>
                    <span className="font-medium text-sm">৳2,000</span>
                  </div>
                  <span className="text-muted-foreground">-</span>
                  <div className="border rounded px-3 py-2 flex-1 text-center">
                    <span className="text-xs text-muted-foreground block">Max</span>
                    <span className="font-medium text-sm">৳20,000+</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="text-sm font-medium block">Property Type</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="type-male" />
                    <label htmlFor="type-male" className="text-sm font-normal cursor-pointer">Male Hostel</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="type-female" />
                    <label htmlFor="type-female" className="text-sm font-normal cursor-pointer">Female Hostel</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="type-shared" />
                    <label htmlFor="type-shared" className="text-sm font-normal cursor-pointer">Shared Flat</label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label className="text-sm font-medium block">Amenities</Label>
                <ScrollArea className="h-48 pr-4">
                  <div className="space-y-2">
                    {AMENITIES.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox id={`amenity-${amenity}`} />
                        <label htmlFor={`amenity-${amenity}`} className="text-sm font-normal cursor-pointer">
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>

          {/* Promo Card */}
          <div className="bg-primary text-primary-foreground rounded-xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Need help finding a place?</h3>
              <p className="text-sm text-primary-foreground/90 mb-4">Our support team can help you find the perfect hostel based on your needs.</p>
              <Button variant="secondary" size="sm" className="w-full">Contact Support</Button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </aside>

        {/* Mobile Filter Sheet */}
        <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <SheetContent side="left" className="w-full sm:w-[360px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your search results</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-8 h-[calc(100vh-180px)] overflow-y-auto px-2">
               {/* Mobile filters content (same as desktop) */}
               <div>
                <Label className="text-sm font-medium mb-4 block">Price Range (Monthly)</Label>
                <Slider defaultValue={[5000]} max={20000} step={500} className="mb-6" />
                <div className="flex items-center gap-4">
                  <div className="border rounded px-3 py-2 flex-1 text-center">
                    <span className="text-xs text-muted-foreground block">Min</span>
                    <span className="font-medium text-sm">৳2,000</span>
                  </div>
                  <span className="text-muted-foreground">-</span>
                  <div className="border rounded px-3 py-2 flex-1 text-center">
                    <span className="text-xs text-muted-foreground block">Max</span>
                    <span className="font-medium text-sm">৳20,000+</span>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <Label className="text-sm font-medium block">Amenities</Label>
                <div className="space-y-2">
                  {AMENITIES.map((amenity) => (
                    <div key={`mobile-${amenity}`} className="flex items-center space-x-2">
                      <Checkbox id={`mobile-amenity-${amenity}`} />
                      <label htmlFor={`mobile-amenity-${amenity}`} className="text-sm font-normal">
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1" onClick={() => setIsFiltersOpen(false)}>Clear</Button>
                <Button className="flex-1" onClick={() => setIsFiltersOpen(false)}>Show Results</Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Results Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="font-bold text-xl">124 Hostels in Dhaka</h2>
              <p className="text-muted-foreground text-sm mt-1">Showing results for "Student Hostels"</p>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="lg:hidden flex-1" 
                onClick={() => setIsFiltersOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
              </Button>

              <Select defaultValue="recommended">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>

              <div className="hidden sm:flex border rounded-md bg-background">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-9 w-9 rounded-none border-r ${viewMode === 'grid' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-9 w-9 rounded-none ${viewMode === 'list' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                  onClick={() => setViewMode('list')}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>

              <Button variant="outline" size="icon" className="h-10 w-10 hidden sm:flex">
                <MapIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters (Example) */}
          <div className="flex flex-wrap gap-2 mb-6">
             {selectedCity && (
               <Badge variant="secondary" className="h-7 pl-2 pr-1 gap-1 font-normal bg-muted hover:bg-muted/80">
                 City: {selectedCity} <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 hover:bg-transparent" onClick={() => setSelectedCity("")}><X className="h-3 w-3" /></Button>
               </Badge>
             )}
             {searchQuery && (
                <Badge variant="secondary" className="h-7 pl-2 pr-1 gap-1 font-normal bg-muted hover:bg-muted/80">
                 Location: {searchQuery} <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 hover:bg-transparent" onClick={() => setSearchQuery("")}><X className="h-3 w-3" /></Button>
               </Badge>
             )}
             <Button variant="link" className="h-7 px-2 text-xs text-muted-foreground" onClick={() => { setSelectedCity(""); setSearchQuery(""); }}>Clear all</Button>
          </div>

          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {HOSTELS.map(hostel => (
              <HostelCard 
                key={hostel.id} 
                hostel={hostel} 
                // In a real app, we would pass a prop to control layout style if HostelCard supported it
                // For now, the grid/list toggle just changes the container grid
              />
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" disabled>Previous</Button>
              <Button variant="default">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <span className="mx-2 text-muted-foreground">...</span>
              <Button variant="outline">8</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
