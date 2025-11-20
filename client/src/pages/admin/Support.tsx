import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, User } from "lucide-react";

export default function AdminSupport() {
  const tickets = [
    { id: "T-1001", user: "John Doe", subject: "Payment Issue", status: "Open", priority: "High", date: "2h ago" },
    { id: "T-1002", user: "Sunny Hostel Owner", subject: "Verification stuck", status: "In Progress", priority: "Medium", date: "5h ago" },
    { id: "T-1003", user: "Jane Smith", subject: "How to update profile?", status: "Closed", priority: "Low", date: "1d ago" },
  ];

  return (
    <DashboardLayout type="admin">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Support & Tickets</h2>
        <p className="text-muted-foreground">Manage user support requests and assignments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
            <Card className="h-[calc(100vh-200px)]">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Ticket Queue</CardTitle>
                    <Input placeholder="Search tickets..." className="mt-2" />
                </CardHeader>
                <CardContent className="p-0 overflow-y-auto max-h-[calc(100vh-300px)]">
                    <div className="divide-y">
                        {tickets.map(ticket => (
                            <button key={ticket.id} className="w-full text-left p-4 hover:bg-muted/50 transition-colors flex flex-col gap-1">
                                <div className="flex justify-between items-center w-full">
                                    <span className="font-mono text-xs text-muted-foreground">{ticket.id}</span>
                                    <span className="text-xs text-muted-foreground">{ticket.date}</span>
                                </div>
                                <h4 className="font-bold text-sm truncate w-full">{ticket.subject}</h4>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <User className="h-3 w-3" /> {ticket.user}
                                    </span>
                                    <Badge variant={ticket.status === 'Open' ? 'destructive' : ticket.status === 'Closed' ? 'secondary' : 'default'} className="text-[10px] h-5">
                                        {ticket.status}
                                    </Badge>
                                </div>
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2">
            <Card className="h-[calc(100vh-200px)] flex flex-col">
                <CardHeader className="border-b">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Badge variant="destructive">Open</Badge>
                                <Badge variant="outline">High Priority</Badge>
                            </div>
                            <CardTitle>Payment Issue</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">Ticket #T-1001 • Submitted by John Doe</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">Assign To...</Button>
                            <Button variant="secondary" size="sm">Close Ticket</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <User className="h-4 w-4 text-primary" />
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg max-w-[80%]">
                            <p className="text-sm font-semibold mb-1">John Doe</p>
                            <p className="text-sm">I tried to pay for my booking but it failed twice. However, my card was charged. Please help refund or confirm the booking.</p>
                            <span className="text-xs text-muted-foreground mt-2 block">2 hours ago</span>
                        </div>
                    </div>

                    <div className="flex gap-3 flex-row-reverse">
                        <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold">SP</span>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg max-w-[80%] border border-blue-100">
                            <p className="text-sm font-semibold mb-1 text-blue-900">Support Agent</p>
                            <p className="text-sm text-blue-800">Hi John, thanks for reaching out. I'm checking our payment logs right now. Can you provide the last 4 digits of the card used?</p>
                            <span className="text-xs text-blue-900/60 mt-2 block">1 hour ago</span>
                        </div>
                    </div>
                </CardContent>
                <div className="p-4 border-t bg-muted/10">
                    <div className="flex gap-2">
                        <Input placeholder="Type your reply..." />
                        <Button>
                            <MessageSquare className="h-4 w-4 mr-2" /> Send
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
