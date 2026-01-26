import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Eye, EyeOff } from 'lucide-react';

interface TwoFactorRecoveryCodesProps {
    codes: string[];
    onRegenerate?: () => void;
    showRegenerateButton?: boolean;
}

const TwoFactorRecoveryCodes = ({
    codes,
    onRegenerate,
    showRegenerateButton = false,
}: TwoFactorRecoveryCodesProps) => {
    const [showCodes, setShowCodes] = useState(false);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        const text = codes.join('\n');
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recovery Codes</h3>
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCodes(!showCodes)}
                    >
                        {showCodes ? (
                            <>
                                <EyeOff className="w-4 h-4 mr-2" />
                                Hide
                            </>
                        ) : (
                            <>
                                <Eye className="w-4 h-4 mr-2" />
                                Show
                            </>
                        )}
                    </Button>
                    
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                    >
                        <Copy className="w-4 h-4 mr-2" />
                        {copied ? 'Copied!' : 'Copy'}
                    </Button>

                    {showRegenerateButton && onRegenerate && (
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={onRegenerate}
                        >
                            Regenerate
                        </Button>
                    )}
                </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-3">
                    Save these recovery codes in a secure location. You can use them to access your account if you lose access to your authenticator device.
                </p>

                {showCodes ? (
                    <div className="grid grid-cols-2 gap-2">
                        {codes.map((code, index) => (
                            <div
                                key={index}
                                className="p-2 bg-background border rounded font-mono text-sm text-center"
                            >
                                {code}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Click "Show" to display recovery codes</p>
                    </div>
                )}
            </div>

            <div className="text-xs text-muted-foreground">
                <strong>Important:</strong> Store these codes safely. Each code can only be used once.
            </div>
        </div>
    );
};

export default TwoFactorRecoveryCodes;
