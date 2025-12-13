
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useFinance } from "@/context/FinanceContext";
import { Group } from "@/types/finance";

interface AddExpenseDialogProps {
    children: React.ReactNode;
    group: Group;
}

export function AddExpenseDialog({ children, group }: AddExpenseDialogProps) {
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [paidBy, setPaidBy] = useState('You');
    const [splitBetween, setSplitBetween] = useState<string[]>(group.members);

    const { addGroupExpense } = useFinance();

    const handleToggleMember = (member: string) => {
        if (splitBetween.includes(member)) {
            setSplitBetween(splitBetween.filter(m => m !== member));
        } else {
            setSplitBetween([...splitBetween, member]);
        }
    };

    const handleAdd = () => {
        if (description && amount && splitBetween.length > 0) {
            addGroupExpense(group.id, {
                description,
                amount: parseFloat(amount),
                paidBy,
                splitBetween,
                date: new Date().toISOString().split('T')[0]
            });
            setOpen(false);
            setDescription('');
            setAmount('');
            setPaidBy('You');
            setSplitBetween(group.members);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Expense</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g. Dinner"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Amount</label>
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Paid By</label>
                        <Select value={paidBy} onValueChange={setPaidBy}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {group.members.map(member => (
                                    <SelectItem key={member} value={member}>{member}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Split Between</label>
                        <div className="grid grid-cols-2 gap-2">
                            {group.members.map(member => (
                                <div key={member} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`split-${member}`}
                                        checked={splitBetween.includes(member)}
                                        onCheckedChange={() => handleToggleMember(member)}
                                    />
                                    <label
                                        htmlFor={`split-${member}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {member}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAdd} disabled={!description || !amount || splitBetween.length === 0}>Add Expense</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
