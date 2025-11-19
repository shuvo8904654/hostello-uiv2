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

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
           <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tenants..." className="pl-8" />
           </div>
           <div className="flex gap-2 w-full sm:w-auto">
             <Button variant="outline" className="flex-1 sm:flex-none">Export CSV</Button>
             <Button className="flex-1 sm:flex-none">Add Tenant</Button>
           </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Name</TableHead>
                <TableHead>Room</TableHead>
                <TableHead className="hidden md:table-cell">Lease Ends</TableHead>
                <TableHead>Rent Status</TableHead>
                <TableHead className="hidden sm:table-cell">Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TENANTS.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium whitespace-nowrap">{tenant.name}</TableCell>
                  <TableCell>{tenant.room}</TableCell>
                  <TableCell className="hidden md:table-cell">{tenant.leaseEnd}</TableCell>
                  <TableCell>
                    <Badge variant={tenant.rentStatus === 'Paid' ? 'default' : 'destructive'} className={tenant.rentStatus === 'Paid' ? 'bg-green-600 hover:bg-green-700' : ''}>
                      {tenant.rentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
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
