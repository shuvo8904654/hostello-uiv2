import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Flag, Trash2, CheckCheck } from "lucide-react";

export default function AdminModeration() {
  const flaggedReviews = [
    { id: 1, author: "John Doe", hostel: "Sunny Side Hostel", content: "This place is a scam! Do not stay here...", reason: "Spam/Fake Review", date: "2025-11-19" },
    { id: 2, author: "Jane Smith", hostel: "Green Wood Stay", content: "Call me for a good time at 555-0199...", reason: "Inappropriate Content", date: "2025-11-18" },
  ];

  return (
    <DashboardLayout type="admin">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Content Moderation</h2>
        <p className="text-muted-foreground">Review flagged content, moderate reviews, and manage listings.</p>
      </div>

      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="reviews">Flagged Reviews</TabsTrigger>
          <TabsTrigger value="listings">Flagged Listings</TabsTrigger>
          <TabsTrigger value="spam">Spam Detection</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Review Moderation Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flaggedReviews.map((review) => (
                  <div key={review.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <Flag className="h-3 w-3" /> {review.reason}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold mb-1">
                        {review.author} on {review.hostel}
                      </p>
                      <p className="text-sm bg-muted p-3 rounded-md italic">
                        "{review.content}"
                      </p>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm" className="text-muted-foreground">Ignore</Button>
                      <Button variant="destructive" size="sm" className="gap-2">
                        <Trash2 className="h-4 w-4" /> Remove Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="listings">
            <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                    No flagged listings at the moment.
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="spam">
            <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                    Spam detection system is active. 0 threats detected today.
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
