<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Achievement extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'icon',
        'badge_color',
        'points',
        'type',
        'requirements',
        'is_hidden',
    ];

    protected $casts = [
        'requirements' => 'json',
        'is_hidden' => 'boolean',
        'points' => 'integer',
    ];

    /**
     * Get the users who have unlocked this achievement.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
                    ->withPivot('unlocked_at', 'progress')
                    ->withTimestamps();
    }

    /**
     * Scope to get visible achievements.
     */
    public function scopeVisible($query)
    {
        return $query->where('is_hidden', false);
    }

    /**
     * Scope to get achievements by type.
     */
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Check if user has unlocked this achievement.
     */
    public function isUnlockedBy($userId)
    {
        return $this->users()->where('user_id', $userId)->exists();
    }
}
