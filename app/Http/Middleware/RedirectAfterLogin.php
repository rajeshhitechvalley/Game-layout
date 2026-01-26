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
        
        // Check if user just logged in (authenticated in this request)
        if (auth()->check() && session()->has('auth.password_confirmed_at') === false) {
            $user = auth()->user();
            
            // Set redirect based on user role
            if ($user->is_admin) {
                // Redirect to admin dashboard
                if ($request->is('login') || $request->is('register')) {
                    return redirect()->intended('/admin/dashboard');
                }
            } else {
                // Redirect to regular user dashboard
                if ($request->is('login') || $request->is('register')) {
                    return redirect()->intended('/dashboard');
                }
            }
        }
        
        return $response;
    }
}
