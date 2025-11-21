import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TENANTS } from "@/lib/mockData";
import { Search, Mail, Phone, MoreHorizontal, Eye, Edit, CreditCard, UserMinus, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function OwnerTenants() {
  const { toast } = useToast();
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleRecordPayment = () => {
    toast({
      title: "Payment Recorded",
      description: "Rent payment has been logged.",
    });
    setIsPaymentOpen(false);
  };

  const openDetails = (tenant: any) => {
    setSelectedTenant(tenant);
    setIsDetailsOpen(true);
  };

  const openPayment = (tenant: any) => {
    setSelectedTenant(tenant);
    setIsPaymentOpen(true);
  };

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
                  <TableCell className="font-medium whitespace-nowrap cursor-pointer hover:underline" onClick={() => openDetails(tenant)}>
                    {tenant.name}
                  </TableCell>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => openDetails(tenant)}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit Tenant
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" /> Message
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openPayment(tenant)}>
                          <CreditCard className="mr-2 h-4 w-4" /> Record Payment
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <UserMinus className="mr-2 h-4 w-4" /> Terminate Lease
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tenant Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tenant Details</DialogTitle>
            <DialogDescription>Full profile for {selectedTenant?.name}</DialogDescription>
          </DialogHeader>
          {selectedTenant && (
             <div className="grid gap-4 py-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                   <div>
                      <Label className="text-muted-foreground">Room Number</Label>
                      <p className="font-medium text-lg">{selectedTenant.room}</p>
                   </div>
                   <div>
                      <Label className="text-muted-foreground">Status</Label>
                      <div className="mt-1">
                        <Badge variant={selectedTenant.rentStatus === 'Paid' ? 'default' : 'destructive'}>
                           Rent {selectedTenant.rentStatus}
                        </Badge>
                      </div>
                   </div>
                   <div>
                      <Label className="text-muted-foreground">Email</Label>
                      <p className="font-medium">{selectedTenant.email || 'N/A'}</p>
                   </div>
                   <div>
                      <Label className="text-muted-foreground">Phone</Label>
                      <p className="font-medium">{selectedTenant.phone || 'N/A'}</p>
                   </div>
                   <div>
                      <Label className="text-muted-foreground">Lease Start</Label>
                      <p className="font-medium">{selectedTenant.leaseStart || 'N/A'}</p>
                   </div>
                   <div>
                      <Label className="text-muted-foreground">Lease End</Label>
                      <p className="font-medium">{selectedTenant.leaseEnd}</p>
                   </div>
                </div>
                <div className="border-t pt-4">
                   <h4 className="font-medium mb-2">Monthly Rent</h4>
                   <div className="flex justify-between items-center bg-muted p-3 rounded">
                      <span>Base Rent</span>
                      <span className="font-bold">৳{selectedTenant.rentAmount || 'N/A'}</span>
                   </div>
                </div>
             </div>
          )}
          <DialogFooter>
             <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Close</Button>
             <Button onClick={() => { setIsDetailsOpen(false); openPayment(selectedTenant); }}>Record Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Record Payment</DialogTitle>
               <DialogDescription>Log a rent payment for {selectedTenant?.name}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="space-y-2">
                  <Label>Amount (৳)</Label>
                  <Input type="number" defaultValue={selectedTenant?.rentAmount} />
               </div>
               <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <Select defaultValue="cash">
                     <SelectTrigger>
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="bkash">bKash</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
               <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" />
               </div>
               <div className="space-y-2">
                  <Label>Notes (Optional)</Label>
                  <Input placeholder="e.g. September Rent" />
               </div>
            </div>
            <DialogFooter>
               <Button variant="outline" onClick={() => setIsPaymentOpen(false)}>Cancel</Button>
               <Button onClick={handleRecordPayment}>Confirm Payment</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
