<?php

namespace App\Http\Controllers\Social;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function index(Request $request)
    {
        $activities = Activity::with(['user', 'subject'])
            ->latest()
            ->paginate(20);

        return Inertia::render('Social/Activity', [
            'activities' => $activities,
        ]);
    }

    /**
     * Get activity data for real-time polling
     */
    public function getData(Request $request)
    {
        $activities = Activity::with(['user', 'subject'])
            ->latest()
            ->limit(50)
            ->get();

        return response()->json([
            'data' => $activities,
            'timestamp' => now()->toISOString()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string',
            'action' => 'required|string',
            'subject_type' => 'nullable|string',
            'subject_id' => 'nullable|integer',
            'data' => 'nullable|array',
        ]);

        $activity = Activity::create([
            'user_id' => auth()->id(),
            'type' => $request->type,
            'action' => $request->action,
            'subject_type' => $request->subject_type,
            'subject_id' => $request->subject_id,
            'data' => $request->data ?? [],
        ]);

        // Broadcast the new activity
        \Log::info('New activity created for real-time updates', [
            'activity_id' => $activity->id,
            'user_id' => auth()->id(),
            'type' => $request->type,
            'action' => $request->action
        ]);

        return back()->with('success', 'Activity logged!');
    }
}
