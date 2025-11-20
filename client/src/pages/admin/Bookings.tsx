import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, XCircle, Flag } from "lucide-react";

export default function AdminBookings() {
  const bookings = [
    { id: "BK-1024", tenant: "Alice Johnson", hostel: "Sunny Side Hostel", room: "201", dates: "Nov 20 - Dec 20", status: "Active", amount: "$450" },
    { id: "BK-1025", tenant: "Bob Smith", hostel: "Green Wood Stay", room: "104", dates: "Nov 22 - Dec 22", status: "Pending", amount: "$380" },
    { id: "BK-1026", tenant: "Charlie Brown", hostel: "Urban Nest", room: "305", dates: "Nov 15 - Dec 15", status: "Dispute", amount: "$500", issue: "Room not as described" },
  ];

  return (
    <DashboardLayout type="admin">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Hostel & Booking Oversight</h2>
        <p className="text-muted-foreground">Monitor bookings, handle disputes, and override decisions.</p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-8">
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Active Bookings</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">842</div>
            </CardContent>
         </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Disputes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">3</div>
            </CardContent>
         </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flagged Transactions</CardTitle>
              <Flag className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">12</div>
            </CardContent>
         </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Booking Management</CardTitle>
            <div className="flex gap-2">
                <Button variant="outline" size="sm">Filter Status</Button>
                <Button variant="outline" size="sm">Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-bold">{booking.id}</span>
                    <Badge variant={booking.status === 'Dispute' ? 'destructive' : booking.status === 'Active' ? 'default' : 'secondary'}>
                      {booking.status}
                    </Badge>
                  </div>
                  <h4 className="font-bold">{booking.hostel} - Room {booking.room}</h4>
                  <p className="text-sm text-muted-foreground">
                    {booking.tenant} • {booking.dates} • {booking.amount}
                  </p>
                  {booking.issue && (
                    <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" /> Dispute Reason: {booking.issue}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                   <Button variant="outline" size="sm">View Details</Button>
                   {booking.status === 'Dispute' && (
                     <Button size="sm" variant="destructive">Resolve Dispute</Button>
                   )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
