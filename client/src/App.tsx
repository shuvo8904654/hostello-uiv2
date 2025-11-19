import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import HostelDetail from "@/pages/HostelDetail";

// Tenant Pages
import TenantDashboard from "@/pages/TenantDashboard";
import TenantBookings from "@/pages/tenant/Bookings";
import MessagesPage from "@/pages/shared/Messages";
import SettingsPage from "@/pages/shared/Settings";

// Owner Pages
import OwnerDashboard from "@/pages/OwnerDashboard";
import OwnerProperties from "@/pages/owner/Properties";
import OwnerTenants from "@/pages/owner/Tenants";

// Admin Pages
import AdminDashboard from "@/pages/AdminDashboard";
import AdminUsers from "@/pages/admin/Users";
import AdminListings from "@/pages/admin/Listings";

import PlaceholderPage from "@/pages/Placeholder";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/hostel/:id" component={HostelDetail} />
      
      {/* Tenant Routes */}
      <Route path="/dashboard/tenant" component={TenantDashboard} />
      <Route path="/dashboard/tenant/bookings" component={TenantBookings} />
      <Route path="/dashboard/tenant/messages" component={MessagesPage} />
      <Route path="/dashboard/tenant/settings" component={SettingsPage} />
      
      {/* Owner Routes */}
      <Route path="/dashboard/owner" component={OwnerDashboard} />
      <Route path="/dashboard/owner/properties" component={OwnerProperties} />
      <Route path="/dashboard/owner/tenants" component={OwnerTenants} />
      <Route path="/dashboard/owner/messages" component={MessagesPage} />
      <Route path="/dashboard/owner/settings" component={SettingsPage} />
      
      {/* Admin Routes */}
      <Route path="/dashboard/admin" component={AdminDashboard} />
      <Route path="/dashboard/admin/users" component={AdminUsers} />
      <Route path="/dashboard/admin/listings" component={AdminListings} />
      <Route path="/dashboard/admin/settings" component={SettingsPage} />

      {/* Fallback */}
      <Route path="/dashboard/:any*" component={PlaceholderPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
