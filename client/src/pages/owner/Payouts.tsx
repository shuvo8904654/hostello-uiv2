import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, History, CreditCard, AlertCircle, CheckCircle2, Clock, Building, Smartphone } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PAYOUT_HISTORY = [
  { id: "PO-7829", amount: 25000, method: "Bank Transfer", date: "Oct 15, 2024", status: "Completed", account: "****4582" },
  { id: "PO-7743", amount: 15000, method: "Bkash", date: "Oct 01, 2024", status: "Completed", account: "017...892" },
  { id: "PO-7612", amount: 32000, method: "Bank Transfer", date: "Sep 15, 2024", status: "Completed", account: "****4582" },
  { id: "PO-7555", amount: 12500, method: "Nagad", date: "Sep 01, 2024", status: "Processing", account: "018...441" },
];

const PAYOUT_METHODS = [
  { id: 1, type: "Bank Transfer", name: "Dutch Bangla Bank", account: "**** **** **** 4582", status: "Primary", icon: Building },
  { id: 2, type: "Mobile Banking", name: "Bkash Personal", account: "+880 17XX XXX892", status: "Active", icon: Smartphone },
];

export default function OwnerPayouts() {
  const { toast } = useToast();

  const handleRequestPayout = () => {
    toast({
      title: "Payout Requested",
      description: "Your payout request of ৳15,000 has been submitted.",
    });
  };

  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payouts</h2>
          <p className="text-muted-foreground">Manage your earnings and withdrawals.</p>
        </div>
        <div className="flex gap-2">
            <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <DollarSign className="h-4 w-4" /> Request Payout
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Request Payout</DialogTitle>
                <DialogDescription>
                  Withdraw funds to your connected account. Minimum withdrawal amount is ৳500.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="amount" placeholder="0.00" className="pl-8" defaultValue="15000" />
                  </div>
                  <p className="text-xs text-muted-foreground">Available balance: ৳42,500</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="method">Payout Method</Label>
                  <Select defaultValue="bank">
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Dutch Bangla Bank (**** 4582)</SelectItem>
                      <SelectItem value="bkash">Bkash (017...892)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleRequestPayout}>Confirm Withdrawal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-primary-foreground/80">Available for Payout</CardTitle>
            <DollarSign className="h-4 w-4 text-primary-foreground/80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">৳42,500</div>
            <p className="text-xs text-primary-foreground/60 mt-1">Next payout date: Nov 25</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">৳12,500</div>
            <p className="text-xs text-muted-foreground mt-1">1 request processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Withdrawn</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">৳8,45,000</div>
            <p className="text-xs text-muted-foreground mt-1">Lifetime earnings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>View your past withdrawal requests and their status.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payout ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PAYOUT_HISTORY.map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell className="font-medium">{payout.id}</TableCell>
                      <TableCell>৳{payout.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                            <span className="text-sm">{payout.method}</span>
                            <span className="text-xs text-muted-foreground">{payout.account}</span>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
                <CardTitle>Payout Methods</CardTitle>
                <CardDescription>Manage your connected accounts.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {PAYOUT_METHODS.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                <method.icon className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">{method.name}</p>
                                <p className="text-xs text-muted-foreground">{method.account}</p>
                            </div>
                        </div>
                        {method.status === 'Primary' && (
                            <Badge variant="outline" className="text-xs">Primary</Badge>
                        )}
                    </div>
                ))}
                
                <Button variant="outline" className="w-full border-dashed">
                    <PlusIcon className="h-4 w-4 mr-2" /> Add Payout Method
                </Button>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-700 dark:text-blue-400">
                    <AlertCircle className="h-4 w-4" />
                    Payout Policy
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="text-xs text-blue-600 dark:text-blue-300 space-y-2 list-disc pl-4">
                    <li>Minimum withdrawal amount is ৳500.</li>
                    <li>Bank transfers typically take 2-3 business days.</li>
                    <li>Mobile banking withdrawals are processed within 24 hours.</li>
                    <li>A 1% processing fee applies to instant withdrawals.</li>
                </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function PlusIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}
