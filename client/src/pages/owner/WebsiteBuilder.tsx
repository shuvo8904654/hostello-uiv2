import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ArrowLeft,
  MapPin,
  Star,
  ArrowRight
} from "lucide-react";
import { HOSTELS } from "@/lib/mockData";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";

export default function WebsiteBuilder() {
  const [activeTab, setActiveTab] = useState("branding");
  const [brandName, setBrandName] = useState("Premium Hostels Group");
  const [heroHeadline, setHeroHeadline] = useState("Your Perfect Student Home");
  
  // Flatten all packages from all hostels for the "Packages" tab
  const allPackages = HOSTELS.flatMap(h => h.packages.map(p => ({ ...p, hostelName: h.name })));

  return (
    <DashboardLayout type="owner">
      <div className="mb-6">
        <Link href="/dashboard/owner/properties">
           <a className="flex items-center text-muted-foreground hover:text-foreground mb-4 text-sm">
             <ArrowLeft className="h-4 w-4 mr-1" /> Back to Properties
           </a>
        </Link>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Website Builder</h2>
            <p className="text-muted-foreground">Manage your main brand website listing all your properties.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline"><Eye className="h-4 w-4 mr-2"/> Preview Site</Button>
            <Button><Share2 className="h-4 w-4 mr-2"/> Publish Live</Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Editor Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Configuration</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full rounded-none border-b bg-transparent p-0">
                  <TabsTrigger 
                    value="branding" 
                    className="flex-1 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/10"
                  >
                    <Palette className="h-4 w-4 mr-2"/> Brand
                  </TabsTrigger>
                  <TabsTrigger 
                    value="content" 
                    className="flex-1 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted/10"
                  >
                    <Layout className="h-4 w-4 mr-2"/> Content
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
                      <Label>Brand Name</Label>
                      <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} />
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
                       <Label>Logo</Label>
                       <div className="border-2 border-dashed rounded-lg p-4 text-center text-sm text-muted-foreground hover:bg-muted/50 cursor-pointer">
                          Click to upload logo
                       </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="content" className="space-y-4 mt-0">
                    <div className="space-y-2">
                      <Label>Hero Headline</Label>
                      <Input value={heroHeadline} onChange={(e) => setHeroHeadline(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Sub-headline</Label>
                      <Input defaultValue="Find the best student accommodation across the country." />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                       <Label>Listings to Display</Label>
                       <div className="space-y-2 border rounded-md p-2 max-h-40 overflow-y-auto">
                          {HOSTELS.map(h => (
                             <div key={h.id} className="flex items-center space-x-2">
                                <Switch id={`show-${h.id}`} defaultChecked />
                                <Label htmlFor={`show-${h.id}`} className="font-normal cursor-pointer">{h.name}</Label>
                             </div>
                          ))}
                       </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="domain" className="space-y-4 mt-0">
                     <div className="space-y-2">
                       <Label>Subdomain</Label>
                       <div className="flex items-center gap-2">
                         <Input defaultValue="premium-hostels" className="text-right" />
                         <span className="text-muted-foreground text-sm">.hostello.com</span>
                       </div>
                     </div>
                     <div className="space-y-2">
                       <Label>Custom Domain</Label>
                       <Input placeholder="www.yourbrand.com" />
                     </div>
                     <Button variant="secondary" className="w-full">Connect Domain</Button>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader>
                <CardTitle>Packages Summary</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                   These packages are automatically pulled from your active listings.
                </div>
                <div className="space-y-2">
                   {allPackages.slice(0, 3).map((pkg, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-muted/50 rounded text-sm">
                         <div>
                            <span className="font-medium">{pkg.name}</span>
                            <span className="text-xs text-muted-foreground block">{pkg.hostelName}</span>
                         </div>
                         <span className="font-bold">৳{pkg.price}</span>
                      </div>
                   ))}
                   {allPackages.length > 3 && (
                      <div className="text-center text-xs text-muted-foreground pt-2">
                         + {allPackages.length - 3} more packages
                      </div>
                   )}
                </div>
             </CardContent>
          </Card>
        </div>

        {/* Live Preview Mockup */}
        <div className="lg:col-span-8 bg-muted/30 border rounded-xl p-4 lg:p-8 flex justify-center items-center relative overflow-hidden min-h-[800px]">
           <div className="absolute inset-0 grid grid-cols-[1fr_400px] gap-4 opacity-5 pointer-events-none">
              <div className="border-r"></div>
           </div>

           <div className="flex flex-col items-center gap-4">
             <div className="flex gap-2 bg-background/80 backdrop-blur p-1 rounded-full border">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full bg-primary text-primary-foreground"><Smartphone className="h-4 w-4"/></Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full"><Layout className="h-4 w-4"/></Button>
             </div>

             {/* Phone Frame Mockup */}
             <div className="w-[340px] h-[700px] bg-white border-[8px] border-gray-900 rounded-[3rem] overflow-hidden shadow-2xl relative ring-1 ring-gray-900/50">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20"></div>
               
               {/* Mini Website Content */}
               <div className="h-full overflow-y-auto scrollbar-hide bg-gray-50 pb-12">
                  {/* Hero */}
                  <div className="bg-blue-600 text-white p-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-full opacity-20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl transform translate-x-10 -translate-y-10"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl transform -translate-x-10 translate-y-10"></div>
                     </div>
                     <div className="relative z-10 text-center">
                        <div className="font-bold text-xl mb-1">{brandName}</div>
                        <div className="w-12 h-1 bg-white/30 mx-auto mb-4 rounded-full"></div>
                        <h2 className="text-2xl font-extrabold leading-tight mb-2">{heroHeadline}</h2>
                        <p className="text-blue-100 text-xs px-4">Premium accommodation for students across {HOSTELS.length} locations.</p>
                     </div>
                  </div>
                  
                  <div className="p-4 space-y-6">
                     {/* Search Bar Placeholder */}
                     <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-2 border">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Search by city or area...</span>
                     </div>

                     {/* Featured Listings */}
                     <div className="space-y-3">
                        <div className="flex justify-between items-center px-1">
                           <h3 className="font-bold text-gray-900 text-sm">Our Properties</h3>
                           <span className="text-[10px] text-blue-600 font-medium">View All</span>
                        </div>

                        <div className="space-y-4">
                           {HOSTELS.map((h) => (
                              <div key={h.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-all">
                                 <div className="h-32 relative">
                                    <img src={h.image} className="w-full h-full object-cover" />
                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
                                       <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {h.rating}
                                    </div>
                                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur text-white px-2 py-0.5 rounded text-[10px]">
                                       {h.city}
                                    </div>
                                 </div>
                                 <div className="p-3">
                                    <div className="flex justify-between items-start mb-1">
                                       <h4 className="font-bold text-sm text-gray-800">{h.name}</h4>
                                       <span className="text-xs font-bold text-blue-600">৳{h.price}<span className="text-[10px] font-normal text-gray-400">/mo</span></span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 line-clamp-2 mb-2">{h.description}</p>
                                    
                                    {/* Mini Package Preview */}
                                    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
                                       {h.packages.slice(0, 2).map((p, i) => (
                                          <span key={i} className="text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100 whitespace-nowrap">
                                             {p.name}
                                          </span>
                                       ))}
                                    </div>

                                    <div className="mt-3 pt-2 border-t flex justify-between items-center">
                                       <div className="flex -space-x-1.5">
                                          {[1,2,3].map(i => (
                                             <div key={i} className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white"></div>
                                          ))}
                                       </div>
                                       <div className="flex items-center gap-1 text-[10px] font-medium text-blue-600 group-hover:gap-2 transition-all">
                                          View Details <ArrowRight className="h-3 w-3" />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Global Call to Action */}
                     <div className="bg-gray-900 text-white rounded-xl p-5 text-center space-y-3 relative overflow-hidden">
                        <div className="relative z-10">
                           <h3 className="font-bold text-lg">Not sure where to stay?</h3>
                           <p className="text-xs text-gray-400 mb-3">Talk to our student counselors for free advice.</p>
                           <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100 w-full rounded-full h-8 text-xs font-bold">
                              Chat on WhatsApp
                           </Button>
                        </div>
                     </div>
                     
                     <div className="text-center text-[10px] text-gray-400 pt-4 border-t">
                        &copy; 2025 {brandName}. All rights reserved.
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
