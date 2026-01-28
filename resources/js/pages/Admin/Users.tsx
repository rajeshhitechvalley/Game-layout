import { Head, Link } from '@inertiajs/react';
import { Users, Shield, ToggleLeft, ToggleRight, Mail, Calendar, UserPlus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface AdminUsersProps {
    users: {
        data: any[];
        links: any[];
        meta: any;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Manage Users', href: '/admin/users' },
];

export default function AdminUsers({ users }: AdminUsersProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Users" />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold gradient-text">Manage Users</h1>
                        <p className="text-muted-foreground">
                            Manage user accounts and permissions
                        </p>
                    </div>
                    <Link
                        href="/admin/users/create"
                        className="play-button flex items-center gap-2"
                    >
                        <UserPlus className="w-5 h-5" />
                        Add New User
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-card p-6 rounded-xl border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg gradient-bg-primary flex items-center justify-center">
                                <Users className="w-6 h-6 text-background" />
                            </div>
                            <span className="text-sm text-muted-foreground">Total</span>
                        </div>
                        <h3 className="text-2xl font-bold">{users.meta?.total || users.data.length}</h3>
                        <p className="text-muted-foreground">Total Users</p>
                    </div>

                    <div className="bg-card p-6 rounded-xl border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-gaming-orange/20 flex items-center justify-center">
                                <Shield className="w-6 h-6 text-gaming-orange" />
                            </div>
                            <span className="text-sm text-muted-foreground">Admins</span>
                        </div>
                        <h3 className="text-2xl font-bold">
                            {users.data.filter(u => u.is_admin).length}
                        </h3>
                        <p className="text-muted-foreground">Admin Users</p>
                    </div>

                    <div className="bg-card p-6 rounded-xl border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                                <Users className="w-6 h-6 text-green-500" />
                            </div>
                            <span className="text-sm text-muted-foreground">Regular</span>
                        </div>
                        <h3 className="text-2xl font-bold">
                            {users.data.filter(u => !u.is_admin).length}
                        </h3>
                        <p className="text-muted-foreground">Regular Users</p>
                    </div>

                    <div className="bg-card p-6 rounded-xl border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-500" />
                            </div>
                            <span className="text-sm text-muted-foreground">New</span>
                        </div>
                        <h3 className="text-2xl font-bold">
                            {users.data.filter(u => {
                                const createdAt = new Date(u.created_at);
                                const weekAgo = new Date();
                                weekAgo.setDate(weekAgo.getDate() - 7);
                                return createdAt > weekAgo;
                            }).length}
                        </h3>
                        <p className="text-muted-foreground">This Week</p>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Joined</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full gradient-bg-primary flex items-center justify-center">
                                                    <span className="text-background font-bold">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">{user.name}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        ID: {user.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm">{user.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm">
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {user.is_admin ? (
                                                    <>
                                                        <Shield className="w-4 h-4 text-gaming-orange" />
                                                        <span className="px-2 py-1 bg-gaming-orange/20 text-gaming-orange rounded-full text-xs font-bold">
                                                            Admin
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Users className="w-4 h-4 text-muted-foreground" />
                                                        <span className="px-2 py-1 bg-muted rounded-full text-xs">
                                                            User
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/users/${user.id}/toggle-admin`}
                                                    className="flex items-center gap-1 text-sm"
                                                >
                                                    {user.is_admin ? (
                                                        <>
                                                            <ToggleRight className="w-5 h-5 text-gaming-orange" />
                                                            <span className="text-gaming-orange">Admin</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ToggleLeft className="w-5 h-5 text-muted-foreground" />
                                                            <span className="text-muted-foreground">User</span>
                                                        </>
                                                    )}
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {users.data.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No users found</h3>
                            <p className="text-muted-foreground">
                                Users will appear here when they register.
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {users.links && users.links.length > 3 && (
                    <div className="flex justify-center gap-2">
                        {users.links.map((link: any, index: number) => (
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
