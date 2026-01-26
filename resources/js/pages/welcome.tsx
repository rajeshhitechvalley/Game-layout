import { Head } from '@inertiajs/react';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryPills from "@/components/CategoryPills";
import GameGrid from "@/components/GameGrid";
import Footer from "@/components/Footer";
import type { Game } from '@/types';

interface WelcomeProps {
    featuredGame?: Game;
    trendingGames: Game[];
    newGames: Game[];
    actionGames: Game[];
}

const Index = ({ featuredGame, trendingGames, newGames, actionGames }: WelcomeProps) => {
    return (
        <>
            <Head title="Home" />
            <div className="min-h-screen bg-background">
                <Header />
                <main>
                    {featuredGame && <HeroSection game={featuredGame} />}
                    <CategoryPills />
                    {trendingGames.length > 0 && <GameGrid title="Trending Now" games={trendingGames} icon="🔥" />}
                    {newGames.length > 0 && <GameGrid title="New Games" games={newGames} icon="✨" />}
                    {actionGames.length > 0 && <GameGrid title="Action & Adventure" games={actionGames} icon="⚔️" />}
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Index;
