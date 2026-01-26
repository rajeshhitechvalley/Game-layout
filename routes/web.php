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
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

require __DIR__.'/settings.php';
