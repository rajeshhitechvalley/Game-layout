<?php

namespace App\Http\Controllers\Social;

use App\Http\Controllers\Controller;
use App\Models\Leaderboard;
use App\Models\Game;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    public function index(Request $request)
    {
        $gameId = $request->get('game_id');
        $type = $request->get('type', 'global'); // global, game, personal

        $leaderboard = match($type) {
            'game' => $this->getGameLeaderboard($gameId),
            'personal' => $this->getPersonalLeaderboard(),
            default => $this->getGlobalLeaderboard(),
        };

        $games = Game::where('active', true)
                    ->orderBy('title')
                    ->get(['id', 'title', 'slug']);

        return Inertia::render('Social/Leaderboard', [
            'leaderboard' => $leaderboard,
            'games' => $games,
            'currentGame' => $gameId ? Game::find($gameId) : null,
            'type' => $type,
        ]);
    }

    private function getGlobalLeaderboard()
    {
        return Leaderboard::with(['user', 'game'])
            ->selectRaw('user_id, SUM(score) as total_score, COUNT(*) as games_played')
            ->groupBy('user_id')
            ->orderBy('total_score', 'desc')
            ->limit(100)
            ->get()
            ->map(function($entry, $index) {
                return [
                    'rank' => $index + 1,
                    'user' => [
                        'id' => $entry->user->id,
                        'name' => $entry->user->name,
                        'avatar' => $entry->user->avatar_url ?? null,
                    ],
                    'total_score' => $entry->total_score,
                    'games_played' => $entry->games_played,
                ];
            });
    }

    private function getGameLeaderboard($gameId)
    {
        return Leaderboard::with(['user', 'game'])
            ->where('game_id', $gameId)
            ->orderBy('score', 'desc')
            ->orderBy('played_at', 'asc')
            ->limit(100)
            ->get()
            ->map(function($entry, $index) {
                return [
                    'rank' => $index + 1,
                    'user' => [
                        'id' => $entry->user->id,
                        'name' => $entry->user->name,
                        'avatar' => $entry->user->avatar_url ?? null,
                    ],
                    'score' => $entry->score,
                    'played_at' => $entry->played_at,
                    'game' => [
                        'id' => $entry->game->id,
                        'title' => $entry->game->title,
                        'slug' => $entry->game->slug,
                    ],
                ];
            });
    }

    private function getPersonalLeaderboard()
    {
        $userId = auth()->id();
        
        return Leaderboard::with(['user', 'game'])
            ->where('user_id', $userId)
            ->orderBy('score', 'desc')
            ->orderBy('played_at', 'desc')
            ->limit(50)
            ->get()
            ->map(function($entry, $index) {
                return [
                    'rank' => $index + 1,
                    'user' => [
                        'id' => $entry->user->id,
                        'name' => $entry->user->name,
                        'avatar' => $entry->user->avatar_url ?? null,
                    ],
                    'score' => $entry->score,
                    'played_at' => $entry->played_at,
                    'game' => [
                        'id' => $entry->game->id,
                        'title' => $entry->game->title,
                        'slug' => $entry->game->slug,
                    ],
                ];
            });
    }

    public function store(Request $request)
    {
        $request->validate([
            'game_id' => 'required|exists:games,id',
            'score' => 'required|integer|min:0',
        ]);

        $userId = auth()->id();

        // Check if this is a new high score for this game
        $existingScore = Leaderboard::where('user_id', $userId)
                                   ->where('game_id', $request->game_id)
                                   ->orderBy('score', 'desc')
                                   ->first();

        if (!$existingScore || $request->score > $existingScore->score) {
            Leaderboard::create([
                'user_id' => $userId,
                'game_id' => $request->game_id,
                'score' => $request->score,
                'played_at' => now(),
            ]);

            return back()->with('success', 'New high score recorded!');
        }

        return back()->with('info', 'Score recorded. Keep trying to beat your high score!');
    }
}
