import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, UserPlus, Heart, Shield, Coffee, BookOpen, Moon } from "lucide-react";

const ROOMMATES = [
  { 
    id: 'r1', 
    name: 'Karim Hassan', 
    age: 21, 
    university: 'NSU', 
    dept: 'CSE',
    match: 95, 
    image: '', 
    interests: ['Coding', 'Gaming', 'Late Night Study'],
    habits: { smoking: false, guests: false, sleep: 'Night Owl' },
    bio: "CSE student looking for a quiet roommate who also studies late. I'm clean and respect privacy."
  },
  { 
    id: 'r2', 
    name: 'Tanvir Rahman', 
    age: 22, 
    university: 'IUB', 
    dept: 'BBA',
    match: 82, 
    image: '', 
    interests: ['Music', 'Football', 'Cooking'],
    habits: { smoking: false, guests: true, sleep: 'Early Riser' },
    bio: "Chill guy, love cooking on weekends. Looking for someone friendly to share a flat in Bashundhara."
  },
  { 
    id: 'r3', 
    name: 'Sajib Ahmed', 
    age: 20, 
    university: 'AIUB', 
    dept: 'EEE',
    match: 75, 
    image: '', 
    interests: ['Photography', 'Traveling'],
    habits: { smoking: true, guests: true, sleep: 'Random' },
    bio: "Easy going. I travel a lot on weekends."
  }
];

export default function RoommateFinder() {
  return (
    <DashboardLayout type="tenant">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Roommate Finder</h2>
          <p className="text-muted-foreground">Find your perfect match based on lifestyle and interests.</p>
        </div>
        <Button variant="outline">Update My Profile</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Your Match Profile</CardTitle>
            <CardDescription>How others see you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl">ME</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-xl">Rahim Ahmed</h3>
              <p className="text-muted-foreground">North South University • CSE</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Profile Completeness</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">My Habits</h4>
                <div className="flex flex-wrap gap-2">
                   <Badge variant="secondary" className="font-normal"><Shield className="h-3 w-3 mr-1"/> Non-Smoker</Badge>
                   <Badge variant="secondary" className="font-normal"><Moon className="h-3 w-3 mr-1"/> Night Owl</Badge>
                   <Badge variant="secondary" className="font-normal"><BookOpen className="h-3 w-3 mr-1"/> Studious</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Matches */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="suggested">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="suggested">Suggested Matches</TabsTrigger>
              <TabsTrigger value="requests">Requests (2)</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            
            <TabsContent value="suggested" className="space-y-4 mt-4">
              {ROOMMATES.map(person => (
                <Card key={person.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <Avatar className="h-20 w-20">
                         <AvatarFallback>{person.name[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg flex items-center gap-2">
                              {person.name} 
                              <Badge className="bg-green-600/10 text-green-600 hover:bg-green-600/20 border-0">{person.match}% Match</Badge>
                            </h3>
                            <p className="text-sm text-muted-foreground">{person.university} • {person.dept} • {person.age} y/o</p>
                          </div>
                          <Button variant="ghost" size="icon"><Heart className="h-5 w-5 text-muted-foreground hover:text-red-500" /></Button>
                        </div>
                        
                        <p className="text-sm mt-2 mb-4">{person.bio}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {person.interests.map(i => (
                            <Badge key={i} variant="outline" className="text-xs">{i}</Badge>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          <Button className="flex-1" size="sm"><UserPlus className="h-4 w-4 mr-2" /> Connect</Button>
                          <Button variant="outline" className="flex-1" size="sm"><MessageSquare className="h-4 w-4 mr-2" /> Message</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}
