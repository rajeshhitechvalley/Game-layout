<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\Game;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        
        $favorites = Favorite::with(['game'])
            ->forUser($user->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($favorite) {
                return [
                    'id' => $favorite->id,
                    'game' => [
                        'id' => $favorite->game->id,
                        'title' => $favorite->game->title,
                        'slug' => $favorite->game->slug,
                        'image' => $favorite->game->image_url,
                        'category' => $favorite->game->category,
                        'rating' => $favorite->game->rating,
                        'plays' => $favorite->game->plays_formatted,
                    ],
                    'favorited_at' => $favorite->created_at,
                ];
            });

        return Inertia::render('Profile/Favorites', [
            'favorites' => $favorites,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'game_id' => 'required|exists:games,id',
            ]);

            $user = auth()->user();

            // Check if already favorited
            $existing = Favorite::where('user_id', $user->id)
                               ->where('game_id', $request->game_id)
                               ->first();

            if ($existing) {
                return back()->with('error', 'Game already in favorites.');
            }

            $favorite = Favorite::create([
                'user_id' => $user->id,
                'game_id' => $request->game_id,
            ]);

            return back()->with('success', 'Game added to favorites!');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to add to favorites.');
        }
    }

    public function destroy(Favorite $favorite)
    {
        if ($favorite->user_id !== auth()->id()) {
            abort(403);
        }

        $favorite->delete();

        return back()->with('success', 'Game removed from favorites!');
    }

    public function toggle(Request $request)
    {
        try {
            $request->validate([
                'game_id' => 'required|exists:games,id',
            ]);

            $user = auth()->user();
            $gameId = $request->game_id;

            $favorite = Favorite::where('user_id', $user->id)
                               ->where('game_id', $gameId)
                               ->first();

            if ($favorite) {
                $favorite->delete();
                return back()->with('success', 'Removed from favorites');
            } else {
                $favorite = Favorite::create([
                    'user_id' => $user->id,
                    'game_id' => $gameId,
                ]);
                return back()->with('success', 'Added to favorites');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to toggle favorite.');
        }
    }
}
