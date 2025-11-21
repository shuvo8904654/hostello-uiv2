import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserPlus, Shield, Key, Save, Users, Building2, Banknote } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const STAFF = [
  { id: 1, name: "Abdul Karim", role: "Manager", branch: "Dhaka Hub", status: "Active", email: "abdul@hostello.com", salary: "25,000" },
  { id: 2, name: "Selina Begum", role: "Receptionist", branch: "Uttara Girls", status: "Active", email: "selina@hostello.com", salary: "18,000" },
  { id: 3, name: "Rahim Mia", role: "Maintenance", branch: "All", status: "On Leave", email: "rahim@hostello.com", salary: "15,000" },
];

const MANAGERS = [
  { id: 1, name: "Abdul Karim", branch: "Dhaka Hub", email: "abdul.k@hostello.com", phone: "+88017...", status: "Active", lastActive: "2 mins ago", salary: "25,000" },
  { id: 2, name: "Fatima Hasan", branch: "Uttara Girls", email: "fatima.h@hostello.com", phone: "+88019...", status: "Active", lastActive: "1 hour ago", salary: "28,000" },
];

export default function OwnerStaff() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Saved Successfully",
      description: "The profile has been updated.",
    });
  };

  const handleCreateManager = () => {
    toast({
      title: "Manager Account Created",
      description: "An invitation email has been sent to the new manager.",
    });
  };

  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
          <p className="text-muted-foreground">Manage property managers, operational staff, and payroll.</p>
        </div>
      </div>

      <Tabs defaultValue="managers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="managers" className="gap-2"><Building2 className="h-4 w-4"/> Property Managers</TabsTrigger>
          <TabsTrigger value="staff" className="gap-2"><Users className="h-4 w-4"/> General Staff</TabsTrigger>
        </TabsList>

        <TabsContent value="managers">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-semibold">Property Managers</h3>
             <Sheet>
              <SheetTrigger asChild>
                <Button><UserPlus className="h-4 w-4 mr-2"/> Create Manager Account</Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Create Manager Account</SheetTitle>
                  <SheetDescription>
                    Add a new manager who will have full access to manage a specific property.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                   <div className="space-y-4">
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Manager Details</h3>
                      <div className="space-y-2">
                         <Label>Full Name</Label>
                         <Input placeholder="e.g. Abdul Karim" />
                      </div>
                      <div className="space-y-2">
                         <Label>Email Address (Login ID)</Label>
                         <Input placeholder="manager@hostello.com" type="email" />
                      </div>
                      <div className="space-y-2">
                         <Label>Password</Label>
                         <div className="relative">
                            <Key className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-9" type="password" placeholder="Set a temporary password" />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <Label>Phone Number</Label>
                         <Input placeholder="+880..." />
                      </div>
                      <div className="space-y-2">
                         <Label>Salary (Monthly)</Label>
                         <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">৳</span>
                            <Input className="pl-8" placeholder="Optional" />
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Assignment</h3>
                      <div className="space-y-2">
                        <Label>Assign Property</Label>
                        <Select>
                           <SelectTrigger>
                              <SelectValue placeholder="Select Property" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="dhaka">Dhaka Hub</SelectItem>
                              <SelectItem value="uttara">Uttara Girls</SelectItem>
                              <SelectItem value="mirpur">Mirpur Home</SelectItem>
                           </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">This user will manage all operations for this property.</p>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Permissions</h3>
                      <div className="space-y-2">
                         <div className="flex items-center space-x-2">
                            <Checkbox id="m1" defaultChecked disabled />
                            <Label htmlFor="m1">Manage Bookings & Tenants</Label>
                         </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="m2" defaultChecked />
                            <Label htmlFor="m2">View Financial Reports</Label>
                         </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="m3" defaultChecked />
                            <Label htmlFor="m3">Edit Property Details</Label>
                         </div>
                      </div>
                   </div>
                </div>
                <SheetFooter>
                   <SheetClose asChild>
                      <Button onClick={handleCreateManager}>Create Account</Button>
                   </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
           </div>

           <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Manager Name</TableHead>
                    <TableHead>Assigned Property</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MANAGERS.map((manager) => (
                    <TableRow key={manager.id}>
                      <TableCell className="font-medium">
                        <div>{manager.name}</div>
                        <div className="text-xs text-muted-foreground md:hidden">{manager.email}</div>
                      </TableCell>
                      <TableCell>
                         <Badge variant="secondary" className="font-normal">
                            <Building2 className="h-3 w-3 mr-1"/>
                            {manager.branch}
                         </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{manager.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="text-muted-foreground text-xs mr-1">৳</span>
                          {manager.salary}
                        </div>
                      </TableCell>
                      <TableCell><Badge className="bg-green-600">{manager.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Manage</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="staff">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-semibold">General Staff</h3>
             <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline"><UserPlus className="h-4 w-4 mr-2"/> Add Staff Member</Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Add New Staff</SheetTitle>
                  <SheetDescription>
                    Create a new staff account and assign roles.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-6">
                   <div className="space-y-4">
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Personal Info</h3>
                      <div className="space-y-2">
                         <Label>Full Name</Label>
                         <Input placeholder="e.g. Abdul Karim" />
                      </div>
                      <div className="space-y-2">
                         <Label>Email Address</Label>
                         <Input placeholder="staff@hostello.com" type="email" />
                      </div>
                      <div className="space-y-2">
                         <Label>Phone Number</Label>
                         <Input placeholder="+880..." />
                      </div>
                      <div className="space-y-2">
                         <Label>Salary (Monthly)</Label>
                         <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">৳</span>
                            <Input className="pl-8" placeholder="Optional" />
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Role & Access</h3>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label>Role</Label>
                            <Select>
                               <SelectTrigger>
                                  <SelectValue placeholder="Select Role" />
                               </SelectTrigger>
                               <SelectContent>
                                  <SelectItem value="receptionist">Receptionist</SelectItem>
                                  <SelectItem value="maintenance">Maintenance</SelectItem>
                                  <SelectItem value="cleaner">Cleaner</SelectItem>
                                  <SelectItem value="security">Security</SelectItem>
                               </SelectContent>
                            </Select>
                         </div>
                         <div className="space-y-2">
                            <Label>Property</Label>
                            <Select>
                               <SelectTrigger>
                                  <SelectValue placeholder="Assign Property" />
                               </SelectTrigger>
                               <SelectContent>
                                  <SelectItem value="all">All Properties</SelectItem>
                                  <SelectItem value="dhaka">Dhaka Hub</SelectItem>
                                  <SelectItem value="uttara">Uttara Girls</SelectItem>
                               </SelectContent>
                            </Select>
                         </div>
                      </div>
                   </div>
                </div>
                <SheetFooter>
                   <SheetClose asChild>
                      <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" /> Save Staff Member</Button>
                   </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
           </div>

           <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 pt-4">
               <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search staff..." className="pl-8" />
               </div>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {STAFF.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>
                         <div className="flex items-center gap-2">
                            <Shield className="h-3 w-3 text-muted-foreground" />
                            {member.role}
                         </div>
                      </TableCell>
                      <TableCell>{member.branch}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="text-muted-foreground text-xs mr-1">৳</span>
                          {member.salary}
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{member.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </SheetTrigger>
                          <SheetContent className="w-[400px] sm:w-[540px]">
                            <SheetHeader>
                              <SheetTitle>Edit Staff Member</SheetTitle>
                              <SheetDescription>Update details for {member.name}</SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-6 py-6">
                               {/* Same form fields as Add, simplified for this mockup */}
                               <div className="space-y-2">
                                  <Label>Full Name</Label>
                                  <Input defaultValue={member.name} />
                               </div>
                               <div className="space-y-2">
                                  <Label>Salary (Monthly)</Label>
                                  <div className="relative">
                                     <span className="absolute left-3 top-2.5 text-muted-foreground">৳</span>
                                     <Input className="pl-8" defaultValue={member.salary} />
                                  </div>
                               </div>
                               <div className="space-y-2">
                                  <Label>Role</Label>
                                  <Select defaultValue={member.role.toLowerCase()}>
                                     <SelectTrigger>
                                        <SelectValue />
                                     </SelectTrigger>
                                     <SelectContent>
                                        <SelectItem value="manager">Manager</SelectItem>
                                        <SelectItem value="receptionist">Receptionist</SelectItem>
                                        <SelectItem value="maintenance">Maintenance</SelectItem>
                                     </SelectContent>
                                  </Select>
                               </div>
                               <div className="space-y-2">
                                  <Label>Status</Label>
                                  <Select defaultValue={member.status === "Active" ? "active" : "leave"}>
                                     <SelectTrigger>
                                        <SelectValue />
                                     </SelectTrigger>
                                     <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="leave">On Leave</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                     </SelectContent>
                                  </Select>
                               </div>
                            </div>
                            <SheetFooter>
                               <SheetClose asChild>
                                  <Button onClick={handleSave}>Update Staff</Button>
                               </SheetClose>
                            </SheetFooter>
                          </SheetContent>
                        </Sheet>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
