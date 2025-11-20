import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, UserPlus, Heart, Shield, Coffee, BookOpen, Moon, Edit, Save } from "lucide-react";
import { useState } from "react";

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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  return (
    <DashboardLayout type="tenant">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Roommate Finder</h2>
          <p className="text-muted-foreground">Find your perfect match based on lifestyle and interests.</p>
        </div>
        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogTrigger asChild>
            <Button variant="outline"><Edit className="w-4 h-4 mr-2" /> Update Match Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Your Roommate Profile</DialogTitle>
              <DialogDescription>
                Update your preferences and bio to get better roommate matches.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Input id="university" defaultValue="North South University" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dept">Department</Label>
                  <Input id="dept" defaultValue="CSE" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Sleep Schedule</Label>
                <Select defaultValue="night">
                  <SelectTrigger>
                    <SelectValue placeholder="Select sleep schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="early">Early Riser (Up before 7AM)</SelectItem>
                    <SelectItem value="normal">Normal (Up around 8-9AM)</SelectItem>
                    <SelectItem value="night">Night Owl (Up late, sleep late)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Smoking Habit</Label>
                  <Select defaultValue="no">
                    <SelectTrigger>
                      <SelectValue placeholder="Select habit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">Non-Smoker</SelectItem>
                      <SelectItem value="yes">Smoker</SelectItem>
                      <SelectItem value="outside">Outside Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Guest Preference</Label>
                  <Select defaultValue="rarely">
                    <SelectTrigger>
                      <SelectValue placeholder="Select preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">No Guests</SelectItem>
                      <SelectItem value="rarely">Rarely</SelectItem>
                      <SelectItem value="weekend">Weekends Only</SelectItem>
                      <SelectItem value="anytime">Anytime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Interests (Comma separated)</Label>
                <Input id="interests" defaultValue="Coding, Gaming, Movies, Tech" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  className="h-24" 
                  defaultValue="I'm a CSE student looking for a quiet place to study. I'm generally clean and keep to myself, but enjoy a good movie night occasionally." 
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsProfileOpen(false)}>
                <Save className="w-4 h-4 mr-2" /> Save Profile
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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

              <div className="pt-2">
                <h4 className="font-medium text-sm mb-2">Bio</h4>
                <p className="text-sm text-muted-foreground italic">
                  "I'm a CSE student looking for a quiet place to study. I'm generally clean and keep to myself..."
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
             <Button variant="outline" className="w-full" onClick={() => setIsProfileOpen(true)}>
                Edit Details
             </Button>
          </CardFooter>
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
