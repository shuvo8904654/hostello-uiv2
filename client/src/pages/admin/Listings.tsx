import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HOSTELS } from "@/lib/mockData";
import { Check, X, Eye } from "lucide-react";

export default function AdminListings() {
  return (
    <DashboardLayout type="admin">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Listing Approvals</h2>
        <p className="text-muted-foreground">Review and approve new property listings.</p>
      </div>

      <div className="space-y-6">
        {HOSTELS.map((hostel) => (
          <Card key={hostel.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img src={hostel.image} className="w-full md:w-48 h-32 object-cover rounded-lg" alt={hostel.name} />
                
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{hostel.name}</h3>
                      <p className="text-muted-foreground">{hostel.city} • {hostel.university}</p>
                    </div>
                    <Badge variant="outline">Pending Review</Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">{hostel.description}</p>
                  
                  <div className="flex gap-2 pt-2">
                    <Badge variant="secondary" className="font-normal">{hostel.type}</Badge>
                    <Badge variant="secondary" className="font-normal">£{hostel.price}/week</Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-2 justify-center min-w-[140px]">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Check className="h-4 w-4 mr-2" /> Approve
                  </Button>
                  <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                    <X className="h-4 w-4 mr-2" /> Reject
                  </Button>
                  <Button variant="ghost" className="w-full">
                    <Eye className="h-4 w-4 mr-2" /> View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
