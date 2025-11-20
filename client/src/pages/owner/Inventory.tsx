import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, AlertCircle, CheckCircle2, Clock, Edit, Trash2, MoreVertical } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialInventoryItems = [
  { id: "INV-001", name: "Single Bed Frame", category: "Furniture", location: "Room 101", purchaseDate: "2023-01-15", warranty: "2026-01-15", status: "Good", cost: "৳5,000" },
  { id: "INV-002", name: "Study Table", category: "Furniture", location: "Room 101", purchaseDate: "2023-01-15", warranty: "2025-01-15", status: "Good", cost: "৳3,500" },
  { id: "INV-003", name: "Ceiling Fan", category: "Appliances", location: "Room 102", purchaseDate: "2022-06-10", warranty: "2024-06-10", status: "Needs Maintenance", cost: "৳2,800" },
  { id: "INV-004", name: "Mattress (Single)", category: "Bedding", location: "Room 103", purchaseDate: "2023-03-20", warranty: "2028-03-20", status: "Good", cost: "৳4,000" },
  { id: "INV-005", name: "Water Purifier", category: "Appliances", location: "Common Area 1", purchaseDate: "2023-05-05", warranty: "2024-05-05", status: "Service Due", cost: "৳12,000" },
];

export default function OwnerInventory() {
  const { toast } = useToast();
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

  // New Item Form State
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    location: "",
    status: "Good",
    cost: "",
    warranty: ""
  });

  const handleAddItem = () => {
    const newId = `INV-${String(inventoryItems.length + 1).padStart(3, '0')}`;
    const itemToAdd = {
      id: newId,
      ...newItem,
      purchaseDate: new Date().toISOString().split('T')[0],
    };
    
    setInventoryItems([...inventoryItems, itemToAdd]);
    setIsAddDialogOpen(false);
    setNewItem({ name: "", category: "", location: "", status: "Good", cost: "", warranty: "" });
    
    toast({
      title: "Item Added",
      description: `${newItem.name} has been added to inventory.`,
    });
  };

  const handleEditItem = () => {
    setInventoryItems(inventoryItems.map(item => 
      item.id === currentItem.id ? { ...item, ...newItem } : item
    ));
    setIsEditDialogOpen(false);
    toast({
      title: "Item Updated",
      description: `${newItem.name} has been updated.`,
    });
  };

  const handleDeleteItem = (id: string) => {
    setInventoryItems(inventoryItems.filter(item => item.id !== id));
    toast({
      title: "Item Deleted",
      description: "Inventory item has been removed.",
      variant: "destructive"
    });
  };

  const openEditDialog = (item: any) => {
    setCurrentItem(item);
    setNewItem({
      name: item.name,
      category: item.category,
      location: item.location,
      status: item.status,
      cost: item.cost,
      warranty: item.warranty
    });
    setIsEditDialogOpen(true);
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventory & Assets</h2>
          <p className="text-muted-foreground">Track furniture, appliances, and maintenance cycles.</p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter: {statusFilter}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("All")}>All Status</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Good")}>Good</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Needs Maintenance")}>Needs Maintenance</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Service Due")}>Service Due</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" /> Add Item</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Asset</DialogTitle>
                <DialogDescription>Add a new item to your inventory tracking.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Select onValueChange={(val) => setNewItem({...newItem, category: val})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                      <SelectItem value="Appliances">Appliances</SelectItem>
                      <SelectItem value="Bedding">Bedding</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">Location</Label>
                  <Input id="location" value={newItem.location} onChange={(e) => setNewItem({...newItem, location: e.target.value})} className="col-span-3" placeholder="e.g. Room 101" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cost" className="text-right">Cost</Label>
                  <Input id="cost" value={newItem.cost} onChange={(e) => setNewItem({...newItem, cost: e.target.value})} className="col-span-3" placeholder="e.g. ৳5000" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="warranty" className="text-right">Warranty</Label>
                  <Input id="warranty" type="date" value={newItem.warranty} onChange={(e) => setNewItem({...newItem, warranty: e.target.value})} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddItem}>Save Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryItems.length}</div>
            <p className="text-xs text-muted-foreground">Valued at ৳45,20,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {inventoryItems.filter(i => i.status === "Needs Maintenance" || i.status === "Service Due").length}
            </div>
            <p className="text-xs text-muted-foreground">Items require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Warranty Expiring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">In the next 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <CardTitle>Asset List</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search assets..." 
                className="pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.purchaseDate}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "Good" ? "default" : "destructive"} className={item.status === "Good" ? "bg-green-600" : ""}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(item)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteItem(item.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Item
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Asset: {currentItem?.id}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">Name</Label>
              <Input id="edit-name" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">Status</Label>
              <Select value={newItem.status} onValueChange={(val) => setNewItem({...newItem, status: val})}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Needs Maintenance">Needs Maintenance</SelectItem>
                  <SelectItem value="Service Due">Service Due</SelectItem>
                  <SelectItem value="Damaged">Damaged</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-location" className="text-right">Location</Label>
              <Input id="edit-location" value={newItem.location} onChange={(e) => setNewItem({...newItem, location: e.target.value})} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditItem}>Update Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
