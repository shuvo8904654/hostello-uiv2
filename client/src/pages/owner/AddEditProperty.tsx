import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Upload, Plus, Trash2, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { CITIES, LOCATIONS, AMENITIES } from "@/lib/mockData";
import { useState } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 'details', title: 'Basic Details', description: 'Name & Description' },
  { id: 'location', title: 'Location', description: 'Address & Area' },
  { id: 'amenities', title: 'Amenities', description: 'Features & Facilities' },
  { id: 'rooms', title: 'Rooms', description: 'Types & Pricing' },
  { id: 'photos', title: 'Photos', description: 'Gallery Upload' },
];

export default function AddEditProperty() {
  const [location, setLocation] = useLocation();
  const isEdit = location.includes('edit');
  const [rooms, setRooms] = useState([{ type: '', capacity: '', price: '', count: '' }]);
  const [currentStep, setCurrentStep] = useState(0);

  const addRoom = () => {
    setRooms([...rooms, { type: '', capacity: '', price: '', count: '' }]);
  };

  const removeRoom = (index: number) => {
    const newRooms = rooms.filter((_, i) => i !== index);
    setRooms(newRooms);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSave = () => {
    // Simulate save
    setLocation('/dashboard/owner/properties');
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-300 ease-in-out" 
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          />
          
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div 
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-background",
                    isCompleted ? "border-primary bg-primary text-primary-foreground" :
                    isCurrent ? "border-primary text-primary ring-4 ring-primary/20" :
                    "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <span>{index + 1}</span>}
                </div>
                <div className="hidden md:block text-center">
                  <p className={cn("text-sm font-medium", isCurrent ? "text-primary" : "text-muted-foreground")}>{step.title}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="md:hidden text-center mt-4">
           <p className="font-medium text-primary">{STEPS[currentStep].title}</p>
           <p className="text-xs text-muted-foreground">{STEPS[currentStep].description}</p>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout type="owner">
      <div className="mb-8">
        <Link href="/dashboard/owner/properties">
           <a className="flex items-center text-muted-foreground hover:text-foreground mb-4 text-sm">
             <ArrowLeft className="h-4 w-4 mr-1" /> Back to Properties
           </a>
        </Link>
        <div className="flex justify-between items-center">
           <div>
             <h2 className="text-3xl font-bold tracking-tight">{isEdit ? 'Edit Property' : 'Add New Property'}</h2>
             <p className="text-muted-foreground">Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].description}</p>
           </div>
        </div>
      </div>

      {renderStepIndicator()}

      <div className="max-w-3xl mx-auto">
        {currentStep === 0 && (
          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
              <CardDescription>Basic info about your hostel.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hostel Name <span className="text-destructive">*</span></Label>
                  <Input placeholder="e.g. Dhaka Student Hub" />
                </div>
                <div className="space-y-2">
                   <Label>Property Type <span className="text-destructive">*</span></Label>
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
                <Label>Description <span className="text-destructive">*</span></Label>
                <Textarea placeholder="Describe your property, rules, and atmosphere..." className="h-32" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label>Contact Number <span className="text-destructive">*</span></Label>
                   <Input placeholder="+880 1xxx xxxxxx" />
                 </div>
                 <div className="space-y-2">
                   <Label>Email Address</Label>
                   <Input placeholder="contact@hostel.com" />
                 </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 1 && (
           <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardHeader>
                 <CardTitle>Address & Location</CardTitle>
                 <CardDescription>Help students find your property.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label>City <span className="text-destructive">*</span></Label>
                       <Select>
                          <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                          <SelectContent>
                             {CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                          </SelectContent>
                       </Select>
                    </div>
                    <div className="space-y-2">
                       <Label>Area <span className="text-destructive">*</span></Label>
                       <Select>
                          <SelectTrigger><SelectValue placeholder="Select area" /></SelectTrigger>
                          <SelectContent>
                             {LOCATIONS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                          </SelectContent>
                       </Select>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label>Full Address <span className="text-destructive">*</span></Label>
                    <Textarea placeholder="House #, Road #, Block #..." />
                 </div>
                 <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                    <span className="text-muted-foreground">Map Picker Integration (Coming Soon)</span>
                 </div>
              </CardContent>
           </Card>
        )}

        {currentStep === 2 && (
           <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardHeader>
                 <CardTitle>Amenities</CardTitle>
                 <CardDescription>Select all that apply.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="grid grid-cols-2 gap-4">
                    {AMENITIES.map(a => (
                       <div key={a} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <Checkbox id={`amenity-${a}`} />
                          <Label htmlFor={`amenity-${a}`} className="cursor-pointer flex-1">{a}</Label>
                       </div>
                    ))}
                 </div>
              </CardContent>
           </Card>
        )}

        {currentStep === 3 && (
           <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardHeader>
                 <CardTitle>Room Configuration</CardTitle>
                 <CardDescription>Define room types and base pricing.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 {rooms.map((room, index) => (
                    <div key={index} className="grid md:grid-cols-2 gap-4 items-end border p-4 rounded-lg relative bg-muted/10">
                       <div className="space-y-2 md:col-span-2">
                          <Label>Room Type Description</Label>
                          <Input placeholder="e.g. Single AC Room with Balcony" />
                       </div>
                       <div className="space-y-2">
                          <Label>Beds per Room</Label>
                          <Input type="number" placeholder="1" />
                       </div>
                       <div className="space-y-2">
                          <Label>Number of Rooms</Label>
                          <Input type="number" placeholder="10" />
                       </div>
                       <div className="space-y-2">
                          <Label>Monthly Price (৳)</Label>
                          <Input type="number" placeholder="5000" />
                       </div>
                       <div className="space-y-2">
                          <Label>Advance/Deposit (৳)</Label>
                          <Input type="number" placeholder="10000" />
                       </div>
                       
                       <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive hover:bg-destructive/10" onClick={() => removeRoom(index)}>
                          <Trash2 className="h-4 w-4" />
                       </Button>
                    </div>
                 ))}
                 <Button variant="outline" onClick={addRoom} className="w-full border-dashed border-2 h-16">
                    <Plus className="h-4 w-4 mr-2" /> Add Another Room Type
                 </Button>
              </CardContent>
           </Card>
        )}

        {currentStep === 4 && (
           <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardHeader>
                 <CardTitle>Gallery</CardTitle>
                 <CardDescription>Upload high quality photos of your property.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center border-2 border-dashed cursor-pointer hover:bg-muted/70 transition-colors">
                       <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                       <span className="text-sm text-muted-foreground font-medium">Upload Photos</span>
                       <span className="text-xs text-muted-foreground mt-1">or drag and drop</span>
                    </div>
                    <div className="aspect-video bg-muted rounded-lg relative group overflow-hidden">
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                        {/* Placeholder for uploaded image */}
                        <div className="w-full h-full bg-muted-foreground/10 flex items-center justify-center text-muted-foreground">Image 1</div>
                    </div>
                 </div>
                 <p className="text-sm text-muted-foreground">
                    Tips:
                    <ul className="list-disc list-inside mt-1 ml-1 space-y-1">
                       <li>Include photos of the bedroom, bathroom, and common areas.</li>
                       <li>Good lighting makes a huge difference!</li>
                       <li>Horizontal (landscape) photos work best.</li>
                    </ul>
                 </p>
              </CardContent>
           </Card>
        )}

        <div className="flex justify-between mt-8 pb-12">
           <Button 
             variant="outline" 
             onClick={prevStep} 
             disabled={currentStep === 0}
             className="w-32"
           >
             <ChevronLeft className="h-4 w-4 mr-2" /> Back
           </Button>
           
           {currentStep === STEPS.length - 1 ? (
             <Button onClick={handleSave} className="w-32 bg-green-600 hover:bg-green-700">
               Save Property
             </Button>
           ) : (
             <Button onClick={nextStep} className="w-32">
               Next <ChevronRight className="h-4 w-4 ml-2" />
             </Button>
           )}
        </div>
      </div>
    </DashboardLayout>
  );
}
