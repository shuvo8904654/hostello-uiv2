import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { CheckCircle2, TrendingUp, Shield, Users, Calendar, CreditCard, ArrowRight, Star } from "lucide-react";
import generatedImage from '@assets/generated_images/modern_property_management_dashboard_on_a_laptop_with_a_bright_office_background.png';

export default function OwnerLanding() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-gradient-to-b from-muted/50 to-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-background shadow-sm text-primary">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                Now accepting new properties in Dhaka
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                Transform your hostel into a <span className="text-primary">digital business</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                Stop chasing rent and managing spreadsheets. Hostello gives you a complete toolkit to manage tenants, automate payments, and fill your rooms faster.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/dashboard/owner/properties/new">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20">
                    List Your Property
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard/owner">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-2">
                    View Demo Dashboard
                  </Button>
                </Link>
              </div>
              
              <div className="pt-8 flex items-center gap-8 text-sm text-muted-foreground font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Zero setup fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Verified tenants only</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border bg-card aspect-[4/3] lg:aspect-square">
                <img 
                  src={generatedImage} 
                  alt="Hostello Dashboard" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10"></div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border animate-in slide-in-from-bottom-5 duration-1000 delay-300">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Monthly Revenue</p>
                    <p className="text-lg font-bold text-foreground">৳1,24,500</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border animate-in slide-in-from-top-5 duration-1000 delay-500 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Occupancy Rate</p>
                    <p className="text-lg font-bold text-foreground">98%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-foreground mb-1">200+</p>
              <p className="text-muted-foreground font-medium">Active Hostels</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-foreground mb-1">5,000+</p>
              <p className="text-muted-foreground font-medium">Verified Students</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-foreground mb-1">98%</p>
              <p className="text-muted-foreground font-medium">Occupancy Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-foreground mb-1">৳12M+</p>
              <p className="text-muted-foreground font-medium">Processed Rent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to run your hostel</h2>
            <p className="text-xl text-muted-foreground">We've built the operating system for modern student accommodation.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Tenant Screening",
                description: "We verify every student ID and university enrollment so you know exactly who is living in your property."
              },
              {
                icon: <CreditCard className="h-8 w-8 text-primary" />,
                title: "Automated Rent Collection",
                description: "Say goodbye to cash collection. Payments are deposited directly to your bank account every month."
              },
              {
                icon: <Calendar className="h-8 w-8 text-primary" />,
                title: "Booking Management",
                description: "Manage room availability, view upcoming check-ins, and handle lease agreements digitally."
              },
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "Damage Protection",
                description: "Secure deposits and documented inventory check-ins protect your property assets."
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-primary" />,
                title: "Financial Reporting",
                description: "Track expenses, revenue, and profitability with automated monthly reports."
              },
              {
                icon: <Star className="h-8 w-8 text-primary" />,
                title: "Reputation Management",
                description: "Collect and showcase reviews from happy tenants to attract more students."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-background p-8 rounded-2xl shadow-sm border hover:shadow-md transition-all hover:-translate-y-1">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to modernize your hostel?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Join hundreds of hostel owners in Dhaka who are saving time and earning more with Hostello.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link href="/dashboard/owner/properties/new" className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "h-14 px-10 text-lg font-bold rounded-full")}>
               Get Started for Free
             </Link>
             <Link href="/contact" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-14 px-10 text-lg font-bold rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary")}>
               Contact Sales
             </Link>
          </div>
          <p className="mt-8 text-sm opacity-70">No credit card required • Free 14-day trial</p>
        </div>
      </section>
    </PublicLayout>
  );
}
