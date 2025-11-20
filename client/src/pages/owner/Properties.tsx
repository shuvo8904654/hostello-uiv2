import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HOSTELS } from "@/lib/mockData";
import { Plus, MoreVertical, MapPin, BedDouble, Users, Star, MessageSquare, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function OwnerProperties() {
  // Helper to simulate finding a manager for a property
  const getManager = (propertyId: string) => {
     if (propertyId === '1') return "Abdul Karim";
     if (propertyId === '2') return "Fatima Hasan";
     return null; // Unassigned
  };

  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Properties</h2>
          <p className="text-muted-foreground">Manage your listings and rooms.</p>
        </div>
        <Link href="/dashboard/owner/properties/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add New Property
          </Button>
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {HOSTELS.map((hostel) => {
           const manager = getManager(hostel.id);
           return (
            <Card key={hostel.id} className="overflow-hidden flex flex-col">
              <div className="h-40 w-full relative">
                <img src={hostel.image} className="w-full h-full object-cover" alt={hostel.name} />
                <Badge className="absolute top-2 right-2 bg-white/90 text-foreground hover:bg-white">Live</Badge>
                
                <div className="absolute bottom-2 left-2 flex gap-2">
                   <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/80 flex items-center gap-1 border-0">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> 
                      {hostel.rating}
                   </Badge>
                   <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/80 flex items-center gap-1 border-0">
                      <MessageSquare className="h-3 w-3" /> 
                      {hostel.reviews} Reviews
                   </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-start">
                  <span className="truncate pr-2">{hostel.name}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 shrink-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </CardTitle>
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1 shrink-0" />
                  <span className="truncate">{hostel.city}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded overflow-hidden">
                    <BedDouble className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="font-medium truncate">{hostel.rooms.length} Room Types</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded overflow-hidden">
                    <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="font-medium truncate">92% Occupancy</span>
                  </div>
                </div>

                {/* Manager Indicator */}
                <div className="mb-4 flex items-center justify-between text-xs bg-blue-50 dark:bg-blue-950/30 p-2 rounded border border-blue-100 dark:border-blue-900">
                   <div className="flex items-center text-blue-700 dark:text-blue-300">
                      <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />
                      <span className="font-medium">Manager:</span>
                   </div>
                   {manager ? (
                      <span className="font-medium">{manager}</span>
                   ) : (
                      <Link href="/dashboard/owner/staff">
                         <span className="text-muted-foreground hover:underline cursor-pointer italic">Unassigned</span>
                      </Link>
                   )}
                </div>

                <div className="mt-auto flex gap-2">
                  <Link href={`/dashboard/owner/properties/edit/${hostel.id}`} className="flex-1">
                     <Button variant="outline" className="w-full">Edit Details</Button>
                  </Link>
                  <Button className="flex-1">Manage Rooms</Button>
                </div>
              </CardContent>
            </Card>
           );
        })}
      </div>
    </DashboardLayout>
  );
}
