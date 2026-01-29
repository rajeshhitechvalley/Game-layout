import { Head } from '@inertiajs/react';
import { Link, usePage } from '@inertiajs/react';
import Header from "@/components/Header";
import CategoryPills from "@/components/CategoryPills";
import GameGrid from "@/components/GameGrid";
import Footer from "@/components/Footer";
import Notifications from "@/components/Notifications";
import Toaster from "@/components/Toaster";
import type { Game } from '@/types';
import { CATEGORIES } from '@/constants/categories';

interface GamesIndexProps {
    games: {
        data: Game[];
        links: any;
        meta: any;
    };
    sort?: string;
    category?: string;
}

export default function GamesIndex({ games, sort, category }: GamesIndexProps) {
    const getTitle = () => {
        if (category) {
            const cat = CATEGORIES.find(c => c.slug === category);
            return cat ? cat.name : 'All Games';
        }
        
        switch(sort) {
            case 'trending':
                return 'Trending Games';
            case 'new':
                return 'New Games';
            case 'featured':
                return 'Featured Games';
            default:
                return 'All Games';
        }
    };

    const getIcon = () => {
        if (category) {
            const cat = CATEGORIES.find(c => c.slug === category);
            return cat ? cat.icon : '🎮';
        }
        
        switch(sort) {
            case 'trending':
                return '🔥';
            case 'new':
                return '✨';
            case 'featured':
                return '⭐';
            default:
                return '🎮';
        }
    };

    return (
        <>
            <Head title="Games" />
            <div className="min-h-screen bg-background">
                <Header />
                <main>
                    <CategoryPills currentCategory={category} currentSort={sort} />
                    <GameGrid title={getTitle()} games={games.data} icon={getIcon()} />
                </main>
                <Footer />
            </div>
            <Notifications />
            <Toaster />
        </>
    );
}
