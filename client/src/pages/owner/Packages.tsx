import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, Package, Wifi, Utensils, Clock, DollarSign } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PACKAGES = [
  { id: 1, name: "Standard Monthly", type: "Stay", price: 5000, duration: "Monthly", status: "Active" },
  { id: 2, name: "Semester Saver", type: "Stay", price: 28000, duration: "6 Months", status: "Active" },
  { id: 3, name: "Premium Daily", type: "Stay", price: 800, duration: "Daily", status: "Inactive" },
];

const ADDONS = [
  { id: 1, name: "Daily Meal Plan", price: 3000, type: "Monthly", icon: Utensils },
  { id: 2, name: "High-Speed WiFi+", price: 500, type: "Monthly", icon: Wifi },
  { id: 3, name: "Laundry Service", price: 400, type: "Per Load", icon: Package },
];

export default function PricingPackages() {
  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Packages & Pricing</h2>
          <p className="text-muted-foreground">Manage room rates, stay packages, and optional add-ons.</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2"/> Create Package</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Stay Packages</CardTitle>
              <CardDescription>Base rates for different durations.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Package Name</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {PACKAGES.map((pkg) => (
                      <TableRow key={pkg.id}>
                        <TableCell className="font-medium whitespace-nowrap">{pkg.name}</TableCell>
                        <TableCell>{pkg.duration}</TableCell>
                        <TableCell>৳{pkg.price}</TableCell>
                        <TableCell><Badge variant={pkg.status === 'Active' ? 'default' : 'secondary'}>{pkg.status}</Badge></TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4"/></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit Package</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile List View */}
              <div className="sm:hidden divide-y">
                {PACKAGES.map((pkg) => (
                  <div key={pkg.id} className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{pkg.name}</h4>
                        <Badge variant={pkg.status === 'Active' ? 'default' : 'secondary'} className="mt-1 text-xs">
                          {pkg.status}
                        </Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8"><MoreVertical className="h-4 w-4"/></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Package</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-3 w-3 mr-2" />
                        {pkg.duration}
                      </div>
                      <div className="flex items-center font-medium">
                        <DollarSign className="h-3 w-3 mr-1" />
                        ৳{pkg.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
               <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <CardTitle>Add-ons & Services</CardTitle>
                    <CardDescription>Extra services tenants can purchase.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">Add Service</Button>
               </div>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ADDONS.map(addon => (
                    <div key={addon.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                       <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <addon.icon className="h-5 w-5" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="font-bold truncate">{addon.name}</div>
                          <div className="text-sm text-muted-foreground truncate">৳{addon.price} / {addon.type}</div>
                       </div>
                       <Button variant="ghost" size="icon" className="shrink-0"><MoreVertical className="h-4 w-4"/></Button>
                    </div>
                  ))}
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="h-full bg-primary/5 border-primary/20">
            <CardHeader>
               <CardTitle>Dynamic Pricing</CardTitle>
               <CardDescription>Automate rates based on demand.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="p-4 bg-background rounded-lg border shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                     <span className="font-medium">Seasonal Surge</span>
                     <Badge>Enabled</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Automatically increase prices by 10% during semester starts (Jan & Jul).</p>
               </div>
               <div className="p-4 bg-background rounded-lg border shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                     <span className="font-medium">Occupancy Discount</span>
                     <Badge variant="secondary">Disabled</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Offer 5% off if occupancy drops below 50%.</p>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
