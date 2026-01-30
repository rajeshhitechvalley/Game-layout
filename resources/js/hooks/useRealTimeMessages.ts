import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Message {
    id: number;
    content: string;
    created_at: string;
    is_read: boolean;
    sender_id: number;
    receiver_id: number;
}

interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
}

interface Conversation {
    user: User;
    latest_message: Message;
    unread_count: number;
}

export function useRealTimeMessages(initialConversations: Conversation[]) {
    const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
    const { isConnected, lastMessage } = useWebSocket('messages');

    useEffect(() => {
        if (lastMessage && isConnected) {
            switch (lastMessage.event) {
                case 'new_message':
                    const newMessage = lastMessage.data;
                    
                    // Update or add conversation
                    setConversations(prev => {
                        const existingIndex = prev.findIndex(conv => 
                            conv.user.id === newMessage.sender_id || conv.user.id === newMessage.receiver_id
                        );
                        
                        if (existingIndex !== -1) {
                            // Update existing conversation
                            const updated = [...prev];
                            updated[existingIndex] = {
                                ...updated[existingIndex],
                                latest_message: newMessage,
                                unread_count: newMessage.sender_id !== updated[existingIndex].user.id 
                                    ? updated[existingIndex].unread_count + 1 
                                    : updated[existingIndex].unread_count
                            };
                            
                            // Move to top
                            return [updated[existingIndex], ...updated.filter((_, index) => index !== existingIndex)];
                        } else {
                            // Add new conversation
                            const otherUser = newMessage.sender_id === newMessage.receiver_id 
                                ? newMessage.receiver 
                                : newMessage.sender;
                            
                            return [{
                                user: otherUser,
                                latest_message: newMessage,
                                unread_count: newMessage.sender_id !== otherUser.id ? 1 : 0
                            }, ...prev];
                        }
                    });
                    break;
                    
                case 'message_read':
                    // Update read status and decrement unread count
                    setConversations(prev => 
                        prev.map(conv => 
                            conv.user.id === lastMessage.data.sender_id 
                                ? {
                                    ...conv,
                                    latest_message: {
                                        ...conv.latest_message,
                                        is_read: true
                                    },
                                    unread_count: 0
                                }
                                : conv
                        )
                    );
                    break;
                    
                case 'conversation_updated':
                    // General conversation update
                    setConversations(prev => 
                        prev.map(conv => 
                            conv.user.id === lastMessage.data.user.id 
                                ? { ...conv, ...lastMessage.data }
                                : conv
                        )
                    );
                    break;
            }
        }
    }, [lastMessage, isConnected]);

    return { conversations, isConnected };
}
