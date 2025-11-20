import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, User, Mail, Lock, ArrowRight, Check } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignUp() {
  const [_, setLocation] = useLocation();

  const handleStudentSignup = () => {
    setLocation("/dashboard/tenant");
  };

  const handleOwnerSignup = () => {
    setLocation("/dashboard/owner/properties");
  };

  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-muted/30">
        <div className="w-full max-w-[900px] grid md:grid-cols-2 gap-8">
          
          {/* Left Side - Promo */}
          <div className="hidden md:flex flex-col justify-center space-y-6 p-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-primary">Join Hostello Today</h1>
              <p className="text-xl text-muted-foreground">The smartest way to manage and find student accommodation.</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Verified Listings</h3>
                  <p className="text-sm text-muted-foreground">Every property is checked for quality.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Secure Payments</h3>
                  <p className="text-sm text-muted-foreground">Pay rent safely through the platform.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Direct Communication</h3>
                  <p className="text-sm text-muted-foreground">Chat directly with owners or tenants.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <Card className="w-full border-none shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>Choose your role to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="student" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="student">
                    <User className="h-4 w-4 mr-2" />
                    I'm a Student
                  </TabsTrigger>
                  <TabsTrigger value="owner">
                    <Building2 className="h-4 w-4 mr-2" />
                    I'm an Owner
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="student" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Rahim" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Ahmed" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="email" className="pl-9" placeholder="rahim@university.edu" type="email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="password" className="pl-9" type="password" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 py-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
                    >
                      I agree to the <span className="text-primary underline cursor-pointer">Terms</span> and <span className="text-primary underline cursor-pointer">Privacy Policy</span>
                    </label>
                  </div>
                  <Button className="w-full" size="lg" onClick={handleStudentSignup}>
                    Create Student Account <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </TabsContent>

                <TabsContent value="owner" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="o-firstName">First Name</Label>
                      <Input id="o-firstName" placeholder="Abdul" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="o-lastName">Last Name</Label>
                      <Input id="o-lastName" placeholder="Karim" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="o-phone">Phone Number</Label>
                    <Input id="o-phone" placeholder="+880..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="o-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="o-email" className="pl-9" placeholder="owner@hostello.com" type="email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="o-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="o-password" className="pl-9" type="password" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 py-2">
                    <Checkbox id="o-terms" />
                    <label
                      htmlFor="o-terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
                    >
                      I agree to the Terms and Service Agreement
                    </label>
                  </div>
                  <Button className="w-full" size="lg" onClick={handleOwnerSignup}>
                    Register as Owner <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-6">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}
