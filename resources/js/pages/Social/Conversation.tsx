import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft, Send, User } from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import { useRealTimePolling } from '@/hooks/useRealTimePolling';

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
    sender: User;
    receiver: User;
}

interface ConversationPageProps {
    messages: Message[];
    otherUser: User;
}

export default function ConversationPage({ messages, otherUser }: ConversationPageProps) {
    const { auth } = usePage().props as any;
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Get the current authenticated user ID
    const currentUserId = auth?.user?.id || 1;

    // Real-time polling for new messages
    const { data: polledData, isConnected } = useRealTimePolling(
        async () => {
            const response = await fetch(`/messages/${otherUser.id}/poll`);
            if (!response.ok) throw new Error('Failed to fetch messages');
            return response.json();
        },
        { messages },
        { interval: 3000, enabled: true }
    );

    // Use polled messages if available, otherwise use initial messages
    const localMessages = polledData?.messages || messages;

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [localMessages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newMessage.trim() || isSending) return;

        setIsSending(true);
        
        try {
            await router.post(`/messages/${otherUser.id}`, {
                content: newMessage.trim()
            }, {
                onSuccess: () => {
                    setNewMessage('');
                    // Message will be automatically fetched by polling
                    // No need to reload the page
                },
                onError: (errors) => {
                    console.error('Error sending message:', errors);
                }
            });
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsSending(false);
        }
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString();
        }
    };

    // Group messages by date
    const groupedMessages = localMessages.reduce((groups, message) => {
        const date = new Date(message.created_at).toDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(message);
        return groups;
    }, {} as Record<string, Message[]>);

    return (
        <AppLayout>
            <Head title={`Chat with ${otherUser.name}`} />
            
            <div className="container mx-auto px-4 py-6 h-[calc(100vh-8rem)]">
                <div className="bg-background border border-border rounded-lg h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <div className="flex items-center gap-3">
                            <Link
                                href="/messages"
                                className="p-2 rounded-lg hover:bg-muted transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                    {otherUser.avatar ? (
                                        <img src={otherUser.avatar} alt={otherUser.name} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                                            <span className="text-sm font-medium text-primary">
                                                {otherUser.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h2 className="font-medium">{otherUser.name}</h2>
                                    <p className="text-sm text-muted-foreground">{otherUser.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                                isConnected 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                    isConnected ? 'bg-green-500' : 'bg-red-500'
                                }`}></div>
                                {isConnected ? 'Live' : 'Offline'}
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                            <div key={date}>
                                {/* Date Separator */}
                                <div className="flex items-center justify-center my-4">
                                    <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                                        {formatDate(dateMessages[0].created_at)}
                                    </div>
                                </div>
                                
                                {/* Messages for this date */}
                                <div className="space-y-3">
                                    {dateMessages.map((message, index) => {
                                        const isOwn = message.sender_id === currentUserId;
                                        const messageUser = isOwn ? auth?.user : otherUser;
                                        const showAvatar = index === 0 || dateMessages[index - 1]?.sender_id !== message.sender_id;
                                        
                                        return (
                                            <div
                                                key={message.id}
                                                className={`flex ${isOwn ? 'justify-end' : 'justify-start'} ${!showAvatar ? 'mt-1' : ''}`}
                                            >
                                                {showAvatar && (
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                                                            {messageUser?.avatar ? (
                                                                <img src={messageUser.avatar} alt={messageUser.name} className="w-full h-full rounded-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                                                                    <span className="text-xs font-medium text-primary">
                                                                        {messageUser?.name?.charAt(0).toUpperCase() || 'U'}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <span className="text-xs text-muted-foreground">
                                                            {messageUser?.name || 'Unknown'}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className={`max-w-xs lg:max-w-md ${
                                                    isOwn 
                                                        ? 'bg-primary text-primary-foreground' 
                                                        : 'bg-muted'
                                                } rounded-lg p-3 shadow-sm`}>
                                                    <p className="text-sm">{message.content}</p>
                                                    <div className={`flex items-center justify-between mt-1`}>
                                                        <p className={`text-xs ${
                                                            isOwn 
                                                                ? 'text-primary-foreground/70' 
                                                                : 'text-muted-foreground'
                                                        }`}>
                                                            {formatTime(message.created_at)}
                                                        </p>
                                                        {isOwn && (
                                                            <span className="text-xs text-primary-foreground/70">
                                                                {message.is_read ? '✓✓' : '✓'}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                        
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-border p-4">
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                disabled={isSending}
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim() || isSending}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSending ? (
                                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
