import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Upload, FileSpreadsheet } from "lucide-react";

export default function AdminData() {
  return (
    <DashboardLayout type="admin">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Data Management</h2>
        <p className="text-muted-foreground">Export data, manage backups, and handle KYC documents.</p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader>
                <CardTitle>Export Data</CardTitle>
                <CardDescription>Download platform data in CSV/JSON formats.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center gap-2"><FileSpreadsheet className="h-4 w-4" /> Users Database</span>
                    <Download className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center gap-2"><FileSpreadsheet className="h-4 w-4" /> Booking History</span>
                    <Download className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center gap-2"><FileSpreadsheet className="h-4 w-4" /> Financial Records</span>
                    <Download className="h-4 w-4 text-muted-foreground" />
                </Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Data Cleanup</CardTitle>
                <CardDescription>Remove old logs and temporary files.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-lg space-y-2">
                    <h4 className="font-medium text-sm">System Logs</h4>
                    <p className="text-xs text-muted-foreground">2.4 GB • Last cleaned 30 days ago</p>
                    <Button size="sm" variant="destructive" className="w-full mt-2">
                        <Trash2 className="h-4 w-4 mr-2" /> Clean Old Logs
                    </Button>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>KYC Management</CardTitle>
                <CardDescription>Securely manage and export identity documents.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button variant="secondary" className="w-full gap-2">
                    <Download className="h-4 w-4" /> Export KYC Report
                </Button>
                <Button variant="outline" className="w-full gap-2">
                    <Upload className="h-4 w-4" /> Bulk Upload Docs
                </Button>
            </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
