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
import TenantDashboard from "@/pages/TenantDashboard";
import OwnerDashboard from "@/pages/OwnerDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import PlaceholderPage from "@/pages/Placeholder";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/hostel/:id" component={HostelDetail} />
      
      <Route path="/dashboard/tenant" component={TenantDashboard} />
      <Route path="/dashboard/tenant/:any*" component={PlaceholderPage} />
      
      <Route path="/dashboard/owner" component={OwnerDashboard} />
      <Route path="/dashboard/owner/:any*" component={PlaceholderPage} />
      
      <Route path="/dashboard/admin" component={AdminDashboard} />
      <Route path="/dashboard/admin/:any*" component={PlaceholderPage} />

      {/* Fallback to 404 */}
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
