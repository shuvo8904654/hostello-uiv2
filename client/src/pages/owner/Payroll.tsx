import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Users, Download, Filter, Search, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";

const STAFF_PAYROLL = [
  { id: 1, name: "Abdul Karim", role: "Branch Manager", salary: 25000, status: "Paid", paymentDate: "2023-11-01", type: "Monthly" },
  { id: 2, name: "Fatima Hasan", role: "Branch Manager", salary: 24000, status: "Pending", paymentDate: "-", type: "Monthly" },
  { id: 3, name: "Rahim Mia", role: "Security Guard", salary: 12000, status: "Paid", paymentDate: "2023-11-01", type: "Monthly" },
  { id: 4, name: "Sokina Begum", role: "Cleaner", salary: 8000, status: "Paid", paymentDate: "2023-11-02", type: "Monthly" },
  { id: 5, name: "Kamal Hossain", role: "Maintenance", salary: 15000, status: "Pending", paymentDate: "-", type: "Contract" },
];

export default function OwnerPayroll() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStaff = STAFF_PAYROLL.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPayroll = STAFF_PAYROLL.reduce((acc, curr) => acc + curr.salary, 0);
  const paidAmount = STAFF_PAYROLL.filter(s => s.status === "Paid").reduce((acc, curr) => acc + curr.salary, 0);
  const pendingAmount = totalPayroll - paidAmount;

  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payroll Management</h2>
          <p className="text-muted-foreground">Manage staff salaries, payments, and payslips.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Report</Button>
          <Button><DollarSign className="mr-2 h-4 w-4" /> Process Payroll</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳{totalPayroll.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">For November 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">৳{paidAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{(paidAmount / totalPayroll * 100).toFixed(1)}% Disbursed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">৳{pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{STAFF_PAYROLL.filter(s => s.status === "Pending").length} staff pending</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <CardTitle>Salary Disbursements</CardTitle>
            <div className="flex gap-2">
               <div className="relative w-full md:w-64">
                 <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                 <Input 
                   placeholder="Search staff..." 
                   className="pl-8" 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
               <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium">{staff.name}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>{staff.type}</TableCell>
                  <TableCell>৳{staff.salary.toLocaleString()}</TableCell>
                  <TableCell>{staff.paymentDate}</TableCell>
                  <TableCell>
                    <Badge variant={staff.status === "Paid" ? "default" : "outline"} className={staff.status === "Paid" ? "bg-green-600 hover:bg-green-700" : "text-orange-600 border-orange-200 bg-orange-50"}>
                      {staff.status === "Paid" ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                      {staff.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Slip</Button>
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
