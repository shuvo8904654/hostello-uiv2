import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, ThumbsUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const REVIEWS = [
  { id: 1, user: "Rahim Ahmed", rating: 5, comment: "Great hostel! Clean and quiet.", date: "2 days ago", status: "Published" },
  { id: 2, user: "Fatima Khan", rating: 4, comment: "Good facilities but WiFi is sometimes slow.", date: "1 week ago", status: "Published" },
  { id: 3, user: "Anonymous", rating: 2, comment: "Water issue in bathroom.", date: "2 weeks ago", status: "Flagged" },
];

export default function OwnerReviews() {
  const { toast } = useToast();

  const handleReply = () => {
    toast({
      title: "Reply Posted",
      description: "Your response has been published.",
    });
  };

  return (
    <DashboardLayout type="owner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
          <p className="text-muted-foreground">Manage and respond to tenant reviews.</p>
        </div>
      </div>

      <div className="space-y-4">
         {REVIEWS.map(review => (
            <Card key={review.id}>
               <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                     <div>
                        <div className="flex items-center gap-2 mb-2">
                           <div className="font-bold">{review.user}</div>
                           <Badge variant="outline" className="text-xs">{review.date}</Badge>
                           {review.status === 'Flagged' && <Badge variant="destructive">Flagged</Badge>}
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                           {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                           ))}
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                     </div>
                     <div className="flex items-start gap-2">
                        <Dialog>
                           <DialogTrigger asChild>
                              <Button variant="outline" size="sm"><MessageSquare className="h-4 w-4 mr-2"/> Reply</Button>
                           </DialogTrigger>
                           <DialogContent>
                              <DialogHeader>
                                 <DialogTitle>Reply to Review</DialogTitle>
                                 <DialogDescription>Posting as Owner. Your reply will be public.</DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                 <div className="bg-muted p-3 rounded-md mb-4 text-sm text-muted-foreground italic">
                                    "{review.comment}"
                                 </div>
                                 <Textarea placeholder="Write your response..." />
                              </div>
                              <DialogFooter>
                                 <Button onClick={handleReply}>Post Reply</Button>
                              </DialogFooter>
                           </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm"><ThumbsUp className="h-4 w-4 mr-2"/> Helpful</Button>
                     </div>
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>
    </DashboardLayout>
  );
}
