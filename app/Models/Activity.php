<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'action',
        'subject_type',
        'subject_id',
        'data',
        'created_at',
    ];

    protected $casts = [
        'data' => 'json',
    ];

    /**
     * Get the user who performed the activity.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the subject of the activity (polymorphic relationship).
     */
    public function subject()
    {
        return $this->morphTo();
    }

    /**
     * Scope to get recent activities.
     */
    public function scopeRecent($query, $limit = 10)
    {
        return $query->latest()->limit($limit);
    }

    /**
     * Get activity description.
     */
    public function getDescriptionAttribute()
    {
        switch ($this->type) {
            case 'game':
                return "Played {$this->action}";
            case 'achievement':
                return "Unlocked achievement: {$this->action}";
            case 'friend':
                return $this->action;
            default:
                return $this->action;
        }
    }

    /**
     * Create a new activity and broadcast it.
     */
    public static function createAndBroadcast($data)
    {
        $activity = self::create($data);
        
        // Broadcast to WebSocket clients
        // In production, this would use a proper WebSocket service
        \Log::info('Activity created and should be broadcasted', [
            'activity_id' => $activity->id,
            'type' => 'new_activity',
            'data' => $activity->load('user')
        ]);
        
        return $activity;
    }
}
