<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function dashboard()
    {
        $stats = [
            'total_games' => Game::count(),
            'active_games' => Game::where('active', true)->count(),
            'featured_games' => Game::where('featured', true)->count(),
            'total_users' => User::count(),
            'recent_games' => Game::latest()->take(5)->get(),
            'popular_games' => Game::orderBy('plays', 'desc')->take(5)->get(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
        ]);
    }

    /**
     * Display all games for admin management.
     */
    public function games()
    {
        $games = Game::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Games', [
            'games' => $games,
        ]);
    }

    /**
     * Toggle game active status.
     */
    public function toggleGameStatus(Game $game)
    {
        $game->active = !$game->active;
        $game->save();

        return back()->with('success', 'Game status updated successfully!');
    }

    /**
     * Toggle game featured status.
     */
    public function toggleGameFeatured(Game $game)
    {
        $game->featured = !$game->featured;
        $game->save();

        return back()->with('success', 'Game featured status updated successfully!');
    }

    /**
     * Delete a game.
     */
    public function deleteGame(Game $game)
    {
        $game->delete();

        return redirect()->route('admin.games')
            ->with('success', 'Game deleted successfully!');
    }

    /**
     * Display users management.
     */
    public function users()
    {
        $users = User::orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    /**
     * Toggle user admin status.
     */
    public function toggleUserAdmin(User $user)
    {
        // Prevent admin from removing their own admin status
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot modify your own admin status!');
        }

        $user->is_admin = !$user->is_admin;
        $user->save();

        return back()->with('success', 'User admin status updated successfully!');
    }
}
