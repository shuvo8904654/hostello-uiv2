import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Globe, Layout, Palette, Share2, Eye } from "lucide-react";
import { HOSTELS } from "@/lib/mockData";

export default function WebsiteBuilder() {
  const hostel = HOSTELS[0]; // Mock selecting the first hostel

  return (
    <DashboardLayout type="owner">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Mini-Website Builder</h2>
          <p className="text-muted-foreground">Create a professional landing page for your hostel in minutes.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Eye className="h-4 w-4 mr-2"/> Preview</Button>
          <Button><Share2 className="h-4 w-4 mr-2"/> Publish Site</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Editor Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Site Customization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="branding">
              <TabsList className="w-full">
                <TabsTrigger value="branding" className="flex-1"><Palette className="h-4 w-4 mr-2"/> Brand</TabsTrigger>
                <TabsTrigger value="content" className="flex-1"><Layout className="h-4 w-4 mr-2"/> Content</TabsTrigger>
                <TabsTrigger value="domain" className="flex-1"><Globe className="h-4 w-4 mr-2"/> Domain</TabsTrigger>
              </TabsList>
              
              <TabsContent value="branding" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Hostel Name</Label>
                  <Input defaultValue={hostel.name} />
                </div>
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-600 cursor-pointer ring-2 ring-offset-2 ring-blue-600"></div>
                    <div className="h-8 w-8 rounded-full bg-red-600 cursor-pointer hover:ring-2 ring-red-600"></div>
                    <div className="h-8 w-8 rounded-full bg-green-600 cursor-pointer hover:ring-2 ring-green-600"></div>
                    <div className="h-8 w-8 rounded-full bg-purple-600 cursor-pointer hover:ring-2 ring-purple-600"></div>
                    <div className="h-8 w-8 rounded-full bg-orange-600 cursor-pointer hover:ring-2 ring-orange-600"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center text-sm text-muted-foreground hover:bg-muted/50 cursor-pointer">
                    Click to upload logo
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4 mt-4">
                 <div className="space-y-2">
                   <Label>Headline</Label>
                   <Input defaultValue="Premium Student Living in Dhaka" />
                 </div>
                 <div className="space-y-2">
                   <Label>Description</Label>
                   <Input defaultValue={hostel.description} />
                 </div>
                 <div className="space-y-2">
                   <Label>Contact WhatsApp</Label>
                   <Input defaultValue="+880 1711 000000" />
                 </div>
              </TabsContent>

              <TabsContent value="domain" className="space-y-4 mt-4">
                 <div className="space-y-2">
                   <Label>Subdomain</Label>
                   <div className="flex items-center gap-2">
                     <Input defaultValue="dhaka-hub" className="text-right" />
                     <span className="text-muted-foreground">.hostello.com</span>
                   </div>
                 </div>
                 <Button variant="secondary" className="w-full">Connect Custom Domain</Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Live Preview Mockup */}
        <div className="lg:col-span-2 bg-muted/30 border rounded-xl p-8 flex justify-center items-center relative overflow-hidden">
           <div className="absolute inset-0 grid grid-cols-[1fr_400px] gap-4 opacity-5 pointer-events-none">
              <div className="border-r"></div>
           </div>

           {/* Phone Frame Mockup */}
           <div className="w-[300px] h-[600px] bg-white border-8 border-gray-900 rounded-[3rem] overflow-hidden shadow-2xl relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20"></div>
             
             {/* Mini Website Content */}
             <div className="h-full overflow-y-auto scrollbar-hide bg-white">
                <div className="h-40 bg-blue-600 relative">
                   <img src={hostel.image} className="w-full h-full object-cover opacity-50" />
                   <div className="absolute bottom-4 left-4 text-white font-bold text-xl">{hostel.name}</div>
                </div>
                
                <div className="p-4 space-y-4">
                   <div className="space-y-2">
                      <h3 className="font-bold text-lg">Premium Student Living</h3>
                      <p className="text-xs text-muted-foreground">{hostel.description}</p>
                   </div>

                   <div className="grid grid-cols-2 gap-2">
                      {hostel.images.slice(0,2).map((img, i) => (
                        <img key={i} src={img} className="rounded-lg h-24 w-full object-cover" />
                      ))}
                   </div>

                   <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs font-bold mb-2 uppercase text-muted-foreground">Amenities</div>
                      <div className="flex flex-wrap gap-1">
                         {hostel.amenities.slice(0,4).map(a => (
                           <span key={a} className="text-[10px] bg-white border px-2 py-1 rounded-full">{a}</span>
                         ))}
                      </div>
                   </div>

                   <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-full">Book Now</Button>
                </div>
             </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
