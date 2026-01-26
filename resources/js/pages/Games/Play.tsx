import { Head, Link } from '@inertiajs/react';
import type { Game } from '@/types';

interface GamePlayProps {
    game: Game;
}

export default function GamePlay({ game }: GamePlayProps) {
    if (!game.game_url) {
        return (
            <>
                <Head title={`Play ${game.title}`} />
                <div className="min-h-screen bg-background">
                    <div className="container mx-auto px-4 py-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold gradient-text mb-4">
                                {game.title}
                            </h1>
                            <p className="text-muted-foreground mb-8">
                                This game is not available to play online.
                            </p>
                            <Link
                                href="/games"
                                className="play-button"
                            >
                                ← Back to Games
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title={`Play ${game.title}`} />
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold gradient-text">
                                {game.title}
                            </h1>
                            <p className="text-muted-foreground">
                                {game.category} • {game.rating} ⭐ • {game.players}
                            </p>
                        </div>
                        <Link
                            href="/games"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            ← Back to Games
                        </Link>
                    </div>

                    {/* Category Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Category:</span>
                            <span className="px-3 py-1 bg-gaming-orange/20 text-gaming-orange font-bold rounded-full">
                                {game.category}
                            </span>
                        </div>
                    </div>

                    <div className="bg-card rounded-xl overflow-hidden shadow-xl">
                        <div className="aspect-video">
                            <iframe
                                src={game.game_url}
                                title={game.title}
                                className="w-full h-full border-0"
                                allowFullScreen
                                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                            />
                        </div>
                    </div>

                    <div className="mt-6 p-6 bg-card rounded-xl">
                        <h2 className="text-xl font-bold mb-3">About this game</h2>
                        <p className="text-muted-foreground mb-4">
                            {game.description}
                        </p>
                        <div className="flex gap-4 text-sm">
                            <span className="px-3 py-1 bg-muted rounded-full">
                                {game.category}
                            </span>
                            <span className="px-3 py-1 bg-muted rounded-full">
                                ⭐ {game.rating}
                            </span>
                            <span className="px-3 py-1 bg-muted rounded-full">
                                👥 {game.players}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
