import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button, buttonVariants } from "@/components/ui/button";
import { LocationSearch } from "@/components/LocationSearch";
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Wifi, 
  Users, 
  Home as HomeIcon, 
  Zap, 
  Clock, 
  CreditCard,
  ChevronRight,
  CheckCircle2,
  MessageSquare,
  Star,
  ArrowRight
} from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { CITIES, LOCATIONS, HOSTELS, heroImage } from "@/lib/mockData";
import { HostelCard } from "@/components/HostelCard";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [_, setLocation] = useLocation();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCity) params.append("city", selectedCity);
    if (selectedLocation) params.append("location", selectedLocation);
    
    setLocation(`/search?${params.toString()}`);
  };

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
              <LocationSearch 
                items={CITIES}
                placeholder="Select City"
                value={selectedCity}
                onValueChange={setSelectedCity}
                icon={MapPin}
              />
            </div>
            <div className="flex-1 relative">
              <LocationSearch 
                items={LOCATIONS}
                placeholder="Select Area / Location"
                value={selectedLocation}
                onValueChange={setSelectedLocation}
                icon={HomeIcon}
              />
            </div>
            <Button 
              onClick={handleSearch}
              size="lg" 
              className="h-12 px-8 text-base font-semibold rounded-xl w-full md:w-auto shadow-lg shadow-primary/25"
            >
                <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section - REVISED (No numbers) */}
      <section className="py-8 md:py-12 border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center divide-x-0 md:divide-x divide-border">
            <div className="p-2 md:p-4 flex flex-col items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4 text-primary">
                 <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="font-bold text-base md:text-lg mb-1">100% Verified</div>
              <div className="text-muted-foreground text-xs md:text-sm">Every listing checked</div>
            </div>
            <div className="p-2 md:p-4 flex flex-col items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4 text-primary">
                 <Users className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="font-bold text-base md:text-lg mb-1">Student Community</div>
              <div className="text-muted-foreground text-xs md:text-sm">Join your peers</div>
            </div>
            <div className="p-2 md:p-4 flex flex-col items-center">
               <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4 text-primary">
                 <MapPin className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="font-bold text-base md:text-lg mb-1">Prime Locations</div>
              <div className="text-muted-foreground text-xs md:text-sm">Near universities</div>
            </div>
            <div className="p-2 md:p-4 flex flex-col items-center">
               <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4 text-primary">
                 <Star className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="font-bold text-base md:text-lg mb-1">Top Rated</div>
              <div className="text-muted-foreground text-xs md:text-sm">Quality assured stays</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (Bento Grid Style) */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight text-slate-900">
              More than just a place to sleep
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              We've reimagined student living with a focus on community, safety, and convenience. Experience the Hostello difference.
            </p>
          </div>

          {/* Bento Grid with Mobile Adjustments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-min md:auto-rows-[300px]">
            
            {/* Feature 1: Verified (Large) */}
            <div className="md:col-span-2 row-span-1 relative overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 group hover:shadow-2xl transition-all duration-300 min-h-[300px]">
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck className="w-64 h-64 text-primary" />
              </div>
              <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                  <ShieldCheck className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">100% Verified Listings</h3>
                <p className="text-slate-500 text-base md:text-lg max-w-md">
                  Every property on Hostello is physically inspected by our team. We verify amenities, safety measures, and cleanliness.
                </p>
              </div>
            </div>

            {/* Feature 2: Real Student Reviews */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between relative overflow-hidden group min-h-[300px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 rounded-full blur-3xl opacity-20 -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Star className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Real Student Reviews</h3>
                <p className="text-slate-400 text-sm md:text-base">Make informed decisions with authentic reviews and ratings from verified residents.</p>
              </div>
              <div className="relative z-10 mt-4 flex items-center gap-2">
                <div className="flex -space-x-1">
                   {[1,2,3,4,5].map(i => (
                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                   ))}
                </div>
                <span className="text-sm font-medium text-slate-300">(4.8/5)</span>
              </div>
            </div>

            {/* Feature 3: Amenities */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100 flex flex-col justify-center group hover:border-blue-200 transition-colors min-h-[300px]">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
                <Wifi className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Premium Amenities</h3>
              <ul className="space-y-3">
                {['High-speed WiFi', 'Air Conditioning', 'Power Backup', 'Study Lounges'].map((item, i) => (
                  <li key={i} className="flex items-center text-slate-600 text-sm md:text-base">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 4: Direct Booking (Revised for Responsiveness) */}
            <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col lg:flex-row items-start lg:items-center gap-8 overflow-hidden group min-h-[300px]">
              <div className="flex-1 w-full">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">Direct Booking & Communication</h3>
                <p className="text-slate-500 mb-6 text-sm md:text-base">
                  Reserve your room online and pay directly at the property. No hidden platform fees or complicated digital wallets. Chat directly with owners.
                </p>
                <Button variant="outline" className="rounded-full w-full sm:w-auto">How it works</Button>
              </div>
              <div className="flex-1 relative h-48 w-full bg-slate-50 rounded-2xl border border-slate-100 p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 hidden sm:flex">
                 <div className="text-center space-y-2 w-full max-w-xs">
                    <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-4 w-full mx-auto">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <Users size={18} />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground">Message from Owner</div>
                        <div className="text-sm font-bold truncate">"Room is available!"</div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-xl border border-green-100 flex items-center gap-3 w-3/4 ml-auto">
                       <div className="text-xs text-green-700 font-medium whitespace-nowrap">Booking Confirmed</div>
                       <CheckCircle2 size={14} className="text-green-600 ml-auto flex-shrink-0" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-4">
          <div className="text-center md:text-left w-full md:w-auto">
            <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3 text-slate-900">Trending in Dhaka</h2>
            <p className="text-slate-500 text-base md:text-lg">Top rated hostels students are booking right now.</p>
          </div>
          <Link href="/search" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-8 w-full md:w-auto")}>
             View All Listings <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {HOSTELS.map(hostel => (
            <HostelCard key={hostel.id} hostel={hostel} />
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="text-center md:text-left">
              <div className="md:sticky md:top-24">
                <div className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700 mb-4">
                  Support
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-900">Frequently Asked Questions</h2>
                <p className="text-base md:text-lg text-slate-600 mb-8">
                  Have questions? We're here to help. Check out our most common queries or contact our support team.
                </p>
                <Button size="lg" className="rounded-full px-8 w-full md:w-auto">Contact Support</Button>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg shadow-slate-200/50 border border-slate-100">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-slate-900">How do I book a hostel?</AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    Booking is easy! Simply browse our verified listings, select a hostel you like, choose your room type, and click "Book Now". You can pay a small token amount to reserve your spot instantly.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-slate-900">Do I pay the security deposit to Hostello?</AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    No, Hostello is a listing platform. You pay your rent and any required security deposit directly to the hostel owner upon arrival or as per their specific agreement. We do not hold any funds.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-slate-900">Are bills included in the rent?</AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    Most of our listed hostels include utility bills (electricity, water, gas) in the monthly rent. However, some may charge for AC usage separately. Check the "Amenities" section of each listing for details.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-slate-900">Can I change my room later?</AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    Yes, room changes are possible subject to availability. You can request a room change through your tenant dashboard, and the hostel manager will assist you with the process.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-slate-900">Is it safe for female students?</AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    Absolutely. We highlight female-only hostels with "Womens" tags. These properties typically feature enhanced security, female staff, and strict visitor policies to ensure safety and comfort.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Owner Sign Up Section - REDESIGNED */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-primary text-primary-foreground rounded-3xl p-6 md:p-12 lg:p-16 overflow-hidden relative">
             {/* Background Pattern */}
             <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
             
             <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
                <div className="text-left">
                  <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">Are you a Hostel Owner?</h2>
                  <p className="text-lg md:text-xl opacity-90 mb-6 md:mb-8 leading-relaxed max-w-xl">
                    List your property on Hostello and reach thousands of students instantly. Manage bookings, payments, and tenants all in one smart dashboard.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/list-your-property" className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "rounded-full px-8 py-4 md:py-6 text-base md:text-lg font-bold h-auto w-full sm:w-auto justify-center")}>
                      List Your Property <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link href="/list-your-property">
                      <Button size="lg" variant="outline" className="rounded-full px-8 py-4 md:py-6 text-base md:text-lg font-bold h-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
                
                {/* Floating UI Mockup */}
                <div className="relative hidden lg:block">
                   <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full transform rotate-12"></div>
                   <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                      <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                         <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                         <div>
                            <div className="h-3 w-32 bg-white/30 rounded mb-2"></div>
                            <div className="h-2 w-20 bg-white/20 rounded"></div>
                         </div>
                      </div>
                      <div className="space-y-3">
                         <div className="h-16 bg-white/5 rounded-lg p-3 flex items-center justify-between">
                            <div className="w-1/2 h-2 bg-white/20 rounded"></div>
                            <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center text-green-300 text-xs">✓</div>
                         </div>
                         <div className="h-16 bg-white/5 rounded-lg p-3 flex items-center justify-between">
                            <div className="w-1/3 h-2 bg-white/20 rounded"></div>
                            <div className="w-8 h-8 bg-blue-400/20 rounded-full flex items-center justify-center text-blue-300 text-xs">+</div>
                         </div>
                         <div className="h-16 bg-white/5 rounded-lg p-3 flex items-center justify-between">
                            <div className="w-2/3 h-2 bg-white/20 rounded"></div>
                            <div className="w-8 h-8 bg-orange-400/20 rounded-full flex items-center justify-center text-orange-300 text-xs">!</div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
