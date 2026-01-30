import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppContentProps {
    children: ReactNode;
    className?: string;
    variant?: 'sidebar' | 'default';
}

const AppContent = ({ children, className, variant = 'default' }: AppContentProps) => {
    return (
        <main className={cn(
            "flex-1 overflow-auto bg-background",
            variant === 'sidebar' && "min-w-0",
            className
        )}>
            <div className="h-full bg-background">
                {children}
            </div>
        </main>
    );
};

export { AppContent };
export default AppContent;
