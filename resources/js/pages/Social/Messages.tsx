import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { MessageSquare, Search, Send, Wifi, WifiOff } from 'lucide-react';
import { useRealTimeMessages } from '@/hooks/useRealTimeMessages';
import UserSearch from '@/components/UserSearch';

interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
}

interface Message {
    id: number;
    content: string;
    created_at: string;
    is_read: boolean;
    sender_id: number;
    receiver_id: number;
}

interface Conversation {
    user: User;
    latest_message: Message;
    unread_count: number;
}

interface MessagesPageProps {
    conversations: Conversation[];
}

export default function MessagesPage({ conversations }: MessagesPageProps) {
    const { conversations: realTimeConversations, isConnected } = useRealTimeMessages(conversations);
    const [searchQuery, setSearchQuery] = useState('');
    const [showNewMessageNotification, setShowNewMessageNotification] = useState(false);

    useEffect(() => {
        // Check if there are new messages
        const hasNewMessages = realTimeConversations.some(conv => 
            conv.unread_count > 0 && 
            !conversations.find(original => original.user.id === conv.user.id)?.unread_count
        );

        if (hasNewMessages && isConnected) {
            setShowNewMessageNotification(true);
            setTimeout(() => setShowNewMessageNotification(false), 4000);
        }
    }, [realTimeConversations, conversations, isConnected]);

    const filteredConversations = realTimeConversations.filter(conversation =>
        conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AppLayout>
            <Head title="Messages" />
            
            <div className="container mx-auto px-4 py-6">
                {/* Header with Connection Status */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-3xl font-bold">Messages</h1>
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
                    <p className="text-muted-foreground">Chat with friends and other players</p>
                </div>

                {/* New Message Notification */}
                {showNewMessageNotification && (
                    <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-800">New message received!</span>
                    </div>
                )}

                {/* Search Bar */}
                <div className="mb-6">
                    <UserSearch 
                        onUserSelect={(user) => {
                            // Navigate to conversation with selected user
                            window.location.href = `/messages/${user.id}`;
                        }}
                    />
                </div>

                {/* Conversations List */}
                <div className="grid gap-4">
                    {filteredConversations.length === 0 ? (
                        <div className="text-center py-12">
                            <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">No conversations yet</h3>
                            <p className="text-muted-foreground mb-4">Start messaging your friends!</p>
                            <Link
                                href="/friends"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                            >
                                Find Friends
                            </Link>
                        </div>
                    ) : (
                        filteredConversations.map((conversation) => (
                            <Link
                                key={conversation.user.id}
                                href={`/messages/${conversation.user.id}`}
                                className="block p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                                {conversation.user.avatar ? (
                                                    <img src={conversation.user.avatar} alt={conversation.user.name} className="w-full h-full rounded-full object-cover" />
                                                ) : (
                                                    <MessageSquare className="w-6 h-6 text-muted-foreground" />
                                                )}
                                            </div>
                                            {conversation.unread_count > 0 && (
                                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                                                    {conversation.unread_count}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-medium">{conversation.user.name}</h3>
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(conversation.latest_message.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className={`text-sm truncate ${
                                                !conversation.latest_message.is_read && conversation.latest_message.sender_id !== conversation.user.id
                                                    ? 'font-medium text-foreground'
                                                    : 'text-muted-foreground'
                                            }`}>
                                                {conversation.latest_message.sender_id === conversation.user.id ? 'You: ' : `${conversation.user.name}: `}
                                                {conversation.latest_message.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
