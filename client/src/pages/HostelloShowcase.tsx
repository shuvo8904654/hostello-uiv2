import { useState } from "react";
import { Link } from "wouter";
import { 
  Calendar, 
  Users, 
  BedDouble, 
  BookOpen, 
  Utensils, 
  Lightbulb, 
  Bath, 
  Wifi, 
  Phone, 
  CheckCircle, 
  MapPin,
  ArrowRight,
  Star,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

// Mock Data matching Hostello.in
const FEATURES = [
  { icon: BookOpen, title: "Study Areas", description: "Dedicated quiet zones for focused learning" },
  { icon: BedDouble, title: "Comfortable Beds", description: "Premium mattresses for restful sleep" },
  { icon: Utensils, title: "Food in Hostel", description: "Nutritious home-style meals included" },
  { icon: Lightbulb, title: "Good Lighting", description: "Bright, study-friendly lighting in all rooms" },
  { icon: Bath, title: "Clean Bathrooms", description: "Hygienic, regularly cleaned facilities" },
  { icon: Wifi, title: "High Speed Wifi", description: "Seamless connectivity for online classes" },
];

const ROOM_TYPES = [
  {
    id: 1,
    name: "Premium King Room",
    price: "166",
    period: "/ Day",
    size: "10 ft",
    capacity: "Max person 1",
    bed: "Single Occupancy (Private Room)",
    services: ["Fully Furnished", "Study Desk", "Wardrobe", "Wifi"],
    image: "https://images.unsplash.com/photo-1522771753014-34a985adb961?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Best King Room",
    price: "166",
    period: "/ Day",
    size: "20 ft",
    capacity: "Max person 3",
    bed: "Triple Sharing",
    services: ["Fully Furnished", "Study Desk", "Wardrobe", "Wifi"],
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2669&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Standard Double",
    price: "145",
    period: "/ Day",
    size: "15 ft",
    capacity: "Max person 2",
    bed: "Double Sharing",
    services: ["Fully Furnished", "Study Desk", "Wardrobe", "Wifi"],
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2670&auto=format&fit=crop"
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Suneel Srivastava",
    role: "Student",
    content: "Hostello creates a positive relationship between management and tenants. It implies that the property is well-maintained, the Hostello is responsive, and the overall living experience is good.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Medical Student",
    content: "The study environment is exactly what I needed for my NEET preparation. The food is healthy and the staff is very supportive.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Engineering Student",
    content: "Best hostel in Lucknow! The internet speed is great for my online classes and the rooms are very spacious.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
  }
];

const HOSTELS = [
  {
    id: 1,
    name: "Anandi Joshi Girls Hostel",
    location: "531/61, Bara Chandganj, Sector A, Chandralok",
    types: "Single/Double/Triple Common/Attached Bathroom",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2669&auto=format&fit=crop",
    date: "Jan 02, 2025"
  },
  {
    id: 2,
    name: "Aryabhata Boys Hostel",
    location: "Kapoorthla, Bara Chandganj, Sector A",
    types: "Single/Double/Triple Common/Attached Bathroom",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2670&auto=format&fit=crop",
    date: "Feb 05, 2025"
  },
  {
    id: 3,
    name: "Bhaskara Boys Hostel",
    location: "33, Ravindra Garden Rd, Chandralok Colony",
    types: "Single/Double/Triple Common/Attached Bathroom",
    image: "https://images.unsplash.com/photo-1522771753014-34a985adb961?q=80&w=2670&auto=format&fit=crop",
    date: "March 10, 2025"
  }
];

export default function HostelloShowcase() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white p-1.5 rounded font-bold text-xl">H</div>
            <span className="text-xl font-bold text-primary">Hostello India</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">About Us</Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Hostels</Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Rooms</Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
            <Button size="sm">Book Now</Button>
          </nav>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white p-4 space-y-4">
            <Link href="#" className="block text-sm font-medium text-slate-600">Home</Link>
            <Link href="#" className="block text-sm font-medium text-slate-600">About Us</Link>
            <Link href="#" className="block text-sm font-medium text-slate-600">Hostels</Link>
            <Link href="#" className="block text-sm font-medium text-slate-600">Contact</Link>
            <Button className="w-full">Book Now</Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop" 
            alt="Students studying" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>
        
        <div className="container relative z-10 px-4 text-center text-white">
          <Badge className="mb-4 bg-primary/90 hover:bg-primary text-white border-none px-4 py-1 text-sm uppercase tracking-wider">
            Book your stay today!
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            India's 1st Study-Focused <br/>
            <span className="text-primary-foreground">Housing Company</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Premium hostels designed for students. Secure, comfortable, and community-driven.
          </p>
          <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
            Discover Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Booking Widget */}
      <div className="container mx-auto px-4 -mt-16 relative z-20 mb-20">
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 items-end border border-slate-100">
          <div className="space-y-2">
            <Label>Check In</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input type="date" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Check Out</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input type="date" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Guests</Label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Select>
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="1 Room, 1 Student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Room, 1 Student</SelectItem>
                  <SelectItem value="2">1 Room, 2 Students</SelectItem>
                  <SelectItem value="3">Shared Room</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button size="lg" className="w-full h-10 font-semibold">
            Check Availability
          </Button>
        </div>
      </div>

      {/* About Us */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h4 className="text-primary font-bold uppercase tracking-widest text-sm">About Us</h4>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">Welcome to <br/>Hostello India Pvt. Ltd.</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              <strong className="text-slate-900">Hostello India</strong> was founded with a mission — to redefine modern hostel living in India. We aim to create vibrant, secure, and comfortable living spaces for students who move to new cities to chase their dreams.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Whether you're a NEET aspirant or preparing for JEE, we make sure your stay is stress-free. From high-quality facilities to a warm community vibe, Hostello isn't just a place to stay — it's a place to belong.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Manager</p>
                <p className="text-sm text-slate-500">Hostello India</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2669&auto=format&fit=crop" className="rounded-2xl shadow-lg w-full h-64 object-cover translate-y-8" alt="Hostel Interior" />
            <img src="https://images.unsplash.com/photo-1522771753014-34a985adb961?q=80&w=2670&auto=format&fit=crop" className="rounded-2xl shadow-lg w-full h-64 object-cover" alt="Hostel Room" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Hostello?</h2>
            <p className="text-slate-600">We provide everything you need to focus on your studies and live comfortably.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {FEATURES.map((feature, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-all border-none shadow-sm">
                <CardContent className="pt-6 flex flex-col items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{feature.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Room Types */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Accommodation</h4>
          <h2 className="text-3xl font-bold">Choose Your Perfect Room</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ROOM_TYPES.map((room) => (
            <Card key={room.id} className="overflow-hidden hover:shadow-xl transition-all group border-slate-200">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm">
                  ₹{room.price} <span className="text-slate-500 font-normal text-xs">{room.period}</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{room.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="font-semibold">Size:</span> {room.size}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="h-4 w-4" /> {room.capacity}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 border-t pt-4">
                  <BedDouble className="h-4 w-4 text-primary" />
                  {room.bed}
                </div>
                <div className="flex flex-wrap gap-2">
                  {room.services.map((service, i) => (
                    <Badge key={i} variant="secondary" className="text-xs font-normal">{service}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Testimonials</h4>
            <h2 className="text-3xl font-bold">Our Tenants Love Us</h2>
          </div>

          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {TESTIMONIALS.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2 pl-6">
                  <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/10 h-full flex flex-col">
                    <div className="flex gap-1 text-yellow-400 mb-4">
                      {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                    </div>
                    <p className="text-lg text-white/90 italic mb-6 flex-grow">"{testimonial.content}"</p>
                    <div className="flex items-center gap-4 mt-auto">
                      <img src={testimonial.avatar} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover border-2 border-primary" />
                      <div>
                        <h5 className="font-bold">{testimonial.name}</h5>
                        <p className="text-sm text-white/60">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-white/10 hover:bg-white/20 text-white border-none" />
            <CarouselNext className="hidden md:flex -right-12 bg-white/10 hover:bg-white/20 text-white border-none" />
          </Carousel>
        </div>
      </section>

      {/* Our Hostels List */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Locations</h4>
          <h2 className="text-3xl font-bold">Our Hostels in Lucknow</h2>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {HOSTELS.map((hostel) => (
            <div key={hostel.id} className="flex flex-col md:flex-row gap-6 bg-white border rounded-2xl p-4 hover:shadow-lg transition-shadow items-center">
              <img 
                src={hostel.image} 
                alt={hostel.name} 
                className="w-full md:w-64 h-48 object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-grow space-y-3 text-center md:text-left">
                <Badge variant="outline" className="mb-2">{hostel.date}</Badge>
                <h3 className="text-xl font-bold">{hostel.name}</h3>
                <div className="flex items-start gap-2 text-slate-600 justify-center md:justify-start">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{hostel.location}</span>
                </div>
                <p className="text-sm text-slate-500">{hostel.types}</p>
                <Button variant="outline" className="mt-2">View Property</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to move in?</h2>
          <p className="text-xl opacity-90 mb-8">Contact us directly to book your room or schedule a visit.</p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-10">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur px-8 py-4 rounded-full">
              <Phone className="h-6 w-6" />
              <span className="text-2xl font-bold">(+91) 8052201234</span>
            </div>
          </div>
          
          <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold rounded-full shadow-lg">
            Contact Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-white mb-4">
                <div className="bg-primary text-white p-1 rounded font-bold text-lg">H</div>
                <span className="text-lg font-bold">Hostello India</span>
              </div>
              <p className="text-sm">Redefining student living with comfort, security, and community.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">About Us</Link></li>
                <li><Link href="#" className="hover:text-white">Hostels</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Connect</h4>
              <div className="flex gap-4">
                {/* Social Icons Placeholder */}
                <div className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer transition-colors">fb</div>
                <div className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer transition-colors">in</div>
                <div className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer transition-colors">tw</div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-xs">
            © 2025 Hostello India Pvt. Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
