import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, History, CreditCard, AlertCircle, CheckCircle2, Clock, Building, Smartphone, Plus, Calendar as CalendarIcon, FileText } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const PAYOUT_HISTORY = [
  { id: "TRX-9921", amount: 25000, method: "Bank Transfer", date: "Oct 15, 2024", status: "Completed", note: "Monthly withdrawal" },
  { id: "TRX-9844", amount: 15000, method: "Bkash", date: "Oct 01, 2024", status: "Completed", note: "Emergency cash" },
  { id: "TRX-9712", amount: 32000, method: "Bank Transfer", date: "Sep 15, 2024", status: "Completed", note: "September profit" },
  { id: "TRX-9655", amount: 12500, method: "Nagad", date: "Sep 01, 2024", status: "Pending", note: "Processing..." },
];

export default function OwnerPayouts() {
  const { toast } = useToast();

  const handleRecordPayout = () => {
    toast({
      title: "Payout Recorded",
      description: "The payout record has been added to your tracker.",
    });
  };

  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payout Tracker</h2>
          <p className="text-muted-foreground">Track your withdrawals and owner drawings.</p>
        </div>
        <div className="flex gap-2">
            <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="h-4 w-4" /> Record Payout
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Record Payout / Withdrawal</DialogTitle>
                <DialogDescription>
                  Manually record a payout you have taken from the business.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="amount" placeholder="0.00" className="pl-8" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date Received</Label>
                    <div className="relative">
                       <Input id="date" type="date" />
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="method">Withdrawal Method</Label>
                  <Select defaultValue="bank">
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="cash">Cash Withdrawal</SelectItem>
                      <SelectItem value="bkash">Bkash</SelectItem>
                      <SelectItem value="nagad">Nagad</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="completed">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed (Received)</SelectItem>
                      <SelectItem value="pending">Pending (Processing)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes / Reference</Label>
                  <Textarea id="notes" placeholder="e.g. September Profit Share, Emergency Fund..." />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                   <Button type="submit" onClick={handleRecordPayout}>Save Record</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Withdrawn (YTD)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">৳8,45,000</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
               <TrendingUp className="h-3 w-3 text-green-500" /> +12% vs last year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">৳12,500</div>
            <p className="text-xs text-muted-foreground mt-1">1 record marked as pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Last Withdrawal</CardTitle>
            <History className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">৳25,000</div>
            <p className="text-xs text-muted-foreground mt-1">Oct 15, 2024 via Bank</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal History</CardTitle>
              <CardDescription>Log of all recorded payouts and owner drawings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference ID</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PAYOUT_HISTORY.map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell className="font-medium text-xs">{payout.id}</TableCell>
                      <TableCell>{payout.note}</TableCell>
                      <TableCell className="font-bold">৳{payout.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                            {payout.method === 'Bank Transfer' ? <Building className="h-3 w-3 text-muted-foreground" /> : 
                             payout.method === 'Cash' ? <DollarSign className="h-3 w-3 text-muted-foreground" /> :
                             <Smartphone className="h-3 w-3 text-muted-foreground" />}
                            <span className="text-sm">{payout.method}</span>
                        </div>
                      </TableCell>
                      <TableCell>{payout.date}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={payout.status === 'Completed' ? 'secondary' : 'outline'} 
                          className={
                            payout.status === 'Completed' 
                              ? 'bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400' 
                              : 'text-orange-600 border-orange-200 bg-orange-50 dark:text-orange-400 dark:border-orange-900/50 dark:bg-orange-900/20'
                          }
                        >
                          {payout.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="sr-only">View Details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
