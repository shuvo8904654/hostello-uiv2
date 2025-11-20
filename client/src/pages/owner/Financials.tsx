import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Download, TrendingDown, TrendingUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const TRANSACTIONS = [
  { id: 1, desc: "Rent Payment - Room 101", type: "Income", amount: 5000, date: "Aug 20", status: "Cleared" },
  { id: 2, desc: "Plumbing Repair", type: "Expense", amount: 1200, date: "Aug 18", status: "Paid" },
  { id: 3, desc: "WiFi Bill", type: "Expense", amount: 2500, date: "Aug 15", status: "Paid" },
];

export default function OwnerFinancials() {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Report Downloaded",
      description: "Financial report has been saved to your device.",
    });
  };

  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financials</h2>
          <p className="text-muted-foreground">Track income, expenses, and invoices.</p>
        </div>
        <Button variant="outline" onClick={handleDownload}><Download className="h-4 w-4 mr-2"/> Download Report</Button>
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
              <div className="text-2xl font-bold">৳45,200</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
           </CardContent>
        </Card>
        <Card>
           <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
           </CardHeader>
           <CardContent>
              <div className="text-2xl font-bold text-primary">৳79,300</div>
              <p className="text-xs text-muted-foreground">Healthy Margin</p>
           </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
           <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 overflow-x-auto">
           <Table>
              <TableHeader>
                 <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                 </TableRow>
              </TableHeader>
              <TableBody>
                 {TRANSACTIONS.map(t => (
                    <TableRow key={t.id}>
                       <TableCell className="font-medium">{t.desc}</TableCell>
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
                    </TableRow>
                 ))}
              </TableBody>
           </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
