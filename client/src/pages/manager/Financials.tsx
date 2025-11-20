import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, ArrowUpRight, ArrowDownRight, Download, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const monthlyData = [
  { name: 'Jan', income: 12000, expense: 4000 },
  { name: 'Feb', income: 15000, expense: 5000 },
  { name: 'Mar', income: 18000, expense: 4500 },
  { name: 'Apr', income: 16000, expense: 6000 },
  { name: 'May', income: 21000, expense: 5500 },
  { name: 'Jun', income: 24000, expense: 7000 },
];

const TRANSACTIONS = [
  { id: 1, desc: "Rent Payment - Room 101", date: "2024-06-15", amount: 5000, type: "Income", status: "Completed" },
  { id: 2, desc: "Plumbing Repair", date: "2024-06-14", amount: 1200, type: "Expense", status: "Completed" },
  { id: 3, desc: "Internet Bill", date: "2024-06-10", amount: 2500, type: "Expense", status: "Pending" },
  { id: 4, desc: "Rent Payment - Room 102", date: "2024-06-05", amount: 5000, type: "Income", status: "Completed" },
];

export default function ManagerFinancials() {
  return (
    <DashboardLayout type="manager">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financials - Dhaka Hub</h2>
          <p className="text-muted-foreground">Track income, expenses, and financial health for this branch.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4"/> Export Report</Button>
          <Button><DollarSign className="mr-2 h-4 w-4"/> Record Transaction</Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income (Jun)</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳24,000</div>
            <p className="text-xs text-muted-foreground mt-1">+14% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses (Jun)</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳7,000</div>
            <p className="text-xs text-muted-foreground mt-1">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit (Jun)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">৳17,000</div>
            <p className="text-xs text-muted-foreground mt-1">Healthy margin</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>6 Month Overview</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `৳${val/1000}k`} />
                <Tooltip />
                <Bar dataKey="income" fill="#16a34a" radius={[4, 4, 0, 0]} name="Income" />
                <Bar dataKey="expense" fill="#dc2626" radius={[4, 4, 0, 0]} name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
           <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest financial activity.</CardDescription>
           </CardHeader>
           <CardContent>
              <Table>
                 <TableHeader>
                    <TableRow>
                       <TableHead>Description</TableHead>
                       <TableHead>Date</TableHead>
                       <TableHead>Amount</TableHead>
                       <TableHead>Status</TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {TRANSACTIONS.map(t => (
                       <TableRow key={t.id}>
                          <TableCell className="font-medium">
                             <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${t.type === 'Income' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                {t.desc}
                             </div>
                          </TableCell>
                          <TableCell>{t.date}</TableCell>
                          <TableCell className={t.type === 'Income' ? 'text-green-600' : 'text-red-600'}>
                             {t.type === 'Income' ? '+' : '-'}৳{t.amount}
                          </TableCell>
                          <TableCell>
                             <Badge variant={t.status === 'Completed' ? 'outline' : 'secondary'}>{t.status}</Badge>
                          </TableCell>
                       </TableRow>
                    ))}
                 </TableBody>
              </Table>
           </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
