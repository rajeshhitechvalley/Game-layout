<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Game::where('active', true);
        
        // Handle category filtering
        if ($request->has('category') && $request->category !== '') {
            $query->where('category', $request->category);
        }
        
        // Handle sorting
        $sort = $request->get('sort', 'created_at');
        switch ($sort) {
            case 'trending':
                $query->orderBy('plays', 'desc');
                break;
            case 'new':
                $query->orderBy('created_at', 'desc');
                break;
            case 'featured':
                $query->orderBy('featured', 'desc');
                break;
            default:
                $query->orderBy('featured', 'desc')
                      ->orderBy('created_at', 'desc');
                break;
        }
        
        $games = $query->paginate(12);

        return Inertia::render('Games/Index', [
            'games' => $games,
            'sort' => $request->get('sort'),
            'category' => $request->get('category'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Games/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:100',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'game_url' => 'nullable|url',
            'rating' => 'nullable|numeric|min:0|max:5',
            'plays' => 'nullable|integer|min:0',
            'featured' => 'boolean',
            'active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['user_id'] = auth()->id();
        $validated['rating'] = $validated['rating'] ?? 0;
        $validated['plays'] = (string) ($validated['plays'] ?? 0);
        $validated['featured'] = $validated['featured'] ?? false;
        $validated['active'] = $validated['active'] ?? true;

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('games', 'public');
            $validated['image_path'] = $imagePath;
        }

        Game::create($validated);

        return redirect()->route('games.index')
            ->with('success', 'Game created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Game $game)
    {
        return Inertia::render('Games/Show', [
            'game' => $game,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Game $game)
    {
        return Inertia::render('Games/Edit', [
            'game' => $game,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Game $game)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:100',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'game_url' => 'nullable|url',
            'rating' => 'nullable|numeric|min:0|max:5',
            'plays' => 'nullable|integer|min:0',
            'featured' => 'boolean',
            'active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['rating'] = $validated['rating'] ?? 0;
        $validated['plays'] = (string) ($validated['plays'] ?? 0);
        $validated['featured'] = $validated['featured'] ?? false;
        $validated['active'] = $validated['active'] ?? true;

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('games', 'public');
            $validated['image_path'] = $imagePath;
        }

        $game->update($validated);

        return redirect()->route('games.index')
            ->with('success', 'Game updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Game $game)
    {
        $game->delete();

        return redirect()->route('games.index')
            ->with('success', 'Game deleted successfully!');
    }

    /**
     * Play the specified game in iframe.
     */
    public function play(Game $game)
    {
        // Increment play count
        $game->increment('plays');
        
        // Get recent games (excluding current game)
        $recentGames = Game::where('active', true)
            ->where('id', '!=', $game->id)
            ->orderBy('updated_at', 'desc')
            ->take(6)
            ->get();
            
        // Get suggested games (same category, excluding current game)
        $suggestedGames = Game::where('active', true)
            ->where('category', $game->category)
            ->where('id', '!=', $game->id)
            ->orderBy('rating', 'desc')
            ->take(6)
            ->get();
            
        // Get trending games (excluding current game)
        $trendingGames = Game::where('active', true)
            ->where('id', '!=', $game->id)
            ->orderBy('plays', 'desc')
            ->take(6)
            ->get();
        
        return Inertia::render('Games/Play', [
            'game' => $game,
            'recentGames' => $recentGames,
            'suggestedGames' => $suggestedGames,
            'trendingGames' => $trendingGames,
        ]);
    }

    /**
     * API endpoint to get games for frontend
     */
    public function apiIndex(Request $request)
    {
        $query = Game::where('active', true);

        if ($request->category) {
            $query->where('category', $request->category);
        }

        if ($request->featured) {
            $query->where('featured', true);
        }

        if ($request->trending) {
            $query->orderBy('plays', 'desc');
        } else {
            $query->orderBy('featured', 'desc')->orderBy('created_at', 'desc');
        }

        $games = $query->take($request->limit ?? 12)->get();

        return response()->json($games);
    }
}
