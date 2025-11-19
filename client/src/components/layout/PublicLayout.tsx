import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Building2, Menu, X } from "lucide-react";
import { useState } from "react";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">Hostello</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/search" className="text-sm font-medium hover:text-primary transition-colors">Find a Hostel</Link>
            <Link href="/dashboard/tenant" className="text-sm font-medium hover:text-primary transition-colors">Tenant Dashboard</Link>
            <Link href="/dashboard/owner" className="text-sm font-medium hover:text-primary transition-colors">List Your Property</Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-sm">Log in</Button>
              <Button size="sm" className="text-sm rounded-full px-6">Sign up</Button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t p-4 bg-background space-y-4 flex flex-col animate-in slide-in-from-top-5">
            <Link href="/search" className="block text-sm font-medium py-2">Find a Hostel</Link>
            <Link href="/dashboard/tenant" className="block text-sm font-medium py-2">Tenant Dashboard</Link>
            <Link href="/dashboard/owner" className="block text-sm font-medium py-2">Owner Dashboard</Link>
            <Link href="/dashboard/admin" className="block text-sm font-medium py-2">Admin Demo</Link>
            <div className="pt-2 flex flex-col gap-2">
               <Button variant="outline" className="w-full">Log in</Button>
               <Button className="w-full">Sign up</Button>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
                <Building2 className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold">Hostello</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The smartest way to find student accommodation near your university.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Browse Hostels</a></li>
              <li><a href="#" className="hover:text-foreground">How it works</a></li>
              <li><a href="#" className="hover:text-foreground">Pricing for Owners</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About Us</a></li>
              <li><a href="#" className="hover:text-foreground">Careers</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2025 Hostello. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
