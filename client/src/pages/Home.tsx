import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  CheckCircle2
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
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Select value={selectedCity} onValueChange={setSelectedCity}>
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
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="pl-10 h-12 border-0 bg-muted/30 focus:ring-0 text-base">
                  <SelectValue placeholder="Select Area / Location" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
                </SelectContent>
              </Select>
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

      {/* Stats Section - NEW */}
      <section className="py-12 border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-border">
            <div className="p-4">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground font-medium">Verified Hostels</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-primary mb-2">10k+</div>
              <div className="text-muted-foreground font-medium">Happy Students</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground font-medium">Universities Covered</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-primary mb-2">4.8</div>
              <div className="text-muted-foreground font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Features Section (Bento Grid Style) */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">
              More than just a place to sleep
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              We've reimagined student living with a focus on community, safety, and convenience. Experience the Hostello difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Feature 1: Verified (Large) */}
            <div className="md:col-span-2 row-span-1 relative overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 group hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck className="w-64 h-64 text-primary" />
              </div>
              <div className="relative z-10 h-full p-10 flex flex-col justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">100% Verified Listings</h3>
                <p className="text-slate-500 text-lg max-w-md">
                  Every property on Hostello is physically inspected by our team. We verify amenities, safety measures, and cleanliness so what you see is exactly what you get.
                </p>
              </div>
            </div>

            {/* Feature 2: Roommate Matching */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Roommate Matching</h3>
                <p className="text-slate-400">Find people who match your vibe. Filter by study habits, interests, and lifestyle.</p>
              </div>
              <div className="relative z-10 mt-4 flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-xs font-medium">
                    {String.fromCharCode(64+i)}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-blue-600 flex items-center justify-center text-xs font-medium">
                  +2k
                </div>
              </div>
            </div>

            {/* Feature 3: Amenities */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100 flex flex-col justify-center group hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
                <Wifi className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Premium Amenities</h3>
              <ul className="space-y-2">
                {['High-speed WiFi', 'Air Conditioning', 'Power Backup', 'Study Lounges'].map((item, i) => (
                  <li key={i} className="flex items-center text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 4: Payments (Wide) */}
            <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-8 overflow-hidden group">
              <div className="flex-1">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">Secure Digital Payments</h3>
                <p className="text-slate-500 mb-6">
                  Pay rent, deposits, and utility bills directly through the app. Get instant receipts and track your payment history automatically.
                </p>
                <Button variant="outline" className="rounded-full">Learn about protection</Button>
              </div>
              <div className="flex-1 relative h-48 w-full bg-slate-50 rounded-2xl border border-slate-100 p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                 <div className="text-center space-y-2">
                    <div className="bg-white p-3 rounded-xl shadow-sm border flex items-center gap-3 w-64 mx-auto">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle2 size={16} /></div>
                      <div className="text-left">
                        <div className="text-xs text-muted-foreground">Payment Successful</div>
                        <div className="text-sm font-bold">Rent - September</div>
                      </div>
                      <div className="ml-auto font-bold text-slate-900">৳5,000</div>
                    </div>
                    <div className="bg-white/50 p-3 rounded-xl border flex items-center gap-3 w-56 mx-auto opacity-70">
                       <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                       <div className="h-2 w-20 bg-slate-200 rounded"></div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900">Trending in Dhaka</h2>
            <p className="text-slate-500 text-lg">Top rated hostels students are booking right now.</p>
          </div>
          <Link href="/search" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-8")}>
             View All Listings <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOSTELS.map(hostel => (
            <HostelCard key={hostel.id} hostel={hostel} />
          ))}
        </div>
      </section>

      {/* FAQ Section - NEW */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="sticky top-24">
                <div className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700 mb-4">
                  Support
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Frequently Asked Questions</h2>
                <p className="text-lg text-slate-600 mb-8">
                  Have questions? We're here to help. Check out our most common queries or contact our support team.
                </p>
                <Button size="lg" className="rounded-full px-8">Contact Support</Button>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold text-slate-900">How do I book a hostel?</AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    Booking is easy! Simply browse our verified listings, select a hostel you like, choose your room type, and click "Book Now". You can pay a small token amount to reserve your spot instantly.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-semibold text-slate-900">Is my security deposit refundable?</AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    Yes, your security deposit is fully refundable at the end of your stay, subject to the hostel's policy on damages and notice periods. Hostello ensures transparent refund processes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-semibold text-slate-900">Are bills included in the rent?</AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    Most of our listed hostels include utility bills (electricity, water, gas) in the monthly rent. However, some may charge for AC usage separately. Check the "Amenities" section of each listing for details.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-semibold text-slate-900">Can I change my room later?</AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    Yes, room changes are possible subject to availability. You can request a room change through your tenant dashboard, and the hostel manager will assist you with the process.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-lg font-semibold text-slate-900">Is it safe for female students?</AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    Absolutely. We highlight female-only hostels with "Womens" tags. These properties typically feature enhanced security, female staff, and strict visitor policies to ensure safety and comfort.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Owner Sign Up Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Are you a Hostel Owner?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            List your property on Hostello and reach thousands of students instantly. Manage bookings, payments, and tenants all in one smart dashboard.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link href="/list-your-property" className={cn(buttonVariants({ size: "lg", variant: "default" }), "bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg font-bold shadow-lg shadow-blue-900/50")}>
               List Your Property
             </Link>
             <Link href="/list-your-property">
               <Button size="lg" variant="outline" className="h-auto py-4 px-8 text-lg font-bold rounded-full bg-transparent border-slate-700 text-white hover:bg-white hover:text-slate-900 transition-all">Learn More</Button>
             </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
