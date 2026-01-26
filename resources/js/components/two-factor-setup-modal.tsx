import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface TwoFactorSetupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (code: string) => void;
    qrCode?: string;
    recoveryCodes?: string[];
}

const TwoFactorSetupModal = ({
    isOpen,
    onClose,
    onConfirm,
    qrCode,
    recoveryCodes = [],
}: TwoFactorSetupModalProps) => {
    const [code, setCode] = useState('');
    const [showRecoveryCodes, setShowRecoveryCodes] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.trim()) {
            onConfirm(code);
            setCode('');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
                    <DialogDescription>
                        Scan the QR code below with your authenticator app and enter the verification code.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {qrCode && (
                        <div className="flex justify-center">
                            <div 
                                dangerouslySetInnerHTML={{ __html: qrCode }}
                                className="bg-white p-4 rounded-lg"
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="verification-code">Verification Code</Label>
                        <Input
                            id="verification-code"
                            type="text"
                            placeholder="Enter 6-digit code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            maxLength={6}
                            className="text-center text-lg tracking-widest"
                        />
                    </div>

                    {recoveryCodes.length > 0 && (
                        <div className="space-y-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setShowRecoveryCodes(!showRecoveryCodes)}
                                className="w-full"
                            >
                                {showRecoveryCodes ? 'Hide' : 'Show'} Recovery Codes
                            </Button>
                            
                            {showRecoveryCodes && (
                                <div className="p-3 bg-muted rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-2">
                                        Save these recovery codes in a safe place:
                                    </p>
                                    <div className="grid grid-cols-2 gap-1 text-xs font-mono">
                                        {recoveryCodes.map((code, index) => (
                                            <div key={index} className="p-1 bg-background rounded">
                                                {code}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSubmit}>
                        Verify and Enable
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default TwoFactorSetupModal;
