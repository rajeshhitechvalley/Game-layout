<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AchievementController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $type = $request->get('type', 'all');

        $achievements = Achievement::query()
            ->when($type !== 'all', function($query) use ($type) {
                $query->byType($type);
            })
            ->visible()
            ->with(['users' => function($query) use ($user) {
                $query->where('user_id', $user->id);
            }])
            ->get()
            ->map(function($achievement) use ($user) {
                $userAchievement = $achievement->users->first();
                return [
                    'id' => $achievement->id,
                    'name' => $achievement->name,
                    'description' => $achievement->description,
                    'icon' => $achievement->icon,
                    'badge_color' => $achievement->badge_color,
                    'points' => $achievement->points,
                    'type' => $achievement->type,
                    'is_unlocked' => $userAchievement ? true : false,
                    'unlocked_at' => $userAchievement ? $userAchievement->pivot->unlocked_at : null,
                    'progress' => $userAchievement ? $userAchievement->pivot->progress : 0,
                ];
            });

        $stats = [
            'total_achievements' => Achievement::visible()->count(),
            'unlocked_achievements' => Achievement::whereHas('users', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })->count(),
            'total_points' => Achievement::join('achievement_user', 'achievements.id', '=', 'achievement_user.achievement_id')
                                        ->where('achievement_user.user_id', $user->id)
                                        ->sum('achievements.points'),
        ];

        return Inertia::render('Profile/Achievements', [
            'achievements' => $achievements,
            'stats' => $stats,
            'currentType' => $type,
        ]);
    }

    public function show(Achievement $achievement)
    {
        $user = auth()->user();
        
        $achievement->load(['users' => function($query) use ($user) {
            $query->where('user_id', $user->id);
        }]);

        $userAchievement = $achievement->users->first();
        $isUnlocked = $userAchievement ? true : false;

        return Inertia::render('Profile/AchievementDetail', [
            'achievement' => [
                'id' => $achievement->id,
                'name' => $achievement->name,
                'description' => $achievement->description,
                'icon' => $achievement->icon,
                'badge_color' => $achievement->badge_color,
                'points' => $achievement->points,
                'type' => $achievement->type,
                'requirements' => $achievement->requirements,
                'is_unlocked' => $isUnlocked,
                'unlocked_at' => $userAchievement ? $userAchievement->pivot->unlocked_at : null,
                'progress' => $userAchievement ? $userAchievement->pivot->progress : 0,
            ],
        ]);
    }
}
