import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Search, UserCheck, UserMinus, Shield, Clock } from "lucide-react";

const entryLogs = [
  { id: 1, name: "Rahim Ahmed", room: "101", type: "Entry", time: "08:30 PM", date: "Today", status: "On Time" },
  { id: 2, name: "Karim Uddin", room: "205", type: "Exit", time: "09:00 AM", date: "Today", status: "Normal" },
  { id: 3, name: "Sujon Khan", room: "302", type: "Entry", time: "11:45 PM", date: "Today", status: "Late Entry" },
  { id: 4, name: "Visitor: Mr. Kamal", host: "Rahim Ahmed (101)", type: "Entry", time: "05:00 PM", date: "Today", status: "Approved" },
];

const gatePasses = [
  { id: "GP-001", student: "Fatima Begum", room: "Girls-201", reason: "Going home for weekend", validFrom: "2023-11-24", validTo: "2023-11-26", status: "Active" },
  { id: "GP-002", student: "Nasrin Akter", room: "Girls-105", reason: "Medical appointment", validFrom: "2023-11-20", validTo: "2023-11-20", status: "Expired" },
];

export default function OwnerAttendance() {
  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Attendance & Security</h2>
          <p className="text-muted-foreground">Monitor entry logs, visitor access, and gate passes.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><CalendarIcon className="mr-2 h-4 w-4" /> View Calendar</Button>
          <Button><Shield className="mr-2 h-4 w-4" /> Create Gate Pass</Button>
        </div>
      </div>

      <Tabs defaultValue="logs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="logs">Entry/Exit Logs</TabsTrigger>
          <TabsTrigger value="gate-pass">Gate Passes</TabsTrigger>
          <TabsTrigger value="visitors">Visitor Log</TabsTrigger>
          <TabsTrigger value="night-out">Night Out Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Daily Logs</CardTitle>
                <div className="relative w-64">
                   <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                   <Input placeholder="Search student..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entryLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="font-medium">{log.name}</div>
                        <div className="text-xs text-muted-foreground">{log.room || log.host}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={log.type === "Entry" ? "bg-green-50 text-green-700 border-green-200" : "bg-blue-50 text-blue-700 border-blue-200"}>
                          {log.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.time}</TableCell>
                      <TableCell>
                        <span className={log.status === "Late Entry" ? "text-red-600 font-medium" : "text-muted-foreground"}>
                          {log.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gate-pass">
          <Card>
            <CardHeader>
              <CardTitle>Active Gate Passes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pass ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Validity</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gatePasses.map((pass) => (
                    <TableRow key={pass.id}>
                      <TableCell className="font-medium">{pass.id}</TableCell>
                      <TableCell>
                        <div>{pass.student}</div>
                        <div className="text-xs text-muted-foreground">{pass.room}</div>
                      </TableCell>
                      <TableCell>{pass.reason}</TableCell>
                      <TableCell>{pass.validFrom} to {pass.validTo}</TableCell>
                      <TableCell>
                        <Badge variant={pass.status === "Active" ? "default" : "secondary"}>{pass.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
