import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Bell, TrendingUp, Gamepad2, Trophy, Users, Wifi, WifiOff } from 'lucide-react';
import { useRealTimePolling } from '@/hooks/useRealTimePolling';
import { router } from '@inertiajs/react';

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
    const { data: realTimeActivities, isConnected } = useRealTimePolling(
        async () => {
            const response = await fetch('/activity/data');
            const result = await response.json();
            return result.data || [];
        },
        activities.data,
        { interval: 5000, enabled: true }
    );
    
    const [showNewActivityNotification, setShowNewActivityNotification] = useState(false);

    useEffect(() => {
        if (realTimeActivities.length > activities.data.length && isConnected) {
            setShowNewActivityNotification(true);
            setTimeout(() => setShowNewActivityNotification(false), 3000);
        }
    }, [realTimeActivities.length, activities.data.length, isConnected]);

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
                {/* Header with Connection Status */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-3xl font-bold">Activity Feed</h1>
                        <div className="flex items-center gap-2">
                            {isConnected ? (
                                <div className="flex items-center gap-2 text-green-600">
                                    <Wifi className="w-4 h-4" />
                                    <span className="text-sm">Live</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-gray-500">
                                    <WifiOff className="w-4 h-4" />
                                    <span className="text-sm">Offline</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="text-muted-foreground">See what's happening in the gaming community</p>
                </div>

                {/* New Activity Notification */}
                {showNewActivityNotification && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-800">New activity detected!</span>
                    </div>
                )}

                {/* Activity Feed */}
                <div className="space-y-4">
                    {realTimeActivities.length === 0 ? (
                        <div className="text-center py-12">
                            <TrendingUp className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">No recent activity</h3>
                            <p className="text-muted-foreground">Be the first to start playing and earning achievements!</p>
                        </div>
                    ) : (
                        realTimeActivities.map((activity: Activity, index: number) => (
                            <div 
                                key={activity.id} 
                                className={`flex items-start gap-4 p-4 border border-border rounded-lg transition-all ${
                                    index < 3 && isConnected ? 'animate-pulse' : ''
                                }`}
                            >
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
                                        {index === 0 && isConnected && (
                                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">New</span>
                                        )}
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
