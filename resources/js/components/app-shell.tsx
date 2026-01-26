import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppShellProps {
    children: ReactNode;
    className?: string;
    variant?: 'sidebar' | 'default';
}

const AppShell = ({ children, className, variant = 'default' }: AppShellProps) => {
    return (
        <div className={cn(
            "min-h-screen bg-background",
            variant === 'sidebar' && "flex",
            className
        )}>
            {children}
        </div>
    );
};

export { AppShell };
export default AppShell;
