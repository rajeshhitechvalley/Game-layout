<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use App\Models\Game;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookmarkController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $category = $request->get('category', 'all');

        $bookmarks = Bookmark::with(['game'])
            ->forUser($user->id)
            ->when($category !== 'all', function($query) use ($category) {
                $query->byCategory($category);
            })
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($bookmark) {
                return [
                    'id' => $bookmark->id,
                    'game' => [
                        'id' => $bookmark->game->id,
                        'title' => $bookmark->game->title,
                        'slug' => $bookmark->game->slug,
                        'image' => $bookmark->game->image_url,
                        'category' => $bookmark->game->category,
                        'rating' => $bookmark->game->rating,
                    ],
                    'category' => $bookmark->category,
                    'notes' => $bookmark->notes,
                    'created_at' => $bookmark->created_at,
                ];
            });

        $categories = Bookmark::forUser($user->id)
                              ->distinct()
                              ->pluck('category')
                              ->filter()
                              ->values();

        return Inertia::render('Profile/Bookmarks', [
            'bookmarks' => $bookmarks,
            'categories' => $categories,
            'currentCategory' => $category,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'game_id' => 'required|exists:games,id',
                'category' => 'nullable|string|max:50',
                'notes' => 'nullable|string|max:500',
            ]);

            $user = auth()->user();

            // Check if already bookmarked
            $existing = Bookmark::where('user_id', $user->id)
                               ->where('game_id', $request->game_id)
                               ->first();

            if ($existing) {
                return back()->with('error', 'Game already bookmarked.');
            }

            $bookmark = Bookmark::create([
                'user_id' => $user->id,
                'game_id' => $request->game_id,
                'category' => $request->category ?? 'general',
                'notes' => $request->notes,
            ]);

            return back()->with('success', 'Game bookmarked!');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to bookmark game.');
        }
    }

    public function update(Request $request, Bookmark $bookmark)
    {
        if ($bookmark->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'category' => 'nullable|string|max:50',
            'notes' => 'nullable|string|max:500',
        ]);

        $bookmark->update($request->only(['category', 'notes']));

        return back()->with('success', 'Bookmark updated!');
    }

    public function destroy(Bookmark $bookmark)
    {
        if ($bookmark->user_id !== auth()->id()) {
            abort(403);
        }

        $bookmark->delete();

        return back()->with('success', 'Bookmark removed!');
    }

    public function destroyByGame($gameId)
    {
        try {
            $user = auth()->user();
            if (!$user) {
                return response()->json(['error' => 'User not authenticated'], 401);
            }

            $bookmark = Bookmark::where('user_id', $user->id)
                               ->where('game_id', $gameId)
                               ->first();

            if (!$bookmark) {
                return back()->with('error', 'Bookmark not found.');
            }

            $bookmark->delete();

            return back()->with('success', 'Bookmark removed!');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to remove bookmark.');
        }
    }
}
