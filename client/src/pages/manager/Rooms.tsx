import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BedDouble, User, Plus, MoreHorizontal } from "lucide-react";
import { 
   DropdownMenu, 
   DropdownMenuContent, 
   DropdownMenuItem, 
   DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Mock Rooms Data
const ROOMS = [
  { 
    id: "101", 
    type: "Dorm", 
    capacity: 4, 
    beds: [
      { id: "101-A", status: "Occupied", tenant: "Rahim Ahmed" },
      { id: "101-B", status: "Occupied", tenant: "Sujon Khan" },
      { id: "101-C", status: "Vacant", tenant: null },
      { id: "101-D", status: "Vacant", tenant: null },
    ]
  },
  { 
    id: "102", 
    type: "Private", 
    capacity: 1, 
    beds: [
      { id: "102-A", status: "Occupied", tenant: "Karim Ullah" },
    ]
  },
  { 
    id: "103", 
    type: "Dorm", 
    capacity: 2, 
    beds: [
      { id: "103-A", status: "Occupied", tenant: "Nusrat Jahan" },
      { id: "103-B", status: "Maintenance", tenant: null },
    ]
  }
];

export default function ManagerRooms() {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");

  const handleAssign = (bedId: string) => {
     toast({
        title: "Assign Tenant",
        description: `Assigning tenant to bed ${bedId}. Opening assignment modal...`,
     });
  };

  const handleMaintenance = (bedId: string) => {
     toast({
        title: "Maintenance Mode",
        description: `Bed ${bedId} marked for maintenance.`,
     });
  };

  return (
    <DashboardLayout type="manager">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Room & Bed Management</h2>
          <p className="text-muted-foreground">Visual overview of occupancy and bed status.</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4"/> Add Room</Button>
      </div>

      <Tabs defaultValue="grid" className="mb-6">
         <TabsList>
            <TabsTrigger value="grid">Visual Grid</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
         </TabsList>
      </Tabs>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
         {ROOMS.map(room => (
            <Card key={room.id} className="overflow-hidden">
               <CardHeader className="pb-3 bg-muted/20">
                  <div className="flex justify-between items-center">
                     <CardTitle>Room {room.id}</CardTitle>
                     <Badge variant="outline">{room.type}</Badge>
                  </div>
                  <CardDescription>{room.beds.filter(b => b.status === 'Occupied').length} / {room.capacity} Occupied</CardDescription>
               </CardHeader>
               <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                     {room.beds.map(bed => (
                        <div 
                           key={bed.id} 
                           className={`
                              relative p-3 rounded-lg border-2 flex flex-col items-center justify-center text-center min-h-[100px] transition-all
                              ${bed.status === 'Occupied' ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-900' : 
                                bed.status === 'Maintenance' ? 'border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-900' : 
                                'border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-accent'}
                           `}
                        >
                           <div className="absolute top-2 right-2">
                              <DropdownMenu>
                                 <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                                       <MoreHorizontal className="h-3 w-3" />
                                    </Button>
                                 </DropdownMenuTrigger>
                                 <DropdownMenuContent align="end">
                                    {bed.status === 'Vacant' && <DropdownMenuItem onClick={() => handleAssign(bed.id)}>Assign Tenant</DropdownMenuItem>}
                                    {bed.status === 'Occupied' && <DropdownMenuItem>View Tenant</DropdownMenuItem>}
                                    <DropdownMenuItem onClick={() => handleMaintenance(bed.id)}>Mark Maintenance</DropdownMenuItem>
                                 </DropdownMenuContent>
                              </DropdownMenu>
                           </div>

                           <BedDouble className={`h-6 w-6 mb-2 ${bed.status === 'Occupied' ? 'text-green-600' : bed.status === 'Maintenance' ? 'text-orange-500' : 'text-muted-foreground'}`} />
                           
                           <span className="text-xs font-semibold mb-1">{bed.id}</span>
                           
                           {bed.status === 'Occupied' ? (
                              <div className="flex items-center gap-1 text-xs text-green-700 font-medium">
                                 <User className="h-3 w-3" /> {bed.tenant?.split(' ')[0]}
                              </div>
                           ) : bed.status === 'Maintenance' ? (
                              <span className="text-xs text-orange-600 font-medium">Maintenance</span>
                           ) : (
                              <span className="text-xs text-muted-foreground">Vacant</span>
                           )}
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>
    </DashboardLayout>
  );
}
