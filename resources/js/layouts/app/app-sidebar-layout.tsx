import { useState } from 'react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import Notifications from '@/components/Notifications';
import Toaster from '@/components/Toaster';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <AppShell variant="sidebar">
            <AppSidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
            <AppContent variant="sidebar" className="flex-1 overflow-x-hidden">
                <AppSidebarHeader 
                    breadcrumbs={breadcrumbs} 
                    onMobileMenuToggle={toggleMobileMenu}
                    isMobileMenuOpen={isMobileMenuOpen}
                />
                <div className="container mx-auto px-4 py-6">
                    {children}
                </div>
            </AppContent>
            <Notifications />
            <Toaster />
        </AppShell>
    );
}
