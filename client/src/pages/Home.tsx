import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, ShieldCheck, Wifi, Users, Home as HomeIcon } from "lucide-react";
import { CITIES, LOCATIONS, HOSTELS, heroImage } from "@/lib/mockData";
import { HostelCard } from "@/components/HostelCard";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Students in hostel" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>
        
        <div className="container relative z-10 px-4 pt-10">
          <div className="max-w-3xl mx-auto text-center text-white mb-8">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
              Find your home away from home in Bangladesh
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 font-medium drop-shadow-md">
              The smartest way to find student accommodation. Verified listings, roommate matching, and zero hassle.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto bg-white p-4 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-3 animate-in slide-in-from-bottom-10 duration-700">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Select>
                <SelectTrigger className="pl-10 h-12 border-0 bg-muted/30 focus:ring-0 text-base">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 relative">
              <HomeIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Select>
                <SelectTrigger className="pl-10 h-12 border-0 bg-muted/30 focus:ring-0 text-base">
                  <SelectValue placeholder="Select Area / Location" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Link href="/search" className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-base font-semibold rounded-xl w-full md:w-auto shadow-lg shadow-primary/25")}>
                <Search className="mr-2 h-4 w-4" /> Search
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why students choose Hostello</h2>
            <p className="text-muted-foreground text-lg">We make finding accommodation simple, safe, and social.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Listings</h3>
              <p className="text-muted-foreground">Every hostel is physically verified by our team to ensure safety and quality standards.</p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Roommate Matching</h3>
              <p className="text-muted-foreground">Find people with similar interests and habits before you even move in.</p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm border hover:shadow-md transition-shadow text-center">
              <div className="w-14 h-14 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-6">
                <Wifi className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Modern Amenities</h3>
              <p className="text-muted-foreground">Filter for high-speed WiFi, gyms, study rooms, and everything else you need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Trending in Dhaka</h2>
            <p className="text-muted-foreground">Top rated hostels students are booking right now.</p>
          </div>
          <Link href="/search" className={buttonVariants({ variant: "outline" })}>
             View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOSTELS.map(hostel => (
            <HostelCard key={hostel.id} hostel={hostel} />
          ))}
        </div>
      </section>

      {/* Owner Sign Up Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Are you a Hostel Owner?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">List your property on Hostello and reach thousands of students instantly. Manage bookings, payments, and tenants all in one place.</p>
          <div className="flex justify-center gap-4">
             <Link href="/list-your-property" className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "rounded-full px-8 text-base font-bold")}>
               List Your Property
             </Link>
             <Link href="/list-your-property">
               <Button size="lg" variant="outline" className="h-12 px-8 text-base font-bold rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary">Learn More</Button>
             </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
