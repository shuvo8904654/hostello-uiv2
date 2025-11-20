import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MoreVertical, AlertOctagon, Shield, UserPlus, Link as LinkIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminUsers() {
  // Mock user data
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Tenant", status: "Active", joined: "2024-01-15" },
    { id: 2, name: "Bob Smith", email: "bob@properties.com", role: "Owner", status: "Active", joined: "2023-11-20" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Tenant", status: "Suspended", joined: "2024-03-10" },
    { id: 4, name: "David Wilson", email: "david@admin.com", role: "Admin", status: "Active", joined: "2023-01-01" },
    { id: 5, name: "Eve Davis", email: "eve@properties.com", role: "Owner", status: "Active", joined: "2024-05-12" },
  ];

  return (
    <DashboardLayout type="admin">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">Manage tenants, owners, and administrators.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
                <LinkIcon className="h-4 w-4" /> Link Accounts
            </Button>
            <Button className="gap-2">
                <UserPlus className="h-4 w-4" /> Add User
            </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="tenants">Tenants</TabsTrigger>
            <TabsTrigger value="owners">Owners</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'Admin' ? 'default' : user.role === 'Owner' ? 'secondary' : 'outline'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                          {user.status}
                        </div>
                      </TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                            <DropdownMenuItem>Reset Password</DropdownMenuItem>
                            <DropdownMenuItem>View Linked Accounts</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Shield className="mr-2 h-4 w-4" /> Change Role
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-orange-600">
                                <AlertOctagon className="mr-2 h-4 w-4" /> 
                                {user.status === 'Active' ? 'Suspend User' : 'Unsuspend'}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                                <AlertOctagon className="mr-2 h-4 w-4" /> Ban User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Placeholder content for other tabs to show structure */}
        <TabsContent value="tenants">
            <Card><CardContent className="pt-6 text-center text-muted-foreground">Filtered view for Tenants</CardContent></Card>
        </TabsContent>
        <TabsContent value="owners">
            <Card><CardContent className="pt-6 text-center text-muted-foreground">Filtered view for Owners</CardContent></Card>
        </TabsContent>
        <TabsContent value="admins">
            <Card><CardContent className="pt-6 text-center text-muted-foreground">Filtered view for Admins</CardContent></Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
