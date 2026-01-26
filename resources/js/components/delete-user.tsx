import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Trash2, AlertTriangle } from 'lucide-react';

interface DeleteUserProps {
    onDelete: () => void;
    disabled?: boolean;
    trigger?: React.ReactNode;
}

const DeleteUser = ({ onDelete, disabled = false, trigger }: DeleteUserProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete();
            setIsOpen(false);
        } finally {
            setIsDeleting(false);
        }
    };

    const defaultTrigger = (
        <Button variant="destructive" size="sm" disabled={disabled}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
        </Button>
    );

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger || defaultTrigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="w-5 h-5" />
                        Delete Account
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete your account? This action cannot be undone and will permanently delete:
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 py-4">
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                        <h4 className="font-semibold text-destructive mb-2">This will permanently delete:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Your profile information</li>
                            <li>• Your game preferences and settings</li>
                            <li>• Your play history and statistics</li>
                            <li>• Any saved games or progress</li>
                        </ul>
                    </div>

                    <div className="bg-muted rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Before you delete:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Download any important data</li>
                            <li>• Cancel any active subscriptions</li>
                            <li>• Remove any connected accounts</li>
                        </ul>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete Account'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteUser;
