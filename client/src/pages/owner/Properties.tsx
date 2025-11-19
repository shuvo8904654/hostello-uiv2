import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HOSTELS } from "@/lib/mockData";
import { Plus, MoreVertical, MapPin, BedDouble, Users } from "lucide-react";

export default function OwnerProperties() {
  return (
    <DashboardLayout type="owner">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Properties</h2>
          <p className="text-muted-foreground">Manage your listings and rooms.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add New Property
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HOSTELS.map((hostel) => (
          <Card key={hostel.id} className="overflow-hidden">
            <div className="h-40 w-full relative">
              <img src={hostel.image} className="w-full h-full object-cover" alt={hostel.name} />
              <Badge className="absolute top-2 right-2 bg-white/90 text-foreground hover:bg-white">Live</Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-start">
                {hostel.name}
                <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardTitle>
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {hostel.city}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                  <BedDouble className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{hostel.rooms.length} Room Types</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">92% Occupancy</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">Edit Details</Button>
                <Button className="flex-1">Manage Rooms</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
