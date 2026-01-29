<?php

namespace App\Http\Controllers\Social;

use App\Http\Controllers\Controller;
use App\Models\Friend;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FriendController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        
        // Get friends (accepted)
        $friends = Friend::with(['friend'])
            ->where('user_id', $user->id)
            ->accepted()
            ->orWhere(function($query) use ($user) {
                $query->where('friend_id', $user->id)
                      ->accepted();
            })
            ->get()
            ->map(function($friend) use ($user) {
                $friendUser = $friend->user_id === $user->id ? $friend->friend : $friend->user;
                return [
                    'id' => $friendUser->id,
                    'name' => $friendUser->name,
                    'email' => $friendUser->email,
                    'avatar' => $friendUser->avatar_url ?? null,
                    'is_online' => $friendUser->is_online ?? false,
                    'friendship_date' => $friend->accepted_at,
                ];
            });

        // Get pending requests
        $pendingRequests = Friend::with(['user'])
            ->where('friend_id', $user->id)
            ->pending()
            ->get()
            ->map(function($friend) {
                return [
                    'id' => $friend->user->id,
                    'name' => $friend->user->name,
                    'email' => $friend->user->email,
                    'avatar' => $friend->user->avatar_url ?? null,
                    'requested_at' => $friend->requested_at,
                ];
            });

        // Get sent requests
        $sentRequests = Friend::with(['friend'])
            ->where('user_id', $user->id)
            ->pending()
            ->get()
            ->map(function($friend) {
                return [
                    'id' => $friend->friend->id,
                    'name' => $friend->friend->name,
                    'email' => $friend->friend->email,
                    'avatar' => $friend->friend->avatar_url ?? null,
                    'requested_at' => $friend->requested_at,
                ];
            });

        return Inertia::render('Social/Friends', [
            'friends' => $friends,
            'pendingRequests' => $pendingRequests,
            'sentRequests' => $sentRequests,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'friend_id' => 'required|exists:users,id',
        ]);

        $user = auth()->user();
        $friendId = $request->friend_id;

        // Check if already friends or request exists
        $existingFriendship = Friend::where(function($query) use ($user, $friendId) {
            $query->where('user_id', $user->id)
                  ->where('friend_id', $friendId);
        })->orWhere(function($query) use ($user, $friendId) {
            $query->where('user_id', $friendId)
                  ->where('friend_id', $user->id);
        })->first();

        if ($existingFriendship) {
            return back()->with('error', 'Friend request already exists or you are already friends.');
        }

        Friend::create([
            'user_id' => $user->id,
            'friend_id' => $friendId,
            'status' => 'pending',
            'requested_at' => now(),
        ]);

        return back()->with('success', 'Friend request sent!');
    }

    public function accept(Friend $friend)
    {
        if ($friend->friend_id !== auth()->id()) {
            abort(403);
        }

        $friend->update([
            'status' => 'accepted',
            'accepted_at' => now(),
        ]);

        return back()->with('success', 'Friend request accepted!');
    }

    public function reject(Friend $friend)
    {
        if ($friend->friend_id !== auth()->id()) {
            abort(403);
        }

        $friend->delete();

        return back()->with('success', 'Friend request rejected.');
    }

    public function destroy(Friend $friend)
    {
        if ($friend->user_id !== auth()->id() && $friend->friend_id !== auth()->id()) {
            abort(403);
        }

        $friend->delete();

        return back()->with('success', 'Friend removed.');
    }
}
