import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";

export default function AdminVerification() {
  // Mock data for verification queue
  const pendingVerifications = [
    { id: 1, type: 'Owner', name: 'John Doe', submittedAt: '2025-11-19', status: 'Pending', docs: ['ID Card', 'Business License'] },
    { id: 2, type: 'Property', name: 'Sunny Side Hostel', submittedAt: '2025-11-18', status: 'Pending', docs: ['Property Deed', 'Fire Safety'] },
    { id: 3, type: 'Listing', name: 'Downtown Backpackers', submittedAt: '2025-11-20', status: 'Pending', docs: ['Photos', 'Description'] },
  ];

  const rejectedItems = [
    { id: 4, type: 'Owner', name: 'Scam Likely', rejectedAt: '2025-11-15', reason: 'Fake ID provided' },
  ];

  return (
    <DashboardLayout type="admin">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Verification & Approval</h2>
        <p className="text-muted-foreground">Review and approve owners, properties, and listings.</p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Queue</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingVerifications.length}</div>
            <p className="text-xs text-muted-foreground">Items awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+15% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Requires resubmission</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Verification Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingVerifications.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={item.type === 'Owner' ? 'default' : item.type === 'Property' ? 'secondary' : 'outline'}>
                        {item.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{item.submittedAt}</span>
                    </div>
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">Documents: {item.docs.join(', ')}</p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive border-destructive/20 flex-1 sm:flex-none">
                      Reject
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none">
                      Verify & Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Re-submit System for Rejected Owners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rejectedItems.map((item) => (
                 <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="destructive">Rejected</Badge>
                        <span className="text-sm text-muted-foreground">Rejected on {item.rejectedAt}</span>
                      </div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-sm text-destructive">Reason: {item.reason}</p>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                 </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
