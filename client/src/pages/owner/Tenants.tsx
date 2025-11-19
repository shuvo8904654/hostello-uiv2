import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TENANTS } from "@/lib/mockData";
import { Search, Mail, Phone, MoreHorizontal } from "lucide-react";

export default function OwnerTenants() {
  return (
    <DashboardLayout type="owner">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Tenant Management</h2>
        <p className="text-muted-foreground">View and manage your current tenants.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
           <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tenants..." className="pl-8" />
           </div>
           <div className="flex gap-2">
             <Button variant="outline">Export CSV</Button>
             <Button>Add Tenant</Button>
           </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Lease Ends</TableHead>
                <TableHead>Rent Status</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TENANTS.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>{tenant.room}</TableCell>
                  <TableCell>{tenant.leaseEnd}</TableCell>
                  <TableCell>
                    <Badge variant={tenant.rentStatus === 'Paid' ? 'default' : 'destructive'} className={tenant.rentStatus === 'Paid' ? 'bg-green-600 hover:bg-green-700' : ''}>
                      {tenant.rentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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
