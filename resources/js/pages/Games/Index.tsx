import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import type { Game } from '@/types';

interface GamesIndexProps {
    games: {
        data: Game[];
        links: any;
        meta: any;
    };
}

export default function GamesIndex({ games }: GamesIndexProps) {
    return (
        <>
            <Head title="Games" />
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold gradient-text">All Games</h1>
                        <Link
                            href="/games/create"
                            className="play-button"
                        >
                            Add New Game
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                        {games.data.map((game) => (
                            <Link
                                key={game.id}
                                href={`/games/${game.id}`}
                                className="game-card group"
                            >
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={game.image_url}
                                        alt={game.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-lg line-clamp-1">
                                            {game.title}
                                        </h3>
                                        {game.featured && (
                                            <span className="text-gaming-yellow text-sm">
                                                ⭐
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                                        {game.description}
                                    </p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="px-2 py-1 bg-muted rounded-full text-xs">
                                            {game.category}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gaming-yellow">
                                                ⭐ {game.rating}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {game.plays_formatted || game.plays} plays
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {games.links && (
                        <div className="flex justify-center mt-8 gap-2">
                            {games.links.map((link: any, index: number) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg ${
                                        link.active
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
