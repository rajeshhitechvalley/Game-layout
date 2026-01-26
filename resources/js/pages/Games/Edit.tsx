import { Head, Link, useForm } from '@inertiajs/react';
import type { Game } from '@/types';

interface GameEditProps {
    game: Game;
}

export default function GameEdit({ game }: GameEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: game.title,
        description: game.description,
        category: game.category,
        image: null as File | null,
        game_url: game.game_url || '',
        rating: game.rating.toString(),
        plays: game.plays,
        featured: game.featured,
        active: game.active,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/games/${game.id}`);
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setData('image', e.target.files[0]);
        }
    }

    return (
        <>
            <Head title={`Edit ${game.title}`} />
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-2xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-4xl font-bold gradient-text">Edit Game</h1>
                            <Link
                                href={`/games/${game.id}`}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                ← Back to Game
                            </Link>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="search-input w-full"
                                    placeholder="Enter game title"
                                />
                                {errors.title && (
                                    <p className="text-destructive text-sm mt-1">{errors.title}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="search-input w-full h-32 resize-none"
                                    placeholder="Enter game description"
                                />
                                {errors.description && (
                                    <p className="text-destructive text-sm mt-1">{errors.description}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Category
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="search-input w-full"
                                >
                                    <option value="">Select a category</option>
                                    <option value="Action">Action</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="Racing">Racing</option>
                                    <option value="Puzzle">Puzzle</option>
                                    <option value="Shooter">Shooter</option>
                                    <option value="Sports">Sports</option>
                                    <option value="RPG">RPG</option>
                                    <option value=".io">.io</option>
                                </select>
                                {errors.category && (
                                    <p className="text-destructive text-sm mt-1">{errors.category}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Game Image
                                </label>
                                <div className="space-y-4">
                                    {/* Current image */}
                                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                                        <img
                                            src={game.image_url}
                                            alt="Current image"
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div>
                                            <p className="text-sm font-medium">Current image</p>
                                            <p className="text-xs text-muted-foreground">
                                                Upload a new image to replace this one
                                            </p>
                                        </div>
                                    </div>

                                    {/* New image upload */}
                                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                                        <input
                                            type="file"
                                            id="image"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="image"
                                            className="cursor-pointer inline-block"
                                        >
                                            {data.image ? (
                                                <div className="space-y-4">
                                                    <img
                                                        src={URL.createObjectURL(data.image)}
                                                        alt="Preview"
                                                        className="mx-auto max-h-48 rounded-lg"
                                                    />
                                                    <p className="text-sm text-muted-foreground">
                                                        Click to change image
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                                        </svg>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                        Click to upload new image
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        PNG, JPG, GIF up to 2MB
                                                    </p>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>
                                {errors.image && (
                                    <p className="text-destructive text-sm mt-1">{errors.image}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Game URL
                                </label>
                                <input
                                    type="url"
                                    value={data.game_url}
                                    onChange={(e) => setData('game_url', e.target.value)}
                                    className="search-input w-full"
                                    placeholder="https://example.com/game.html"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Optional: URL to the game for iframe embedding
                                </p>
                                {errors.game_url && (
                                    <p className="text-destructive text-sm mt-1">{errors.game_url}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Rating (0-5)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.rating}
                                        onChange={(e) => setData('rating', e.target.value)}
                                        className="search-input w-full"
                                        placeholder="4.5"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                    />
                                    {errors.rating && (
                                        <p className="text-destructive text-sm mt-1">{errors.rating}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Plays
                                    </label>
                                    <input
                                        type="number"
                                        value={data.plays}
                                        onChange={(e) => setData('plays', e.target.value)}
                                        className="search-input w-full"
                                        placeholder="1000"
                                        min="0"
                                    />
                                    {errors.plays && (
                                        <p className="text-destructive text-sm mt-1">{errors.plays}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={data.featured}
                                        onChange={(e) => setData('featured', e.target.checked)}
                                        className="w-4 h-4 rounded"
                                    />
                                    <span className="text-sm font-medium">Featured Game</span>
                                </label>

                                <label className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={data.active}
                                        onChange={(e) => setData('active', e.target.checked)}
                                        className="w-4 h-4 rounded"
                                    />
                                    <span className="text-sm font-medium">Active</span>
                                </label>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="play-button"
                                >
                                    {processing ? 'Updating...' : 'Update Game'}
                                </button>
                                <Link
                                    href={`/games/${game.id}`}
                                    className="px-8 py-4 rounded-full font-bold text-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-all"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
