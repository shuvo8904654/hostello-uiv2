import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MESSAGES } from "@/lib/mockData";
import { Search, Send } from "lucide-react";
import { useLocation } from "wouter";

export default function MessagesPage() {
  const [location] = useLocation();
  const type = location.includes('tenant') ? 'tenant' : location.includes('owner') ? 'owner' : 'admin';
  
  return (
    <DashboardLayout type={type}>
      <div className="h-[calc(100vh-8rem)] grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contacts List */}
        <Card className="md:col-span-1 flex flex-col h-full">
          <CardHeader className="pb-4">
            <CardTitle className="mb-4">Messages</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-9" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex flex-col">
                {MESSAGES.map((msg) => (
                  <button 
                    key={msg.id}
                    className={`flex items-start gap-3 p-4 text-left hover:bg-muted/50 transition-colors border-b ${msg.unread ? 'bg-primary/5' : ''}`}
                  >
                    <Avatar>
                      <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className={`font-medium truncate ${msg.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {msg.sender}
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{msg.time}</span>
                      </div>
                      <p className={`text-sm truncate ${msg.unread ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                        {msg.preview}
                      </p>
                    </div>
                    {msg.unread && (
                      <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2 flex flex-col h-full hidden md:flex">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>HM</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">The Hub Manager</div>
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-green-600 rounded-full"></span>
                  Online
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <span className="sr-only">More options</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>HM</AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-sm">Hi Alex, thanks for your booking! We're excited to have you.</p>
                  <span className="text-[10px] text-muted-foreground mt-1 block">10:30 AM</span>
                </div>
              </div>
              
              <div className="flex gap-3 flex-row-reverse">
                <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div className="bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none max-w-[80%]">
                  <p className="text-sm">Thanks! Just wanted to confirm if bedding is provided?</p>
                  <span className="text-[10px] text-primary-foreground/70 mt-1 block">10:32 AM</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>HM</AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-sm">Yes, we provide a starter bedding pack. You can also rent premium linen if you prefer.</p>
                  <span className="text-[10px] text-muted-foreground mt-1 block">10:35 AM</span>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="p-4 border-t mt-auto">
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Type a message..." className="flex-1" />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
