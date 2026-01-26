<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the user dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // User statistics
        $userStats = [
            'total_games_played' => 0, // This would come from game plays table
            'favorite_category' => 'Action', // Calculate from user preferences
            'total_play_time' => '24 hours', // Calculate from play sessions
            'achievements_unlocked' => 12,
            'level' => 5,
            'experience_points' => 2450,
        ];

        // Recent games played (mock data for now)
        $recentGames = Game::where('active', true)
            ->orderBy('created_at', 'desc')
            ->take(6)
            ->get();

        // User achievements
        $achievements = [
            [
                'id' => 1,
                'title' => 'First Victory',
                'description' => 'Win your first game',
                'icon' => '🏆',
                'unlocked' => true,
                'unlocked_at' => '2024-01-15',
            ],
            [
                'id' => 2,
                'title' => 'Speed Demon',
                'description' => 'Complete a race in under 2 minutes',
                'icon' => '🏃',
                'unlocked' => true,
                'unlocked_at' => '2024-01-18',
            ],
            [
                'id' => 3,
                'title' => 'Puzzle Master',
                'description' => 'Solve 50 puzzles',
                'icon' => '🧩',
                'unlocked' => false,
                'progress' => 35,
                'total' => 50,
            ],
            [
                'id' => 4,
                'title' => 'Explorer',
                'description' => 'Play games from 10 different categories',
                'icon' => '🗺️',
                'unlocked' => false,
                'progress' => 7,
                'total' => 10,
            ],
        ];

        // Recommended games based on user preferences
        $recommendedGames = Game::where('active', true)
            ->where('featured', true)
            ->inRandomOrder()
            ->take(4)
            ->get();

        // Leaderboard (top players)
        $leaderboard = User::withCount('games')
            ->orderBy('games_count', 'desc')
            ->take(10)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'games_count' => $user->games_count ?? 0,
                    'level' => rand(1, 50), // Mock data
                    'avatar' => null,
                ];
            });

        // Activity feed
        $activities = [
            [
                'id' => 1,
                'type' => 'achievement',
                'message' => 'Unlocked achievement "Speed Demon"',
                'timestamp' => '2 hours ago',
                'icon' => '🏆',
            ],
            [
                'id' => 2,
                'type' => 'game_played',
                'message' => 'Played "Turbo Rush X" for 45 minutes',
                'timestamp' => '5 hours ago',
                'icon' => '🎮',
            ],
            [
                'id' => 3,
                'type' => 'level_up',
                'message' => 'Reached level 5!',
                'timestamp' => '1 day ago',
                'icon' => '⭐',
            ],
            [
                'id' => 4,
                'type' => 'friend_request',
                'message' => 'John Doe sent you a friend request',
                'timestamp' => '2 days ago',
                'icon' => '👥',
            ],
        ];

        return Inertia::render('dashboard', [
            'userStats' => $userStats,
            'recentGames' => $recentGames,
            'achievements' => $achievements,
            'recommendedGames' => $recommendedGames,
            'leaderboard' => $leaderboard,
            'activities' => $activities,
        ]);
    }
}
