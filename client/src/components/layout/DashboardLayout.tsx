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
  Menu,
  Globe,
  Package,
  CreditCard,
  Calendar,
  Wrench,
  Megaphone,
  Star,
  Briefcase,
  Banknote,
  AlertTriangle,
  LifeBuoy,
  Server,
  Database,
  Sliders
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type DashboardType = 'tenant' | 'owner' | 'admin';

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: DashboardType;
}

interface NavContentProps {
  type: DashboardType;
  location: string;
  setOpen: (open: boolean) => void;
}

const NavContent = ({ type, location, setOpen }: NavContentProps) => {
  const tenantLinks = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard/tenant' },
    { icon: Search, label: 'Find Hostels', href: '/search' },
    { icon: Users, label: 'Roommate Finder', href: '/dashboard/tenant/roommates' },
    { icon: Home, label: 'My Bookings', href: '/dashboard/tenant/bookings' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/tenant/messages' },
    { icon: Settings, label: 'Settings', href: '/dashboard/tenant/settings' },
  ];

  const ownerLinks = [
    { icon: BarChart, label: 'Analytics', href: '/dashboard/owner' },
    { icon: Calendar, label: 'Bookings', href: '/dashboard/owner/bookings' },
    { icon: Building2, label: 'Properties', href: '/dashboard/owner/properties' },
    { icon: Users, label: 'Tenants', href: '/dashboard/owner/tenants' },
    { icon: Briefcase, label: 'Staff', href: '/dashboard/owner/staff' },
    { icon: Wrench, label: 'Maintenance', href: '/dashboard/owner/maintenance' },
    { icon: Banknote, label: 'Financials', href: '/dashboard/owner/financials' },
    { icon: Package, label: 'Packages', href: '/dashboard/owner/packages' },
    { icon: Megaphone, label: 'Marketing', href: '/dashboard/owner/marketing' },
    { icon: Star, label: 'Reviews', href: '/dashboard/owner/reviews' },
    { icon: Globe, label: 'Website', href: '/dashboard/owner/website' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/owner/messages' },
    { icon: Settings, label: 'Settings', href: '/dashboard/owner/settings' },
  ];

  const adminLinks = [
    { icon: BarChart, label: 'Analytics', href: '/dashboard/admin' },
    { icon: ShieldCheck, label: 'Verification', href: '/dashboard/admin/verification' },
    { icon: Users, label: 'User Management', href: '/dashboard/admin/users' },
    { icon: Building2, label: 'Hostels & Bookings', href: '/dashboard/admin/bookings' },
    { icon: AlertTriangle, label: 'Moderation', href: '/dashboard/admin/moderation' },
    { icon: CreditCard, label: 'Billing & Plans', href: '/dashboard/admin/billing' },
    { icon: Sliders, label: 'Platform Control', href: '/dashboard/admin/control' },
    { icon: LifeBuoy, label: 'Support & Tickets', href: '/dashboard/admin/support' },
    { icon: Server, label: 'System', href: '/dashboard/admin/system' },
    { icon: Database, label: 'Data Management', href: '/dashboard/admin/data' },
  ];

  const links = type === 'tenant' ? tenantLinks : type === 'owner' ? ownerLinks : adminLinks;
  const roleLabel = type === 'tenant' ? 'Student' : type === 'owner' ? 'Property Owner' : 'Administrator';

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <Link href="/" className="flex items-center gap-2 mb-1" onClick={() => setOpen(false)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">Hostello</span>
        </Link>
        <div className="text-xs font-medium text-muted-foreground px-1 uppercase tracking-wider mt-2">{roleLabel} Portal</div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}>
                <Icon className="h-4 w-4" />
                {link.label}
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
};

export function DashboardLayout({ children, type }: DashboardLayoutProps) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  // Helper to find current label
  const getLabel = () => {
     // Combine all links to find label
     const allLinks = [
        { label: 'Overview', href: '/dashboard/tenant' },
        { label: 'Find Hostels', href: '/search' },
        { label: 'Roommate Finder', href: '/dashboard/tenant/roommates' },
        { label: 'My Bookings', href: '/dashboard/tenant/bookings' },
        { label: 'Messages', href: '/dashboard/tenant/messages' },
        { label: 'Settings', href: '/dashboard/tenant/settings' },
        { label: 'Analytics', href: '/dashboard/owner' },
        { label: 'Bookings', href: '/dashboard/owner/bookings' },
        { label: 'Properties', href: '/dashboard/owner/properties' },
        { label: 'Staff', href: '/dashboard/owner/staff' },
        { label: 'Maintenance', href: '/dashboard/owner/maintenance' },
        { label: 'Financials', href: '/dashboard/owner/financials' },
        { label: 'Packages', href: '/dashboard/owner/packages' },
        { label: 'Marketing', href: '/dashboard/owner/marketing' },
        { label: 'Reviews', href: '/dashboard/owner/reviews' },
        { label: 'Website', href: '/dashboard/owner/website' },
        { label: 'Tenants', href: '/dashboard/owner/tenants' },
        { label: 'Messages', href: '/dashboard/owner/messages' },
        { label: 'Settings', href: '/dashboard/owner/settings' },
        
        // Admin links
        { label: 'Platform Analytics', href: '/dashboard/admin' },
        { label: 'Verification & Approval', href: '/dashboard/admin/verification' },
        { label: 'User Management', href: '/dashboard/admin/users' },
        { label: 'Hostel & Booking Oversight', href: '/dashboard/admin/bookings' },
        { label: 'Content Moderation', href: '/dashboard/admin/moderation' },
        { label: 'Subscription & Billing', href: '/dashboard/admin/billing' },
        { label: 'Platform Control', href: '/dashboard/admin/control' },
        { label: 'Support & Tickets', href: '/dashboard/admin/support' },
        { label: 'System Management', href: '/dashboard/admin/system' },
        { label: 'Data Management', href: '/dashboard/admin/data' },
     ];
     return allLinks.find(l => l.href === location)?.label || 'Dashboard';
  };

  return (
    <div className="min-h-screen flex bg-muted/20 font-sans">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-card border-r hidden md:flex flex-col fixed h-full z-30">
        <NavContent type={type} location={location} setOpen={setOpen} />
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
                 <NavContent type={type} location={location} setOpen={setOpen} />
              </SheetContent>
            </Sheet>
            <h1 className="font-semibold text-lg capitalize truncate">
              {getLabel()}
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
