import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Activity {
    id: number;
    user: {
        id: number;
        name: string;
        avatar?: string;
    };
    type: string;
    action: string;
    description: string;
    data?: any;
    created_at: string;
}

export function useRealTimeActivity(initialActivities: Activity[]) {
    const [activities, setActivities] = useState<Activity[]>(initialActivities);
    const { isConnected, lastMessage } = useWebSocket('activity');

    useEffect(() => {
        if (lastMessage && isConnected) {
            switch (lastMessage.event) {
                case 'new_activity':
                    // Add new activity to the beginning of the list
                    setActivities(prev => [lastMessage.data, ...prev]);
                    break;
                case 'activity_updated':
                    // Update existing activity
                    setActivities(prev => 
                        prev.map(activity => 
                            activity.id === lastMessage.data.id 
                                ? { ...activity, ...lastMessage.data }
                                : activity
                        )
                    );
                    break;
                case 'activity_deleted':
                    // Remove activity from list
                    setActivities(prev => 
                        prev.filter(activity => activity.id !== lastMessage.data.id)
                    );
                    break;
            }
        }
    }, [lastMessage, isConnected]);

    return { activities, isConnected };
}
