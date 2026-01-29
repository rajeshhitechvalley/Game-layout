<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Friend;
use App\Models\Message;
use App\Models\Activity;
use App\Models\Achievement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TestController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('login');
        }

        // Test creating a friend request
        $friendUser = User::where('email', 'player1@test.com')->first();
        if ($friendUser && $friendUser->id !== $user->id) {
            $existingFriend = Friend::where('user_id', $user->id)
                                  ->where('friend_id', $friendUser->id)
                                  ->first();

            if (!$existingFriend) {
                Friend::create([
                    'user_id' => $user->id,
                    'friend_id' => $friendUser->id,
                    'status' => 'pending',
                    'requested_at' => now(),
                ]);
            }
        }

        // Test creating an activity
        Activity::create([
            'user_id' => $user->id,
            'type' => 'test',
            'action' => 'Tested social features',
            'data' => ['test' => true],
        ]);

        // Test unlocking an achievement
        $achievement = Achievement::first();
        if ($achievement && !$user->achievements()->where('achievement_id', $achievement->id)->exists()) {
            $user->achievements()->attach($achievement->id, [
                'unlocked_at' => now(),
                'progress' => 100,
            ]);
        }

        return response()->json([
            'message' => 'Social features test completed!',
            'user' => $user->name,
            'friends_count' => $user->friends()->count(),
            'achievements_count' => $user->achievements()->count(),
            'activities_count' => $user->activities()->count(),
        ]);
    }
}
