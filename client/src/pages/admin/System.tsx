import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Lock, FileText, Users } from "lucide-react";

export default function AdminSystem() {
  const adminUsers = [
    { id: 1, name: "Admin User", email: "admin@hostello.com", role: "Super Admin", lastActive: "Now" },
    { id: 2, name: "Moderator Team", email: "mods@hostello.com", role: "Moderator", lastActive: "2h ago" },
    { id: 3, name: "Support Lead", email: "support@hostello.com", role: "Support Manager", lastActive: "1d ago" },
  ];

  const activityLogs = [
    { id: 1, user: "Admin User", action: "Updated Global Pricing", time: "10 mins ago" },
    { id: 2, user: "Moderator Team", action: "Banned User #842", time: "1 hour ago" },
    { id: 3, user: "System", action: "Daily Backup Completed", time: "4 hours ago" },
  ];

  return (
    <DashboardLayout type="admin">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">System Management</h2>
        <p className="text-muted-foreground">Manage admin roles, permissions, and view system logs.</p>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Admin & Moderator Roles</CardTitle>
                <CardDescription>Manage staff access levels</CardDescription>
            </div>
            <Button size="sm" variant="outline">
                <Users className="h-4 w-4 mr-2" /> Invite Staff
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Last Active</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {adminUsers.map(user => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">
                                {user.name}
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                            </TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell className="text-right text-muted-foreground">{user.lastActive}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Platform security configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                        <Lock className="h-5 w-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">2FA Enforcement</h4>
                        <p className="text-xs text-muted-foreground">Require 2FA for all admin accounts</p>
                    </div>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        <Shield className="h-5 w-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">Session Timeout</h4>
                        <p className="text-xs text-muted-foreground">Auto-logout after 30 mins</p>
                    </div>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Recent Activity Logs</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activityLogs.map(log => (
                        <div key={log.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{log.action}</p>
                                    <p className="text-xs text-muted-foreground">by {log.user}</p>
                                </div>
                            </div>
                            <span className="text-xs text-muted-foreground">{log.time}</span>
                        </div>
                    ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-muted-foreground">View Full Logs</Button>
            </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
