import { Head, Link } from '@inertiajs/react';
import { Gamepad2, Users, TrendingUp, Star, Plus, Eye, Edit, Trash2 } from 'lucide-react';

interface DashboardProps {
    stats: {
        total_games: number;
        active_games: number;
        featured_games: number;
        total_users: number;
        recent_games: any[];
        popular_games: any[];
    };
}

export default function AdminDashboard({ stats }: DashboardProps) {
    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold gradient-text mb-2">
                                Admin Dashboard
                            </h1>
                            <p className="text-muted-foreground">
                                Manage your gaming platform
                            </p>
                        </div>
                        <Link
                            href="/games/create"
                            className="play-button flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Add New Game
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-card p-6 rounded-xl border border-border">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg gradient-bg-primary flex items-center justify-center">
                                    <Gamepad2 className="w-6 h-6 text-background" />
                                </div>
                                <span className="text-sm text-muted-foreground">Total</span>
                            </div>
                            <h3 className="text-2xl font-bold">{stats.total_games}</h3>
                            <p className="text-muted-foreground">Total Games</p>
                        </div>

                        <div className="bg-card p-6 rounded-xl border border-border">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                                    <Eye className="w-6 h-6 text-green-500" />
                                </div>
                                <span className="text-sm text-muted-foreground">Active</span>
                            </div>
                            <h3 className="text-2xl font-bold">{stats.active_games}</h3>
                            <p className="text-muted-foreground">Active Games</p>
                        </div>

                        <div className="bg-card p-6 rounded-xl border border-border">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg bg-gaming-orange/20 flex items-center justify-center">
                                    <Star className="w-6 h-6 text-gaming-orange" />
                                </div>
                                <span className="text-sm text-muted-foreground">Featured</span>
                            </div>
                            <h3 className="text-2xl font-bold">{stats.featured_games}</h3>
                            <p className="text-muted-foreground">Featured Games</p>
                        </div>

                        <div className="bg-card p-6 rounded-xl border border-border">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-blue-500" />
                                </div>
                                <span className="text-sm text-muted-foreground">Total</span>
                            </div>
                            <h3 className="text-2xl font-bold">{stats.total_users}</h3>
                            <p className="text-muted-foreground">Users</p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Games */}
                        <div className="bg-card rounded-xl border border-border">
                            <div className="p-6 border-b border-border">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-gaming-orange" />
                                    Recent Games
                                </h2>
                            </div>
                            <div className="p-6 space-y-4">
                                {stats.recent_games.length > 0 ? (
                                    stats.recent_games.map((game) => (
                                        <div key={game.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={game.image_url}
                                                    alt={game.title}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <h4 className="font-semibold">{game.title}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {game.category} • {game.rating} ⭐
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/games/${game.id}/edit`}
                                                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/games/${game.id}/delete`}
                                                    className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground">No recent games</p>
                                )}
                            </div>
                        </div>

                        {/* Popular Games */}
                        <div className="bg-card rounded-xl border border-border">
                            <div className="p-6 border-b border-border">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Star className="w-5 h-5 text-gaming-yellow" />
                                    Popular Games
                                </h2>
                            </div>
                            <div className="p-6 space-y-4">
                                {stats.popular_games.length > 0 ? (
                                    stats.popular_games.map((game, index) => (
                                        <div key={game.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg gradient-bg-primary flex items-center justify-center text-sm font-bold">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">{game.title}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {game.plays_formatted || game.plays} plays
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                    game.active 
                                                        ? 'bg-green-500/20 text-green-500' 
                                                        : 'bg-red-500/20 text-red-500'
                                                }`}>
                                                    {game.active ? 'Active' : 'Inactive'}
                                                </span>
                                                {game.featured && (
                                                    <span className="px-2 py-1 rounded-full text-xs font-bold bg-gaming-orange/20 text-gaming-orange">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground">No popular games</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href="/admin/games"
                            className="px-6 py-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
                        >
                            <Gamepad2 className="w-5 h-5" />
                            Manage Games
                        </Link>
                        <Link
                            href="/admin/users"
                            className="px-6 py-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
                        >
                            <Users className="w-5 h-5" />
                            Manage Users
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
