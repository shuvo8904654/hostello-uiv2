import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, Calendar, Printer } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const initialTodaysMenu = {
  breakfast: "Paratha, Vegetable Curry, Egg, Tea",
  lunch: "Rice, Chicken Curry, Dal, Salad",
  dinner: "Rice, Fish Curry, Vegetable, Dal"
};

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
          <p className="text-muted-foreground">Manage daily menus for residents.</p>
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
    </DashboardLayout>
  );
}
