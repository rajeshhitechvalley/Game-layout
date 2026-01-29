import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Trophy, Target, Star, Lock } from 'lucide-react';

interface Achievement {
    id: number;
    name: string;
    description: string;
    icon: string;
    badge_color: string;
    points: number;
    type: string;
    is_unlocked: boolean;
    unlocked_at?: string;
    progress: number;
}

interface Stats {
    total_achievements: number;
    unlocked_achievements: number;
    total_points: number;
}

interface AchievementsPageProps {
    achievements: Achievement[];
    stats: Stats;
    currentType: string;
}

export default function AchievementsPage({ achievements, stats, currentType }: AchievementsPageProps) {
    const [selectedType, setSelectedType] = useState(currentType);

    const filteredAchievements = achievements.filter(achievement =>
        selectedType === 'all' || achievement.type === selectedType
    );

    const completionPercentage = Math.round((stats.unlocked_achievements / stats.total_achievements) * 100);

    const getAchievementIcon = (achievement: Achievement) => {
        if (achievement.is_unlocked) {
            return (
                <div className={`w-16 h-16 rounded-full ${achievement.badge_color} flex items-center justify-center`}>
                    <Trophy className="w-8 h-8 text-white" />
                </div>
            );
        } else {
            return (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-gray-400" />
                </div>
            );
        }
    };

    return (
        <AppLayout>
            <Head title="Achievements" />
            
            <div className="container mx-auto px-4 py-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Achievements</h1>
                    <p className="text-muted-foreground">Track your gaming accomplishments</p>
                </div>

                {/* Stats Overview */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 border border-border rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Target className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{stats.unlocked_achievements}/{stats.total_achievements}</div>
                                <div className="text-sm text-muted-foreground">Unlocked</div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border border-border rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-yellow-10 rounded-lg">
                                <Star className="w-6 h-6 text-yellow-500" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{stats.total_points}</div>
                                <div className="text-sm text-muted-foreground">Total Points</div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border border-border rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-10 rounded-lg">
                                <Trophy className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{completionPercentage}%</div>
                                <div className="text-sm text-muted-foreground">Completion</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className="bg-primary h-3 rounded-full transition-all duration-300"
                            style={{ width: `${completionPercentage}%` }}
                        />
                    </div>
                </div>

                {/* Type Filter */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedType('all')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                selectedType === 'all'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted hover:bg-muted/80'
                            }`}
                        >
                            All ({achievements.length})
                        </button>
                        <button
                            onClick={() => setSelectedType('game')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                selectedType === 'game'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted hover:bg-muted/80'
                            }`}
                        >
                            Games ({achievements.filter(a => a.type === 'game').length})
                        </button>
                        <button
                            onClick={() => setSelectedType('social')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                selectedType === 'social'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted hover:bg-muted/80'
                            }`}
                        >
                            Social ({achievements.filter(a => a.type === 'social').length})
                        </button>
                        <button
                            onClick={() => setSelectedType('milestone')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                selectedType === 'milestone'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted hover:bg-muted/80'
                            }`}
                        >
                            Milestones ({achievements.filter(a => a.type === 'milestone').length})
                        </button>
                    </div>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAchievements.map((achievement) => (
                        <div
                            key={achievement.id}
                            className={`p-6 border rounded-lg transition-all ${
                                achievement.is_unlocked
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border bg-background'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                {getAchievementIcon(achievement)}
                                <div className="flex-1">
                                    <h3 className={`font-bold mb-1 ${
                                        achievement.is_unlocked ? 'text-foreground' : 'text-muted-foreground'
                                    }`}>
                                        {achievement.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {achievement.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-4 h-4 text-yellow-500" />
                                            <span className="text-sm font-medium">{achievement.points} pts</span>
                                        </div>
                                        {achievement.is_unlocked && achievement.unlocked_at && (
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(achievement.unlocked_at).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                    {!achievement.is_unlocked && achievement.progress > 0 && (
                                        <div className="mt-2">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span>Progress</span>
                                                <span>{achievement.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1">
                                                <div
                                                    className="bg-primary h-1 rounded-full"
                                                    style={{ width: `${achievement.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredAchievements.length === 0 && (
                    <div className="text-center py-12">
                        <Trophy className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No achievements found</h3>
                        <p className="text-muted-foreground">Start playing to unlock achievements!</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
