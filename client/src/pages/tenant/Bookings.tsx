import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BOOKINGS } from "@/lib/mockData";
import { Calendar, MapPin, Download } from "lucide-react";

export default function TenantBookings() {
  return (
    <DashboardLayout type="tenant">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">My Bookings</h2>
        <p className="text-muted-foreground">View and manage your accommodation history.</p>
      </div>

      <div className="space-y-6">
        {BOOKINGS.map((booking) => (
          <Card key={booking.id}>
            <CardHeader className="pb-4 border-b bg-muted/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">{booking.hostelName}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {booking.roomType}
                  </div>
                </div>
                <Badge className={booking.status === 'Active' ? 'bg-green-600' : 'bg-muted text-muted-foreground'}>
                  {booking.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground font-medium uppercase">Dates</span>
                  <div className="flex items-center gap-2 font-medium">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {booking.checkIn} — {booking.checkOut}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground font-medium uppercase">Payment</span>
                  <div className="font-medium">৳{booking.price} / month</div>
                </div>
                <div className="flex items-center md:justify-end gap-3">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Receipt
                  </Button>
                  {booking.status === 'Active' && (
                    <Button size="sm">Manage Booking</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
