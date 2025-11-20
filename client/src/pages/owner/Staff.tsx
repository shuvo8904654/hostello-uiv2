import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserPlus, Shield, Key, Save } from "lucide-react";
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

const STAFF = [
  { id: 1, name: "Abdul Karim", role: "Manager", branch: "Dhaka Hub", status: "Active" },
  { id: 2, name: "Selina Begum", role: "Receptionist", branch: "Uttara Girls", status: "Active" },
  { id: 3, name: "Rahim Mia", role: "Maintenance", branch: "All", status: "On Leave" },
];

export default function OwnerStaff() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Staff Member Saved",
      description: "The staff profile has been updated successfully.",
    });
  };

  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Staff Management</h2>
          <p className="text-muted-foreground">Manage roles, permissions, and staff accounts.</p>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button><UserPlus className="h-4 w-4 mr-2"/> Add Staff Member</Button>
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
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="receptionist">Receptionist</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                              <SelectItem value="cleaner">Cleaner</SelectItem>
                              <SelectItem value="security">Security</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                     <div className="space-y-2">
                        <Label>Branch</Label>
                        <Select>
                           <SelectTrigger>
                              <SelectValue placeholder="Assign Branch" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="all">All Branches</SelectItem>
                              <SelectItem value="dhaka">Dhaka Hub</SelectItem>
                              <SelectItem value="uttara">Uttara Girls</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Permissions</h3>
                  <div className="space-y-2">
                     <div className="flex items-center space-x-2">
                        <Checkbox id="p1" />
                        <Label htmlFor="p1">Can view financial reports</Label>
                     </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="p2" defaultChecked />
                        <Label htmlFor="p2">Can manage bookings</Label>
                     </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="p3" defaultChecked />
                        <Label htmlFor="p3">Can respond to maintenance requests</Label>
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
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
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
                <TableHead>Branch</TableHead>
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
    </DashboardLayout>
  );
}
