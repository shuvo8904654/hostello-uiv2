import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Info, CheckCircle2, XCircle } from "lucide-react";

const APPROVED_PACKAGES = [
  { id: 1, name: "Monthly Standard", duration: "1 Month", price: 5000, description: "Standard bed in shared room.", status: "Active", features: ["WiFi", "Shared Bath", "3 Meals"] },
  { id: 2, name: "Semester Special", duration: "6 Months", price: 28000, description: "Discounted rate for long stay.", status: "Active", features: ["All Standard", "Gym Access", "Priority Support"] },
  { id: 3, name: "Premium Private", duration: "Monthly", price: 12000, description: "Private room with AC.", status: "Limited Availability", features: ["Attached Bath", "AC", "Personal Fridge"] },
];

export default function ManagerPackages() {
  return (
    <DashboardLayout type="manager">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Branch Packages</h2>
          <p className="text-muted-foreground">View approved rental packages available for Dhaka Hub.</p>
        </div>
        <Badge variant="outline" className="text-sm py-1"><CheckCircle2 className="w-3 h-3 mr-1 text-green-600"/> All Rates HQ Approved</Badge>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
         {APPROVED_PACKAGES.map(pkg => (
            <Card key={pkg.id} className="flex flex-col">
               <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                     <div className="p-2 bg-primary/10 rounded-full text-primary">
                        <Package className="h-5 w-5" />
                     </div>
                     <Badge variant={pkg.status === "Active" ? "default" : "secondary"}>
                        {pkg.status}
                     </Badge>
                  </div>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.duration} • {pkg.description}</CardDescription>
               </CardHeader>
               <CardContent className="flex-1">
                  <div className="text-3xl font-bold mb-4">৳{pkg.price.toLocaleString()}</div>
                  <div className="space-y-2">
                     {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-muted-foreground">
                           <CheckCircle2 className="h-3 w-3 mr-2 text-green-600" />
                           {feature}
                        </div>
                     ))}
                  </div>
               </CardContent>
               <CardFooter className="border-t pt-4 bg-muted/20">
                  <Button variant="outline" className="w-full">View Terms</Button>
               </CardFooter>
            </Card>
         ))}
      </div>

      <div className="mt-8">
         <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900">
            <CardContent className="p-6 flex items-start gap-4">
               <Info className="h-5 w-5 text-blue-600 mt-0.5" />
               <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-300">Need a Custom Package?</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                     Branch managers cannot create new pricing tiers directly. If you have a group booking or special corporate requirement, please submit a proposal to HQ for approval.
                  </p>
                  <Button size="sm" variant="link" className="px-0 text-blue-700">Submit Proposal &rarr;</Button>
               </div>
            </CardContent>
         </Card>
      </div>
    </DashboardLayout>
  );
}
