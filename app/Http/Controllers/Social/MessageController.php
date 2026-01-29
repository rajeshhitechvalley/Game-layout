<?php

namespace App\Http\Controllers\Social;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        
        // Get conversations (latest message from each user)
        $conversations = Message::with(['sender', 'receiver'])
            ->where(function($query) use ($user) {
                $query->where('sender_id', $user->id)
                      ->orWhere('receiver_id', $user->id);
            })
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy(function($message) use ($user) {
                return $message->sender_id === $user->id ? $message->receiver_id : $message->sender_id;
            })
            ->map(function($messages) use ($user) {
                $latestMessage = $messages->first();
                $otherUser = $latestMessage->sender_id === $user->id ? $latestMessage->receiver : $latestMessage->sender;
                
                $unreadCount = $messages->where('receiver_id', $user->id)
                                       ->where('is_read', false)
                                       ->count();

                return [
                    'user' => [
                        'id' => $otherUser->id,
                        'name' => $otherUser->name,
                        'email' => $otherUser->email,
                        'avatar' => $otherUser->avatar_url ?? null,
                    ],
                    'latest_message' => [
                        'content' => $latestMessage->content,
                        'created_at' => $latestMessage->created_at,
                        'is_read' => $latestMessage->is_read,
                        'sender_id' => $latestMessage->sender_id,
                    ],
                    'unread_count' => $unreadCount,
                ];
            })
            ->values()
            ->sortByDesc('latest_message.created_at')
            ->values();

        return Inertia::render('Social/Messages', [
            'conversations' => $conversations,
        ]);
    }

    public function show(User $user)
    {
        $authUser = auth()->user();
        
        // Get messages between the two users
        $messages = Message::with(['sender', 'receiver'])
            ->where(function($query) use ($authUser, $user) {
                $query->where('sender_id', $authUser->id)
                      ->where('receiver_id', $user->id);
            })
            ->orWhere(function($query) use ($authUser, $user) {
                $query->where('sender_id', $user->id)
                      ->where('receiver_id', $authUser->id);
            })
            ->orderBy('created_at', 'asc')
            ->get();

        // Mark messages as read
        Message::where('sender_id', $user->id)
               ->where('receiver_id', $authUser->id)
               ->where('is_read', false)
               ->update([
                   'is_read' => true,
                   'read_at' => now(),
               ]);

        return Inertia::render('Social/Conversation', [
            'messages' => $messages,
            'otherUser' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar_url ?? null,
            ],
        ]);
    }

    public function store(Request $request, User $user)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $message = Message::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $user->id,
            'content' => $request->content,
            'is_read' => false,
        ]);

        return back()->with('success', 'Message sent!');
    }
}
