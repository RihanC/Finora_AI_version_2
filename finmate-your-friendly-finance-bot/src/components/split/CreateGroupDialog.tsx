
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";

export function CreateGroupDialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [newMember, setNewMember] = useState('');
    const [members, setMembers] = useState<string[]>(['You']);
    const { createGroup } = useFinance();

    const handleAddMember = () => {
        if (newMember.trim()) {
            setMembers([...members, newMember.trim()]);
            setNewMember('');
        }
    };

    const handleRemoveMember = (index: number) => {
        setMembers(members.filter((_, i) => i !== index));
    };

    const handleCreate = () => {
        if (name.trim() && members.length > 1) {
            createGroup(name, members);
            setOpen(false);
            setName('');
            setMembers(['You']);
            setNewMember('');
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Group</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Group Name</label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Goa Trip"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Add Members</label>
                        <div className="flex gap-2">
                            <Input
                                value={newMember}
                                onChange={(e) => setNewMember(e.target.value)}
                                placeholder="Member name"
                                onKeyDown={(e) => e.key === 'Enter' && handleAddMember()}
                            />
                            <Button type="button" onClick={handleAddMember} size="icon">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {members.map((member, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md text-sm"
                            >
                                <span>{member}</span>
                                {member !== 'You' && (
                                    <button
                                        onClick={() => handleRemoveMember(index)}
                                        className="text-muted-foreground hover:text-destructive"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreate} disabled={!name.trim() || members.length < 2}>Create Group</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
