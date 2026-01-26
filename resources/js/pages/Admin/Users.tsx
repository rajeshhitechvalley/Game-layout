import { Head, Link } from '@inertiajs/react';
import { Users, Shield, ToggleLeft, ToggleRight, Mail, Calendar } from 'lucide-react';

interface AdminUsersProps {
    users: {
        data: any[];
        links: any[];
        meta: any;
    };
}

export default function AdminUsers({ users }: AdminUsersProps) {
    return (
        <>
            <Head title="Manage Users" />
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-bold gradient-text mb-2">
                                Manage Users
                            </h1>
                            <p className="text-muted-foreground">
                                Manage user accounts and permissions
                            </p>
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
                        <div className="flex justify-center mt-8 gap-2">
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
            </div>
        </>
    );
}
