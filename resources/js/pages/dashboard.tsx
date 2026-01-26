import { Link } from '@inertiajs/react';
import { 
    Trophy, 
    Clock, 
    Target, 
    Star, 
    TrendingUp, 
    Gamepad2, 
    Users, 
    Award,
    Play,
    Eye,
    ChevronRight,
    Activity
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface DashboardProps {
    userStats: {
        total_games_played: number;
        favorite_category: string;
        total_play_time: string;
        achievements_unlocked: number;
        level: number;
        experience_points: number;
    };
    recentGames: any[];
    achievements: any[];
    recommendedGames: any[];
    leaderboard: any[];
    activities: any[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ 
    userStats, 
    recentGames, 
    achievements, 
    recommendedGames, 
    leaderboard, 
    activities 
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-6">
                {/* Welcome Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold gradient-text">Welcome back!</h1>
                        <p className="text-muted-foreground">Here's what's happening with your gaming journey</p>
                    </div>
                    <Link
                        href="/games/create"
                        className="play-button flex items-center gap-2"
                    >
                        <Gamepad2 className="w-5 h-5" />
                        Add Game
                    </Link>
                </div>

                {/* User Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-card p-6 rounded-xl border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg gradient-bg-primary flex items-center justify-center">
                                <Gamepad2 className="w-6 h-6 text-background" />
                            </div>
                            <span className="text-sm text-muted-foreground">Total</span>
                        </div>
                        <h3 className="text-2xl font-bold">{userStats.total_games_played}</h3>
                        <p className="text-muted-foreground">Games Played</p>
                    </div>

                    <div className="bg-card p-6 rounded-xl border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-green-500" />
                            </div>
                            <span className="text-sm text-muted-foreground">Total</span>
                        </div>
                        <h3 className="text-2xl font-bold">{userStats.total_play_time}</h3>
                        <p className="text-muted-foreground">Play Time</p>
                    </div>

                    <div className="bg-card p-6 rounded-xl border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-gaming-orange/20 flex items-center justify-center">
                                <Trophy className="w-6 h-6 text-gaming-orange" />
                            </div>
                            <span className="text-sm text-muted-foreground">Unlocked</span>
                        </div>
                        <h3 className="text-2xl font-bold">{userStats.achievements_unlocked}</h3>
                        <p className="text-muted-foreground">Achievements</p>
                    </div>

                    <div className="bg-card p-6 rounded-xl border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                <Star className="w-6 h-6 text-purple-500" />
                            </div>
                            <span className="text-sm text-muted-foreground">Level</span>
                        </div>
                        <h3 className="text-2xl font-bold">{userStats.level}</h3>
                        <p className="text-muted-foreground">{userStats.experience_points} XP</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Games */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Achievements */}
                        <div className="bg-card rounded-xl border border-border">
                            <div className="p-6 border-b border-border">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Trophy className="w-5 h-5 text-gaming-orange" />
                                    Recent Achievements
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {achievements.slice(0, 4).map((achievement) => (
                                        <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                            <div className="text-2xl">{achievement.icon}</div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-sm">{achievement.title}</h4>
                                                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                                                {achievement.unlocked ? (
                                                    <p className="text-xs text-green-600 mt-1">
                                                        Unlocked {achievement.unlocked_at}
                                                    </p>
                                                ) : (
                                                    <div className="mt-1">
                                                        <div className="flex items-center justify-between text-xs">
                                                            <span>Progress</span>
                                                            <span>{achievement.progress}/{achievement.total}</span>
                                                        </div>
                                                        <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                                                            <div 
                                                                className="bg-primary h-1.5 rounded-full" 
                                                                style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recommended Games */}
                        <div className="bg-card rounded-xl border border-border">
                            <div className="p-6 border-b border-border">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Target className="w-5 h-5 text-gaming-yellow" />
                                    Recommended for You
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {recommendedGames.map((game) => (
                                        <div key={game.id} className="group cursor-pointer">
                                            <div className="relative overflow-hidden rounded-lg">
                                                <img
                                                    src={game.image_url}
                                                    alt={game.title}
                                                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                <div className="absolute bottom-2 left-2 right-2">
                                                    <h4 className="text-white font-semibold text-sm line-clamp-1">{game.title}</h4>
                                                    <div className="flex items-center gap-1 text-white/80 text-xs">
                                                        <Star className="w-3 h-3 fill-gaming-yellow text-gaming-yellow" />
                                                        <span>{game.rating}</span>
                                                        <span>•</span>
                                                        <span>{game.category}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex items-center justify-between">
                                                <Link
                                                    href={`/games/${game.id}`}
                                                    className="text-sm text-primary hover:underline"
                                                >
                                                    Play Now
                                                </Link>
                                                <Link
                                                    href={`/games/${game.id}`}
                                                    className="p-1 rounded hover:bg-muted transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Activity Feed */}
                        <div className="bg-card rounded-xl border border-border">
                            <div className="p-6 border-b border-border">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-blue-500" />
                                    Recent Activity
                                </h2>
                            </div>
                            <div className="p-6 space-y-4">
                                {activities.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-3">
                                        <div className="text-xl">{activity.icon}</div>
                                        <div className="flex-1">
                                            <p className="text-sm">{activity.message}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Leaderboard */}
                        <div className="bg-card rounded-xl border border-border">
                            <div className="p-6 border-b border-border">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-gaming-green" />
                                    Top Players
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    {leaderboard.slice(0, 5).map((player, index) => (
                                        <div key={player.id} className="flex items-center gap-3">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                                index === 0 ? 'bg-gaming-yellow text-background' :
                                                index === 1 ? 'bg-gray-400 text-background' :
                                                index === 2 ? 'bg-orange-600 text-background' :
                                                'bg-muted text-muted-foreground'
                                            }`}>
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{player.name}</p>
                                                <p className="text-xs text-muted-foreground">Level {player.level}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold">{player.games_count}</p>
                                                <p className="text-xs text-muted-foreground">games</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    href="/leaderboard"
                                    className="mt-4 flex items-center justify-center text-sm text-primary hover:underline"
                                >
                                    View Full Leaderboard
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
