import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Plus, Share2, MapPin, Users, FileText, Calendar, ClipboardList } from "lucide-react";

export default function ManagerMarketing() {
  return (
    <DashboardLayout type="manager">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Local Marketing</h2>
          <p className="text-muted-foreground">Manage offline campaigns and community outreach for Dhaka Hub.</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4"/> Log New Lead</Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-8">
         <Card>
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium">Walk-in Visits (This Week)</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">28</div>
               <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3"/> 12 converted to tours</p>
            </CardContent>
         </Card>
         <Card>
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium">Campus Referrals</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">15</div>
               <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Users className="h-3 w-3"/> From NSU & IUB</p>
            </CardContent>
         </Card>
         <Card>
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium">Flyers Distributed</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">500</div>
               <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><FileText className="h-3 w-3"/> Remaining stock: 150</p>
            </CardContent>
         </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
         <Card>
            <CardHeader>
               <CardTitle>Local Outreach Activities</CardTitle>
               <CardDescription>Ground-level marketing tasks assigned to your branch.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/10">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <MapPin className="h-5 w-5" />
                     </div>
                     <div>
                        <h4 className="font-semibold">Campus Notice Board - NSU</h4>
                        <p className="text-sm text-muted-foreground">Put up new semester posters</p>
                     </div>
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Due Tomorrow</Badge>
               </div>
               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Users className="h-5 w-5" />
                     </div>
                     <div>
                        <h4 className="font-semibold">Local Cafe Partnership</h4>
                        <p className="text-sm text-muted-foreground">Meeting with "Coffee Time" manager</p>
                     </div>
                  </div>
                  <Badge variant="secondary">Completed</Badge>
               </div>
            </CardContent>
         </Card>
         
         <Card>
            <CardHeader>
               <CardTitle>Marketing Materials</CardTitle>
               <CardDescription>Request or download collateral.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
               <div className="grid gap-2">
                  <Button variant="outline" className="justify-start h-auto py-3">
                     <FileText className="mr-2 h-4 w-4" />
                     <div className="text-left">
                        <div className="font-medium">Request Printed Flyers</div>
                        <div className="text-xs text-muted-foreground">Restock for front desk</div>
                     </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                     <ClipboardList className="mr-2 h-4 w-4" />
                     <div className="text-left">
                        <div className="font-medium">Download Tour Checklist</div>
                        <div className="text-xs text-muted-foreground">Standard procedure for walk-ins</div>
                     </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                     <Calendar className="mr-2 h-4 w-4" />
                     <div className="text-left">
                        <div className="font-medium">Submit Event Proposal</div>
                        <div className="text-xs text-muted-foreground">Plan a student mixer</div>
                     </div>
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
    </DashboardLayout>
  );
}
