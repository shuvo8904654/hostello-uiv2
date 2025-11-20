import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, ThumbsUp, Flag } from "lucide-react";

const REVIEWS = [
  { id: 1, user: "Tanvir Hasan", rating: 5, date: "2 days ago", comment: "Amazing place! The WiFi is super fast and the study room is very quiet.", helpful: 12 },
  { id: 2, user: "Sadia Rahman", rating: 4, date: "1 week ago", comment: "Great security and clean environment. Just wish the kitchen was a bit bigger.", helpful: 5 },
  { id: 3, user: "Karim Ullah", rating: 5, date: "2 weeks ago", comment: "Best hostel in Bashundhara area for this price.", helpful: 8 },
];

export default function ManagerReviews() {
  return (
    <DashboardLayout type="manager">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reviews & Feedback</h2>
          <p className="text-muted-foreground">See what tenants are saying about Dhaka Hub.</p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mb-8">
         <Card className="lg:col-span-1">
            <CardHeader>
               <CardTitle>Rating Overview</CardTitle>
               <CardDescription>Overall tenant satisfaction.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
               <div className="text-5xl font-bold mb-2">4.8</div>
               <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
               </div>
               <p className="text-sm text-muted-foreground">Based on 124 reviews</p>
            </CardContent>
         </Card>
         
         <Card className="lg:col-span-2">
            <CardHeader>
               <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               {REVIEWS.map(review => (
                  <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                     <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                              {review.user.split(' ').map(n => n[0]).join('')}
                           </div>
                           <div>
                              <h4 className="font-semibold">{review.user}</h4>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                           </div>
                        </div>
                        <div className="flex gap-1">
                           {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                        </div>
                     </div>
                     <p className="text-sm text-foreground/90 mb-3">{review.comment}</p>
                     <div className="flex gap-4">
                        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground"><ThumbsUp className="mr-2 h-3 w-3"/> Helpful ({review.helpful})</Button>
                        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground"><MessageSquare className="mr-2 h-3 w-3"/> Reply</Button>
                        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground ml-auto"><Flag className="mr-2 h-3 w-3"/> Report</Button>
                     </div>
                  </div>
               ))}
            </CardContent>
         </Card>
      </div>
    </DashboardLayout>
  );
}
