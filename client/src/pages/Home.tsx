import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, ShieldCheck, Wifi, Users, Home as HomeIcon, Clock, CreditCard, Star, ArrowRight, CheckCircle2, Quote } from "lucide-react";
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

      {/* Stats Section */}
      <section className="py-10 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-primary-foreground/20">
            <div className="p-2">
              <h3 className="text-3xl md:text-4xl font-bold mb-2">500+</h3>
              <p className="text-primary-foreground/80 font-medium">Verified Hostels</p>
            </div>
            <div className="p-2">
              <h3 className="text-3xl md:text-4xl font-bold mb-2">10k+</h3>
              <p className="text-primary-foreground/80 font-medium">Happy Students</p>
            </div>
            <div className="p-2">
              <h3 className="text-3xl md:text-4xl font-bold mb-2">50+</h3>
              <p className="text-primary-foreground/80 font-medium">Locations</p>
            </div>
            <div className="p-2 border-r-0">
              <h3 className="text-3xl md:text-4xl font-bold mb-2">4.8/5</h3>
              <p className="text-primary-foreground/80 font-medium">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us (Redesigned) */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 tracking-tight">Redefining Student Living</h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              We don't just list hostels; we curate experiences. Here's why thousands of students trust Hostello for their accommodation needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-background p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">100% Verified Listings</h3>
              <p className="text-muted-foreground leading-relaxed">
                Say goodbye to catfishing. Every property is physically verified by our ground team for safety, hygiene, and amenities.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-background p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Community First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with future roommates, join student communities, and find people with similar interests before moving in.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-background p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Transparent Billing</h3>
              <p className="text-muted-foreground leading-relaxed">
                No hidden fees or surprise charges. Pay rent securely through the app and get automated receipts instantly.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-background p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">24/7 Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                From maintenance issues to emergency assistance, our dedicated support team is always just a tap away.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-background p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Wifi className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Smart Amenities</h3>
              <p className="text-muted-foreground leading-relaxed">
                Filter homes by internet speed, backup power availability, and study-friendly environments optimized for students.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-background p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HomeIcon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Flexible Stays</h3>
              <p className="text-muted-foreground leading-relaxed">
                Short-term or long-term? We've got you covered with flexible lease terms that match your academic calendar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-3 text-gray-900">Trending in Dhaka</h2>
            <p className="text-muted-foreground text-lg">Top rated hostels students are booking right now.</p>
          </div>
          <Link href="/search">
             <span className={cn(buttonVariants({ variant: "outline" }), "group cursor-pointer")}>
                View All Hostels
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
             </span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOSTELS.map(hostel => (
            <HostelCard key={hostel.id} hostel={hostel} />
          ))}
        </div>
      </section>

      {/* How It Works (New) */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Three Steps to Your New Home</h2>
            <p className="text-muted-foreground text-lg">Moving in has never been this easy.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-gray-200 border-t-2 border-dashed border-gray-300 -z-10"></div>

            <div className="text-center relative bg-gray-50 pt-4">
              <div className="w-20 h-20 bg-white text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg border-4 border-white">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Search & Compare</h3>
              <p className="text-muted-foreground px-4">Browse thousands of verified hostels, filter by your needs, and compare prices side-by-side.</p>
            </div>

            <div className="text-center relative bg-gray-50 pt-4">
              <div className="w-20 h-20 bg-white text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg border-4 border-white">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Schedule a Visit</h3>
              <p className="text-muted-foreground px-4">Book a physical or virtual tour directly through the app to see the place for yourself.</p>
            </div>

            <div className="text-center relative bg-gray-50 pt-4">
              <div className="w-20 h-20 bg-white text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg border-4 border-white">
                <HomeIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Book Securely</h3>
              <p className="text-muted-foreground px-4">Pay the booking amount securely online and receive your digital move-in pass instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (New) */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Students Are Saying</h2>
          <p className="text-muted-foreground text-lg">Don't just take our word for it.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Rahim Ahmed", uni: "North South University", quote: "Hostello made my move to Dhaka so much smoother. I found a place near my university within 2 days and my roommates are awesome!" },
            { name: "Sarah Khan", uni: "BRAC University", quote: "The verification badge really helps. The place looked exactly like the photos, which is rare in Dhaka. Highly recommended!" },
            { name: "Tanvir Islam", uni: "Independent University", quote: "I love the roommate finder feature. Found someone who also studies CS and plays guitar. It's been a great semester so far." }
          ].map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative hover:shadow-md transition-shadow">
              <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/10" />
              <p className="text-gray-600 mb-8 relative z-10 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 border-t pt-6">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                   {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.uni}</p>
                </div>
                <div className="ml-auto flex text-yellow-400">
                  {[1,2,3,4,5].map(star => <Star key={star} className="h-3 w-3 fill-current" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA (New) */}
      <section className="py-10 container mx-auto px-4 mb-10">
        <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-primary-foreground relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="relative z-10 max-w-3xl mx-auto">
             <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to find your perfect space?</h2>
             <p className="text-lg md:text-xl opacity-90 mb-10 font-light">Join thousands of students who have already found their home away from home with Hostello.</p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Link href="/search">
                 <span className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "font-bold text-lg h-14 px-10 rounded-full w-full sm:w-auto cursor-pointer")}>
                   Browse Hostels
                 </span>
               </Link>
               <Button size="lg" variant="outline" className="font-bold text-lg h-14 px-10 rounded-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto">
                 Talk to an Expert
               </Button>
             </div>
           </div>
        </div>
      </section>

      {/* Owner Sign Up Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Are you a Hostel Owner?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">List your property on Hostello and reach thousands of students instantly. Manage bookings, payments, and tenants all in one place.</p>
          <div className="flex justify-center gap-4">
             <Link href="/list-your-property">
               <span className={cn(buttonVariants({ size: "lg" }), "bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 text-base font-bold h-12 cursor-pointer")}>
                 List Your Property
               </span>
             </Link>
             <Link href="/list-your-property">
               <span className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-12 px-8 text-base font-bold rounded-full bg-transparent border-slate-700 text-white hover:bg-slate-800 hover:text-white cursor-pointer")}>Learn More</span>
             </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
