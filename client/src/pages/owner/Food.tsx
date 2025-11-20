import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Utensils, Calendar, CheckCircle, AlertCircle, Printer, Edit } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const initialTodaysMenu = {
  breakfast: "Paratha, Vegetable Curry, Egg, Tea",
  lunch: "Rice, Chicken Curry, Dal, Salad",
  dinner: "Rice, Fish Curry, Vegetable, Dal"
};

const mealAttendance = [
  { id: 1, date: "2023-11-20", meal: "Breakfast", present: 145, total: 150, status: "Completed" },
  { id: 2, date: "2023-11-20", meal: "Lunch", present: 140, total: 150, status: "Completed" },
  { id: 3, date: "2023-11-20", meal: "Dinner", present: 0, total: 150, status: "Upcoming" },
];

const stockAlerts = [
  { item: "Rice", quantity: "50 kg", status: "Low Stock" },
  { item: "Cooking Oil", quantity: "10 L", status: "Adequate" },
  { item: "Lentils (Dal)", quantity: "5 kg", status: "Critical" },
];

export default function OwnerFood() {
  const { toast } = useToast();
  const [todaysMenu, setTodaysMenu] = useState(initialTodaysMenu);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuForm, setMenuForm] = useState(initialTodaysMenu);

  const handleUpdateMenu = () => {
    setTodaysMenu(menuForm);
    setIsMenuOpen(false);
    toast({
      title: "Menu Updated",
      description: "Today's menu has been successfully updated.",
    });
  };

  const handlePrintMenu = () => {
    toast({
      title: "Printing Menu...",
      description: "Sending menu to printer.",
    });
  };

  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Food & Meal Management</h2>
          <p className="text-muted-foreground">Manage meal plans, menu, and mess inventory.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrintMenu}><Printer className="mr-2 h-4 w-4" /> Print Menu</Button>
          
          <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DialogTrigger asChild>
              <Button><Calendar className="mr-2 h-4 w-4" /> Edit Today's Menu</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Today's Menu</DialogTitle>
                <DialogDescription>Update breakfast, lunch, and dinner items.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="breakfast">Breakfast (07:30 AM - 09:30 AM)</Label>
                  <Textarea 
                    id="breakfast" 
                    value={menuForm.breakfast} 
                    onChange={(e) => setMenuForm({...menuForm, breakfast: e.target.value})} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lunch">Lunch (01:00 PM - 02:30 PM)</Label>
                  <Textarea 
                    id="lunch" 
                    value={menuForm.lunch} 
                    onChange={(e) => setMenuForm({...menuForm, lunch: e.target.value})} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dinner">Dinner (08:00 PM - 09:30 PM)</Label>
                  <Textarea 
                    id="dinner" 
                    value={menuForm.dinner} 
                    onChange={(e) => setMenuForm({...menuForm, dinner: e.target.value})} 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleUpdateMenu}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Utensils className="h-4 w-4 text-primary" /> Today's Breakfast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-lg">{todaysMenu.breakfast}</p>
            <p className="text-xs text-muted-foreground mt-2">07:30 AM - 09:30 AM</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Utensils className="h-4 w-4 text-primary" /> Today's Lunch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-lg">{todaysMenu.lunch}</p>
            <p className="text-xs text-muted-foreground mt-2">01:00 PM - 02:30 PM</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Utensils className="h-4 w-4 text-primary" /> Today's Dinner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-lg">{todaysMenu.dinner}</p>
            <p className="text-xs text-muted-foreground mt-2">08:00 PM - 09:30 PM</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
           <Card className="h-full">
            <CardHeader>
              <CardTitle>Meal Attendance</CardTitle>
              <CardDescription>Daily attendance tracking for billing.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Meal</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mealAttendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.meal}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-secondary h-2 rounded-full w-24">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(record.present / record.total) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs">{record.present}/{record.total}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={record.status === "Completed" ? "secondary" : "outline"}>
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Stock Alerts</CardTitle>
              <CardDescription>Mess inventory status.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockAlerts.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.item}</p>
                      <p className="text-xs text-muted-foreground">{item.quantity} remaining</p>
                    </div>
                    <Badge variant={item.status === "Adequate" ? "outline" : "destructive"}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">View Full Inventory</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
