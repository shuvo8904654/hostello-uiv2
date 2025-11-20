import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HOSTELS } from "@/lib/mockData";
import { Plus, MoreVertical, MapPin, BedDouble, Users, Star, MessageSquare, ShieldCheck, Trash2, Edit, Settings, Power, LayoutGrid, List } from "lucide-react";
import { Link } from "wouter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const MANAGERS = [
  { id: "m1", name: "Abdul Karim" },
  { id: "m2", name: "Fatima Hasan" },
  { id: "m3", name: "Rahim Mia" },
];

export default function OwnerProperties() {
  const { toast } = useToast();
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isRoomsOpen, setIsRoomsOpen] = useState(false);

  // Helper to simulate finding a manager for a property
  const getManager = (propertyId: string) => {
     if (propertyId === '1') return "Abdul Karim";
     if (propertyId === '2') return "Fatima Hasan";
     return null; // Unassigned
  };

  const handleDelete = () => {
    toast({
      title: "Property Deleted",
      description: `${selectedProperty?.name} has been removed.`,
      variant: "destructive",
    });
    setIsDeleteOpen(false);
  };

  const handleAssignManager = () => {
    toast({
      title: "Manager Assigned",
      description: `Manager has been assigned to ${selectedProperty?.name}.`,
    });
    setIsManagerOpen(false);
  };

  const handleUpdateRooms = () => {
    toast({
      title: "Rooms Updated",
      description: "Room availability and pricing updated successfully.",
    });
    setIsRoomsOpen(false);
  };

  const openDelete = (property: any) => {
    setSelectedProperty(property);
    setIsDeleteOpen(true);
  };

  const openManager = (property: any) => {
    setSelectedProperty(property);
    setIsManagerOpen(true);
  };

  const openRooms = (property: any) => {
    setSelectedProperty(property);
    setIsRoomsOpen(true);
  };

  const toggleStatus = (property: any) => {
    toast({
      title: "Status Updated",
      description: `${property.name} is now ${Math.random() > 0.5 ? 'Hidden' : 'Live'}.`,
    });
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
            <Card key={hostel.id} className="overflow-hidden flex flex-col group">
              <div className="h-40 w-full relative">
                <img src={hostel.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={hostel.name} />
                <Badge className="absolute top-2 right-2 bg-white/90 text-foreground hover:bg-white cursor-pointer" onClick={() => toggleStatus(hostel)}>
                   <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div> Live
                </Badge>
                
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 shrink-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <Link href={`/dashboard/owner/properties/edit/${hostel.id}`}>
                         <DropdownMenuItem>
                           <Edit className="mr-2 h-4 w-4" /> Edit Details
                         </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem onClick={() => openManager(hostel)}>
                        <ShieldCheck className="mr-2 h-4 w-4" /> Assign Manager
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleStatus(hostel)}>
                        <Power className="mr-2 h-4 w-4" /> Toggle Status
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => openDelete(hostel)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Property
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                      <span className="font-medium cursor-pointer hover:underline" onClick={() => openManager(hostel)}>{manager}</span>
                   ) : (
                      <span className="text-muted-foreground hover:underline cursor-pointer italic" onClick={() => openManager(hostel)}>
                         Unassigned
                      </span>
                   )}
                </div>

                <div className="mt-auto flex gap-2">
                  <Link href={`/dashboard/owner/properties/edit/${hostel.id}`} className="flex-1">
                     <Button variant="outline" className="w-full">Edit Details</Button>
                  </Link>
                  <Button className="flex-1" onClick={() => openRooms(hostel)}>Manage Rooms</Button>
                </div>
              </CardContent>
            </Card>
           );
        })}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Delete Property</DialogTitle>
               <DialogDescription>
                  Are you sure you want to delete <strong>{selectedProperty?.name}</strong>? This action cannot be undone and all associated data (bookings, history) will be archived.
               </DialogDescription>
            </DialogHeader>
            <DialogFooter>
               <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
               <Button variant="destructive" onClick={handleDelete}>Delete Permanently</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>

      {/* Assign Manager Dialog */}
      <Dialog open={isManagerOpen} onOpenChange={setIsManagerOpen}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Assign Branch Manager</DialogTitle>
               <DialogDescription>
                  Select a manager for <strong>{selectedProperty?.name}</strong>. They will have full access to manage this branch.
               </DialogDescription>
            </DialogHeader>
            <div className="py-4">
               <Label className="mb-2 block">Select Manager</Label>
               <Select defaultValue={getManager(selectedProperty?.id) ? "assigned" : ""}>
                  <SelectTrigger>
                     <SelectValue placeholder="Choose a manager" />
                  </SelectTrigger>
                  <SelectContent>
                     {MANAGERS.map(m => (
                        <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                     ))}
                     <SelectItem value="assigned">Abdul Karim (Current)</SelectItem>
                  </SelectContent>
               </Select>
               <p className="text-xs text-muted-foreground mt-2">
                  Don't see the person you're looking for? <Link href="/dashboard/owner/staff" className="text-primary hover:underline">Add new staff</Link>.
               </p>
            </div>
            <DialogFooter>
               <Button variant="outline" onClick={() => setIsManagerOpen(false)}>Cancel</Button>
               <Button onClick={handleAssignManager}>Save Assignment</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>

      {/* Quick Manage Rooms Dialog */}
      <Dialog open={isRoomsOpen} onOpenChange={setIsRoomsOpen}>
         <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
            <DialogHeader>
               <DialogTitle>Manage Rooms: {selectedProperty?.name}</DialogTitle>
               <DialogDescription>
                  Update availability, pricing, and view floor plans.
               </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="list" className="flex-1 flex flex-col overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                 <TabsList>
                    <TabsTrigger value="list"><List className="h-4 w-4 mr-2" /> List View</TabsTrigger>
                    <TabsTrigger value="floorplan"><LayoutGrid className="h-4 w-4 mr-2" /> Floor Plan</TabsTrigger>
                 </TabsList>
                 <Link href={`/dashboard/owner/properties/edit/${selectedProperty?.id}`}>
                     <Button variant="outline" size="sm" className="border-dashed">
                        <Plus className="h-3 w-3 mr-2" /> Add New Room
                     </Button>
                  </Link>
              </div>

              <TabsContent value="list" className="flex-1 overflow-y-auto pr-1">
                 <div className="space-y-4">
                    {selectedProperty?.rooms.map((room: any) => (
                       <div key={room.id} className="grid grid-cols-12 gap-4 items-center border p-3 rounded-lg">
                          <div className="col-span-4">
                             <p className="font-medium">{room.name}</p>
                             <p className="text-xs text-muted-foreground">{room.type} • {room.capacity} Person</p>
                          </div>
                          <div className="col-span-3">
                             <Label className="text-xs text-muted-foreground">Price (Monthly)</Label>
                             <Input type="number" defaultValue={room.price} className="h-8 mt-1" />
                          </div>
                          <div className="col-span-3">
                             <Label className="text-xs text-muted-foreground">Available Beds</Label>
                             <Input type="number" defaultValue={room.available} className="h-8 mt-1" />
                          </div>
                          <div className="col-span-2 flex justify-end">
                             <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                <Settings className="h-4 w-4" />
                             </Button>
                          </div>
                       </div>
                    ))}
                 </div>
              </TabsContent>

              <TabsContent value="floorplan" className="flex-1 overflow-y-auto">
                 <div className="border rounded-lg p-4 bg-muted/20 min-h-[400px]">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                       {selectedProperty?.rooms.map((room: any) => (
                          <div key={room.id} className="border bg-background rounded-lg p-3 shadow-sm">
                             <div className="flex justify-between items-start mb-2">
                                <span className="font-medium text-sm">{room.name}</span>
                                <Badge variant={room.available > 0 ? "outline" : "secondary"} className="text-[10px]">
                                   {room.available > 0 ? `${room.available} Free` : "Full"}
                                </Badge>
                             </div>
                             <div className="grid grid-cols-2 gap-2 mt-2">
                                {Array.from({ length: room.capacity || 2 }).map((_, i) => (
                                   <div 
                                      key={i} 
                                      className={`h-12 rounded border flex items-center justify-center relative
                                         ${i < (room.capacity - room.available) 
                                            ? "bg-primary/10 border-primary/30" 
                                            : "bg-secondary/50 border-dashed hover:bg-secondary cursor-pointer"
                                         }`}
                                   >
                                      <BedDouble className={`h-4 w-4 ${i < (room.capacity - room.available) ? "text-primary" : "text-muted-foreground"}`} />
                                      {i < (room.capacity - room.available) && (
                                         <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
                                      )}
                                   </div>
                                ))}
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
                 <div className="mt-2 flex items-center justify-end gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-primary/10 border border-primary/30 rounded"></div> Occupied</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-secondary/50 border border-dashed rounded"></div> Available</div>
                 </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-4">
               <Button variant="outline" onClick={() => setIsRoomsOpen(false)}>Cancel</Button>
               <Button onClick={handleUpdateRooms}>Save Changes</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>

    </DashboardLayout>
  );
}
