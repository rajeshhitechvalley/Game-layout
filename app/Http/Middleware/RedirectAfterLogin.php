<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectAfterLogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        
        // Check if user is authenticated
        if (auth()->check()) {
            $user = auth()->user();
            
            // Debug logging (remove in production)
            \Log::info('RedirectAfterLogin: User authenticated', [
                'user_id' => $user->id,
                'user_email' => $user->email,
                'is_admin' => $user->is_admin,
                'request_path' => $request->path(),
                'is_login_request' => $request->is('login'),
                'has_intended' => session()->has('url.intended'),
                'intended_url' => session()->get('url.intended'),
            ]);
            
            // Check if this is a login request or if there's an intended URL
            if ($request->is('login') || $request->is('register') || session()->has('url.intended')) {
                // Force redirect based on user role
                if ($user->is_admin) {
                    \Log::info('RedirectAfterLogin: Redirecting admin to /admin/dashboard');
                    // Clear any existing intended URL and set to admin dashboard
                    session()->forget('url.intended');
                    session(['url.intended' => '/admin/dashboard']);
                    return redirect()->intended('/admin/dashboard');
                } else {
                    \Log::info('RedirectAfterLogin: Redirecting user to /dashboard');
                    // Clear any existing intended URL and set to regular dashboard
                    session()->forget('url.intended');
                    session(['url.intended' => '/dashboard']);
                    return redirect()->intended('/dashboard');
                }
            }
        }
        
        return $response;
    }
}
