<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Leaderboard extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'game_id',
        'score',
        'rank',
        'played_at',
    ];

    protected $casts = [
        'score' => 'integer',
        'rank' => 'integer',
        'played_at' => 'datetime',
    ];

    /**
     * Get the user who achieved the score.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the game for the leaderboard entry.
     */
    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }

    /**
     * Scope to get top scores for a game.
     */
    public function scopeTopScores($query, $gameId = null, $limit = 10)
    {
        $query = $query->orderBy('score', 'desc')->orderBy('played_at', 'desc');
        
        if ($gameId) {
            $query->where('game_id', $gameId);
        }
        
        return $query->limit($limit);
    }

    /**
     * Scope to get user's best scores.
     */
    public function scopeUserBest($query, $userId)
    {
        return $query->where('user_id', $userId)
                    ->orderBy('score', 'desc');
    }
}
