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
  Save,
  Building,
  Package as PackageIcon,
  Grid,
  List,
  CreditCard,
  Briefcase,
  GraduationCap
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
import { Checkbox } from "@/components/ui/checkbox";

export default function WebsiteBuilder() {
  const [activeTab, setActiveTab] = useState("design");
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">("mobile");
  
  // State for the builder
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [brandName, setBrandName] = useState("Premium Stays");
  const [subdomain, setSubdomain] = useState("premium-stays");
  const [primaryColor, setPrimaryColor] = useState("indigo");
  const [heroHeadline, setHeroHeadline] = useState("Ideal Living for Students & Pros");
  const [heroSubheadline, setHeroSubheadline] = useState("Experience premium accommodation designed for university students and young professionals.");
  const [showAmenities, setShowAmenities] = useState(true);
  const [showTestimonials, setShowTestimonials] = useState(true);
  const [buttonRadius, setButtonRadius] = useState([8]);
  
  // New state for filtering
  const [selectedHostelIds, setSelectedHostelIds] = useState<string[]>(HOSTELS.map(h => h.id));
  const [selectedPackageNames, setSelectedPackageNames] = useState<string[]>(
    Array.from(new Set(HOSTELS.flatMap(h => h.packages.map(p => p.name))))
  );

  const colorMap: Record<string, string> = {
    indigo: "bg-indigo-600",
    rose: "bg-rose-600", 
    emerald: "bg-emerald-600",
    slate: "bg-slate-900",
    black: "bg-black",
    blue: "bg-blue-600"
  };

  const textMap: Record<string, string> = {
    indigo: "text-indigo-600",
    rose: "text-rose-600",
    emerald: "text-emerald-600",
    slate: "text-slate-900",
    black: "text-black",
    blue: "text-blue-600"
  };

  const toggleHostel = (id: string) => {
    setSelectedHostelIds(prev => 
      prev.includes(id) ? prev.filter(hId => hId !== id) : [...prev, id]
    );
  };

  const togglePackage = (name: string) => {
    setSelectedPackageNames(prev => 
      prev.includes(name) ? prev.filter(pName => pName !== name) : [...prev, name]
    );
  };

  // Derived data for preview
  const displayedHostels = HOSTELS.filter(h => selectedHostelIds.includes(h.id));
  const allUniquePackages = Array.from(new Set(HOSTELS.flatMap(h => h.packages.map(p => p.name))));
  const displayedPackages = allUniquePackages.filter(pName => selectedPackageNames.includes(pName));

  // Get sample packages with details for preview (taking first occurrence)
  const packageDetails = displayedPackages.map(pName => {
    const pkg = HOSTELS.flatMap(h => h.packages).find(p => p.name === pName);
    return pkg;
  }).filter(Boolean);


  return (
    <DashboardLayout type="owner">
      <div className="lg:h-[calc(100vh-2rem)] h-auto flex flex-col">
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
            <p className="text-muted-foreground text-sm">Design and publish your accommodation's landing page.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2"/> Preview
            </Button>
            <Button size="sm" className="bg-black text-white hover:bg-gray-800">
              <Share2 className="h-4 w-4 mr-2"/> Publish
            </Button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:overflow-hidden min-h-0">
          
          {/* LEFT SIDEBAR - CONTROLS */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:overflow-hidden h-auto lg:h-full">
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

                <ScrollArea className="flex-1 h-[500px] lg:h-auto">
                  <div className="p-4 space-y-6">
                    
                    <TabsContent value="design" className="mt-0 space-y-6">
                      {/* Template Selection */}
                      <div className="space-y-3">
                         <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Template</Label>
                         <div className="grid grid-cols-2 gap-3">
                            <div 
                              className={`border rounded-lg p-3 cursor-pointer hover:border-primary transition-all ${selectedTemplate === 'modern' ? 'border-primary ring-1 ring-primary bg-primary/5' : 'bg-background'}`}
                              onClick={() => setSelectedTemplate('modern')}
                            >
                               <div className="aspect-video bg-indigo-100 rounded-md mb-2 flex items-center justify-center">
                                  <Layout className="h-6 w-6 text-indigo-600" />
                               </div>
                               <div className="font-bold text-sm">Modern</div>
                               <div className="text-[10px] text-muted-foreground">Clean & vibrant</div>
                            </div>
                            <div 
                              className={`border rounded-lg p-3 cursor-pointer hover:border-primary transition-all ${selectedTemplate === 'minimal' ? 'border-primary ring-1 ring-primary bg-primary/5' : 'bg-background'}`}
                              onClick={() => setSelectedTemplate('minimal')}
                            >
                               <div className="aspect-video bg-slate-100 rounded-md mb-2 flex items-center justify-center">
                                  <Type className="h-6 w-6 text-slate-600" />
                               </div>
                               <div className="font-bold text-sm">Minimal</div>
                               <div className="text-[10px] text-muted-foreground">Simple & typographic</div>
                            </div>
                            <div 
                              className={`border rounded-lg p-3 cursor-pointer hover:border-primary transition-all ${selectedTemplate === 'bold' ? 'border-primary ring-1 ring-primary bg-primary/5' : 'bg-background'}`}
                              onClick={() => setSelectedTemplate('bold')}
                            >
                               <div className="aspect-video bg-black/10 rounded-md mb-2 flex items-center justify-center">
                                  <Grid className="h-6 w-6 text-black" />
                               </div>
                               <div className="font-bold text-sm">Bold</div>
                               <div className="text-[10px] text-muted-foreground">High contrast</div>
                            </div>
                         </div>
                      </div>

                      <Separator />

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

                      {/* Listings Filter */}
                      <div className="space-y-4">
                        <Label className="text-base font-medium flex items-center gap-2">
                            <Building className="h-4 w-4 text-primary"/> Listings to Show
                        </Label>
                        <div className="space-y-2 border rounded-md p-3 bg-background">
                           {HOSTELS.map(hostel => (
                             <div key={hostel.id} className="flex items-center space-x-2">
                               <Checkbox 
                                 id={`hostel-${hostel.id}`} 
                                 checked={selectedHostelIds.includes(hostel.id)}
                                 onCheckedChange={() => toggleHostel(hostel.id)}
                               />
                               <label
                                 htmlFor={`hostel-${hostel.id}`}
                                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                               >
                                 {hostel.name}
                               </label>
                             </div>
                           ))}
                        </div>
                      </div>

                      <Separator />

                       {/* Packages Filter */}
                       <div className="space-y-4">
                        <Label className="text-base font-medium flex items-center gap-2">
                            <PackageIcon className="h-4 w-4 text-primary"/> Packages to Show
                        </Label>
                        <div className="space-y-2 border rounded-md p-3 bg-background">
                           {allUniquePackages.map(pkgName => (
                             <div key={pkgName} className="flex items-center space-x-2">
                               <Checkbox 
                                 id={`pkg-${pkgName}`} 
                                 checked={selectedPackageNames.includes(pkgName)}
                                 onCheckedChange={() => togglePackage(pkgName)}
                               />
                               <label
                                 htmlFor={`pkg-${pkgName}`}
                                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                               >
                                 {pkgName}
                               </label>
                             </div>
                           ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Sections Toggle */}
                      <div className="space-y-4">
                         <Label className="text-base font-medium flex items-center gap-2">
                            <Layout className="h-4 w-4 text-primary"/> Other Sections
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
                         </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="settings" className="mt-0 space-y-6">
                       <div className="space-y-3">
                          <Label>Brand Name</Label>
                          <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                       </div>
                       
                       <div className="space-y-3">
                          <Label>Website Slug</Label>
                          <div className="flex gap-2 items-center">
                             <div className="flex-1 relative">
                                <Input 
                                  value={subdomain}
                                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                  className="pr-32"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                                   .hostello.com
                                </div>
                             </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                             This is your free subdomain. You can change it anytime.
                          </p>
                       </div>

                       <Separator />

                       <div className="space-y-3">
                          <Label>SEO Settings</Label>
                          <Input placeholder="Meta Title" defaultValue={`${brandName} - Best Accommodation`} />
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
          <div className="lg:col-span-8 h-[600px] lg:h-auto bg-muted/20 rounded-xl border overflow-hidden flex flex-col relative group">
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
                   <div className="h-4 w-[1px] bg-border"></div>
                   <div className="flex items-center gap-1 text-xs text-muted-foreground">
                     <Globe className="h-3 w-3" />
                     <span className="text-muted-foreground/50">https://</span>
                     <span className="text-foreground font-medium">{subdomain}</span>
                     <span className="text-muted-foreground/50">.hostello.com</span>
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
                      
                      {/* ---- TEMPLATE: MODERN ---- */}
                      {selectedTemplate === 'modern' && (
                        <>
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
                                 alt="Hero"
                              />
                              
                              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                                 <Badge className={`mb-4 hover:bg-white/20 bg-white/20 text-white border-0 backdrop-blur-md`}>
                                    Student & Professional Living
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
                                      View Properties
                                    </Button>
                                 </div>
                              </div>
                           </div>

                           {/* Stats Section */}
                           <div className="grid grid-cols-3 border-b border-gray-100">
                              <div className="p-4 py-6 text-center border-r border-gray-100">
                                 <div className={`text-xl font-bold ${textMap[primaryColor]}`}>500+</div>
                                 <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mt-1">Happy Residents</div>
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
                                       { icon: GraduationCap, label: "Study Zones", desc: "Quiet & Focused" },
                                       { icon: Briefcase, label: "Work Space", desc: "Professional Desk" }
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
                        </>
                      )}

                      {/* ---- TEMPLATE: MINIMAL ---- */}
                      {selectedTemplate === 'minimal' && (
                        <>
                           {/* Navbar */}
                           <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
                              <div className="flex items-center justify-between px-8 py-6">
                                 <div className="font-bold text-xl tracking-tighter text-black">
                                    {brandName}.
                                 </div>
                                 <Menu className="h-5 w-5 text-black cursor-pointer" />
                              </div>
                           </div>

                           {/* Hero Section */}
                           <div className="px-8 pt-12 pb-8">
                              <h1 className="text-5xl font-light leading-[1.1] mb-6 text-black tracking-tight">
                                 {heroHeadline.split(' ').slice(0,2).join(' ')} <br/>
                                 <span className={`font-bold ${textMap[primaryColor]}`}>{heroHeadline.split(' ').slice(2).join(' ')}</span>
                              </h1>
                              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-8">
                                 {heroSubheadline}
                              </p>
                              <Button 
                                 className={`rounded-none ${colorMap[primaryColor]} text-white px-8 h-12`}
                                 style={{ borderRadius: `${buttonRadius}px` }}
                              >
                                 View Properties <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                              </Button>
                           </div>
                           
                           <div className="aspect-[4/3] w-full bg-gray-100 relative overflow-hidden">
                               <img 
                                 src={HOSTELS[1].image} 
                                 className="w-full h-full object-cover"
                                 alt="Hero"
                              />
                           </div>

                           {/* Amenities Section */}
                           {showAmenities && (
                              <div className="p-8 py-16">
                                 <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Features</div>
                                 <div className="space-y-6">
                                    {[
                                       { icon: Wifi, label: "High-Speed Wifi", desc: "100 Mbps Dedicated" },
                                       { icon: Shield, label: "24/7 Security", desc: "CCTV & Guards" },
                                       { icon: GraduationCap, label: "Study & Work", desc: "Quiet Zones" },
                                    ].map((item, i) => (
                                       <div key={i} className="flex items-start gap-4 pb-6 border-b border-gray-100 last:border-0">
                                          <div className="text-lg font-medium text-black w-1/3">{item.label}</div>
                                          <div className="text-sm text-gray-500 w-2/3">{item.desc}</div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           )}
                        </>
                      )}

                      {/* ---- TEMPLATE: BOLD ---- */}
                      {selectedTemplate === 'bold' && (
                        <>
                           {/* Navbar */}
                           <div className={`${colorMap[primaryColor]} text-white p-6 flex justify-between items-center sticky top-0 z-40`}>
                              <div className="font-black text-xl tracking-tighter uppercase italic">
                                 {brandName}
                              </div>
                              <Button size="sm" className="bg-white text-black hover:bg-gray-200 rounded-full font-bold text-xs">
                                 MENU
                              </Button>
                           </div>

                           {/* Hero Section */}
                           <div className={`${colorMap[primaryColor]} text-white p-6 pt-10 pb-20 rounded-b-[3rem]`}>
                              <h1 className="text-5xl font-black leading-none mb-6 uppercase tracking-tight">
                                 {heroHeadline}
                              </h1>
                              <div className="flex items-center gap-4">
                                 <div className="h-12 w-12 rounded-full border border-white/30 flex items-center justify-center">
                                    <ArrowLeft className="h-5 w-5 rotate-[135deg]" />
                                 </div>
                                 <p className="text-white/60 text-xs max-w-[200px] leading-tight font-medium">
                                    {heroSubheadline}
                                 </p>
                              </div>
                           </div>

                           <div className="px-4 -mt-12 relative z-10">
                              <img 
                                 src={HOSTELS[2].image} 
                                 className="w-full aspect-square object-cover rounded-[2rem] border-4 border-white shadow-2xl rotate-1"
                                 alt="Hero"
                              />
                           </div>

                           {/* Amenities Section */}
                           {showAmenities && (
                              <div className="p-6 py-12">
                                 <h2 className="text-3xl font-black uppercase mb-8 tracking-tight text-slate-900">What's Inside</h2>
                                 <div className="grid grid-cols-2 gap-3">
                                    {[
                                       { icon: Wifi, label: "Fast Wifi" },
                                       { icon: Shield, label: "Secure" },
                                       { icon: GraduationCap, label: "Study" },
                                       { icon: Zap, label: "Power" }
                                    ].map((item, i) => (
                                       <div key={i} className="bg-gray-100 p-6 rounded-2xl hover:bg-black hover:text-white transition-colors group cursor-pointer">
                                          <item.icon className={`h-6 w-6 mb-2 ${textMap[primaryColor]} group-hover:text-white transition-colors`} />
                                          <div className="font-bold text-sm uppercase">{item.label}</div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           )}
                        </>
                      )}


                      {/* Common Sections (Rendered for all templates but styled slightly differently if needed, or just reused for simplicity for now) */}
                      
                      {/* Featured Rooms */}
                      {displayedHostels.length > 0 && (
                        <div className={`p-8 pb-4 ${selectedTemplate === 'bold' ? 'bg-black text-white rounded-t-[3rem] mt-10' : ''}`}>
                           <h3 className={`font-bold text-xl mb-6 ${selectedTemplate === 'bold' ? 'text-white uppercase' : 'text-slate-900'}`}>
                              Our Locations
                           </h3>
                           <div className="space-y-6">
                              {displayedHostels.map((hostel) => (
                                 <div key={hostel.id} className={`
                                    group overflow-hidden transition-all duration-500
                                    ${selectedTemplate === 'minimal' ? 'border-b pb-8 rounded-none bg-transparent' : ''}
                                    ${selectedTemplate === 'modern' ? 'bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl' : ''}
                                    ${selectedTemplate === 'bold' ? 'bg-gray-900 border-gray-800 text-white rounded-2xl' : ''}
                                 `}>
                                    <div className={`relative overflow-hidden ${selectedTemplate === 'minimal' ? 'h-64 mb-4' : 'h-48'}`}>
                                       <img 
                                         src={hostel.image} 
                                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                       />
                                       {selectedTemplate !== 'minimal' && (
                                          <div className="absolute top-3 right-3">
                                             <div className="bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm text-black">
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> 
                                                {hostel.rating}
                                             </div>
                                          </div>
                                       )}
                                    </div>
                                    <div className={`${selectedTemplate === 'minimal' ? 'p-0' : 'p-5'}`}>
                                       <div className="flex justify-between items-start mb-2">
                                          <div>
                                             <h4 className={`font-bold text-lg ${selectedTemplate === 'bold' ? 'text-white' : 'text-slate-900'}`}>{hostel.name}</h4>
                                             <p className={`text-xs flex items-center gap-1 mt-1 ${selectedTemplate === 'bold' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                <MapPin className="h-3 w-3" /> {hostel.location}
                                             </p>
                                          </div>
                                          <div className="text-right">
                                             <div className={`font-bold text-lg ${textMap[primaryColor]}`}>৳{hostel.price.toLocaleString()}</div>
                                             <div className="text-[10px] text-gray-400">/month</div>
                                          </div>
                                       </div>
                                       
                                       <div className={`mt-4 pt-4 flex items-center justify-between ${selectedTemplate === 'bold' ? 'border-t border-gray-800' : 'border-t border-gray-50'}`}>
                                          <div className="flex -space-x-2">
                                             {[1,2,3].map(i => (
                                                <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                                   <img src={`https://i.pravatar.cc/100?img=${i + 10}`} className="h-full w-full object-cover" />
                                                </div>
                                             ))}
                                          </div>
                                          <Button 
                                            size="sm" 
                                            variant={selectedTemplate === 'minimal' ? 'link' : 'outline'}
                                            className={`h-8 text-xs ${selectedTemplate === 'bold' ? 'bg-white text-black hover:bg-gray-200 border-0' : ''}`}
                                            style={{ borderRadius: `${buttonRadius}px` }}
                                          >
                                             View Details
                                          </Button>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                      )}

                      {/* Packages Section */}
                      {packageDetails.length > 0 && (
                        <div className={`p-8 pt-4 ${selectedTemplate === 'bold' ? 'bg-black text-white pb-12' : 'bg-gray-50/30'}`}>
                           <h3 className={`font-bold text-xl mb-6 ${selectedTemplate === 'bold' ? 'text-white uppercase' : 'text-slate-900'}`}>
                              Available Packages
                           </h3>
                           <div className="space-y-4">
                              {packageDetails.map((pkg, i) => pkg ? (
                                 <div key={i} className={`
                                    flex justify-between items-center
                                    ${selectedTemplate === 'minimal' ? 'border-b border-gray-200 py-4 rounded-none bg-transparent px-0' : 'p-4 rounded-xl border shadow-sm'}
                                    ${selectedTemplate === 'modern' ? 'bg-white border-gray-100' : ''}
                                    ${selectedTemplate === 'bold' ? 'bg-gray-900 border-gray-800' : ''}
                                 `}>
                                    <div className="flex items-center gap-3">
                                       {selectedTemplate !== 'minimal' && (
                                          <div className={`h-10 w-10 rounded-full bg-opacity-10 ${colorMap[primaryColor]} flex items-center justify-center`}>
                                             <PackageIcon className={`h-5 w-5 ${textMap[primaryColor]}`} />
                                          </div>
                                       )}
                                       <div>
                                          <div className={`font-bold text-sm ${selectedTemplate === 'bold' ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</div>
                                          <div className="text-xs text-gray-500">{pkg.duration} Plan</div>
                                       </div>
                                    </div>
                                    <div className="text-right">
                                       <div className={`font-bold text-sm ${textMap[primaryColor]}`}>৳{pkg.price.toLocaleString()}</div>
                                    </div>
                                 </div>
                              ) : null)}
                           </div>
                        </div>
                      )}

                      {/* Testimonials */}
                      {showTestimonials && (
                         <div className={`p-8 ${selectedTemplate === 'minimal' ? 'bg-gray-50 text-black' : ''} ${selectedTemplate === 'modern' ? 'bg-slate-900 text-white' : ''} ${selectedTemplate === 'bold' ? `${colorMap[primaryColor]} text-white` : ''}`}>
                            <div className="text-center mb-8">
                               <h3 className="font-bold text-xl mb-2">Guest Stories</h3>
                               <p className="text-white/60 text-xs">Hear from our happy residents</p>
                            </div>
                            
                            <div className={`backdrop-blur-md border rounded-2xl p-6 relative ${selectedTemplate === 'minimal' ? 'bg-white border-gray-200 shadow-sm' : 'bg-white/10 border-white/10'}`}>
                               <div className="absolute -top-3 -left-2 text-4xl opacity-20 font-serif">"</div>
                               <p className={`text-sm leading-relaxed mb-4 italic ${selectedTemplate === 'minimal' ? 'text-gray-600' : 'text-white/90'}`}>
                                  Moving here was the best decision I made. The community is amazing and the facilities are top-notch.
                               </p>
                               <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-white/20 overflow-hidden">
                                     <img src="https://i.pravatar.cc/100?img=32" className="h-full w-full object-cover" />
                                  </div>
                                  <div>
                                     <div className={`font-semibold text-sm ${selectedTemplate === 'minimal' ? 'text-black' : ''}`}>Sarah J.</div>
                                     <div className={`text-[10px] ${selectedTemplate === 'minimal' ? 'text-gray-400' : 'text-white/50'}`}>Resident since 2023</div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      )}

                      {/* Footer */}
                      <div className={`border-t p-8 pb-12 ${selectedTemplate === 'bold' ? 'bg-black text-white border-gray-800' : 'bg-white border-gray-100'}`}>
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
                            Premium accommodation designed for comfort, community, and success.
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
