import { Head } from '@inertiajs/react';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryPills from "@/components/CategoryPills";
import GameGrid from "@/components/GameGrid";
import Footer from "@/components/Footer";
import Notifications from "@/components/Notifications";
import Toaster from "@/components/Toaster";
import type { Game } from '@/types';

interface WelcomeProps {
    featuredGame?: Game;
    trendingGames: Game[];
    newGames: Game[];
    actionGames: Game[];
}

const Index = ({ featuredGame, trendingGames, newGames, actionGames }: WelcomeProps) => {
    const handleCategoryChange = (category: string) => {
        // Navigate to games page with category filter
        window.location.href = category === 'all' ? '/games' : `/games?category=${category}`;
    };

    return (
        <>
            <Head title="Home" />
            <div className="min-h-screen bg-background">
                <Header />
                <main>
                    {featuredGame && <HeroSection game={featuredGame} />}
                    <CategoryPills onCategoryChange={handleCategoryChange} />
                    {trendingGames.length > 0 && <GameGrid title="Trending Now" games={trendingGames} icon="🔥" />}
                    {newGames.length > 0 && <GameGrid title="New Games" games={newGames} icon="✨" />}
                    {actionGames.length > 0 && <GameGrid title="Action & Adventure" games={actionGames} icon="⚔️" />}
                </main>
                <Footer />
            </div>
            <Notifications />
            <Toaster />
        </>
    );
};

export default Index;
