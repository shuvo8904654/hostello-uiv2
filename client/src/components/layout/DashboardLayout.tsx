import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Home, 
  Search, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Building2, 
  Users, 
  BarChart,
  ShieldCheck,
  Menu
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type DashboardType = 'tenant' | 'owner' | 'admin';

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: DashboardType;
}

export function DashboardLayout({ children, type }: DashboardLayoutProps) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const tenantLinks = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard/tenant' },
    { icon: Search, label: 'Find Hostels', href: '/search' },
    { icon: Home, label: 'My Bookings', href: '/dashboard/tenant/bookings' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/tenant/messages' },
    { icon: Settings, label: 'Settings', href: '/dashboard/tenant/settings' },
  ];

  const ownerLinks = [
    { icon: BarChart, label: 'Analytics', href: '/dashboard/owner' },
    { icon: Building2, label: 'My Properties', href: '/dashboard/owner/properties' },
    { icon: Users, label: 'Tenants', href: '/dashboard/owner/tenants' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/owner/messages' },
    { icon: Settings, label: 'Settings', href: '/dashboard/owner/settings' },
  ];

  const adminLinks = [
    { icon: ShieldCheck, label: 'Admin Overview', href: '/dashboard/admin' },
    { icon: Users, label: 'User Management', href: '/dashboard/admin/users' },
    { icon: Building2, label: 'Listings Approval', href: '/dashboard/admin/listings' },
    { icon: Settings, label: 'Platform Settings', href: '/dashboard/admin/settings' },
  ];

  const links = type === 'tenant' ? tenantLinks : type === 'owner' ? ownerLinks : adminLinks;
  const roleLabel = type === 'tenant' ? 'Student' : type === 'owner' ? 'Property Owner' : 'Administrator';

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <Link href="/">
           <a className="flex items-center gap-2 mb-1" onClick={() => setOpen(false)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">Hostello</span>
          </a>
        </Link>
        <div className="text-xs font-medium text-muted-foreground px-1 uppercase tracking-wider mt-2">{roleLabel} Portal</div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location === link.href;
          return (
            <Link key={link.href} href={link.href}>
              <a 
                onClick={() => setOpen(false)}
                className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}>
                <Icon className="h-4 w-4" />
                {link.label}
              </a>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-muted/20 font-sans">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-card border-r hidden md:flex flex-col fixed h-full z-30">
        <NavContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
        <header className="h-16 border-b bg-card/50 backdrop-blur px-4 md:px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden -ml-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                 <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                 <NavContent />
              </SheetContent>
            </Sheet>
            <h1 className="font-semibold text-lg capitalize truncate">
              {links.find(l => l.href === location)?.label || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">
              {type === 'tenant' ? 'AL' : type === 'owner' ? 'JD' : 'AD'}
            </div>
          </div>
        </header>
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
