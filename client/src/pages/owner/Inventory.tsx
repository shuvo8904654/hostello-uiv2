import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, AlertCircle, CheckCircle2, Clock } from "lucide-react";

const inventoryItems = [
  { id: "INV-001", name: "Single Bed Frame", category: "Furniture", location: "Room 101", purchaseDate: "2023-01-15", warranty: "2026-01-15", status: "Good", cost: "৳5,000" },
  { id: "INV-002", name: "Study Table", category: "Furniture", location: "Room 101", purchaseDate: "2023-01-15", warranty: "2025-01-15", status: "Good", cost: "৳3,500" },
  { id: "INV-003", name: "Ceiling Fan", category: "Appliances", location: "Room 102", purchaseDate: "2022-06-10", warranty: "2024-06-10", status: "Needs Maintenance", cost: "৳2,800" },
  { id: "INV-004", name: "Mattress (Single)", category: "Bedding", location: "Room 103", purchaseDate: "2023-03-20", warranty: "2028-03-20", status: "Good", cost: "৳4,000" },
  { id: "INV-005", name: "Water Purifier", category: "Appliances", location: "Common Area 1", purchaseDate: "2023-05-05", warranty: "2024-05-05", status: "Service Due", cost: "৳12,000" },
];

export default function OwnerInventory() {
  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventory & Assets</h2>
          <p className="text-muted-foreground">Track furniture, appliances, and maintenance cycles.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
          <Button><Plus className="mr-2 h-4 w-4" /> Add Item</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">Valued at ৳45,20,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">28</div>
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
              <Input placeholder="Search assets..." className="pl-8" />
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
              {inventoryItems.map((item) => (
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
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
