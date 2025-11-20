import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Plus, Share2, Eye, MousePointerClick } from "lucide-react";

export default function ManagerMarketing() {
  return (
    <DashboardLayout type="manager">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Marketing - Dhaka Hub</h2>
          <p className="text-muted-foreground">Promote this branch and manage listings.</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4"/> Create Promotion</Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-8">
         <Card>
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium">Listing Views (30d)</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">1,240</div>
               <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Eye className="h-3 w-3"/> Unique visitors</p>
            </CardContent>
         </Card>
         <Card>
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">45</div>
               <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MessageSquareIcon className="h-3 w-3"/> Messages received</p>
            </CardContent>
         </Card>
         <Card>
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">3.2%</div>
               <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MousePointerClick className="h-3 w-3"/> Visitor to Booking</p>
            </CardContent>
         </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
         <Card>
            <CardHeader>
               <CardTitle>Active Campaigns</CardTitle>
               <CardDescription>Promotions currently running for this branch.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Megaphone className="h-5 w-5" />
                     </div>
                     <div>
                        <h4 className="font-semibold">Back to School Discount</h4>
                        <p className="text-sm text-muted-foreground">10% off for first month rent</p>
                     </div>
                  </div>
                  <Badge className="bg-green-600">Active</Badge>
               </div>
               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Share2 className="h-5 w-5" />
                     </div>
                     <div>
                        <h4 className="font-semibold">Referral Program</h4>
                        <p className="text-sm text-muted-foreground">Refer a friend, get 500tk off</p>
                     </div>
                  </div>
                  <Badge className="bg-green-600">Active</Badge>
               </div>
            </CardContent>
         </Card>
         
         <Card>
            <CardHeader>
               <CardTitle>Quick Actions</CardTitle>
               <CardDescription>Boost your visibility.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
               <Button variant="outline" className="w-full justify-start">Update Listing Photos</Button>
               <Button variant="outline" className="w-full justify-start">Edit Description & Amenities</Button>
               <Button variant="outline" className="w-full justify-start">Share Listing on Social Media</Button>
            </CardContent>
         </Card>
      </div>
    </DashboardLayout>
  );
}

function MessageSquareIcon(props: any) {
   return (
      <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
   )
}
