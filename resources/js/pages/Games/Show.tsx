import { Head, Link } from '@inertiajs/react';
import type { Game } from '@/types';

interface GameShowProps {
    game: Game;
}

export default function GameShow({ game }: GameShowProps) {
    return (
        <>
            <Head title={game.title} />
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <Link
                                href="/admin/dashboard"
                                className="text-muted-foreground hover:text-foreground mb-4 inline-block"
                            >
                                ← Back to Dashboard
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <div className="aspect-video overflow-hidden rounded-2xl">
                                    <img
                                        src={game.image_url}
                                        alt={game.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h1 className="text-4xl font-bold gradient-text">
                                        {game.title}
                                    </h1>
                                    {game.featured && (
                                        <span className="text-gaming-yellow text-2xl">
                                            ⭐
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 mb-6">
                                    <span className="px-3 py-1 bg-muted rounded-full text-sm">
                                        {game.category}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gaming-yellow">
                                            ⭐ {game.rating}
                                        </span>
                                        <span className="text-muted-foreground">
                                            ({game.plays_formatted || game.plays} plays)
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-3">Description</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {game.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <h3 className="font-semibold mb-1">Status</h3>
                                        <p className={`text-sm ${game.active ? 'text-green-500' : 'text-red-500'}`}>
                                            {game.active ? 'Active' : 'Inactive'}
                                        </p>
                                    </div>
                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <h3 className="font-semibold mb-1">Featured</h3>
                                        <p className={`text-sm ${game.featured ? 'text-gaming-yellow' : 'text-muted-foreground'}`}>
                                            {game.featured ? 'Yes' : 'No'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="play-button">
                                        Play Now
                                    </button>
                                    <Link
                                        href={`/games/${game.id}/edit`}
                                        className="px-8 py-4 rounded-full font-bold text-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-all"
                                    >
                                        Edit Game
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-border">
                            <h2 className="text-2xl font-semibold mb-6">Game Details</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-muted/50 p-4 rounded-lg">
                                    <h3 className="font-semibold mb-2">Slug</h3>
                                    <p className="text-muted-foreground text-sm font-mono">
                                        {game.slug}
                                    </p>
                                </div>
                                <div className="bg-muted/50 p-4 rounded-lg">
                                    <h3 className="font-semibold mb-2">Created</h3>
                                    <p className="text-muted-foreground text-sm">
                                        {new Date(game.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="bg-muted/50 p-4 rounded-lg">
                                    <h3 className="font-semibold mb-2">Last Updated</h3>
                                    <p className="text-muted-foreground text-sm">
                                        {new Date(game.updated_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
