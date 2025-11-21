import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Download, User, Calendar, CheckCircle2, Clock, Search, Filter, Building2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const STAFF_PAYROLL = [
  { id: 1, name: "Abdul Karim", role: "Manager", branch: "Dhaka Hub", salary: 25000, lastPaid: "Aug 01, 2025", status: "Paid", nextDue: "Sep 01, 2025" },
  { id: 2, name: "Selina Begum", role: "Receptionist", branch: "Uttara Girls", salary: 18000, lastPaid: "Aug 01, 2025", status: "Paid", nextDue: "Sep 01, 2025" },
  { id: 3, name: "Rahim Mia", role: "Maintenance", branch: "Mirpur Home", salary: 15000, lastPaid: "Jul 01, 2025", status: "Overdue", nextDue: "Aug 01, 2025" },
  { id: 4, name: "Kamal Hossain", role: "Security", branch: "Dhaka Hub", salary: 12000, lastPaid: "Aug 01, 2025", status: "Paid", nextDue: "Sep 01, 2025" },
];

export default function OwnerSalaries() {
  const { toast } = useToast();
  const [property, setProperty] = useState("all");

  const handlePaySalary = (name: string) => {
    toast({
      title: "Payment Processed",
      description: `Salary payment for ${name} has been recorded.`,
    });
  };

  const filteredStaff = property === "all" 
    ? STAFF_PAYROLL 
    : STAFF_PAYROLL.filter(s => {
        if (property === "dhaka") return s.branch === "Dhaka Hub";
        if (property === "uttara") return s.branch === "Uttara Girls";
        if (property === "mirpur") return s.branch === "Mirpur Home";
        return true;
    });

  const totalMonthlyPayroll = filteredStaff.reduce((sum, staff) => sum + staff.salary, 0);
  const pendingAmount = filteredStaff.filter(s => s.status === "Overdue" || s.status === "Pending").reduce((sum, staff) => sum + staff.salary, 0);

  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Salary Management</h2>
          <p className="text-muted-foreground">Manage staff payroll and payment history.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
           <div className="w-full sm:w-[200px]">
            <Select defaultValue="all" onValueChange={setProperty}>
               <SelectTrigger>
                  <SelectValue placeholder="Select Property" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="dhaka">Dhaka Hub</SelectItem>
                  <SelectItem value="uttara">Uttara Girls</SelectItem>
                  <SelectItem value="mirpur">Mirpur Home</SelectItem>
               </SelectContent>
            </Select>
          </div>
          <Button variant="outline"><Download className="h-4 w-4 mr-2"/> Payroll Report</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
           <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Total Monthly Payroll</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
           </CardHeader>
           <CardContent>
              <div className="text-2xl font-bold">৳{totalMonthlyPayroll.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">For {filteredStaff.length} employees</p>
           </CardContent>
        </Card>
        <Card>
           <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
           </CardHeader>
           <CardContent>
              <div className="text-2xl font-bold text-orange-600">৳{pendingAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Due immediately</p>
           </CardContent>
        </Card>
        <Card>
           <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Next Pay Date</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
           </CardHeader>
           <CardContent>
              <div className="text-2xl font-bold text-primary">Sep 01</div>
              <p className="text-xs text-muted-foreground">10 days remaining</p>
           </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
           <div>
              <CardTitle>Staff Payroll</CardTitle>
              <CardDescription>Manage salaries and view payment status.</CardDescription>
           </div>
           <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search staff..." className="pl-8" />
           </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Member</TableHead>
                <TableHead>Role & Property</TableHead>
                <TableHead>Monthly Salary</TableHead>
                <TableHead>Last Paid</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                       <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                          {staff.name.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div>
                          <div>{staff.name}</div>
                          <div className="text-xs text-muted-foreground md:hidden">{staff.role}</div>
                       </div>
                    </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex flex-col gap-1">
                        <span className="text-sm">{staff.role}</span>
                        <div className="flex items-center text-xs text-muted-foreground">
                           <Building2 className="h-3 w-3 mr-1" />
                           {staff.branch}
                        </div>
                     </div>
                  </TableCell>
                  <TableCell className="font-medium">৳{staff.salary.toLocaleString()}</TableCell>
                  <TableCell>{staff.lastPaid}</TableCell>
                  <TableCell>
                    <Badge variant={staff.status === 'Paid' ? 'default' : 'destructive'} className={staff.status === 'Paid' ? 'bg-green-600 hover:bg-green-700' : ''}>
                       {staff.status}
                    </Badge>
                    {staff.status !== 'Paid' && (
                       <div className="text-xs text-red-500 mt-1 font-medium">Due: {staff.nextDue}</div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                       <DialogTrigger asChild>
                          <Button variant={staff.status === 'Paid' ? "outline" : "default"} size="sm" disabled={staff.status === 'Paid'}>
                             {staff.status === 'Paid' ? 'Paid' : 'Pay Now'}
                          </Button>
                       </DialogTrigger>
                       <DialogContent>
                          <DialogHeader>
                             <DialogTitle>Confirm Salary Payment</DialogTitle>
                             <DialogDescription>
                                You are about to record a salary payment for {staff.name}.
                             </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Amount</Label>
                                <div className="col-span-3 font-bold">৳{staff.salary.toLocaleString()}</div>
                             </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Month</Label>
                                <div className="col-span-3">August 2025</div>
                             </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label className="text-right">Method</Label>
                                <Select defaultValue="bank">
                                   <SelectTrigger className="col-span-3">
                                      <SelectValue />
                                   </SelectTrigger>
                                   <SelectContent>
                                      <SelectItem value="bank">Bank Transfer</SelectItem>
                                      <SelectItem value="cash">Cash</SelectItem>
                                      <SelectItem value="mobile">Mobile Banking</SelectItem>
                                   </SelectContent>
                                </Select>
                             </div>
                          </div>
                          <DialogFooter>
                             <Button onClick={() => handlePaySalary(staff.name)}>Confirm Payment</Button>
                          </DialogFooter>
                       </DialogContent>
                    </Dialog>
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
