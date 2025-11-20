import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, AlertCircle, CreditCard, FileText, Clock } from "lucide-react";

const SUBSCRIPTIONS = [
  { id: 1, plan: "Basic", price: 0, users: 850, features: ["1 Hostel", "Manual Bookings"] },
  { id: 2, plan: "Pro", price: 2500, users: 120, features: ["3 Hostels", "Auto-SMS", "Analytics"] },
  { id: 3, plan: "Enterprise", price: 8000, users: 15, features: ["Unlimited", "API Access", "Priority Support"] },
];

const TRANSACTIONS = [
  { id: "TX-9821", user: "Dhaka Hub Owner", plan: "Pro Monthly", amount: 2500, status: "Success", date: "Nov 19, 2025" },
  { id: "TX-9822", user: "Uttara Girls Host", plan: "Pro Monthly", amount: 2500, status: "Failed", date: "Nov 18, 2025" },
  { id: "TX-9823", user: "Prime Properties", plan: "Enterprise", amount: 8000, status: "Success", date: "Nov 17, 2025" },
];

const BILLING_HISTORY = [
    { id: "INV-2024-001", owner: "John Doe", amount: "৳2,500", status: "Paid", date: "Oct 01, 2025" },
    { id: "INV-2024-002", owner: "Jane Smith", amount: "৳8,000", status: "Paid", date: "Oct 05, 2025" },
    { id: "INV-2024-003", owner: "Bob Wilson", amount: "৳2,500", status: "Overdue", date: "Sep 28, 2025" },
];

export default function AdminBilling() {
  return (
    <DashboardLayout type="admin">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Subscription & Billing</h2>
        <p className="text-muted-foreground">Manage platform revenue, plans, and invoices.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">৳4,20,000</div>
             <p className="text-xs text-green-600">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">135</div>
             <p className="text-xs text-muted-foreground">Paying owners</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium">Failed Transactions</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold text-destructive">4</div>
             <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* Plans */}
         <div className="lg:col-span-2 space-y-8">
            <Card>
               <CardHeader>
                  <CardTitle>Subscription Plans</CardTitle>
                  <CardDescription>Manage Free, Pro, and Premium tiers</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="grid sm:grid-cols-3 gap-4">
                     {SUBSCRIPTIONS.map(plan => (
                        <div key={plan.id} className="border rounded-lg p-4 flex flex-col">
                           <div className="font-bold text-lg mb-1">{plan.plan}</div>
                           <div className="text-2xl font-bold mb-4">৳{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                           <ul className="text-sm space-y-2 mb-6 flex-1">
                              {plan.features.map(f => (
                                 <li key={f} className="flex items-center text-muted-foreground"><Check className="h-3 w-3 mr-2 text-green-600"/> {f}</li>
                              ))}
                           </ul>
                           <Button variant="outline" size="sm">Edit Plan</Button>
                        </div>
                     ))}
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
               </CardHeader>
               <CardContent>
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>ID</TableHead>
                           <TableHead>User</TableHead>
                           <TableHead>Plan</TableHead>
                           <TableHead>Amount</TableHead>
                           <TableHead>Status</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {TRANSACTIONS.map(tx => (
                           <TableRow key={tx.id}>
                              <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                              <TableCell>{tx.user}</TableCell>
                              <TableCell>{tx.plan}</TableCell>
                              <TableCell>৳{tx.amount}</TableCell>
                              <TableCell>
                                 <Badge variant={tx.status === 'Success' ? 'outline' : 'destructive'} className={tx.status === 'Success' ? 'text-green-600 border-green-200 bg-green-50' : ''}>
                                    {tx.status}
                                 </Badge>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </CardContent>
            </Card>
         </div>

         <div className="lg:col-span-1 space-y-6">
            <Card>
               <CardHeader>
                  <CardTitle>Invoices</CardTitle>
                  <CardDescription>Generate and send invoices.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <Button className="w-full" variant="default"><CreditCard className="h-4 w-4 mr-2"/> Generate Monthly Invoice</Button>
                  <Button className="w-full" variant="outline">Send Payment Reminders</Button>
               </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Owner Billing History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {BILLING_HISTORY.map(hist => (
                        <div key={hist.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                            <div className="flex items-center gap-3">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">{hist.owner}</p>
                                    <p className="text-xs text-muted-foreground">{hist.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold">{hist.amount}</p>
                                <Badge variant={hist.status === 'Paid' ? 'outline' : 'destructive'} className="text-[10px] h-5">
                                    {hist.status}
                                </Badge>
                            </div>
                        </div>
                    ))}
                    <Button variant="ghost" className="w-full text-xs">View All History</Button>
                </CardContent>
            </Card>

            <Card className="border-destructive/20 bg-destructive/5">
               <CardHeader>
                  <CardTitle className="text-destructive flex items-center"><AlertCircle className="h-5 w-5 mr-2"/> Disputes</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">2 payment disputes currently open.</p>
                  <Button variant="destructive" size="sm" className="w-full">Handle Disputes</Button>
               </CardContent>
            </Card>
         </div>
      </div>
    </DashboardLayout>
  );
}
