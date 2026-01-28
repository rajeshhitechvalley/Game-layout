import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Menu, Bell, User, ChevronRight, X } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface BreadcrumbItem {
    title: string;
    href: string;
}

interface AppSidebarHeaderProps {
    children?: ReactNode;
    className?: string;
    breadcrumbs?: BreadcrumbItem[];
    onMobileMenuToggle?: () => void;
    isMobileMenuOpen?: boolean;
}

const AppSidebarHeader = ({ 
    children, 
    className, 
    breadcrumbs = [], 
    onMobileMenuToggle,
    isMobileMenuOpen = false 
}: AppSidebarHeaderProps) => {
    const { auth } = usePage().props as any;

    return (
        <header className={cn(
            "sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            className
        )}>
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Left side - Mobile menu trigger and breadcrumb */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex lg:hidden"
                            onClick={onMobileMenuToggle}
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                        
                        {/* Breadcrumbs */}
                        {breadcrumbs.length > 0 && (
                            <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
                                {breadcrumbs.map((breadcrumb, index) => (
                                    <div key={breadcrumb.href} className="flex items-center">
                                        {index > 0 && (
                                            <ChevronRight className="h-4 w-4 mx-1" />
                                        )}
                                        <Link
                                            href={breadcrumb.href}
                                            className={cn(
                                                "hover:text-foreground transition-colors",
                                                index === breadcrumbs.length - 1 && "text-foreground font-medium"
                                            )}
                                        >
                                            {breadcrumb.title}
                                        </Link>
                                    </div>
                                ))}
                            </nav>
                        )}
                        
                        {children}
                    </div>

                    {/* Right side - Notifications and user menu */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                            <Bell className="h-4 w-4" />
                        </Button>
                        
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full gradient-bg-primary flex items-center justify-center">
                                <User className="h-4 w-4 text-background" />
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-medium">{auth?.user?.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {auth?.user?.is_admin ? 'Administrator' : 'User'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export { AppSidebarHeader };
export default AppSidebarHeader;
