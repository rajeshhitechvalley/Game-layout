import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Users, UserPlus, Check, X, Search } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    is_online?: boolean;
    friendship_date?: string;
    requested_at?: string;
}

interface FriendsPageProps {
    friends: User[];
    pendingRequests: User[];
    sentRequests: User[];
}

export default function FriendsPage({ friends, pendingRequests, sentRequests }: FriendsPageProps) {
    const [activeTab, setActiveTab] = useState<'friends' | 'pending' | 'sent'>('friends');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFriends = friends.filter(friend =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredPending = pendingRequests.filter(request =>
        request.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredSent = sentRequests.filter(request =>
        request.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AppLayout>
            <Head title="Friends" />
            
            <div className="container mx-auto px-4 py-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Friends</h1>
                    <p className="text-muted-foreground">Connect and play with friends</p>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search friends..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-border mb-6">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('friends')}
                            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'friends'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Friends ({friends.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'pending'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Pending ({pendingRequests.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('sent')}
                            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'sent'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Sent ({sentRequests.length})
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="grid gap-4">
                    {activeTab === 'friends' && (
                        <>
                            {filteredFriends.length === 0 ? (
                                <div className="text-center py-12">
                                    <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium mb-2">No friends yet</h3>
                                    <p className="text-muted-foreground mb-4">Start adding friends to play together!</p>
                                    <Link
                                        href="/games"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                                    >
                                        <UserPlus className="w-4 h-4" />
                                        Find Friends
                                    </Link>
                                </div>
                            ) : (
                                filteredFriends.map((friend) => (
                                    <div key={friend.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                                {friend.avatar ? (
                                                    <img src={friend.avatar} alt={friend.name} className="w-full h-full rounded-full object-cover" />
                                                ) : (
                                                    <Users className="w-6 h-6 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{friend.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {friend.is_online ? 'Online' : 'Offline'} • Friends since {friend.friendship_date}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 rounded-lg hover:bg-muted">
                                                <Users className="w-4 h-4" />
                                            </button>
                                            <Link
                                                href={`/messages/${friend.id}`}
                                                className="p-2 rounded-lg hover:bg-muted"
                                            >
                                                Message
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            )}
                        </>
                    )}

                    {activeTab === 'pending' && (
                        <>
                            {filteredPending.length === 0 ? (
                                <div className="text-center py-12">
                                    <UserPlus className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium mb-2">No pending requests</h3>
                                    <p className="text-muted-foreground">You don't have any friend requests waiting.</p>
                                </div>
                            ) : (
                                filteredPending.map((request) => (
                                    <div key={request.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                                {request.avatar ? (
                                                    <img src={request.avatar} alt={request.name} className="w-full h-full rounded-full object-cover" />
                                                ) : (
                                                    <Users className="w-6 h-6 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{request.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Requested {request.requested_at}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <form method="POST" action={`/friends/${request.id}/accept`} className="inline">
                                                <button
                                                    type="submit"
                                                    className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                            </form>
                                            <form method="POST" action={`/friends/${request.id}/reject`} className="inline">
                                                <button
                                                    type="submit"
                                                    className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                ))
                            )}
                        </>
                    )}

                    {activeTab === 'sent' && (
                        <>
                            {filteredSent.length === 0 ? (
                                <div className="text-center py-12">
                                    <UserPlus className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium mb-2">No sent requests</h3>
                                    <p className="text-muted-foreground">You haven't sent any friend requests.</p>
                                </div>
                            ) : (
                                filteredSent.map((request) => (
                                    <div key={request.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                                {request.avatar ? (
                                                    <img src={request.avatar} alt={request.name} className="w-full h-full rounded-full object-cover" />
                                                ) : (
                                                    <Users className="w-6 h-6 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{request.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Requested {request.requested_at}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Pending
                                        </div>
                                    </div>
                                ))
                            )}
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
