import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Edit, Trash2 } from "lucide-react";

const PACKAGES = [
  { id: 1, name: "Monthly Standard", duration: "1 Month", price: 5000, description: "Standard bed in shared room.", active: true },
  { id: 2, name: "Semester Special", duration: "6 Months", price: 28000, description: "Discounted rate for long stay.", active: true },
  { id: 3, name: "Daily Stay", duration: "1 Day", price: 500, description: "For short term visitors.", active: false },
];

export default function ManagerPackages() {
  return (
    <DashboardLayout type="manager">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Packages - Dhaka Hub</h2>
          <p className="text-muted-foreground">Manage rental packages and pricing tiers.</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4"/> Add Package</Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
         {PACKAGES.map(pkg => (
            <Card key={pkg.id}>
               <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                     <Badge variant={pkg.active ? "default" : "secondary"} className="mb-2">{pkg.active ? 'Active' : 'Inactive'}</Badge>
                     <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6"><Edit className="h-3 w-3"/></Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 hover:text-destructive"><Trash2 className="h-3 w-3"/></Button>
                     </div>
                  </div>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.duration}</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold mb-2">৳{pkg.price}</div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
               </CardContent>
            </Card>
         ))}
      </div>
    </DashboardLayout>
  );
}
