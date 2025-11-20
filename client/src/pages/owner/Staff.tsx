import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserPlus, Shield, Key } from "lucide-react";

const STAFF = [
  { id: 1, name: "Abdul Karim", role: "Manager", branch: "Dhaka Hub", status: "Active" },
  { id: 2, name: "Selina Begum", role: "Receptionist", branch: "Uttara Girls", status: "Active" },
  { id: 3, name: "Rahim Mia", role: "Maintenance", branch: "All", status: "On Leave" },
];

export default function OwnerStaff() {
  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Staff Management</h2>
          <p className="text-muted-foreground">Manage roles, permissions, and staff accounts.</p>
        </div>
        <Button><UserPlus className="h-4 w-4 mr-2"/> Add Staff Member</Button>
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
                    <Button variant="ghost" size="sm">Edit</Button>
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
