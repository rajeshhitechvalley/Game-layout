import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Trophy, Target, User, Medal } from 'lucide-react';

interface Game {
    id: number;
    title: string;
    slug: string;
}

interface LeaderboardEntry {
    rank: number;
    user: {
        id: number;
        name: string;
        avatar?: string;
    };
    score?: number;
    total_score?: number;
    games_played?: number;
    played_at?: string;
    game?: Game;
}

interface LeaderboardPageProps {
    leaderboard: LeaderboardEntry[];
    games: Game[];
    currentGame?: Game | null;
    type: string;
}

export default function LeaderboardPage({ leaderboard, games, currentGame, type }: LeaderboardPageProps) {
    const [selectedGame, setSelectedGame] = useState(currentGame?.id || '');
    const [leaderboardType, setLeaderboardType] = useState(type);

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Medal className="w-6 h-6 text-yellow-500" />;
            case 2:
                return <Medal className="w-6 h-6 text-gray-400" />;
            case 3:
                return <Medal className="w-6 h-6 text-orange-600" />;
            default:
                return <span className="w-6 h-6 flex items-center justify-center text-sm font-medium text-muted-foreground">#{rank}</span>;
        }
    };

    const getRankColor = (rank: number) => {
        switch (rank) {
            case 1:
                return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200';
            case 2:
                return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
            case 3:
                return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200';
            default:
                return 'bg-background border-border';
        }
    };

    return (
        <AppLayout>
            <Head title="Leaderboard" />
            
            <div className="container mx-auto px-4 py-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
                    <p className="text-muted-foreground">Top players and high scores</p>
                </div>

                {/* Filters */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 max-w-xs">
                        <label className="block text-sm font-medium mb-2">Leaderboard Type</label>
                        <select
                            value={leaderboardType}
                            onChange={(e) => setLeaderboardType(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                        >
                            <option value="global" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">Global</option>
                            <option value="personal" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">Personal</option>
                            <option value="game" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">Game Specific</option>
                        </select>
                    </div>

                    {leaderboardType === 'game' && (
                        <div className="flex-1 max-w-xs">
                            <label className="block text-sm font-medium mb-2">Select Game</label>
                            <select
                                value={selectedGame}
                                onChange={(e) => setSelectedGame(e.target.value)}
                                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                            >
                                <option value="" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">All Games</option>
                                {games.map((game) => (
                                    <option key={game.id} value={game.id} className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">
                                        {game.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Leaderboard */}
                <div className="space-y-4">
                    {leaderboard.length === 0 ? (
                        <div className="text-center py-12">
                            <Trophy className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">No scores yet</h3>
                            <p className="text-muted-foreground">Start playing games to appear on the leaderboard!</p>
                        </div>
                    ) : (
                        leaderboard.map((entry) => (
                            <div
                                key={`${entry.user.id}-${entry.rank}`}
                                className={`flex items-center justify-between p-4 border rounded-lg ${getRankColor(entry.rank)}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-8">
                                        {getRankIcon(entry.rank)}
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                        {entry.user.avatar ? (
                                            <img src={entry.user.avatar} alt={entry.user.name} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <User className="w-6 h-6 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{entry.user.name}</h3>
                                        {entry.game && (
                                            <p className="text-sm text-muted-foreground">{entry.game.title}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-lg">
                                        {entry.total_score || entry.score || 0}
                                    </div>
                                    {entry.games_played && (
                                        <p className="text-sm text-muted-foreground">
                                            {entry.games_played} games
                                        </p>
                                    )}
                                    {entry.played_at && (
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(entry.played_at).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Stats Summary */}
                {leaderboard.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border border-border rounded-lg text-center">
                            <Target className="w-8 h-8 mx-auto text-primary mb-2" />
                            <div className="text-2xl font-bold">{leaderboard.length}</div>
                            <div className="text-sm text-muted-foreground">Players</div>
                        </div>
                        <div className="p-4 border border-border rounded-lg text-center">
                            <Trophy className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
                            <div className="text-2xl font-bold">
                                {leaderboard[0]?.total_score || leaderboard[0]?.score || 0}
                            </div>
                            <div className="text-sm text-muted-foreground">Top Score</div>
                        </div>
                        <div className="p-4 border border-border rounded-lg text-center">
                            <Medal className="w-8 h-8 mx-auto text-orange-500 mb-2" />
                            <div className="text-2xl font-bold">
                                {leaderboard[0]?.user.name || 'N/A'}
                            </div>
                            <div className="text-sm text-muted-foreground">Champion</div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
