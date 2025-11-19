import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Upload, Plus, Trash2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { CITIES, LOCATIONS, AMENITIES } from "@/lib/mockData";
import { useState } from "react";

export default function AddEditProperty() {
  const [location] = useLocation();
  const isEdit = location.includes('edit');
  const [rooms, setRooms] = useState([{ type: '', capacity: '', price: '', count: '' }]);

  const addRoom = () => {
    setRooms([...rooms, { type: '', capacity: '', price: '', count: '' }]);
  };

  const removeRoom = (index: number) => {
    const newRooms = rooms.filter((_, i) => i !== index);
    setRooms(newRooms);
  };

  return (
    <DashboardLayout type="owner">
      <div className="mb-8">
        <Link href="/dashboard/owner/properties">
           <a className="flex items-center text-muted-foreground hover:text-foreground mb-4 text-sm">
             <ArrowLeft className="h-4 w-4 mr-1" /> Back to Properties
           </a>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">{isEdit ? 'Edit Property' : 'Add New Property'}</h2>
        <p className="text-muted-foreground">Fill in the details to list your hostel on Hostello.</p>
      </div>

      <Tabs defaultValue="details" className="space-y-8">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="details">Basic Details</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="rooms">Rooms & Pricing</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
              <CardDescription>Basic info about your hostel.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hostel Name</Label>
                  <Input placeholder="e.g. Dhaka Student Hub" />
                </div>
                <div className="space-y-2">
                   <Label>Property Type</Label>
                   <Select>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                         <SelectItem value="mens">Men's Hostel</SelectItem>
                         <SelectItem value="womens">Women's Hostel</SelectItem>
                         <SelectItem value="coed">Co-ed Residence</SelectItem>
                      </SelectContent>
                   </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Describe your property, rules, and atmosphere..." className="h-32" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label>Contact Number</Label>
                   <Input placeholder="+880 1xxx xxxxxx" />
                 </div>
                 <div className="space-y-2">
                   <Label>Email Address</Label>
                   <Input placeholder="contact@hostel.com" />
                 </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location">
           <Card>
              <CardHeader>
                 <CardTitle>Address & Location</CardTitle>
                 <CardDescription>Help students find your property.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label>City</Label>
                       <Select>
                          <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                          <SelectContent>
                             {CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                          </SelectContent>
                       </Select>
                    </div>
                    <div className="space-y-2">
                       <Label>Area</Label>
                       <Select>
                          <SelectTrigger><SelectValue placeholder="Select area" /></SelectTrigger>
                          <SelectContent>
                             {LOCATIONS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                          </SelectContent>
                       </Select>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label>Full Address</Label>
                    <Textarea placeholder="House #, Road #, Block #..." />
                 </div>
                 <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                    <span className="text-muted-foreground">Map Picker Integration (Coming Soon)</span>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="amenities">
           <Card>
              <CardHeader>
                 <CardTitle>Amenities</CardTitle>
                 <CardDescription>Select all that apply.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {AMENITIES.map(a => (
                       <div key={a} className="flex items-center space-x-2">
                          <Checkbox id={`amenity-${a}`} />
                          <Label htmlFor={`amenity-${a}`}>{a}</Label>
                       </div>
                    ))}
                 </div>
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="rooms">
           <Card>
              <CardHeader>
                 <CardTitle>Room Configuration</CardTitle>
                 <CardDescription>Define room types and base pricing.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 {rooms.map((room, index) => (
                    <div key={index} className="grid md:grid-cols-5 gap-4 items-end border p-4 rounded-lg">
                       <div className="space-y-2">
                          <Label>Room Type</Label>
                          <Input placeholder="e.g. Single AC" />
                       </div>
                       <div className="space-y-2">
                          <Label>Capacity</Label>
                          <Input type="number" placeholder="Beds" />
                       </div>
                       <div className="space-y-2">
                          <Label>Total Rooms</Label>
                          <Input type="number" placeholder="Count" />
                       </div>
                       <div className="space-y-2">
                          <Label>Price (Monthly)</Label>
                          <Input type="number" placeholder="৳" />
                       </div>
                       <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeRoom(index)}>
                          <Trash2 className="h-4 w-4" />
                       </Button>
                    </div>
                 ))}
                 <Button variant="outline" onClick={addRoom} className="w-full">
                    <Plus className="h-4 w-4 mr-2" /> Add Another Room Type
                 </Button>
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="photos">
           <Card>
              <CardHeader>
                 <CardTitle>Gallery</CardTitle>
                 <CardDescription>Upload high quality photos of your property.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="aspect-square bg-muted rounded-lg flex flex-col items-center justify-center border-2 border-dashed cursor-pointer hover:bg-muted/70 transition-colors">
                       <Upload className="h-6 w-6 mb-2 text-muted-foreground" />
                       <span className="text-xs text-muted-foreground">Upload Photos</span>
                    </div>
                 </div>
                 <p className="text-sm text-muted-foreground">Supported formats: JPG, PNG. Max size: 5MB</p>
              </CardContent>
           </Card>
        </TabsContent>
        
        <div className="flex justify-end gap-4">
           <Button variant="outline">Cancel</Button>
           <Button>Save Property</Button>
        </div>
      </Tabs>
    </DashboardLayout>
  );
}
