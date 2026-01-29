<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Game extends Model
{
    use HasFactory;

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'description',
        'category',
        'image_path',
        'game_url',
        'rating',
        'plays',
        'featured',
        'active',
    ];

    protected $appends = ['image_url', 'image', 'players'];

    protected $casts = [
        'rating' => 'decimal:2',
        'featured' => 'boolean',
        'active' => 'boolean',
    ];

    /**
     * Get the user that created the game.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the bookmarks for this game.
     */
    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class);
    }

    /**
     * Get the favorites for this game.
     */
    public function favorites(): HasMany
    {
        return $this->hasMany(Favorite::class);
    }

    public function getPlaysFormattedAttribute()
    {
        $plays = (int) $this->plays;
        if ($plays >= 1000000) {
            return round($plays / 1000000, 1) . 'M';
        } elseif ($plays >= 1000) {
            return round($plays / 1000, 1) . 'K';
        }
        return $plays;
    }

    public function getImageUrlAttribute()
    {
        if ($this->image_path) {
            return asset('storage/' . $this->image_path);
        }
        
        // Return a placeholder image if no image is uploaded
        return "https://picsum.photos/seed/{$this->slug}/400/300.jpg";
    }

    public function getImageAttribute()
    {
        return $this->image_url;
    }

    public function getPlayersAttribute()
    {
        return $this->plays_formatted;
    }
}
