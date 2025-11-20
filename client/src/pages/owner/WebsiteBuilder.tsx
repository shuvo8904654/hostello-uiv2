import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Smartphone, 
  Globe, 
  Layout, 
  Palette, 
  Share2, 
  Eye,
  Package,
  Calendar,
  Check,
  CreditCard
} from "lucide-react";
import { HOSTELS } from "@/lib/mockData";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function WebsiteBuilder() {
  const [selectedHostelId, setSelectedHostelId] = useState(HOSTELS[0].id);
  const [activeTab, setActiveTab] = useState("branding");
  
  const hostel = HOSTELS.find(h => h.id === selectedHostelId) || HOSTELS[0];
  
  // Mock state for package management
  const [packages, setPackages] = useState(hostel.packages.map(p => ({ ...p, enabled: true })));

  const handleHostelChange = (id: string) => {
    setSelectedHostelId(id);
    const newHostel = HOSTELS.find(h => h.id === id) || HOSTELS[0];
    setPackages(newHostel.packages.map(p => ({ ...p, enabled: true })));
  };

  const togglePackage = (index: number) => {
    const newPackages = [...packages];
    newPackages[index].enabled = !newPackages[index].enabled;
    setPackages(newPackages);
  };

  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Website Builder</h2>
          <p className="text-muted-foreground">Create a professional booking site for your hostel.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline"><Eye className="h-4 w-4 mr-2"/> Preview Site</Button>
          <Button><Share2 className="h-4 w-4 mr-2"/> Publish Live</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Editor Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property</CardTitle>
              <CardDescription>Select which listing to build a site for</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-2">
                  <Label>Select Listing</Label>
                  <Select value={selectedHostelId} onValueChange={handleHostelChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a hostel" />
                    </SelectTrigger>
                    <SelectContent>
                      {HOSTELS.map(h => (
                        <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
               </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full rounded-none border-b bg-transparent p-0">
                  <TabsTrigger 
                    value="branding" 
                    className="flex-1 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/10"
                  >
                    <Palette className="h-4 w-4 mr-2"/> Design
                  </TabsTrigger>
                  <TabsTrigger 
                    value="packages" 
                    className="flex-1 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/10"
                  >
                    <Package className="h-4 w-4 mr-2"/> Packages
                  </TabsTrigger>
                  <TabsTrigger 
                    value="domain" 
                    className="flex-1 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/10"
                  >
                    <Globe className="h-4 w-4 mr-2"/> Settings
                  </TabsTrigger>
                </TabsList>
                
                <div className="p-6">
                  <TabsContent value="branding" className="space-y-4 mt-0">
                    <div className="space-y-2">
                      <Label>Display Name</Label>
                      <Input defaultValue={hostel.name} />
                    </div>
                    <div className="space-y-2">
                      <Label>Theme Color</Label>
                      <div className="flex gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-600 cursor-pointer ring-2 ring-offset-2 ring-blue-600"></div>
                        <div className="h-8 w-8 rounded-full bg-rose-600 cursor-pointer hover:ring-2 ring-rose-600 ring-offset-2"></div>
                        <div className="h-8 w-8 rounded-full bg-emerald-600 cursor-pointer hover:ring-2 ring-emerald-600 ring-offset-2"></div>
                        <div className="h-8 w-8 rounded-full bg-violet-600 cursor-pointer hover:ring-2 ring-violet-600 ring-offset-2"></div>
                        <div className="h-8 w-8 rounded-full bg-amber-600 cursor-pointer hover:ring-2 ring-amber-600 ring-offset-2"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Hero Headline</Label>
                      <Input defaultValue="Premium Student Living" />
                    </div>
                    <div className="space-y-2">
                      <Label>Contact WhatsApp</Label>
                      <Input defaultValue="+880 1711 000000" />
                    </div>
                  </TabsContent>

                  <TabsContent value="packages" className="space-y-6 mt-0">
                    <div className="space-y-4">
                       <div className="flex items-center justify-between">
                          <Label className="text-base">Enable Booking System</Label>
                          <Switch defaultChecked />
                       </div>
                       <p className="text-xs text-muted-foreground">Allow students to book packages directly from your website.</p>
                    </div>
                    
                    <Separator />

                    <div className="space-y-4">
                      <Label className="text-base">Active Packages</Label>
                      {packages.map((pkg, i) => (
                        <div key={i} className="border rounded-lg p-3 space-y-3 bg-card">
                           <div className="flex items-center justify-between">
                              <span className="font-medium">{pkg.name}</span>
                              <Switch checked={pkg.enabled} onCheckedChange={() => togglePackage(i)} />
                           </div>
                           {pkg.enabled && (
                             <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                   <Label className="text-xs text-muted-foreground">Price</Label>
                                   <Input className="h-8 text-sm" defaultValue={pkg.price} />
                                </div>
                                <div className="space-y-1">
                                   <Label className="text-xs text-muted-foreground">Duration</Label>
                                   <Select defaultValue={pkg.duration}>
                                      <SelectTrigger className="h-8 text-sm">
                                         <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                         <SelectItem value="Monthly">Monthly</SelectItem>
                                         <SelectItem value="Semester">Semester</SelectItem>
                                         <SelectItem value="Yearly">Yearly</SelectItem>
                                      </SelectContent>
                                   </Select>
                                </div>
                             </div>
                           )}
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full">+ Add New Package</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="domain" className="space-y-4 mt-0">
                     <div className="space-y-2">
                       <Label>Subdomain</Label>
                       <div className="flex items-center gap-2">
                         <Input defaultValue={hostel.name.toLowerCase().replace(/\s+/g, '-')} className="text-right" />
                         <span className="text-muted-foreground text-sm">.hostello.com</span>
                       </div>
                     </div>
                     <div className="space-y-2">
                       <Label>Custom Domain</Label>
                       <Input placeholder="www.yourhostel.com" />
                     </div>
                     <Button variant="secondary" className="w-full">Connect Domain</Button>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview Mockup */}
        <div className="lg:col-span-8 bg-muted/30 border rounded-xl p-4 lg:p-8 flex justify-center items-center relative overflow-hidden min-h-[600px]">
           <div className="absolute inset-0 grid grid-cols-[1fr_400px] gap-4 opacity-5 pointer-events-none">
              <div className="border-r"></div>
           </div>

           <div className="flex flex-col items-center gap-4">
             <div className="flex gap-2 bg-background/80 backdrop-blur p-1 rounded-full border">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full bg-primary text-primary-foreground"><Smartphone className="h-4 w-4"/></Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full"><Layout className="h-4 w-4"/></Button>
             </div>

             {/* Phone Frame Mockup */}
             <div className="w-[320px] h-[650px] bg-white border-[8px] border-gray-900 rounded-[3rem] overflow-hidden shadow-2xl relative ring-1 ring-gray-900/50">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20"></div>
               
               {/* Mini Website Content */}
               <div className="h-full overflow-y-auto scrollbar-hide bg-white pb-12">
                  {/* Hero */}
                  <div className="h-48 bg-blue-600 relative">
                     <img src={hostel.image} className="w-full h-full object-cover opacity-60" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                     <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="text-xs font-medium opacity-90 uppercase tracking-wider mb-1">Welcome to</div>
                        <div className="font-bold text-2xl leading-tight mb-2">{hostel.name}</div>
                        <div className="flex gap-1 text-[10px] opacity-90">
                           <span className="bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">{hostel.city}</span>
                           <span className="bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">★ {hostel.rating}</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="p-5 space-y-6">
                     {/* About */}
                     <div className="space-y-2">
                        <h3 className="font-bold text-gray-900">Premium Student Living</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{hostel.description}</p>
                     </div>

                     {/* Gallery */}
                     <div className="space-y-2">
                        <h3 className="font-bold text-sm text-gray-900">Gallery</h3>
                        <div className="grid grid-cols-3 gap-2">
                           {hostel.images.slice(0,3).map((img, i) => (
                             <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                               <img src={img} className="w-full h-full object-cover" />
                             </div>
                           ))}
                        </div>
                     </div>

                     {/* Amenities */}
                     <div className="space-y-2">
                        <h3 className="font-bold text-sm text-gray-900">Amenities</h3>
                        <div className="flex flex-wrap gap-1.5">
                           {hostel.amenities.slice(0,5).map(a => (
                             <span key={a} className="text-[10px] bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-full text-gray-600 font-medium">{a}</span>
                           ))}
                        </div>
                     </div>

                     {/* Booking Section */}
                     <div className="bg-slate-50 rounded-xl p-4 space-y-4 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-2 text-blue-600">
                           <Calendar className="h-4 w-4" />
                           <h3 className="font-bold text-sm">Book Your Stay</h3>
                        </div>
                        
                        <div className="space-y-2">
                           {packages.filter(p => p.enabled).map((pkg, i) => (
                              <div key={i} className="bg-white border rounded-lg p-3 flex justify-between items-center shadow-sm hover:border-blue-200 transition-colors cursor-pointer group">
                                 <div>
                                    <div className="font-bold text-sm text-gray-900 group-hover:text-blue-700">{pkg.name}</div>
                                    <div className="text-[10px] text-muted-foreground">{pkg.duration} Contract</div>
                                 </div>
                                 <div className="text-right">
                                    <div className="font-bold text-sm">৳{pkg.price.toLocaleString()}</div>
                                    <div className="text-[10px] text-muted-foreground">/month</div>
                                 </div>
                              </div>
                           ))}
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 h-10 text-sm font-semibold">
                           Reserve Now
                        </Button>
                     </div>
                     
                     <div className="text-center text-[10px] text-gray-400 pt-4 border-t">
                        Powered by Hostello
                     </div>
                  </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
