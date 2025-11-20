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
  Sliders,
  Bell,
  BedDouble,
  Armchair,
  Utensils,
  Shield
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

type DashboardType = 'tenant' | 'owner' | 'admin' | 'manager';

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
    { icon: Armchair, label: 'Inventory', href: '/dashboard/owner/inventory' },
    { icon: Shield, label: 'Attendance & Security', href: '/dashboard/owner/attendance' },
    { icon: Utensils, label: 'Food & Meals', href: '/dashboard/owner/food' },
    { icon: Globe, label: 'Website', href: '/dashboard/owner/website' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/owner/messages' },
    { icon: Settings, label: 'Settings', href: '/dashboard/owner/settings' },
  ];

  const managerLinks = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard/manager' },
    { icon: Calendar, label: 'Bookings', href: '/dashboard/manager/bookings' },
    { icon: BedDouble, label: 'Rooms & Beds', href: '/dashboard/manager/rooms' },
    { icon: Users, label: 'Tenants', href: '/dashboard/manager/tenants' },
    { icon: Wrench, label: 'Maintenance', href: '/dashboard/manager/maintenance' },
    { icon: Banknote, label: 'Financials', href: '/dashboard/manager/financials' },
    { icon: Megaphone, label: 'Marketing', href: '/dashboard/manager/marketing' },
    { icon: Package, label: 'Packages', href: '/dashboard/manager/packages' },
    { icon: Star, label: 'Reviews', href: '/dashboard/manager/reviews' },
    { icon: BarChart, label: 'Analytics', href: '/dashboard/manager/analytics' },
    { icon: MessageSquare, label: 'Messages', href: '/dashboard/manager/messages' },
    { icon: Settings, label: 'Settings', href: '/dashboard/manager/settings' },
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

  const links = type === 'tenant' ? tenantLinks : 
                type === 'owner' ? ownerLinks : 
                type === 'manager' ? managerLinks : 
                adminLinks;
  
  const roleLabel = type === 'tenant' ? 'Student' : 
                    type === 'owner' ? 'Property Owner' : 
                    type === 'manager' ? 'Branch Manager' : 
                    'Administrator';

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
        { label: 'Inventory', href: '/dashboard/owner/inventory' },
        { label: 'Attendance & Security', href: '/dashboard/owner/attendance' },
        { label: 'Food & Meals', href: '/dashboard/owner/food' },
        { label: 'Messages', href: '/dashboard/owner/messages' },
        { label: 'Settings', href: '/dashboard/owner/settings' },
        
        // Manager links
        { label: 'Overview', href: '/dashboard/manager' },
        { label: 'Bookings', href: '/dashboard/manager/bookings' },
        { label: 'Rooms & Beds', href: '/dashboard/manager/rooms' },
        { label: 'Tenants', href: '/dashboard/manager/tenants' },
        { label: 'Maintenance', href: '/dashboard/manager/maintenance' },
        { label: 'Financials', href: '/dashboard/manager/financials' },
        { label: 'Marketing', href: '/dashboard/manager/marketing' },
        { label: 'Packages', href: '/dashboard/manager/packages' },
        { label: 'Reviews', href: '/dashboard/manager/reviews' },
        { label: 'Analytics', href: '/dashboard/manager/analytics' },
        { label: 'Messages', href: '/dashboard/manager/messages' },
        { label: 'Settings', href: '/dashboard/manager/settings' },

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
    <div className="min-h-screen bg-muted/20 font-sans relative">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-card border-r hidden md:flex flex-col fixed inset-y-0 z-30">
        <NavContent type={type} location={location} setOpen={setOpen} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col relative">
        <header className="h-16 border-b bg-card/50 backdrop-blur px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 w-full">
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
            {/* Notifications & Alerts */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600 border-2 border-background"></span>
                  <span className="sr-only">Notifications</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80">
                 <div className="grid gap-4">
                   <div className="space-y-2">
                     <h4 className="font-medium leading-none">Notifications</h4>
                     <p className="text-sm text-muted-foreground">You have 3 unread messages.</p>
                   </div>
                   <div className="grid gap-2">
                     <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
                        <div className="h-2 w-2 mt-1.5 rounded-full bg-blue-500 shrink-0" />
                        <div>
                           <p className="text-sm font-medium">New Booking Request</p>
                           <p className="text-xs text-muted-foreground">Rahim Ahmed requested Room 101</p>
                           <p className="text-[10px] text-muted-foreground mt-1">2 mins ago</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/50">
                        <div className="h-2 w-2 mt-1.5 rounded-full bg-transparent shrink-0" />
                        <div>
                           <p className="text-sm font-medium">Maintenance Update</p>
                           <p className="text-xs text-muted-foreground">Leaking faucet ticket resolved</p>
                           <p className="text-[10px] text-muted-foreground mt-1">1 hour ago</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
                        <div className="h-2 w-2 mt-1.5 rounded-full bg-orange-500 shrink-0" />
                        <div>
                           <p className="text-sm font-medium">Rent Overdue</p>
                           <p className="text-xs text-muted-foreground">Sujon Khan's rent is 5 days late</p>
                           <p className="text-[10px] text-muted-foreground mt-1">Yesterday</p>
                        </div>
                     </div>
                   </div>
                   <Button variant="outline" size="sm" className="w-full">View All Notifications</Button>
                 </div>
              </PopoverContent>
            </Popover>

            <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">
              {type === 'tenant' ? 'AL' : type === 'owner' ? 'JD' : type === 'manager' ? 'BM' : 'AD'}
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
