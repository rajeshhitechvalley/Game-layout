import { Head, Link, router } from '@inertiajs/react';
import type { Game } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GameGrid from '@/components/GameGrid';
import Notifications from '@/components/Notifications';
import Toaster, { showToast } from '@/components/Toaster';
import { Clock, TrendingUp, Gamepad2, Users, Star, Play, Maximize2, Minimize2, Bookmark, Heart, Share2 } from 'lucide-react';
import { useState } from 'react';

interface GamePlayProps {
    game: Game;
    recentGames?: Game[];
    suggestedGames?: Game[];
    trendingGames?: Game[];
}

export default function GamePlay({ game, recentGames = [], suggestedGames = [], trendingGames = [] }: GamePlayProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(game.is_bookmarked || false);
    const [isFavorited, setIsFavorited] = useState(game.is_favorited || false);

    const handleBookmark = async () => {
        try {
            if (isBookmarked) {
                // Remove bookmark
                await router.delete(`/bookmarks/game/${game.id}`, {
                    onSuccess: () => {
                        setIsBookmarked(false);
                        showToast('unbookmark', 'Removed from bookmarks', game.title);
                    },
                    onError: (errors: any) => {
                        console.error('Error removing bookmark:', errors);
                    }
                });
            } else {
                // Add bookmark
                await router.post('/bookmarks', {
                    game_id: game.id,
                    category: 'general',
                    notes: '',
                }, {
                    onSuccess: () => {
                        setIsBookmarked(true);
                        showToast('bookmark', 'Added to bookmarks', game.title);
                    },
                    onError: (errors: any) => {
                        console.error('Error bookmarking game:', errors);
                    }
                });
            }
        } catch (error) {
            console.error('Error bookmarking game:', error);
        }
    };

    const handleFavorite = async () => {
        try {
            await router.post('/favorites/toggle', {
                game_id: game.id,
            }, {
                onSuccess: (response: any) => {
                    const favorited = response.props.favorited;
                    setIsFavorited(favorited);
                    if (favorited) {
                        showToast('favorite', 'Added to favorites', game.title);
                    } else {
                        showToast('unfavorite', 'Removed from favorites', game.title);
                    }
                },
                onError: (errors: any) => {
                    console.error('Error toggling favorite:', errors);
                }
            });
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: game.title,
                text: `Check out this game: ${game.title}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Game link copied to clipboard!');
        }
    };
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
            
            {/* Normal Mode */}
            {!isFullscreen && (
                <div className="min-h-screen bg-background flex flex-col">
                    <Header />
                    
                    {/* Game Container */}
                    <div className="flex-1 flex flex-col">
                        {/* Game Header Bar */}
                        <div className="bg-card border-b border-border px-4 py-3">
                            <div className="container mx-auto flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Link
                                        href="/games"
                                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        ← Back to Games
                                    </Link>
                                    <div className="h-6 w-px bg-border"></div>
                                    <div>
                                        <h1 className="text-lg font-bold">{game.title}</h1>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <span className="px-2 py-1 bg-gaming-orange/20 text-gaming-orange font-bold rounded-full text-xs">
                                                {game.category}
                                            </span>
                                            <span>⭐ {game.rating}</span>
                                            <span>👥 {game.players}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => setIsFullscreen(true)}
                                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                                        title="Enter Fullscreen"
                                    >
                                        <Maximize2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                                        <Play className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                                        <Star className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Game Iframe */}
                        <div className="flex-1 relative bg-black min-h-[500px]">
                            <iframe
                                src={game.game_url}
                                title={game.title}
                                className="absolute inset-0 w-full h-full border-0"
                                allowFullScreen
                                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                            />
                        </div>
                    </div>

                    {/* Game Details Section */}
                    <div className="bg-card border-t border-border">
                        <div className="container mx-auto px-4 py-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* About Section */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div>
                                        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                                            <Gamepad2 className="w-5 h-5 text-gaming-orange" />
                                            About this game
                                        </h2>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {game.description}
                                        </p>
                                    </div>

                                    {/* Recent Played Games */}
                                    {recentGames.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                                <Clock className="w-5 h-5 text-gaming-orange" />
                                                Recently Played
                                            </h3>
                                            <GameGrid 
                                                games={recentGames} 
                                                title="" 
                                                icon="" 
                                            />
                                        </div>
                                    )}

                                    {/* Trending Games */}
                                    {trendingGames.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                                <TrendingUp className="w-5 h-5 text-gaming-orange" />
                                                Trending Games
                                            </h3>
                                            <GameGrid 
                                                games={trendingGames} 
                                                title="" 
                                                icon="" 
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-6">
                                    {/* Game Info */}
                                    <div className="bg-muted/50 rounded-xl p-4">
                                        <h3 className="font-bold mb-3">Game Info</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Category</span>
                                                <span className="font-medium">{game.category}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Rating</span>
                                                <span className="font-medium">⭐ {game.rating}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Players</span>
                                                <span className="font-medium">👥 {game.players}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Plays</span>
                                                <span className="font-medium">{game.plays || 0}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Suggested Games */}
                                    {suggestedGames.length > 0 && (
                                        <div>
                                            <h3 className="font-bold mb-3 flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-gaming-orange" />
                                                Suggested Games
                                            </h3>
                                            <div className="space-y-3">
                                                {suggestedGames.slice(0, 3).map((suggestedGame) => (
                                                    <Link
                                                        key={suggestedGame.id}
                                                        href={`/games/${suggestedGame.slug}/play`}
                                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                                                    >
                                                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                            <img
                                                                src={suggestedGame.image_url}
                                                                alt={suggestedGame.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-medium text-sm truncate">{suggestedGame.title}</h4>
                                                            <p className="text-xs text-muted-foreground">{suggestedGame.category}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Game Controls */}
                                    <div className="bg-muted/50 rounded-xl p-4">
                                        <h3 className="font-bold mb-3">Game Controls</h3>
                                        <div className="space-y-2">
                                            <button 
                                                onClick={() => setIsFullscreen(true)}
                                                className="w-full play-button flex items-center justify-center gap-2"
                                            >
                                                <Maximize2 className="w-4 h-4" />
                                                Enter Fullscreen
                                            </button>
                                            <button 
                                                onClick={handleFavorite}
                                                className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                                                    isFavorited 
                                                        ? 'bg-red-500 text-white hover:bg-red-600' 
                                                        : 'bg-muted hover:bg-muted/80'
                                                }`}
                                            >
                                                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                                                {isFavorited ? 'Favorited' : 'Add to Favorites'}
                                            </button>
                                            <button 
                                                onClick={handleBookmark}
                                                className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                                                    isBookmarked 
                                                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                                        : 'bg-muted hover:bg-muted/80'
                                                }`}
                                            >
                                                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                                                {isBookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
                                            </button>
                                            <button 
                                                onClick={handleShare}
                                                className="w-full px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Share2 className="w-4 h-4" />
                                                Share Game
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            )}

            {/* Fullscreen Mode */}
            {isFullscreen && (
                <div className="fixed inset-0 z-50 bg-black">
                    {/* Fullscreen Iframe - with proper padding to avoid overlap */}
                    <div className="absolute inset-0 pt-20 pb-40">
                        <iframe
                            src={game.game_url}
                            title={game.title}
                            className="absolute inset-0 w-full h-full border-0"
                            allowFullScreen
                            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        />
                    </div>

                    {/* Floating Top Controls */}
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent p-4 z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsFullscreen(false)}
                                    className="flex items-center gap-2 text-white hover:text-gaming-orange transition-colors bg-black/50 px-3 py-2 rounded-lg"
                                >
                                    <Minimize2 className="w-4 h-4" />
                                    Exit Fullscreen
                                </button>
                                <div className="h-6 w-px bg-white/20"></div>
                                <div>
                                    <h1 className="text-lg font-bold text-white">{game.title}</h1>
                                    <div className="flex items-center gap-3 text-sm text-white/80">
                                        <span className="px-2 py-1 bg-gaming-orange/80 text-white font-bold rounded-full text-xs">
                                            {game.category}
                                        </span>
                                        <span>⭐ {game.rating}</span>
                                        <span>👥 {game.players}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white transition-colors">
                                    <Play className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white transition-colors">
                                    <Star className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Floating Bottom Panel - Fixed height to prevent overlap */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent p-4 z-10">
                        <div className="container mx-auto">
                            {/* Toggle Button */}
                            <button 
                                onClick={() => {
                                    const panel = document.getElementById('fullscreen-panel');
                                    if (panel) {
                                        panel.classList.toggle('max-h-0');
                                        panel.classList.toggle('max-h-40');
                                    }
                                }}
                                className="mb-2 text-white/60 hover:text-white text-sm flex items-center gap-2 mx-auto"
                            >
                                <span>Game Info</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Collapsible Content with fixed max height */}
                            <div 
                                id="fullscreen-panel"
                                className="overflow-hidden transition-all duration-300 max-h-0"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* About Section */}
                                    <div>
                                        <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                            <Gamepad2 className="w-4 h-4 text-gaming-orange" />
                                            About this game
                                        </h3>
                                        <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
                                            {game.description}
                                        </p>
                                    </div>

                                    {/* Quick Info & Suggested */}
                                    <div className="space-y-3">
                                        <div className="bg-white/10 rounded-lg p-3">
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div className="text-white/60">Category</div>
                                                <div className="text-white font-medium">{game.category}</div>
                                                <div className="text-white/60">Rating</div>
                                                <div className="text-white font-medium">⭐ {game.rating}</div>
                                                <div className="text-white/60">Players</div>
                                                <div className="text-white font-medium">👥 {game.players}</div>
                                                <div className="text-white/60">Plays</div>
                                                <div className="text-white font-medium">{game.plays || 0}</div>
                                            </div>
                                        </div>

                                        {/* Suggested Games */}
                                        {suggestedGames.length > 0 && (
                                            <div>
                                                <h4 className="text-white font-bold mb-2 text-sm">Suggested Games</h4>
                                                <div className="flex gap-2 overflow-x-auto">
                                                    {suggestedGames.slice(0, 4).map((suggestedGame) => (
                                                        <Link
                                                            key={suggestedGame.id}
                                                            href={`/games/${suggestedGame.slug}/play`}
                                                            className="flex-shrink-0 w-16 group"
                                                        >
                                                            <div className="relative rounded-lg overflow-hidden mb-1">
                                                                <img
                                                                    src={suggestedGame.image_url}
                                                                    alt={suggestedGame.title}
                                                                    className="w-full h-10 object-cover group-hover:scale-105 transition-transform"
                                                                />
                                                            </div>
                                                            <p className="text-white/80 text-xs truncate">{suggestedGame.title}</p>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Notifications />
        </>
    );
}
