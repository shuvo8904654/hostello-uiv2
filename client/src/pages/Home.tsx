import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, MapPin, ShieldCheck, Wifi, Users, Home as HomeIcon, Clock, CreditCard, Star, ArrowRight, CheckCircle2, Quote, HelpCircle } from "lucide-react";
import { CITIES, LOCATIONS, HOSTELS, heroImage } from "@/lib/mockData";
import { HostelCard } from "@/components/HostelCard";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";

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

      {/* Stats Section - Clean Strip */}
      <section className="border-b bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl font-bold text-primary block mb-1">500+</span>
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Verified Hostels</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl font-bold text-primary block mb-1">10k+</span>
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Happy Students</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl font-bold text-primary block mb-1">50+</span>
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Locations</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl font-bold text-primary block mb-1">4.8/5</span>
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Minimal & Clean */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 tracking-tight text-slate-900">Why students choose Hostello</h2>
            <p className="text-slate-600 text-lg">We make finding accommodation simple, safe, and social.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Verified Listings</h3>
              <p className="text-slate-500 leading-relaxed">
                Every hostel is physically verified by our team to ensure safety and quality standards.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Roommate Matching</h3>
              <p className="text-slate-500 leading-relaxed">
                Find people with similar interests and habits before you even move in.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Zero Hidden Fees</h3>
              <p className="text-slate-500 leading-relaxed">
                Transparent pricing with no surprise charges. What you see is what you pay.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Instant Booking</h3>
              <p className="text-slate-500 leading-relaxed">
                Secure your room in minutes with our seamless digital booking process.
              </p>
            </div>

             {/* Feature 5 */}
             <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-6">
                <Wifi className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Modern Amenities</h3>
              <p className="text-slate-500 leading-relaxed">
                Filter for high-speed WiFi, gyms, study rooms, and everything else you need.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-6">
                <HomeIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Flexible Stays</h3>
              <p className="text-slate-500 leading-relaxed">
                Short-term or long-term leases designed to fit your academic calendar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-slate-900">Trending in Dhaka</h2>
            <p className="text-slate-500">Top rated hostels students are booking right now.</p>
          </div>
          <Link href="/search">
            <Button variant="outline" className="hidden md:flex">View All Listings</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOSTELS.map(hostel => (
            <HostelCard key={hostel.id} hostel={hostel} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/search">
            <Button variant="outline" className="w-full">View All Listings</Button>
          </Link>
        </div>
      </section>

      {/* How It Works - Simple Steps */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">How it works</h2>
            <p className="text-slate-500 text-lg">Three simple steps to your new home.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 font-bold text-xl">1</div>
              <h3 className="text-xl font-bold mb-3">Search & Discover</h3>
              <p className="text-slate-500">Browse verified listings, use smart filters, and compare your favorite options.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 font-bold text-xl">2</div>
              <h3 className="text-xl font-bold mb-3">Schedule Visit</h3>
              <p className="text-slate-500">Book a physical tour or view a virtual walkthrough to see the place for yourself.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 font-bold text-xl">3</div>
              <h3 className="text-xl font-bold mb-3">Book Online</h3>
              <p className="text-slate-500">Pay securely through the app and get your digital move-in pass instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (New) */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-lg">Everything you need to know about booking with Hostello.</p>
          </div>

          <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-sm border border-slate-200 px-6 py-2">
            <AccordionItem value="item-1" className="border-b-slate-100">
              <AccordionTrigger className="text-left font-medium text-slate-900">Is the booking deposit refundable?</AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Yes, the booking deposit is fully refundable if you cancel within 48 hours of booking. After that, it depends on the specific hostel's cancellation policy which is clearly displayed on their page.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b-slate-100">
              <AccordionTrigger className="text-left font-medium text-slate-900">Are the photos real?</AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Absolutely. Every "Verified" listing on Hostello has been visited by our ground team who take the photos and verify the amenities personally.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b-slate-100">
              <AccordionTrigger className="text-left font-medium text-slate-900">Can I visit the hostel before booking?</AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Yes! You can use the "Schedule Visit" button on any hostel page to book a time slot for a physical tour before you make a final decision.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-b-slate-100">
              <AccordionTrigger className="text-left font-medium text-slate-900">Do I have to pay the full rent upfront?</AccordionTrigger>
              <AccordionContent className="text-slate-600">
                No, you typically only need to pay a security deposit and the first month's rent to secure your booking. Subsequent payments can be made monthly through our app.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-b-0">
              <AccordionTrigger className="text-left font-medium text-slate-900">Is my payment information secure?</AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We use industry-standard encryption and trusted payment gateways (like SSL Commerz, Stripe) to ensure your financial data is always protected.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to find your new home?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light">Join thousands of students who have already found their perfect space with Hostello.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/search">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-bold rounded-full w-full sm:w-auto">
                Browse Hostels
              </Button>
            </Link>
            <Link href="/list-your-property">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold rounded-full bg-transparent text-white border-white hover:bg-white hover:text-primary w-full sm:w-auto">
                List Your Property
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
