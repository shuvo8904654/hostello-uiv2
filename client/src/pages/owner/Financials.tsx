import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Download, TrendingDown, TrendingUp, Plus, Search, Filter, Calendar, FileText, Wallet, Building2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useState } from "react";

const TRANSACTIONS = [
  { id: 1, desc: "Rent Payment - Room 101", type: "Income", amount: 5000, date: "Aug 20", status: "Cleared", category: "Rent", branch: "Dhaka Hub" },
  { id: 2, desc: "Plumbing Repair", type: "Expense", amount: 1200, date: "Aug 18", status: "Paid", category: "Maintenance", branch: "Uttara Girls" },
  { id: 3, desc: "WiFi Bill", type: "Expense", amount: 2500, date: "Aug 15", status: "Paid", category: "Utilities", branch: "Dhaka Hub" },
  { id: 4, desc: "Rent Payment - Room 204", type: "Income", amount: 5000, date: "Aug 14", status: "Cleared", category: "Rent", branch: "Uttara Girls" },
  { id: 5, desc: "Cleaning Supplies", type: "Expense", amount: 800, date: "Aug 12", status: "Paid", category: "Supplies", branch: "Mirpur Home" },
  { id: 6, desc: "Deposit - Room 305", type: "Income", amount: 10000, date: "Aug 10", status: "Cleared", category: "Deposit", branch: "Dhaka Hub" },
  { id: 7, desc: "Salary - Abdul Karim (Manager)", type: "Expense", amount: 25000, date: "Aug 01", status: "Paid", category: "Staff Salary", branch: "Dhaka Hub" },
  { id: 8, desc: "Salary - Selina Begum (Reception)", type: "Expense", amount: 18000, date: "Aug 01", status: "Paid", category: "Staff Salary", branch: "Uttara Girls" },
];

const CHART_DATA = [
  { name: 'Week 1', income: 15000, expense: 45000 }, // Higher expense due to salaries
  { name: 'Week 2', income: 22000, expense: 8000 },
  { name: 'Week 3', income: 18000, expense: 4000 },
  { name: 'Week 4', income: 25000, expense: 6000 },
];

export default function OwnerFinancials() {
  const { toast } = useToast();
  const [branch, setBranch] = useState("all");

  const filteredTransactions = branch === "all" 
    ? TRANSACTIONS 
    : TRANSACTIONS.filter(t => {
        if (branch === "dhaka") return t.branch === "Dhaka Hub";
        if (branch === "uttara") return t.branch === "Uttara Girls";
        if (branch === "mirpur") return t.branch === "Mirpur Home";
        return true;
    });

  const handleDownload = () => {
    toast({
      title: "Report Downloaded",
      description: "Financial report has been saved to your device.",
    });
  };

  const handleAddTransaction = () => {
    toast({
      title: "Transaction Recorded",
      description: "New transaction has been added to the ledger.",
    });
  };

  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financials</h2>
          <p className="text-muted-foreground">Track income, expenses, and staff salaries.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="w-full sm:w-[200px]">
            <Select defaultValue="all" onValueChange={setBranch}>
               <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  <SelectItem value="dhaka">Dhaka Hub</SelectItem>
                  <SelectItem value="uttara">Uttara Girls</SelectItem>
                  <SelectItem value="mirpur">Mirpur Home</SelectItem>
               </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={handleDownload}><Download className="h-4 w-4 mr-2"/> Report</Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2"/> Add Transaction</Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Record Transaction</SheetTitle>
                <SheetDescription>Add a new income or expense entry.</SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Transaction Type</Label>
                  <Tabs defaultValue="income" className="w-full">
                    <TabsList className="w-full">
                      <TabsTrigger value="income" className="flex-1">Income</TabsTrigger>
                      <TabsTrigger value="expense" className="flex-1">Expense</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="space-y-2">
                  <Label>Branch</Label>
                  <Select>
                     <SelectTrigger>
                        <SelectValue placeholder="Select Branch" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="dhaka">Dhaka Hub</SelectItem>
                        <SelectItem value="uttara">Uttara Girls</SelectItem>
                        <SelectItem value="mirpur">Mirpur Home</SelectItem>
                     </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input placeholder="e.g. Repair Cost" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Amount (৳)</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Removed Rent and Staff Salary as requested */}
                      <SelectItem value="deposit">Security Deposit</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="supplies">Supplies</SelectItem>
                      <SelectItem value="furniture">Furniture & Equipment</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <Select defaultValue="cash">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="mobile">Mobile Banking (Bkash/Nagad)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button onClick={handleAddTransaction}>Save Transaction</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
           <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
           </CardHeader>
           <CardContent>
              <div className="text-2xl font-bold">৳1,24,500</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
           </CardContent>
        </Card>
        <Card>
           <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
           </CardHeader>
           <CardContent>
              <div className="text-2xl font-bold">৳88,200</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
           </CardContent>
        </Card>
        <Card>
           <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
           </CardHeader>
           <CardContent>
              <div className="text-2xl font-bold text-primary">৳36,300</div>
              <p className="text-xs text-muted-foreground">Healthy Margin</p>
           </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Cash Flow Overview</CardTitle>
            <CardDescription>Income vs Expenses over the last month</CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CHART_DATA}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `৳${value}`} />
                <Tooltip 
                  formatter={(value) => [`৳${value}`, '']}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: 'var(--radius)' }}
                />
                <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Where your money is going</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Staff Salary</span>
                  <span className="text-muted-foreground">55%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[55%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Maintenance</span>
                  <span className="text-muted-foreground">25%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[25%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Utilities</span>
                  <span className="text-muted-foreground">15%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-[15%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Supplies</span>
                  <span className="text-muted-foreground">5%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 w-[5%]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <TabsList>
            <TabsTrigger value="transactions">All Transactions</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-8 h-9" />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardContent className="p-0 sm:p-6 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map(t => (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium">{t.desc}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal">{t.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-muted-foreground text-xs">
                           <Building2 className="h-3 w-3 mr-1" />
                           {t.branch}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={t.type === 'Income' ? 'outline' : 'secondary'} className={t.type === 'Income' ? 'text-green-600 border-green-200 bg-green-50' : ''}>
                          {t.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{t.date}</TableCell>
                      <TableCell className={t.type === 'Income' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                        {t.type === 'Income' ? '+' : '-'}৳{t.amount}
                      </TableCell>
                      <TableCell>{t.status}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoices">
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <div className="flex justify-center mb-4">
                <FileText className="h-12 w-12 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Open Invoices</h3>
              <p className="mb-6">All rent invoices for this month have been cleared.</p>
              <Button>Create New Invoice</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
