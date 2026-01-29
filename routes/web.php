<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\GameController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    // Get featured game (fallback to first active game if none featured)
    $featuredGame = \App\Models\Game::where('featured', true)
        ->where('active', true)
        ->first();

    if (!$featuredGame) {
        $featuredGame = \App\Models\Game::where('active', true)
            ->first();
    }

    // Get trending games (by plays)
    $trendingGames = \App\Models\Game::where('active', true)
        ->orderBy('plays', 'desc')
        ->take(6)
        ->get();

    // Get new games (by created_at)
    $newGames = \App\Models\Game::where('active', true)
        ->orderBy('created_at', 'desc')
        ->take(6)
        ->get();

    // Get action & adventure games
    $actionGames = \App\Models\Game::where('active', true)
        ->whereIn('category', ['Action', 'Adventure'])
        ->orderBy('featured', 'desc')
        ->orderBy('created_at', 'desc')
        ->take(6)
        ->get();

    // Add bookmark and favorite status for authenticated users
    if (auth()->check()) {
        $userId = auth()->id();
        
        // Add status to featured game
        if ($featuredGame) {
            $featuredGame->is_bookmarked = \App\Models\Bookmark::where('user_id', $userId)
                                                          ->where('game_id', $featuredGame->id)
                                                          ->exists();
            $featuredGame->is_favorited = \App\Models\Favorite::where('user_id', $userId)
                                                          ->where('game_id', $featuredGame->id)
                                                          ->exists();
        }
        
        // Add status to trending games
        $trendingGames->transform(function ($game) use ($userId) {
            $game->is_bookmarked = \App\Models\Bookmark::where('user_id', $userId)
                                                          ->where('game_id', $game->id)
                                                          ->exists();
            $game->is_favorited = \App\Models\Favorite::where('user_id', $userId)
                                                          ->where('game_id', $game->id)
                                                          ->exists();
            return $game;
        });
        
        // Add status to new games
        $newGames->transform(function ($game) use ($userId) {
            $game->is_bookmarked = \App\Models\Bookmark::where('user_id', $userId)
                                                          ->where('game_id', $game->id)
                                                          ->exists();
            $game->is_favorited = \App\Models\Favorite::where('user_id', $userId)
                                                          ->where('game_id', $game->id)
                                                          ->exists();
            return $game;
        });
        
        // Add status to action games
        $actionGames->transform(function ($game) use ($userId) {
            $game->is_bookmarked = \App\Models\Bookmark::where('user_id', $userId)
                                                          ->where('game_id', $game->id)
                                                          ->exists();
            $game->is_favorited = \App\Models\Favorite::where('user_id', $userId)
                                                          ->where('game_id', $game->id)
                                                          ->exists();
            return $game;
        });
    }

    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'featuredGame' => $featuredGame,
        'trendingGames' => $trendingGames,
        'newGames' => $newGames,
        'actionGames' => $actionGames,
    ]);
})->name('home');

Route::get('/single', function () {
    return Inertia::render('single', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('single');

// Game routes
Route::get('/games', [GameController::class, 'index'])->name('games.index');
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/games/create', [GameController::class, 'create'])->name('games.create');
    Route::post('/games', [GameController::class, 'store'])->name('games.store');
    Route::get('/games/{game}/edit', [GameController::class, 'edit'])->name('games.edit');
    Route::put('/games/{game}', [GameController::class, 'update'])->name('games.update');
    Route::delete('/games/{game}', [GameController::class, 'destroy'])->name('games.destroy');
});
Route::get('/games/{game}', [GameController::class, 'show'])->name('games.show');
Route::get('/games/{game}/play', [GameController::class, 'play'])->name('games.play');
Route::get('/api/games', [GameController::class, 'apiIndex'])->name('games.api.index');

// Admin routes
Route::middleware(['admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/games', [AdminController::class, 'games'])->name('games');
    Route::get('/games/{game}/toggle-status', [AdminController::class, 'toggleGameStatus'])->name('games.toggle-status');
    Route::get('/games/{game}/toggle-featured', [AdminController::class, 'toggleGameFeatured'])->name('games.toggle-featured');
    Route::delete('/games/{game}', [AdminController::class, 'deleteGame'])->name('games.delete');
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::get('/users/{user}/toggle-admin', [AdminController::class, 'toggleUserAdmin'])->name('users.toggle-admin');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Social routes
    Route::prefix('social')->name('social.')->group(function () {
        Route::get('/friends', [\App\Http\Controllers\Social\FriendController::class, 'index'])->name('friends.index');
        Route::post('/friends', [\App\Http\Controllers\Social\FriendController::class, 'store'])->name('friends.store');
        Route::post('/friends/{friend}/accept', [\App\Http\Controllers\Social\FriendController::class, 'accept'])->name('friends.accept');
        Route::post('/friends/{friend}/reject', [\App\Http\Controllers\Social\FriendController::class, 'reject'])->name('friends.reject');
        Route::delete('/friends/{friend}', [\App\Http\Controllers\Social\FriendController::class, 'destroy'])->name('friends.destroy');
        
        Route::get('/messages', [\App\Http\Controllers\Social\MessageController::class, 'index'])->name('messages.index');
        Route::get('/messages/{user}', [\App\Http\Controllers\Social\MessageController::class, 'show'])->name('messages.show');
        Route::post('/messages/{user}', [\App\Http\Controllers\Social\MessageController::class, 'store'])->name('messages.store');
        
        Route::get('/activity', [\App\Http\Controllers\Social\ActivityController::class, 'index'])->name('activity.index');
        Route::post('/activity', [\App\Http\Controllers\Social\ActivityController::class, 'store'])->name('activity.store');
        
        Route::get('/leaderboard', [\App\Http\Controllers\Social\LeaderboardController::class, 'index'])->name('leaderboard.index');
        Route::post('/leaderboard', [\App\Http\Controllers\Social\LeaderboardController::class, 'store'])->name('leaderboard.store');
    });
    
    // Profile routes
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/achievements', [\App\Http\Controllers\Profile\AchievementController::class, 'index'])->name('achievements.index');
        Route::get('/achievements/{achievement}', [\App\Http\Controllers\Profile\AchievementController::class, 'show'])->name('achievements.show');
        
        Route::get('/bookmarks', [\App\Http\Controllers\Profile\BookmarkController::class, 'index'])->name('bookmarks.index');
        Route::post('/bookmarks', [\App\Http\Controllers\Profile\BookmarkController::class, 'store'])->name('bookmarks.store');
        Route::put('/bookmarks/{bookmark}', [\App\Http\Controllers\Profile\BookmarkController::class, 'update'])->name('bookmarks.update');
        Route::delete('/bookmarks/{bookmark}', [\App\Http\Controllers\Profile\BookmarkController::class, 'destroy'])->name('bookmarks.destroy');
        
        Route::get('/favorites', [\App\Http\Controllers\Profile\FavoriteController::class, 'index'])->name('favorites.index');
        Route::post('/favorites', [\App\Http\Controllers\Profile\FavoriteController::class, 'store'])->name('favorites.store');
        Route::delete('/favorites/{favorite}', [\App\Http\Controllers\Profile\FavoriteController::class, 'destroy'])->name('favorites.destroy');
        Route::post('/favorites/toggle', [\App\Http\Controllers\Profile\FavoriteController::class, 'toggle'])->name('favorites.toggle');
    });
    
    // Legacy routes for backward compatibility
    Route::get('/friends', [\App\Http\Controllers\Social\FriendController::class, 'index'])->name('friends');
    Route::get('/messages', [\App\Http\Controllers\Social\MessageController::class, 'index'])->name('messages');
    Route::get('/activity', [\App\Http\Controllers\Social\ActivityController::class, 'index'])->name('activity');
    Route::get('/leaderboard', [\App\Http\Controllers\Social\LeaderboardController::class, 'index'])->name('leaderboard');
    Route::get('/achievements', [\App\Http\Controllers\Profile\AchievementController::class, 'index'])->name('achievements');
    Route::get('/bookmarks', [\App\Http\Controllers\Profile\BookmarkController::class, 'index'])->name('bookmarks');
    Route::post('/bookmarks', [\App\Http\Controllers\Profile\BookmarkController::class, 'store'])->name('bookmarks.store');
    Route::put('/bookmarks/{bookmark}', [\App\Http\Controllers\Profile\BookmarkController::class, 'update'])->name('bookmarks.update');
    Route::delete('/bookmarks/{bookmark}', [\App\Http\Controllers\Profile\BookmarkController::class, 'destroy'])->name('bookmarks.destroy');
    Route::get('/favorites', [\App\Http\Controllers\Profile\FavoriteController::class, 'index'])->name('favorites');
    Route::post('/favorites', [\App\Http\Controllers\Profile\FavoriteController::class, 'store'])->name('favorites.store');
    Route::delete('/favorites/{favorite}', [\App\Http\Controllers\Profile\FavoriteController::class, 'destroy'])->name('favorites.destroy');
    Route::post('/favorites/toggle', [\App\Http\Controllers\Profile\FavoriteController::class, 'toggle'])->name('favorites.toggle');
});

require __DIR__.'/settings.php';

// Test route for social features
Route::middleware(['auth'])->get('/test-social', [App\Http\Controllers\TestController::class, 'index'])->name('test.social');
