import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useLocation } from "wouter";
import { Construction } from "lucide-react";

export default function PlaceholderPage() {
  const [location] = useLocation();
  const type = location.includes('tenant') ? 'tenant' : location.includes('owner') ? 'owner' : 'admin';

  return (
    <DashboardLayout type={type}>
       <div className="flex flex-col items-center justify-center h-[60vh] text-center">
         <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-6">
           <Construction className="h-10 w-10 text-muted-foreground" />
         </div>
         <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
         <p className="text-muted-foreground max-w-md mx-auto">
           We are currently building this feature. The <strong>{location}</strong> page will be available in the next update.
         </p>
       </div>
    </DashboardLayout>
  );
}
