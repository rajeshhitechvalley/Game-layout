import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Bell, TrendingUp, Gamepad2, Trophy, Users } from 'lucide-react';

interface User {
    id: number;
    name: string;
    avatar?: string;
}

interface Activity {
    id: number;
    user: User;
    type: string;
    action: string;
    description: string;
    data?: any;
    created_at: string;
}

interface ActivityPageProps {
    activities: {
        data: Activity[];
        links: any;
        meta: any;
    };
}

export default function ActivityPage({ activities }: ActivityPageProps) {
    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'game':
                return <Gamepad2 className="w-5 h-5" />;
            case 'achievement':
                return <Trophy className="w-5 h-5" />;
            case 'friend':
                return <Users className="w-5 h-5" />;
            default:
                return <Bell className="w-5 h-5" />;
        }
    };

    const getActivityColor = (type: string) => {
        switch (type) {
            case 'game':
                return 'text-blue-500 bg-blue-50';
            case 'achievement':
                return 'text-yellow-500 bg-yellow-50';
            case 'friend':
                return 'text-green-500 bg-green-50';
            default:
                return 'text-gray-500 bg-gray-50';
        }
    };

    return (
        <AppLayout>
            <Head title="Activity Feed" />
            
            <div className="container mx-auto px-4 py-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Activity Feed</h1>
                    <p className="text-muted-foreground">See what's happening in the gaming community</p>
                </div>

                {/* Activity Feed */}
                <div className="space-y-4">
                    {activities.data.length === 0 ? (
                        <div className="text-center py-12">
                            <TrendingUp className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">No recent activity</h3>
                            <p className="text-muted-foreground">Be the first to start playing and earning achievements!</p>
                        </div>
                    ) : (
                        activities.data.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4 p-4 border border-border rounded-lg">
                                <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                                    {getActivityIcon(activity.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                            {activity.user.avatar ? (
                                                <img src={activity.user.avatar} alt={activity.user.name} className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                <Users className="w-4 h-4 text-muted-foreground" />
                                            )}
                                        </div>
                                        <h3 className="font-medium">{activity.user.name}</h3>
                                        <span className="text-sm text-muted-foreground">
                                            {new Date(activity.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm">{activity.description}</p>
                                    
                                    {/* Additional activity data */}
                                    {activity.data && (
                                        <div className="mt-2 p-2 bg-muted/50 rounded text-sm">
                                            {activity.data.game_title && (
                                                <p>Game: {activity.data.game_title}</p>
                                            )}
                                            {activity.data.score && (
                                                <p>Score: {activity.data.score}</p>
                                            )}
                                            {activity.data.achievement_name && (
                                                <p>Achievement: {activity.data.achievement_name}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {activities.links && activities.links.length > 3 && (
                    <div className="mt-8 flex justify-center">
                        <div className="flex gap-2">
                            {activities.links.map((link: any, index: number) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 rounded-lg text-sm ${
                                        link.active
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted hover:bg-muted/80'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
