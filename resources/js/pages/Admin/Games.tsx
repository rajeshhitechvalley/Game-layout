import { Head, Link } from '@inertiajs/react';
import { Gamepad2, Edit, Trash2, Eye, Star, ToggleLeft, ToggleRight } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface AdminGamesProps {
    games: {
        data: any[];
        links: any[];
        meta: any;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Manage Games', href: '/admin/games' },
];

export default function AdminGames({ games }: AdminGamesProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Games" />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold gradient-text">Manage Games</h1>
                        <p className="text-muted-foreground">
                            Manage all games in your platform
                        </p>
                    </div>
                    <Link
                        href="/games/create"
                        className="play-button flex items-center gap-2"
                    >
                        <Gamepad2 className="w-5 h-5" />
                        Add New Game
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-card p-6 rounded-xl border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg gradient-bg-primary flex items-center justify-center">
                                <Gamepad2 className="w-6 h-6 text-background" />
                            </div>
                            <span className="text-sm text-muted-foreground">Total</span>
                        </div>
                        <h3 className="text-2xl font-bold">{games.meta?.total || games.data.length}</h3>
                        <p className="text-muted-foreground">Total Games</p>
                    </div>

                    <div className="bg-card p-6 rounded-xl border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                                <Eye className="w-6 h-6 text-green-500" />
                            </div>
                            <span className="text-sm text-muted-foreground">Active</span>
                        </div>
                        <h3 className="text-2xl font-bold">
                            {games.data.filter(g => g.active).length}
                        </h3>
                        <p className="text-muted-foreground">Active Games</p>
                    </div>

                    <div className="bg-card p-6 rounded-xl border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-gaming-orange/20 flex items-center justify-center">
                                <Star className="w-6 h-6 text-gaming-orange" />
                            </div>
                            <span className="text-sm text-muted-foreground">Featured</span>
                        </div>
                        <h3 className="text-2xl font-bold">
                            {games.data.filter(g => g.featured).length}
                        </h3>
                        <p className="text-muted-foreground">Featured Games</p>
                    </div>

                    <div className="bg-card p-6 rounded-xl border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <Gamepad2 className="w-6 h-6 text-blue-500" />
                            </div>
                            <span className="text-sm text-muted-foreground">Categories</span>
                        </div>
                        <h3 className="text-2xl font-bold">
                            {[...new Set(games.data.map(g => g.category))].length}
                        </h3>
                        <p className="text-muted-foreground">Categories</p>
                    </div>
                </div>

                {/* Games Table */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Game</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Rating</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Plays</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {games.data.map((game) => (
                                    <tr key={game.id} className="hover:bg-muted/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={game.image_url}
                                                    alt={game.title}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <h4 className="font-semibold">{game.title}</h4>
                                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                                        {game.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-muted rounded-full text-xs">
                                                {game.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-gaming-yellow fill-gaming-yellow" />
                                                <span className="font-semibold">{game.rating}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-muted-foreground">
                                                {game.plays_formatted || game.plays}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/games/${game.id}/toggle-status`}
                                                    className="flex items-center gap-1 text-sm"
                                                >
                                                    {game.active ? (
                                                        <>
                                                            <ToggleRight className="w-5 h-5 text-green-500" />
                                                            <span className="text-green-500">Active</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ToggleLeft className="w-5 h-5 text-red-500" />
                                                            <span className="text-red-500">Inactive</span>
                                                        </>
                                                    )}
                                                </Link>
                                                {game.featured && (
                                                    <span className="px-2 py-1 bg-gaming-orange/20 text-gaming-orange rounded-full text-xs font-bold">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/games/${game.id}`}
                                                    target="_blank"
                                                    className="action-button-sm"
                                                    title="View Game"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/games/${game.id}/edit`}
                                                    className="action-button-sm"
                                                    title="Edit Game"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/games/${game.id}/toggle-featured`}
                                                    className="action-button-sm"
                                                    title={game.featured ? "Remove from Featured" : "Make Featured"}
                                                >
                                                    <Star className={`w-4 h-4 ${game.featured ? 'text-background fill-current' : 'text-background'}`} />
                                                </Link>
                                                <Link
                                                    href={`/admin/games/${game.id}/delete`}
                                                    className="action-button-sm bg-destructive hover:bg-destructive/90"
                                                    style={{backgroundImage: 'none'}}
                                                    title="Delete Game"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {games.data.length === 0 && (
                        <div className="text-center py-12">
                            <Gamepad2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No games found</h3>
                            <p className="text-muted-foreground mb-4">
                                Get started by creating your first game!
                            </p>
                            <Link
                                href="/games/create"
                                className="play-button inline-flex"
                            >
                                Create Game
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {games.links && games.links.length > 3 && (
                    <div className="flex justify-center mt-8 gap-2">
                        {games.links.map((link: any, index: number) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-4 py-2 rounded-lg ${
                                    link.active
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
