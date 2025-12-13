
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFinance } from "@/context/FinanceContext";
import { Moon, Sun, Monitor, Trash2 } from "lucide-react";

export function SettingsDialog({ children }: { children: React.ReactNode }) {
    const { user, updateUser } = useFinance();

    const handleClearData = () => {
        if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-6">

                    {/* Appearance */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-muted-foreground">Appearance</h3>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="theme">Theme</Label>
                            <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
                                <button
                                    onClick={() => updateUser({ theme: 'light' })}
                                    className={`p-1.5 rounded-md transition-colors ${user.theme === 'light' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}`}
                                >
                                    <Sun className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => updateUser({ theme: 'system' })}
                                    className={`p-1.5 rounded-md transition-colors ${user.theme === 'system' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}`}
                                >
                                    <Monitor className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => updateUser({ theme: 'dark' })}
                                    className={`p-1.5 rounded-md transition-colors ${user.theme === 'dark' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}`}
                                >
                                    <Moon className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-muted-foreground">Preferences</h3>
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="currency">Currency</Label>
                                <Select
                                    value={user.currency}
                                    onValueChange={(val) => updateUser({ currency: val })}
                                >
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="INR">INR (₹)</SelectItem>
                                        <SelectItem value="USD">USD ($)</SelectItem>
                                        <SelectItem value="EUR">EUR (€)</SelectItem>
                                        <SelectItem value="GBP">GBP (£)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="notifications">Notifications</Label>
                                <Switch
                                    id="notifications"
                                    checked={user.notificationsEnabled}
                                    onCheckedChange={(checked) => updateUser({ notificationsEnabled: checked })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="space-y-3 pt-4 border-t border-border">
                        <h3 className="text-sm font-medium text-destructive">Danger Zone</h3>
                        <Button variant="destructive" className="w-full" onClick={handleClearData}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Reset All Data
                        </Button>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
}
