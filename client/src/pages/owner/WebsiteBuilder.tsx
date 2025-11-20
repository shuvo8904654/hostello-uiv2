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
  ArrowRight,
  Menu,
  Phone,
  Instagram,
  Facebook,
  Shield,
  Wifi,
  Zap
} from "lucide-react";
import { HOSTELS } from "@/lib/mockData";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function WebsiteBuilder() {
  const [activeTab, setActiveTab] = useState("branding");
  const [brandName, setBrandName] = useState("Premium Hostels Group");
  const [heroHeadline, setHeroHeadline] = useState("Elevate Your Student Life");
  const [aboutText, setAboutText] = useState("We provide more than just a room. We provide a community where you can thrive, study, and make lifelong friends.");
  
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
            <h2 className="text-3xl font-bold tracking-tight">Brand Website Builder</h2>
            <p className="text-muted-foreground">Customize your main hostel brand website.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline"><Eye className="h-4 w-4 mr-2"/> Preview</Button>
            <Button><Share2 className="h-4 w-4 mr-2"/> Publish Live</Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Editor Sidebar */}
        <div className="lg:col-span-4 space-y-6">
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
                    <Globe className="h-4 w-4 mr-2"/> Domain
                  </TabsTrigger>
                </TabsList>
                
                <div className="p-6">
                  <TabsContent value="branding" className="space-y-4 mt-0">
                    <div className="space-y-2">
                      <Label>Brand Name</Label>
                      <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <div className="flex gap-2">
                        <div className="h-8 w-8 rounded-full bg-indigo-600 cursor-pointer ring-2 ring-offset-2 ring-indigo-600"></div>
                        <div className="h-8 w-8 rounded-full bg-rose-600 cursor-pointer hover:ring-2 ring-rose-600 ring-offset-2"></div>
                        <div className="h-8 w-8 rounded-full bg-emerald-600 cursor-pointer hover:ring-2 ring-emerald-600 ring-offset-2"></div>
                        <div className="h-8 w-8 rounded-full bg-black cursor-pointer hover:ring-2 ring-black ring-offset-2"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                       <Label>Logo Upload</Label>
                       <div className="border-2 border-dashed rounded-lg p-8 text-center text-sm text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors">
                          <div className="font-medium">Drop logo here</div>
                          <div className="text-xs mt-1">or click to browse</div>
                       </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="content" className="space-y-4 mt-0">
                    <div className="space-y-2">
                      <Label>Hero Headline</Label>
                      <Input value={heroHeadline} onChange={(e) => setHeroHeadline(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>About Text</Label>
                      <Textarea 
                        value={aboutText} 
                        onChange={(e) => setAboutText(e.target.value)} 
                        className="h-24"
                      />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                       <Label>Contact Info</Label>
                       <Input placeholder="Phone Number" defaultValue="+880 1711 000000" />
                       <Input placeholder="Email" defaultValue="info@premiumhostels.com" className="mt-2" />
                    </div>
                    <div className="space-y-2">
                       <Label>Social Links</Label>
                       <div className="flex gap-2">
                          <Input placeholder="Facebook URL" />
                          <Input placeholder="Instagram URL" />
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
                     <Button variant="secondary" className="w-full">Connect Custom Domain</Button>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader>
                <CardTitle>Properties Included</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="space-y-2">
                  {HOSTELS.map(h => (
                      <div key={h.id} className="flex items-center justify-between p-2 border rounded text-sm">
                         <span className="font-medium truncate max-w-[180px]">{h.name}</span>
                         <Badge variant="outline" className="text-xs">Active</Badge>
                      </div>
                   ))}
                </div>
                <Button variant="link" className="w-full mt-2 text-xs">Manage Listings</Button>
             </CardContent>
          </Card>
        </div>

        {/* Live Preview Mockup */}
        <div className="lg:col-span-8 bg-muted/30 border rounded-xl p-4 lg:p-8 flex justify-center items-center relative overflow-hidden min-h-[850px]">
           <div className="absolute inset-0 grid grid-cols-[1fr_400px] gap-4 opacity-5 pointer-events-none">
              <div className="border-r"></div>
           </div>

           <div className="flex flex-col items-center gap-4">
             <div className="flex gap-2 bg-background/80 backdrop-blur p-1 rounded-full border">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full bg-primary text-primary-foreground"><Smartphone className="h-4 w-4"/></Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full"><Layout className="h-4 w-4"/></Button>
             </div>

             {/* Phone Frame Mockup */}
             <div className="w-[360px] h-[750px] bg-white border-[8px] border-gray-900 rounded-[3rem] overflow-hidden shadow-2xl relative ring-1 ring-gray-900/50">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20"></div>
               
               {/* Mini Website Content */}
               <div className="h-full overflow-y-auto scrollbar-hide bg-white pb-12 font-sans">
                  
                  {/* Navbar */}
                  <div className="flex items-center justify-between p-4 sticky top-0 bg-white/90 backdrop-blur z-20 border-b border-gray-100">
                     <div className="font-bold text-lg tracking-tight text-indigo-900">{brandName.split(' ')[0]}<span className="text-indigo-600">.</span></div>
                     <Menu className="h-5 w-5 text-gray-600" />
                  </div>

                  {/* Hero Section */}
                  <div className="relative h-[400px]">
                     <img src={HOSTELS[0].image} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-white"></div>
                     
                     <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 pt-20">
                        <h1 className="text-4xl font-black text-white mb-4 leading-tight drop-shadow-md">
                           {heroHeadline}
                        </h1>
                        <p className="text-white/90 text-sm mb-6 max-w-[240px] drop-shadow">
                           Experience premium living designed for students who want more.
                        </p>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 shadow-lg shadow-indigo-600/30 border-none">
                           Find Your Room
                        </Button>
                     </div>
                  </div>
                  
                  {/* Brand Promise / About */}
                  <div className="p-8 text-center -mt-10 relative z-10 bg-white rounded-t-[2rem]">
                     <div className="w-12 h-1 bg-indigo-100 mx-auto rounded-full mb-6"></div>
                     <h3 className="text-xl font-bold text-gray-900 mb-3">Why Choose Us?</h3>
                     <p className="text-sm text-gray-500 leading-relaxed mb-8">
                        {aboutText}
                     </p>
                     
                     <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center gap-2">
                           <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                              <Shield className="h-5 w-5" />
                           </div>
                           <span className="text-[10px] font-semibold text-gray-600">Secure</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                           <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                              <Wifi className="h-5 w-5" />
                           </div>
                           <span className="text-[10px] font-semibold text-gray-600">Fast Wifi</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                           <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                              <Zap className="h-5 w-5" />
                           </div>
                           <span className="text-[10px] font-semibold text-gray-600">Backup</span>
                        </div>
                     </div>
                  </div>

                  {/* Locations / Listings */}
                  <div className="bg-gray-50 p-6 py-10">
                     <div className="flex justify-between items-end mb-6">
                        <div>
                           <h3 className="text-xl font-bold text-gray-900">Our Locations</h3>
                           <p className="text-xs text-gray-500 mt-1">Select a branch to view details</p>
                        </div>
                     </div>

                     <div className="space-y-6">
                        {HOSTELS.map((h) => (
                           <div key={h.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                              <div className="h-48 relative overflow-hidden">
                                 <img src={h.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                 <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-900">
                                    {h.city}
                                 </div>
                                 <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-white text-xs">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {h.rating}
                                 </div>
                              </div>
                              
                              <div className="p-5">
                                 <h4 className="font-bold text-lg text-gray-900 mb-1">{h.name}</h4>
                                 <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                                    <MapPin className="h-3 w-3" /> {h.location}
                                 </div>
                                 
                                 <div className="flex flex-wrap gap-2 mb-4">
                                    {h.amenities.slice(0, 3).map(a => (
                                       <span key={a} className="text-[10px] px-2 py-1 bg-gray-100 rounded-md text-gray-600">{a}</span>
                                    ))}
                                 </div>

                                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div>
                                       <span className="text-[10px] text-gray-400 uppercase tracking-wide">Starting from</span>
                                       <div className="font-bold text-indigo-600">৳{h.price.toLocaleString()} <span className="text-xs font-normal text-gray-400">/mo</span></div>
                                    </div>
                                    <Button size="sm" className="rounded-full bg-gray-900 text-white h-8 px-4 text-xs">
                                       View Details
                                    </Button>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-gray-900 text-gray-400 p-8 pb-12">
                     <div className="flex items-center justify-between mb-8">
                        <div className="font-bold text-white text-xl">{brandName.split(' ')[0]}.</div>
                        <div className="flex gap-4">
                           <Instagram className="h-5 w-5 hover:text-white cursor-pointer" />
                           <Facebook className="h-5 w-5 hover:text-white cursor-pointer" />
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-8 text-xs mb-8">
                        <div className="space-y-3">
                           <div className="text-white font-bold mb-2">Company</div>
                           <div className="cursor-pointer hover:text-white">About Us</div>
                           <div className="cursor-pointer hover:text-white">Careers</div>
                           <div className="cursor-pointer hover:text-white">Contact</div>
                        </div>
                        <div className="space-y-3">
                           <div className="text-white font-bold mb-2">Legal</div>
                           <div className="cursor-pointer hover:text-white">Terms</div>
                           <div className="cursor-pointer hover:text-white">Privacy</div>
                           <div className="cursor-pointer hover:text-white">Rules</div>
                        </div>
                     </div>

                     <div className="pt-8 border-t border-gray-800 flex flex-col gap-2 text-[10px]">
                        <div className="flex items-center gap-2">
                           <Phone className="h-3 w-3" /> +880 1711 000000
                        </div>
                        <div>© 2025 {brandName}. All rights reserved.</div>
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
