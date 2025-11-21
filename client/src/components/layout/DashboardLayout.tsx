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
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";

type DashboardType = 'tenant' | 'owner' | 'admin' | 'manager';

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: DashboardType;
}

export function DashboardLayout({ children, type }: DashboardLayoutProps) {
  const [location] = useLocation();

  // Grouped Links Configuration
  const tenantGroups = [
    {
      label: "My Home",
      items: [
        { icon: LayoutDashboard, label: 'Overview', href: '/dashboard/tenant' },
        { icon: Home, label: 'My Bookings', href: '/dashboard/tenant/bookings' },
        { icon: MessageSquare, label: 'Messages', href: '/dashboard/tenant/messages' },
      ]
    },
    {
      label: "Discover",
      items: [
        { icon: Search, label: 'Find Hostels', href: '/search' },
      ]
    },
    {
      label: "Account",
      items: [
        { icon: Settings, label: 'Settings', href: '/dashboard/tenant/settings' },
      ]
    }
  ];

  const ownerGroups = [
    {
      label: "Overview",
      items: [
        { icon: BarChart, label: 'Analytics', href: '/dashboard/owner' },
      ]
    },
    {
      label: "Management",
      items: [
        { icon: Calendar, label: 'Bookings', href: '/dashboard/owner/bookings' },
        { icon: Users, label: 'Tenants', href: '/dashboard/owner/tenants' },
        { icon: Briefcase, label: 'Staff', href: '/dashboard/owner/staff' },
      ]
    },
    {
      label: "Property",
      items: [
        { icon: Building2, label: 'Properties', href: '/dashboard/owner/properties' },
        { icon: Globe, label: 'Website Builder', href: '/dashboard/owner/website' },
        { icon: Package, label: 'Packages', href: '/dashboard/owner/packages' },
        { icon: Armchair, label: 'Inventory', href: '/dashboard/owner/inventory' },
        { icon: Utensils, label: 'Food & Meals', href: '/dashboard/owner/food' },
      ]
    },
    {
      label: "Operations",
      items: [
        { icon: Wrench, label: 'Maintenance', href: '/dashboard/owner/maintenance' },
        { icon: Star, label: 'Reviews', href: '/dashboard/owner/reviews' },
      ]
    },
    {
      label: "Finance",
      items: [
        { icon: Banknote, label: 'Financials', href: '/dashboard/owner/financials' },
        { icon: DollarSign, label: 'Salaries', href: '/dashboard/owner/salaries' },
      ]
    },
    {
      label: "System",
      items: [
        { icon: Megaphone, label: 'Marketing', href: '/dashboard/owner/marketing' },
        { icon: MessageSquare, label: 'Messages', href: '/dashboard/owner/messages' },
        { icon: Settings, label: 'Settings', href: '/dashboard/owner/settings' },
      ]
    }
  ];

  const managerGroups = [
    {
      label: "Main",
      items: [
        { icon: LayoutDashboard, label: 'Overview', href: '/dashboard/manager' },
        { icon: BarChart, label: 'Analytics', href: '/dashboard/manager/analytics' },
      ]
    },
    {
      label: "Operations",
      items: [
        { icon: Calendar, label: 'Bookings', href: '/dashboard/manager/bookings' },
        { icon: BedDouble, label: 'Rooms & Beds', href: '/dashboard/manager/rooms' },
        { icon: Users, label: 'Tenants', href: '/dashboard/manager/tenants' },
        { icon: Wrench, label: 'Maintenance', href: '/dashboard/manager/maintenance' },
        { icon: Star, label: 'Reviews', href: '/dashboard/manager/reviews' },
      ]
    },
    {
      label: "Finance & Team",
      items: [
        { icon: Banknote, label: 'Financials', href: '/dashboard/manager/financials' },
        { icon: Briefcase, label: 'Staff', href: '/dashboard/manager/staff' },
      ]
    },
    {
      label: "System",
      items: [
        { icon: Megaphone, label: 'Marketing', href: '/dashboard/manager/marketing' },
        { icon: Package, label: 'Packages', href: '/dashboard/manager/packages' },
        { icon: MessageSquare, label: 'Messages', href: '/dashboard/manager/messages' },
        { icon: Settings, label: 'Settings', href: '/dashboard/manager/settings' },
      ]
    }
  ];

  const adminGroups = [
    {
      label: "Platform",
      items: [
        { icon: BarChart, label: 'Analytics', href: '/dashboard/admin' },
        { icon: ShieldCheck, label: 'Verification', href: '/dashboard/admin/verification' },
        { icon: Users, label: 'User Management', href: '/dashboard/admin/users' },
        { icon: Building2, label: 'Hostels & Bookings', href: '/dashboard/admin/bookings' },
      ]
    },
    {
      label: "Moderation",
      items: [
        { icon: AlertTriangle, label: 'Moderation', href: '/dashboard/admin/moderation' },
        { icon: LifeBuoy, label: 'Support & Tickets', href: '/dashboard/admin/support' },
      ]
    },
    {
      label: "System",
      items: [
        { icon: CreditCard, label: 'Billing & Plans', href: '/dashboard/admin/billing' },
        { icon: Sliders, label: 'Platform Control', href: '/dashboard/admin/control' },
        { icon: Server, label: 'System', href: '/dashboard/admin/system' },
        { icon: Database, label: 'Data Management', href: '/dashboard/admin/data' },
      ]
    }
  ];

  const groups = type === 'tenant' ? tenantGroups : 
                 type === 'owner' ? ownerGroups : 
                 type === 'manager' ? managerGroups : 
                 adminGroups;

  const roleLabel = type === 'tenant' ? 'Student' : 
                    type === 'owner' ? 'Owner' : 
                    type === 'manager' ? 'Manager' : 
                    'Admin';

  // Generate Breadcrumbs
  const generateBreadcrumbs = () => {
    const pathSegments = location.split('/').filter(Boolean);
    // pathSegments example: ['dashboard', 'owner', 'website']
    
    // Basic breadcrumb structure
    const items = [
      { label: 'Dashboard', href: `/dashboard/${type}` }
    ];

    if (pathSegments.length > 2) {
      // Find the current page label from groups
      let currentLabel = '';
      groups.forEach(group => {
        const link = group.items.find(item => item.href === location);
        if (link) currentLabel = link.label;
      });

      if (currentLabel && location !== `/dashboard/${type}`) {
        items.push({ label: currentLabel, href: location });
      }
    }

    return (
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              <BreadcrumbItem>
                {index === items.length - 1 ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Hostello</span>
              <span className="truncate text-xs text-muted-foreground">{roleLabel} Portal</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {groups.map((group, index) => (
            <SidebarGroup key={index}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={location === item.href} tooltip={item.label}>
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Sign Out">
                <button className="text-destructive hover:text-destructive">
                  <LogOut />
                  <span>Sign Out</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {generateBreadcrumbs()}
          </div>
          
          <div className="flex items-center gap-4">
             {/* Notifications & Alerts */}
             <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-8 w-8">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-600 border-2 border-background"></span>
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
                           <p className="text-xs text-muted-foreground mt-1">2 mins ago</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
                        <div className="h-2 w-2 mt-1.5 rounded-full bg-orange-500 shrink-0" />
                        <div>
                           <p className="text-sm font-medium">Rent Overdue</p>
                           <p className="text-xs text-muted-foreground">Sujon Khan's rent is 5 days late</p>
                           <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                        </div>
                     </div>
                   </div>
                   <Button variant="outline" size="sm" className="w-full">View All Notifications</Button>
                 </div>
              </PopoverContent>
            </Popover>

            <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              {type === 'tenant' ? 'AL' : type === 'owner' ? 'JD' : type === 'manager' ? 'BM' : 'AD'}
            </div>
          </div>
        </header>
        <div className="flex-1 p-4 pt-4 md:p-8 md:pt-6 max-w-[1600px] w-full mx-auto animate-in fade-in duration-500">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
