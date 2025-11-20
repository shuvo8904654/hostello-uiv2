import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Share2, Ticket, Zap, BarChart3 } from "lucide-react";

export default function OwnerMarketing() {
  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Marketing Tools</h2>
          <p className="text-muted-foreground">Promote your hostel and attract new tenants.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
               <div>
                  <CardTitle>Active Coupons</CardTitle>
                  <CardDescription>Manage discount codes.</CardDescription>
               </div>
               <Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2"/> Create Coupon</Button>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                        <Ticket className="h-5 w-5" />
                     </div>
                     <div>
                        <div className="font-bold text-lg">WELCOME2024</div>
                        <div className="text-sm text-muted-foreground">10% Off First Month • 12 used</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <Badge className="bg-green-600">Active</Badge>
                     <Button variant="ghost" size="sm">Edit</Button>
                  </div>
               </div>
               <div className="flex items-center justify-between p-4 border rounded-lg opacity-60">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 bg-muted text-muted-foreground rounded-lg flex items-center justify-center">
                        <Ticket className="h-5 w-5" />
                     </div>
                     <div>
                        <div className="font-bold text-lg">SUMMER50</div>
                        <div className="text-sm text-muted-foreground">Flat 500 Off • Expired</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <Badge variant="secondary">Expired</Badge>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <Button className="w-full justify-start" variant="outline">
                  <Share2 className="h-4 w-4 mr-2" /> Social Media Post
               </Button>
               <Button className="w-full justify-start" variant="outline">
                  <Zap className="h-4 w-4 mr-2" /> Create Flash Sale
               </Button>
               <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" /> View Campaign Stats
               </Button>
            </CardContent>
         </Card>
      </div>
    </DashboardLayout>
  );
}

import { Plus } from "lucide-react";
