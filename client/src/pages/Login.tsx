import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, User, Mail, Lock, ArrowRight, Briefcase, ShieldAlert } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Login() {
  const [_, setLocation] = useLocation();
  const [email, setEmail] = useState("");

  const handleLogin = (role: string) => {
    // Mock login redirection based on role
    if (role === 'tenant') setLocation("/dashboard/tenant");
    if (role === 'owner') setLocation("/dashboard/owner");
    if (role === 'manager') setLocation("/dashboard/manager");
    if (role === 'admin') setLocation("/dashboard/admin");
  };

  // Auto-detect role for demo purposes if they type specific emails
  const detectRoleAndLogin = () => {
    if (email.includes('owner')) handleLogin('owner');
    else if (email.includes('manager')) handleLogin('manager');
    else if (email.includes('admin')) handleLogin('admin');
    else handleLogin('tenant');
  };

  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-muted/30">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your Hostello account</p>
          </div>

          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Enter your credentials to access your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="tenant" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="tenant" title="Tenant"><User className="h-4 w-4" /></TabsTrigger>
                  <TabsTrigger value="owner" title="Owner"><Building2 className="h-4 w-4" /></TabsTrigger>
                  <TabsTrigger value="manager" title="Manager"><Briefcase className="h-4 w-4" /></TabsTrigger>
                  <TabsTrigger value="admin" title="Admin"><ShieldAlert className="h-4 w-4" /></TabsTrigger>
                </TabsList>

                <TabsContent value="tenant" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="student@university.edu" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Password</Label>
                      <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" type="password" value="password" readOnly />
                    </div>
                  </div>
                  <Button className="w-full" size="lg" onClick={() => handleLogin('tenant')}>
                    Sign In as Tenant <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </TabsContent>

                <TabsContent value="owner" className="space-y-4">
                   <div className="bg-blue-50 p-3 rounded-md text-xs text-blue-700 mb-2">
                      <strong>Demo Tip:</strong> Use this tab for Property Owners.
                   </div>
                   <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="owner@hostello.com" defaultValue="owner@hostello.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Password</Label>
                      <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" type="password" value="password" readOnly />
                    </div>
                  </div>
                  <Button className="w-full" size="lg" onClick={() => handleLogin('owner')}>
                    Sign In as Owner <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </TabsContent>

                <TabsContent value="manager" className="space-y-4">
                   <div className="bg-amber-50 p-3 rounded-md text-xs text-amber-700 mb-2">
                      <strong>Property Managers:</strong> Use the credentials provided by the property owner.
                   </div>
                   <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="manager@hostello.com" defaultValue="manager@hostello.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Password</Label>
                      <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" type="password" value="password" readOnly />
                    </div>
                  </div>
                  <Button className="w-full" size="lg" onClick={() => handleLogin('manager')}>
                    Sign In as Manager <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </TabsContent>

                <TabsContent value="admin" className="space-y-4">
                   <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="admin@hostello.com" defaultValue="admin@hostello.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" type="password" value="password" readOnly />
                    </div>
                  </div>
                  <Button className="w-full" size="lg" onClick={() => handleLogin('admin')}>
                    Sign In as Admin <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </TabsContent>

              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-6">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}