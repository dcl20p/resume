<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        $locale = $request->header('X-Locale');
        
        if ($locale && in_array($locale, ['en', 'vi'])) {
            App::setLocale($locale);
        }

        return $next($request);
    }
} 