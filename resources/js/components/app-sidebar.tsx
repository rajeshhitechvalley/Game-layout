import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    Home, 
    Gamepad2, 
    Users, 
    Settings, 
    LogOut, 
    Menu, 
    X,
    Shield,
    BarChart3,
    Trophy,
    Heart,
    Star,
    Clock,
    TrendingUp,
    Target,
    Bookmark,
    MessageSquare,
    Bell,
    HelpCircle,
    ChevronDown,
    ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
    className?: string;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
}

const AppSidebar = ({ className, isOpen: propIsOpen, setIsOpen: propSetIsOpen }: AppSidebarProps) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState<string[]>(['games', 'social']);
    const { auth } = usePage().props as any;

    // Use external state if provided, otherwise use internal state
    const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;
    const setIsOpen = propSetIsOpen || setInternalIsOpen;

    const toggleSection = (section: string) => {
        setExpandedSections(prev => 
            prev.includes(section) 
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { 
            name: 'Games', 
            icon: Gamepad2,
            children: [
                { name: 'All Games', href: '/games', icon: Gamepad2 },
                { name: 'Featured', href: '/games?featured=true', icon: Star },
                { name: 'Recent', href: '/games?recent=true', icon: Clock },
                { name: 'Popular', href: '/games?popular=true', icon: TrendingUp },
                { name: 'Categories', href: '/games/categories', icon: Target },
            ]
        },
        { 
            name: 'Social', 
            icon: Users,
            children: [
                { name: 'Friends', href: '/friends', icon: Users },
                { name: 'Messages', href: '/messages', icon: MessageSquare },
                { name: 'Activity Feed', href: '/activity', icon: Bell },
                { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
            ]
        },
        { name: 'My Profile', href: '/profile', icon: Shield },
        { name: 'Achievements', href: '/achievements', icon: Trophy },
        { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
        { name: 'Favorites', href: '/favorites', icon: Heart },
    ];

    // Admin navigation items
    const adminNavigation = [
        { name: 'Manage Games', href: '/admin/games', icon: Gamepad2 },
        { name: 'Manage Users', href: '/admin/users', icon: Users },
    ];

    const settings = [
        { name: 'Settings', href: '/settings', icon: Settings },
        { name: 'Help & Support', href: '/help', icon: HelpCircle },
    ];

    const filteredNavigation = navigation.map(item => {
        if (item.name === 'Admin' && !auth?.user?.is_admin) {
            return null;
        }
        return item;
    }).filter(Boolean);

    const renderNavItem = (item: any, level: number = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedSections.includes(item.name);

        if (hasChildren) {
            return (
                <div key={item.name} className="space-y-1">
                    <button
                        onClick={() => toggleSection(item.name)}
                        className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                            "hover:bg-muted hover:text-foreground",
                            "text-muted-foreground",
                            level > 0 && "pl-6"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        <span className="flex-1 text-left">{item.name}</span>
                        {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </button>
                    {isExpanded && (
                        <div className="space-y-1">
                            {item.children.map((child: any) => renderNavItem(child, level + 1))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Link
                key={item.name}
                href={item.href}
                className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    "hover:bg-muted hover:text-foreground",
                    "text-muted-foreground",
                    level > 0 && "pl-6"
                )}
                onClick={() => setIsOpen(false)}
            >
                <item.icon className="h-4 w-4" />
                {item.name}
            </Link>
        );
    };

    return (
        <>
            {/* Sidebar */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
                isOpen ? "translate-x-0" : "-translate-x-full",
                className
            )}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-border">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg gradient-bg-primary flex items-center justify-center">
                                <Gamepad2 className="w-5 h-5 text-background" />
                            </div>
                            <span className="text-xl font-bold gradient-text">PlayZone</span>
                        </Link>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="lg:hidden"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Quick Stats */}
                    <div className="p-4 border-b border-border">
                        <div className="grid grid-cols-2 gap-2 text-center">
                            <div className="bg-muted/50 rounded-lg p-2">
                                <div className="text-lg font-bold text-gaming-orange">5</div>
                                <div className="text-xs text-muted-foreground">Level</div>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-2">
                                <div className="text-lg font-bold text-gaming-green">12</div>
                                <div className="text-xs text-muted-foreground">Games</div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
                        <div className="space-y-2">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Main
                            </h3>
                            {filteredNavigation.map((item) => renderNavItem(item))}
                        </div>

                        {/* Admin Section - Only show for admin users */}
                        {auth?.user?.is_admin && (
                            <div className="space-y-2">
                                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Admin
                                </h3>
                                {adminNavigation.map((item) => renderNavItem(item))}
                            </div>
                        )}

                        <div className="space-y-2">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Settings
                            </h3>
                            {settings.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                        "hover:bg-muted hover:text-foreground",
                                        "text-muted-foreground"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* User Section */}
                    <div className="p-4 border-t border-border">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full gradient-bg-primary flex items-center justify-center">
                                <span className="text-background text-sm font-bold">
                                    {auth?.user?.name?.charAt(0)?.toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                    {auth?.user?.name}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {auth?.user?.email}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                    <div className="w-full bg-muted rounded-full h-1">
                                        <div className="bg-gaming-orange h-1 rounded-full" style={{ width: '65%' }}></div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">65%</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-1 mb-3">
                            <button className="p-2 rounded hover:bg-muted transition-colors text-center">
                                <Trophy className="w-4 h-4 mx-auto mb-1 text-gaming-orange" />
                                <span className="text-xs">12</span>
                            </button>
                            <button className="p-2 rounded hover:bg-muted transition-colors text-center">
                                <Heart className="w-4 h-4 mx-auto mb-1 text-red-500" />
                                <span className="text-xs">8</span>
                            </button>
                            <button className="p-2 rounded hover:bg-muted transition-colors text-center">
                                <Star className="w-4 h-4 mx-auto mb-1 text-gaming-yellow" />
                                <span className="text-xs">4.8</span>
                            </button>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export { AppSidebar };
export default AppSidebar;
