import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Search, UserPlus, Send } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    is_online?: boolean;
}

interface UserSearchProps {
    onUserSelect?: (user: User) => void;
}

export default function UserSearch({ onUserSelect }: UserSearchProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        
        if (query.length < 2) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        setIsSearching(true);
        
        try {
            const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setSearchResults(data.users || []);
            setShowResults(true);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
            setShowResults(true);
        } finally {
            setIsSearching(false);
        }
    };

    const handleAddFriend = async (userId: number) => {
        try {
            await router.post('/friends', { friend_id: userId });
            // Remove from search results after sending request
            setSearchResults(prev => prev.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    };

    const handleUserClick = (user: User) => {
        setShowResults(false);
        setSearchQuery('');
        setSearchResults([]);
        if (onUserSelect) {
            onUserSelect(user);
        }
    };

    return (
        <div className="relative">
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {isSearching && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                    <div className="p-2 border-b border-gray-700">
                        <div className="flex items-center gap-2 px-3 py-2">
                            <Search className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-300">
                                Search Results ({searchResults.length})
                            </span>
                        </div>
                    </div>
                    {searchResults.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between p-3 hover:bg-gray-800 cursor-pointer border-b border-gray-700 last:border-b-0 transition-all duration-200"
                        >
                            <div 
                                className="flex items-center gap-3 flex-1"
                                onClick={() => handleUserClick(user)}
                            >
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-900/20 to-blue-900/10 flex items-center justify-center ring-2 ring-blue-500/20">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover ring-2 ring-offset-2 ring-gray-900" />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-900/30 to-blue-900/20 flex items-center justify-center">
                                                <span className="text-sm font-semibold text-blue-300">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                        {/* Online status indicator */}
                                        {user.is_online && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold text-gray-100 truncate">{user.name}</h3>
                                        <p className="text-sm text-gray-400 truncate">{user.email}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {user.is_online && (
                                                <div className="flex items-center gap-1">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span className="text-xs text-green-400 font-medium">Online</span>
                                                </div>
                                            )}
                                            {!user.is_online && (
                                                <div className="flex items-center gap-1">
                                                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                                    <span className="text-xs text-gray-500 font-medium">Offline</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddFriend(user.id);
                                    }}
                                    className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                                    title="Add friend"
                                >
                                    <UserPlus className="w-4 h-4 text-white" />
                                </button>
                                <button
                                    onClick={() => handleUserClick(user)}
                                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all duration-200"
                                    title="Send message"
                                >
                                    <Send className="w-4 h-4 text-gray-300" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No Results */}
            {showResults && searchQuery.length >= 2 && !isSearching && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 p-3">
                    <p className="text-sm text-gray-300 text-center">
                        {searchQuery.length < 2 ? 'Type at least 2 characters to search' : 'No users found'}
                    </p>
                </div>
            )}

            {/* Click outside to close */}
            {showResults && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowResults(false)}
                />
            )}
        </div>
    );
}
