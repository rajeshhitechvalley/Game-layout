import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { MessageSquare, Search, Send } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
}

interface Message {
    content: string;
    created_at: string;
    is_read: boolean;
    sender_id: number;
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
    const [searchQuery, setSearchQuery] = useState('');

    const filteredConversations = conversations.filter(conversation =>
        conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AppLayout>
            <Head title="Messages" />
            
            <div className="container mx-auto px-4 py-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Messages</h1>
                    <p className="text-muted-foreground">Chat with friends and other players</p>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
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
