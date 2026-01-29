import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { 
    ArrowLeft, 
    Save, 
    Gamepad2, 
    Upload,
    X,
    Star,
    Eye
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Games', href: '/games' },
    { title: 'Create Game', href: '/games/create' },
];

export default function GameCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category: '',
        image: null as File | null,
        game_url: '',
        rating: '',
        plays: '',
        featured: false,
        active: true,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/games');
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setData('image', e.target.files[0]);
        }
    }

    function removeImage() {
        setData('image', null);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Game" />
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold gradient-text">Create New Game</h1>
                        <p className="text-muted-foreground">Add a new game to your collection</p>
                    </div>
                </div>

                {/* Form */}
                <form id="game-form" onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Information */}
                            <div className="bg-card rounded-xl border border-border p-6">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <Gamepad2 className="w-5 h-5 text-gaming-orange" />
                                    Basic Information
                                </h2>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Game Title *</label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Enter game title"
                                            required
                                        />
                                        {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Description *</label>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Describe the game..."
                                            required
                                        />
                                        {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Category *</label>
                                        <select
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                                            required
                                        >
                                            <option value="" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">Select a category</option>
                                            <option value="Action" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">Action</option>
                                            <option value="Adventure" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">Adventure</option>
                                            <option value="RPG" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">RPG</option>
                                            <option value="Puzzle" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">Puzzle</option>
                                            <option value="Racing" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">Racing</option>
                                            <option value="Sports" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">Sports</option>
                                            <option value="Shooter" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">Shooter</option>
                                            <option value="Strategy" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">Strategy</option>
                                            <option value="Simulation" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">Simulation</option>
                                            <option value="Creative" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">Creative</option>
                                        </select>
                                        {errors.category && <p className="text-sm text-destructive mt-1">{errors.category}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Game URL</label>
                                        <input
                                            type="url"
                                            value={data.game_url}
                                            onChange={(e) => setData('game_url', e.target.value)}
                                            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="https://example.com/game"
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">Optional: URL to play the game in an iframe</p>
                                        {errors.game_url && <p className="text-sm text-destructive mt-1">{errors.game_url}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Game Stats */}
                            <div className="bg-card rounded-xl border border-border p-6">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-gaming-yellow" />
                                    Game Statistics
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Rating</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            value={data.rating}
                                            onChange={(e) => setData('rating', e.target.value)}
                                            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="0.0 - 5.0"
                                        />
                                        {errors.rating && <p className="text-sm text-destructive mt-1">{errors.rating}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Initial Plays</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.plays}
                                            onChange={(e) => setData('plays', e.target.value)}
                                            className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="0"
                                        />
                                        {errors.plays && <p className="text-sm text-destructive mt-1">{errors.plays}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Game Image */}
                            <div className="bg-card rounded-xl border border-border p-6">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <Upload className="w-5 h-5 text-gaming-green" />
                                    Game Image
                                </h2>
                                
                                <div className="space-y-4">
                                    {data.image ? (
                                        <div className="relative">
                                            <img
                                                src={URL.createObjectURL(data.image)}
                                                alt="Game preview"
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                                            <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                            <p className="text-sm text-muted-foreground mb-2">
                                                Click to upload or drag and drop
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                PNG, JPG, GIF up to 2MB
                                            </p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                                id="image-upload"
                                            />
                                            <label
                                                htmlFor="image-upload"
                                                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg cursor-pointer transition-colors"
                                            >
                                                <Upload className="w-4 h-4" />
                                                Choose File
                                            </label>
                                        </div>
                                    )}
                                    {errors.image && <p className="text-sm text-destructive mt-1">{errors.image}</p>}
                                </div>
                            </div>

                            {/* Game Settings */}
                            <div className="bg-card rounded-xl border border-border p-6">
                                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <Eye className="w-5 h-5 text-gaming-blue" />
                                    Game Settings
                                </h2>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <label className="text-sm font-medium">Featured Game</label>
                                            <p className="text-xs text-muted-foreground">Show on homepage</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setData('featured', !data.featured)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                data.featured ? 'bg-gaming-orange' : 'bg-muted'
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                                                    data.featured ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                            />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <label className="text-sm font-medium">Active</label>
                                            <p className="text-xs text-muted-foreground">Visible to users</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setData('active', !data.active)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                data.active ? 'bg-gaming-green' : 'bg-muted'
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                                                    data.active ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-card rounded-xl border border-border p-6">
                                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                                <div className="space-y-2">
                                    <Link
                                        href="/games"
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        form="game-form"
                                        disabled={processing}
                                        className="w-full play-button flex items-center justify-center gap-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        {processing ? 'Creating...' : 'Create Game'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
