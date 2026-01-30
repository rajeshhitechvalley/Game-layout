import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    is_online?: boolean;
    friendship_date?: string;
    requested_at?: string;
}

interface FriendsData {
    friends: User[];
    pendingRequests: User[];
    sentRequests: User[];
}

export function useRealTimeFriends(initialData: FriendsData) {
    const [friends, setFriends] = useState<User[]>(initialData.friends);
    const [pendingRequests, setPendingRequests] = useState<User[]>(initialData.pendingRequests);
    const [sentRequests, setSentRequests] = useState<User[]>(initialData.sentRequests);
    const { isConnected, lastMessage } = useWebSocket('friends');

    useEffect(() => {
        if (lastMessage && isConnected) {
            switch (lastMessage.event) {
                case 'friend_request_received':
                    // Add to pending requests
                    setPendingRequests(prev => [lastMessage.data, ...prev]);
                    break;
                case 'friend_request_accepted':
                    // Move from sent to friends
                    setSentRequests(prev => 
                        prev.filter(user => user.id !== lastMessage.data.id)
                    );
                    setFriends(prev => [lastMessage.data, ...prev]);
                    break;
                case 'friend_request_rejected':
                    // Remove from sent requests
                    setSentRequests(prev => 
                        prev.filter(user => user.id !== lastMessage.data.id)
                    );
                    break;
                case 'friend_request_cancelled':
                    // Remove from pending requests
                    setPendingRequests(prev => 
                        prev.filter(user => user.id !== lastMessage.data.id)
                    );
                    break;
                case 'friend_removed':
                    // Remove from friends
                    setFriends(prev => 
                        prev.filter(user => user.id !== lastMessage.data.id)
                    );
                    break;
                case 'user_online_status':
                    // Update online status
                    const updateOnlineStatus = (users: User[]) => 
                        users.map(user => 
                            user.id === lastMessage.data.user_id 
                                ? { ...user, is_online: lastMessage.data.is_online }
                                : user
                        );
                    
                    setFriends(updateOnlineStatus);
                    setPendingRequests(updateOnlineStatus);
                    setSentRequests(updateOnlineStatus);
                    break;
            }
        }
    }, [lastMessage, isConnected]);

    return { 
        friends, 
        pendingRequests, 
        sentRequests, 
        isConnected 
    };
}
