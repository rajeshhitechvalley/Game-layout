import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';
import { Heart, Star, Users, Play, Trash2 } from 'lucide-react';

interface Game {
    id: number;
    title: string;
    slug: string;
    image: string;
    category: string;
    rating: number;
    plays: string;
}

interface FavoriteItem {
    id: number;
    game: Game;
    favorited_at: string;
}

interface FavoritesPageProps {
    favorites: FavoriteItem[];
}

export default function FavoritesPage({ favorites }: FavoritesPageProps) {
    return (
        <AppLayout>
            <Head title="Favorites" />
            
            <div className="container mx-auto px-4 py-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Favorites</h1>
                    <p className="text-muted-foreground">Your most loved games</p>
                </div>

                {/* Favorites Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favorites.map((favorite) => (
                        <div key={favorite.id} className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
                            <div className="relative">
                                <Link href={`/games/${favorite.game.slug}/play`}>
                                    <img
                                        src={favorite.game.image}
                                        alt={favorite.game.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </Link>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                                    <Link
                                        href={`/games/${favorite.game.slug}/play`}
                                        className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                                    >
                                        <Play className="w-4 h-4" />
                                    </Link>
                                    <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="absolute top-2 right-2">
                                    <div className="p-2 bg-red-500 text-white rounded-lg">
                                        <Heart className="w-4 h-4 fill-current" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <Link href={`/games/${favorite.game.slug}/play`}>
                                    <h3 className="font-bold mb-2 hover:text-primary transition-colors">
                                        {favorite.game.title}
                                    </h3>
                                </Link>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-1 bg-muted text-xs font-medium rounded">
                                        {favorite.game.category}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span className="font-medium">{favorite.game.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <Users className="w-4 h-4" />
                                        <span>{favorite.game.plays}</span>
                                    </div>
                                </div>
                                <div className="mt-2 text-xs text-muted-foreground">
                                    Favorited {new Date(favorite.favorited_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {favorites.length === 0 && (
                    <div className="text-center py-12">
                        <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                        <p className="text-muted-foreground mb-4">Start adding games to your favorites!</p>
                        <Link
                            href="/games"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                        >
                            <Heart className="w-4 h-4" />
                            Browse Games
                        </Link>
                    </div>
                )}

                {/* Stats */}
                {favorites.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border border-border rounded-lg text-center">
                            <Heart className="w-8 h-8 mx-auto text-red-500 mb-2" />
                            <div className="text-2xl font-bold">{favorites.length}</div>
                            <div className="text-sm text-muted-foreground">Favorite Games</div>
                        </div>
                        <div className="p-4 border border-border rounded-lg text-center">
                            <Star className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
                            <div className="text-2xl font-bold">
                                {favorites.reduce((acc, fav) => acc + fav.game.rating, 0) / favorites.length || 0}
                            </div>
                            <div className="text-sm text-muted-foreground">Average Rating</div>
                        </div>
                        <div className="p-4 border border-border rounded-lg text-center">
                            <Users className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                            <div className="text-2xl font-bold">
                                {favorites.reduce((acc, fav) => acc + parseInt(fav.game.plays), 0)}
                            </div>
                            <div className="text-sm text-muted-foreground">Total Plays</div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
