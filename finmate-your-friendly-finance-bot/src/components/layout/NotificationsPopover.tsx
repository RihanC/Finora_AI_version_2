
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Check } from "lucide-react";

const mockNotifications = [
    { id: 1, title: "Budget Alert", message: "You've used 80% of your Food budget.", time: "2h ago", unread: true },
    { id: 2, title: "New Badge Unlocked", message: "You earned the 'Week Warrior' badge!", time: "5h ago", unread: true },
    { id: 3, title: "Expense Added", message: "Successfully logged ₹350 for Lunch.", time: "1d ago", unread: false },
    { id: 4, title: "Streak Saved", message: "You maintained your 7-day streak!", time: "1d ago", unread: false },
];

export function NotificationsPopover({ children }: { children: React.ReactNode }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h4 className="font-semibold">Notifications</h4>
                    <span className="text-xs text-muted-foreground">{mockNotifications.filter(n => n.unread).length} unread</span>
                </div>
                <ScrollArea className="h-[300px]">
                    <div className="divide-y divide-border">
                        {mockNotifications.map((notif) => (
                            <div key={notif.id} className={`p-4 hover:bg-muted/50 transition-colors ${notif.unread ? 'bg-accent/5' : ''}`}>
                                <div className="flex justify-between items-start mb-1">
                                    <h5 className={`text-sm ${notif.unread ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground'}`}>
                                        {notif.title}
                                    </h5>
                                    <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2">{notif.message}</p>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="p-2 border-t border-border bg-muted/20">
                    <button className="w-full text-xs text-center py-2 text-primary hover:underline">
                        Mark all as read
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
