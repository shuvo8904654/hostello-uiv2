import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import OwnerLanding from "@/pages/OwnerLanding";
import Search from "@/pages/Search";
import HostelDetail from "@/pages/HostelDetail";
import SignUp from "@/pages/SignUp";
import Compare from "@/pages/Compare";

// Tenant Pages
import TenantDashboard from "@/pages/TenantDashboard";
import TenantBookings from "@/pages/tenant/Bookings";
import RoommateFinder from "@/pages/tenant/RoommateFinder";
import MessagesPage from "@/pages/shared/Messages";
import SettingsPage from "@/pages/shared/Settings";

// Owner Pages
import OwnerDashboard from "@/pages/OwnerDashboard";
import OwnerProperties from "@/pages/owner/Properties";
import AddEditProperty from "@/pages/owner/AddEditProperty";
import OwnerTenants from "@/pages/owner/Tenants";
import WebsiteBuilder from "@/pages/owner/WebsiteBuilder";
import PricingPackages from "@/pages/owner/Packages";
import OwnerBookings from "@/pages/owner/Bookings";
import OwnerStaff from "@/pages/owner/Staff";
import OwnerMaintenance from "@/pages/owner/Maintenance";
import OwnerFinancials from "@/pages/owner/Financials";
import OwnerMarketing from "@/pages/owner/Marketing";
import OwnerReviews from "@/pages/owner/Reviews";

// Manager Pages
import ManagerDashboard from "@/pages/ManagerDashboard";
import ManagerBookings from "@/pages/manager/Bookings";
import ManagerTenants from "@/pages/manager/Tenants";
import ManagerMaintenance from "@/pages/manager/Maintenance";

// Admin Pages
import AdminDashboard from "@/pages/AdminDashboard";
import AdminUsers from "@/pages/admin/Users";
import AdminVerification from "@/pages/admin/Verification";
import AdminBookings from "@/pages/admin/Bookings";
import AdminModeration from "@/pages/admin/Moderation";
import AdminBilling from "@/pages/admin/Billing";
import AdminPlatformControl from "@/pages/admin/PlatformControl";
import AdminSupport from "@/pages/admin/Support";
import AdminSystem from "@/pages/admin/System";
import AdminData from "@/pages/admin/Data";

import PlaceholderPage from "@/pages/Placeholder";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/list-your-property" component={OwnerLanding} />
      <Route path="/search" component={Search} />
      <Route path="/compare" component={Compare} />
      <Route path="/hostel/:id" component={HostelDetail} />
      <Route path="/signup" component={SignUp} />
      
      {/* Tenant Routes */}
      <Route path="/dashboard/tenant" component={TenantDashboard} />
      <Route path="/dashboard/tenant/bookings" component={TenantBookings} />
      <Route path="/dashboard/tenant/roommates" component={RoommateFinder} />
      <Route path="/dashboard/tenant/messages" component={MessagesPage} />
      <Route path="/dashboard/tenant/settings" component={SettingsPage} />
      
      {/* Owner Routes */}
      <Route path="/dashboard/owner" component={OwnerDashboard} />
      <Route path="/dashboard/owner/properties" component={OwnerProperties} />
      <Route path="/dashboard/owner/properties/new" component={AddEditProperty} />
      <Route path="/dashboard/owner/properties/edit/:id" component={AddEditProperty} />
      <Route path="/dashboard/owner/tenants" component={OwnerTenants} />
      <Route path="/dashboard/owner/website" component={WebsiteBuilder} />
      <Route path="/dashboard/owner/packages" component={PricingPackages} />
      <Route path="/dashboard/owner/bookings" component={OwnerBookings} />
      <Route path="/dashboard/owner/staff" component={OwnerStaff} />
      <Route path="/dashboard/owner/maintenance" component={OwnerMaintenance} />
      <Route path="/dashboard/owner/financials" component={OwnerFinancials} />
      <Route path="/dashboard/owner/marketing" component={OwnerMarketing} />
      <Route path="/dashboard/owner/reviews" component={OwnerReviews} />
      <Route path="/dashboard/owner/messages" component={MessagesPage} />
      <Route path="/dashboard/owner/settings" component={SettingsPage} />

      {/* Manager Routes */}
      <Route path="/dashboard/manager" component={ManagerDashboard} />
      <Route path="/dashboard/manager/bookings" component={ManagerBookings} />
      <Route path="/dashboard/manager/tenants" component={ManagerTenants} />
      <Route path="/dashboard/manager/maintenance" component={ManagerMaintenance} />
      <Route path="/dashboard/manager/messages" component={MessagesPage} />
      <Route path="/dashboard/manager/settings" component={SettingsPage} />
      
      {/* Admin Routes */}
      <Route path="/dashboard/admin" component={AdminDashboard} />
      <Route path="/dashboard/admin/verification" component={AdminVerification} />
      <Route path="/dashboard/admin/users" component={AdminUsers} />
      <Route path="/dashboard/admin/bookings" component={AdminBookings} />
      <Route path="/dashboard/admin/moderation" component={AdminModeration} />
      <Route path="/dashboard/admin/billing" component={AdminBilling} />
      <Route path="/dashboard/admin/control" component={AdminPlatformControl} />
      <Route path="/dashboard/admin/support" component={AdminSupport} />
      <Route path="/dashboard/admin/system" component={AdminSystem} />
      <Route path="/dashboard/admin/data" component={AdminData} />

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
