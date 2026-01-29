import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';
import { Bookmark, Search, Edit, Trash2, Plus } from 'lucide-react';

interface Game {
    id: number;
    title: string;
    slug: string;
    image: string;
    category: string;
    rating: number;
}

interface BookmarkItem {
    id: number;
    game: Game;
    category: string;
    notes: string;
    created_at: string;
}

interface BookmarksPageProps {
    bookmarks: BookmarkItem[];
    categories: string[];
    currentCategory: string;
}

export default function BookmarksPage({ bookmarks, categories, currentCategory }: BookmarksPageProps) {
    const [selectedCategory, setSelectedCategory] = useState(currentCategory);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBookmarks = bookmarks.filter(bookmark => {
        const matchesCategory = selectedCategory === 'all' || bookmark.category === selectedCategory;
        const matchesSearch = bookmark.game.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <AppLayout>
            <Head title="Bookmarks" />
            
            <div className="container mx-auto px-4 py-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Bookmarks</h1>
                    <p className="text-muted-foreground">Save and organize your favorite games</p>
                </div>

                {/* Filters */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search bookmarks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>
                    <div className="max-w-xs">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="all">All Categories</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Bookmarks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredBookmarks.map((bookmark) => (
                        <div key={bookmark.id} className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative">
                                <Link href={`/games/${bookmark.game.slug}/play`}>
                                    <img
                                        src={bookmark.game.image}
                                        alt={bookmark.game.title}
                                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </Link>
                                <div className="absolute top-2 left-2">
                                    <span className="px-2 py-1 bg-background/90 backdrop-blur-sm text-xs font-medium rounded">
                                        {bookmark.category}
                                    </span>
                                </div>
                                <div className="absolute top-2 right-2">
                                    <button className="p-2 bg-background/90 backdrop-blur-sm rounded-lg hover:bg-background">
                                        <Bookmark className="w-4 h-4 text-primary fill-current" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <Link href={`/games/${bookmark.game.slug}/play`}>
                                    <h3 className="font-bold mb-1 hover:text-primary transition-colors">
                                        {bookmark.game.title}
                                    </h3>
                                </Link>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs text-muted-foreground">{bookmark.game.category}</span>
                                    <span className="text-xs text-muted-foreground">•</span>
                                    <span className="text-xs text-muted-foreground">⭐ {bookmark.game.rating}</span>
                                </div>
                                {bookmark.notes && (
                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                        {bookmark.notes}
                                    </p>
                                )}
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">
                                        Bookmarked {new Date(bookmark.created_at).toLocaleDateString()}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <button className="p-1 hover:bg-muted rounded">
                                            <Edit className="w-3 h-3" />
                                        </button>
                                        <button className="p-1 hover:bg-muted rounded text-red-500">
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredBookmarks.length === 0 && (
                    <div className="text-center py-12">
                        <Bookmark className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No bookmarks found</h3>
                        <p className="text-muted-foreground mb-4">Start bookmarking games you want to play later!</p>
                        <Link
                            href="/games"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                        >
                            <Plus className="w-4 h-4" />
                            Browse Games
                        </Link>
                    </div>
                )}

                {/* Stats */}
                {bookmarks.length > 0 && (
                    <div className="mt-8 p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Total bookmarks: <span className="font-medium text-foreground">{bookmarks.length}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Categories: <span className="font-medium text-foreground">{categories.length}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
