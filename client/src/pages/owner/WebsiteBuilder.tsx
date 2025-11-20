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
  Monitor,
  ArrowLeft,
  MapPin,
  Star,
  Menu,
  Phone,
  Instagram,
  Facebook,
  Shield,
  Wifi,
  Zap,
  Coffee,
  Users,
  CheckCircle2,
  Image as ImageIcon,
  Type,
  Save
} from "lucide-react";
import { HOSTELS } from "@/lib/mockData";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function WebsiteBuilder() {
  const [activeTab, setActiveTab] = useState("design");
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">("mobile");
  
  // State for the builder
  const [brandName, setBrandName] = useState("Premium Hostels");
  const [primaryColor, setPrimaryColor] = useState("indigo");
  const [heroHeadline, setHeroHeadline] = useState("Elevate Your Student Life");
  const [heroSubheadline, setHeroSubheadline] = useState("Experience premium living designed for students who want more than just a room.");
  const [showAmenities, setShowAmenities] = useState(true);
  const [showTestimonials, setShowTestimonials] = useState(true);
  const [buttonRadius, setButtonRadius] = useState([8]);

  const colorMap: Record<string, string> = {
    indigo: "bg-indigo-600",
    rose: "bg-rose-600", 
    emerald: "bg-emerald-600",
    slate: "bg-slate-900"
  };

  const textMap: Record<string, string> = {
    indigo: "text-indigo-600",
    rose: "text-rose-600",
    emerald: "text-emerald-600",
    slate: "text-slate-900"
  };

  return (
    <DashboardLayout type="owner">
      <div className="h-[calc(100vh-2rem)] flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <Link href="/dashboard/owner/properties">
                  <Button variant="ghost" size="icon" className="h-8 w-8 -ml-2 text-muted-foreground">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
               </Link>
               <h2 className="text-2xl font-bold tracking-tight">Website Builder</h2>
            </div>
            <p className="text-muted-foreground text-sm">Design and publish your hostel's landing page.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2"/> Preview
            </Button>
            <Button size="sm" className="bg-black text-white hover:bg-gray-800">
              <Share2 className="h-4 w-4 mr-2"/> Publish Site
            </Button>
          </div>
        </div>

        <div className="flex-1 grid lg:grid-cols-12 gap-6 overflow-hidden min-h-0">
          
          {/* LEFT SIDEBAR - CONTROLS */}
          <div className="lg:col-span-4 flex flex-col gap-4 overflow-hidden h-full">
            <Card className="flex-1 flex flex-col overflow-hidden border-0 shadow-md bg-card/50 backdrop-blur-sm">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col h-full">
                <div className="px-4 pt-4 border-b bg-background/95 backdrop-blur z-10">
                  <TabsList className="w-full grid grid-cols-3 mb-4">
                    <TabsTrigger value="design" className="flex items-center gap-2">
                      <Palette className="h-4 w-4"/> Design
                    </TabsTrigger>
                    <TabsTrigger value="content" className="flex items-center gap-2">
                      <Layout className="h-4 w-4"/> Content
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center gap-2">
                      <Globe className="h-4 w-4"/> Settings
                    </TabsTrigger>
                  </TabsList>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-6">
                    
                    <TabsContent value="design" className="mt-0 space-y-6">
                      {/* Theme Colors */}
                      <div className="space-y-3">
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Theme Color</Label>
                        <div className="grid grid-cols-4 gap-3">
                          {['indigo', 'rose', 'emerald', 'slate'].map((color) => (
                            <button
                              key={color}
                              onClick={() => setPrimaryColor(color)}
                              className={`h-10 w-full rounded-md border-2 transition-all flex items-center justify-center ${
                                primaryColor === color ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-border'
                              } ${color === 'white' ? 'bg-white border-gray-200' : ''}`}
                              style={{ backgroundColor: color !== 'white' ? `var(--${color}-500)` : undefined }}
                            >
                              <div className={`h-6 w-6 rounded-full ${
                                color === 'indigo' ? 'bg-indigo-600' : 
                                color === 'rose' ? 'bg-rose-600' : 
                                color === 'emerald' ? 'bg-emerald-600' : 
                                'bg-slate-900'
                              }`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Typography Mock */}
                      <div className="space-y-3">
                         <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Typography</Label>
                         <div className="grid grid-cols-2 gap-2">
                            <div className="border rounded-md p-3 cursor-pointer hover:border-primary bg-background">
                               <div className="font-sans font-bold text-lg">Modern</div>
                               <div className="font-sans text-xs text-muted-foreground">Inter / Roboto</div>
                            </div>
                            <div className="border rounded-md p-3 cursor-pointer hover:border-primary bg-background">
                               <div className="font-serif font-bold text-lg">Classic</div>
                               <div className="font-serif text-xs text-muted-foreground">Playfair / Lato</div>
                            </div>
                         </div>
                      </div>

                      <Separator />

                      {/* Component Style */}
                      <div className="space-y-4">
                         <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Component Shape</Label>
                         <div className="space-y-3">
                            <div className="flex justify-between text-xs">
                              <span>Square</span>
                              <span>Round</span>
                            </div>
                            <Slider 
                              value={buttonRadius} 
                              onValueChange={setButtonRadius} 
                              max={24} 
                              step={2} 
                            />
                         </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="content" className="mt-0 space-y-6">
                      {/* Hero Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <Label className="text-base font-medium flex items-center gap-2">
                              <ImageIcon className="h-4 w-4 text-primary"/> Hero Section
                           </Label>
                           <Switch checked={true} disabled />
                        </div>
                        <div className="space-y-3 pl-4 border-l-2 border-muted ml-1">
                           <div className="space-y-1">
                              <Label className="text-xs">Headline</Label>
                              <Input value={heroHeadline} onChange={(e) => setHeroHeadline(e.target.value)} />
                           </div>
                           <div className="space-y-1">
                              <Label className="text-xs">Subheadline</Label>
                              <Textarea 
                                value={heroSubheadline} 
                                onChange={(e) => setHeroSubheadline(e.target.value)} 
                                className="h-20 text-xs"
                              />
                           </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Sections Toggle */}
                      <div className="space-y-4">
                         <Label className="text-base font-medium flex items-center gap-2">
                            <Layout className="h-4 w-4 text-primary"/> Page Sections
                         </Label>
                         
                         <div className="space-y-3">
                            <div className="flex items-center justify-between border p-3 rounded-md bg-background">
                               <div className="flex items-center gap-3">
                                  <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                                     <Shield className="h-4 w-4"/>
                                  </div>
                                  <div className="text-sm font-medium">Amenities</div>
                               </div>
                               <Switch checked={showAmenities} onCheckedChange={setShowAmenities} />
                            </div>

                            <div className="flex items-center justify-between border p-3 rounded-md bg-background">
                               <div className="flex items-center gap-3">
                                  <div className="p-2 bg-orange-50 text-orange-600 rounded-md">
                                     <Users className="h-4 w-4"/>
                                  </div>
                                  <div className="text-sm font-medium">Testimonials</div>
                               </div>
                               <Switch checked={showTestimonials} onCheckedChange={setShowTestimonials} />
                            </div>

                            <div className="flex items-center justify-between border p-3 rounded-md bg-background">
                               <div className="flex items-center gap-3">
                                  <div className="p-2 bg-green-50 text-green-600 rounded-md">
                                     <MapPin className="h-4 w-4"/>
                                  </div>
                                  <div className="text-sm font-medium">Locations</div>
                               </div>
                               <Switch checked={true} disabled />
                            </div>
                         </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="settings" className="mt-0 space-y-6">
                       <div className="space-y-3">
                          <Label>Brand Name</Label>
                          <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                       </div>
                       
                       <div className="space-y-3">
                          <Label>Custom Domain</Label>
                          <div className="flex gap-2">
                             <Input placeholder="www.yourhostel.com" />
                             <Button variant="secondary">Connect</Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                             Your site is currently live at <span className="text-primary font-medium">premium-hostels.hostello.com</span>
                          </p>
                       </div>

                       <Separator />

                       <div className="space-y-3">
                          <Label>SEO Settings</Label>
                          <Input placeholder="Meta Title" defaultValue={`${brandName} - Best Student Accommodation`} />
                          <Textarea placeholder="Meta Description" className="h-20" />
                       </div>
                    </TabsContent>

                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t bg-background/95 backdrop-blur mt-auto">
                   <Button className="w-full gap-2">
                      <Save className="h-4 w-4" /> Save Changes
                   </Button>
                </div>
              </Tabs>
            </Card>
          </div>

          {/* RIGHT SIDE - PREVIEW */}
          <div className="lg:col-span-8 bg-muted/20 rounded-xl border overflow-hidden flex flex-col relative group">
             {/* Preview Toolbar */}
             <div className="h-12 bg-background border-b flex items-center justify-between px-4 z-20">
                <div className="flex items-center gap-4">
                   <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Live Preview</span>
                   <div className="h-4 w-[1px] bg-border"></div>
                   <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-0.5">
                      <Button 
                        variant={previewMode === 'mobile' ? 'secondary' : 'ghost'} 
                        size="sm" 
                        className="h-7 px-2.5 text-xs gap-1.5"
                        onClick={() => setPreviewMode('mobile')}
                      >
                         <Smartphone className="h-3.5 w-3.5" /> Mobile
                      </Button>
                      <Button 
                        variant={previewMode === 'desktop' ? 'secondary' : 'ghost'} 
                        size="sm" 
                        className="h-7 px-2.5 text-xs gap-1.5"
                        onClick={() => setPreviewMode('desktop')}
                      >
                         <Monitor className="h-3.5 w-3.5" /> Desktop
                      </Button>
                   </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                   <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                   Last saved 2m ago
                </div>
             </div>

             {/* Preview Canvas */}
             <div className="flex-1 bg-slate-100 relative overflow-hidden flex justify-center items-center p-8">
                <div className={`
                   transition-all duration-500 ease-in-out shadow-2xl bg-white overflow-hidden flex flex-col
                   ${previewMode === 'mobile' 
                      ? 'w-[375px] h-[750px] rounded-[3rem] border-[8px] border-slate-900 ring-1 ring-slate-900/20' 
                      : 'w-full h-full max-w-5xl rounded-lg border border-border/50'
                   }
                `}>
                   {/* Mobile Notch */}
                   {previewMode === 'mobile' && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-50 pointer-events-none"></div>
                   )}

                   {/* WEBSITE CONTENT STARTS HERE */}
                   <div className="flex-1 overflow-y-auto scrollbar-hide bg-white font-sans">
                      
                      {/* Navbar */}
                      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
                         <div className="flex items-center justify-between px-6 py-4">
                            <div className={`font-bold text-lg tracking-tight flex items-center gap-1 ${textMap[primaryColor]}`}>
                               <div className={`h-6 w-6 rounded-lg ${colorMap[primaryColor]} flex items-center justify-center text-white`}>
                                  <span className="font-serif italic">H</span>
                               </div>
                               <span className="text-slate-900">{brandName}</span>
                            </div>
                            <Menu className="h-5 w-5 text-slate-600 cursor-pointer hover:text-slate-900" />
                         </div>
                      </div>

                      {/* Hero Section */}
                      <div className="relative">
                         <div className="absolute inset-0 bg-slate-900/10 z-10"></div>
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
                         <img 
                            src={HOSTELS[0].image} 
                            className="w-full h-[420px] object-cover"
                            alt="Hostel Hero"
                         />
                         
                         <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                            <Badge className={`mb-4 hover:bg-white/20 bg-white/20 text-white border-0 backdrop-blur-md`}>
                               Premium Student Living
                            </Badge>
                            <h1 className="text-4xl font-bold leading-tight mb-3 drop-shadow-sm">
                               {heroHeadline}
                            </h1>
                            <p className="text-white/90 text-sm leading-relaxed mb-6 max-w-md drop-shadow-sm font-light">
                               {heroSubheadline}
                            </p>
                            <div className="flex gap-3">
                               <Button 
                                 className={`${colorMap[primaryColor]} hover:opacity-90 text-white border-0 font-medium px-6 shadow-lg shadow-black/20`}
                                 style={{ borderRadius: `${buttonRadius}px` }}
                               >
                                 Book a Tour
                               </Button>
                               <Button 
                                 variant="outline" 
                                 className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
                                 style={{ borderRadius: `${buttonRadius}px` }}
                               >
                                 View Rooms
                               </Button>
                            </div>
                         </div>
                      </div>

                      {/* Stats Section */}
                      <div className="grid grid-cols-3 border-b border-gray-100">
                         <div className="p-4 py-6 text-center border-r border-gray-100">
                            <div className={`text-xl font-bold ${textMap[primaryColor]}`}>500+</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mt-1">Students</div>
                         </div>
                         <div className="p-4 py-6 text-center border-r border-gray-100">
                            <div className={`text-xl font-bold ${textMap[primaryColor]}`}>4.9</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mt-1">Rating</div>
                         </div>
                         <div className="p-4 py-6 text-center">
                            <div className={`text-xl font-bold ${textMap[primaryColor]}`}>24/7</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mt-1">Support</div>
                         </div>
                      </div>

                      {/* Amenities Section */}
                      {showAmenities && (
                         <div className="p-8 bg-gray-50/50">
                            <div className="flex items-center justify-between mb-6">
                               <h3 className="font-bold text-xl text-slate-900">Premium Amenities</h3>
                               <span className={`text-xs font-medium ${textMap[primaryColor]} cursor-pointer`}>View All</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                               {[
                                  { icon: Wifi, label: "High-Speed Wifi", desc: "100 Mbps Dedicated" },
                                  { icon: Shield, label: "24/7 Security", desc: "CCTV & Guards" },
                                  { icon: Coffee, label: "Study Lounge", desc: "Quiet Zones" },
                                  { icon: Zap, label: "Power Backup", desc: "Always On" }
                               ].map((item, i) => (
                                  <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                     <div className={`h-8 w-8 rounded-lg ${colorMap[primaryColor]} bg-opacity-10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                        <item.icon className={`h-4 w-4 ${textMap[primaryColor]}`} />
                                     </div>
                                     <div className="font-semibold text-sm text-slate-900 mb-0.5">{item.label}</div>
                                     <div className="text-[10px] text-gray-500">{item.desc}</div>
                                  </div>
                               ))}
                            </div>
                         </div>
                      )}

                      {/* Featured Rooms */}
                      <div className="p-8 pb-4">
                         <h3 className="font-bold text-xl text-slate-900 mb-6">Available Rooms</h3>
                         <div className="space-y-6">
                            {HOSTELS.slice(0, 2).map((hostel) => (
                               <div key={hostel.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                                  <div className="h-48 relative overflow-hidden">
                                     <img 
                                       src={hostel.image} 
                                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                     />
                                     <div className="absolute top-3 right-3">
                                        <div className="bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
                                           <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> 
                                           {hostel.rating}
                                        </div>
                                     </div>
                                  </div>
                                  <div className="p-5">
                                     <div className="flex justify-between items-start mb-2">
                                        <div>
                                           <h4 className="font-bold text-slate-900 text-lg">{hostel.name}</h4>
                                           <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                              <MapPin className="h-3 w-3" /> {hostel.location}
                                           </p>
                                        </div>
                                        <div className="text-right">
                                           <div className={`font-bold text-lg ${textMap[primaryColor]}`}>৳{hostel.price.toLocaleString()}</div>
                                           <div className="text-[10px] text-gray-400">/month</div>
                                        </div>
                                     </div>
                                     
                                     <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                           {[1,2,3].map(i => (
                                              <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                                 <img src={`https://i.pravatar.cc/100?img=${i + 10}`} className="h-full w-full object-cover" />
                                              </div>
                                           ))}
                                           <div className="h-6 w-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] text-gray-500 font-medium">
                                              +12
                                           </div>
                                        </div>
                                        <Button 
                                          size="sm" 
                                          className={`${colorMap[primaryColor]} hover:opacity-90 text-white h-8 text-xs`}
                                          style={{ borderRadius: `${buttonRadius}px` }}
                                        >
                                           Book Now
                                        </Button>
                                     </div>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>

                      {/* Testimonials */}
                      {showTestimonials && (
                         <div className="p-8 bg-slate-900 text-white">
                            <div className="text-center mb-8">
                               <h3 className="font-bold text-xl mb-2">Student Stories</h3>
                               <p className="text-white/60 text-xs">Hear from our happy residents</p>
                            </div>
                            
                            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative">
                               <div className="absolute -top-3 -left-2 text-4xl text-white/20 font-serif">"</div>
                               <p className="text-sm leading-relaxed text-white/90 mb-4 italic">
                                  Moving here was the best decision I made for my university life. The community is amazing and the facilities are top-notch.
                               </p>
                               <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-white/20 overflow-hidden">
                                     <img src="https://i.pravatar.cc/100?img=32" className="h-full w-full object-cover" />
                                  </div>
                                  <div>
                                     <div className="font-semibold text-sm">Sarah J.</div>
                                     <div className="text-[10px] text-white/50">Resident since 2023</div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      )}

                      {/* Footer */}
                      <div className="bg-white border-t border-gray-100 p-8 pb-12">
                         <div className="flex items-center justify-between mb-6">
                            <div className={`font-bold text-lg tracking-tight ${textMap[primaryColor]}`}>{brandName}</div>
                            <div className="flex gap-3">
                               <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">
                                  <Instagram className="h-4 w-4" />
                               </div>
                               <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">
                                  <Facebook className="h-4 w-4" />
                               </div>
                            </div>
                         </div>
                         
                         <div className="text-xs text-gray-500 leading-relaxed mb-6">
                            Premium student accommodation designed for comfort, community, and academic success.
                         </div>

                         <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 font-medium">
                            <div className="space-y-2">
                               <div className="hover:text-slate-900 cursor-pointer">About Us</div>
                               <div className="hover:text-slate-900 cursor-pointer">Locations</div>
                               <div className="hover:text-slate-900 cursor-pointer">Contact</div>
                            </div>
                            <div className="space-y-2 text-right">
                               <div className="hover:text-slate-900 cursor-pointer">Privacy</div>
                               <div className="hover:text-slate-900 cursor-pointer">Terms</div>
                               <div className="hover:text-slate-900 cursor-pointer">Support</div>
                            </div>
                         </div>
                         
                         <div className="mt-8 pt-6 border-t border-gray-100 text-[10px] text-gray-400 text-center">
                            © 2025 {brandName}. All rights reserved.
                         </div>
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
