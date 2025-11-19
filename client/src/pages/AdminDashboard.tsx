import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HOSTELS } from "@/lib/mockData";
import { Shield, Users, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  return (
    <DashboardLayout type="admin">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Admin Console</h2>
        <p className="text-muted-foreground">Platform overview and moderation.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">New owner accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,240</div>
            <p className="text-xs text-muted-foreground">Tenants and Owners</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Disputes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listing Approval Queue</CardTitle>
        </CardHeader>
        <CardContent>
           <div className="space-y-4">
              {HOSTELS.slice(2,4).map(hostel => (
                <div key={hostel.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <img src={hostel.image} className="w-16 h-16 rounded-md object-cover" alt="Hostel" />
                    <div>
                      <h4 className="font-bold">{hostel.name}</h4>
                      <p className="text-sm text-muted-foreground">Submitted by Owner #842 • {hostel.city}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20">Reject</Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve Listing</Button>
                  </div>
                </div>
              ))}
           </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
