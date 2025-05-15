<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CacheStaticAssets
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($response->headers->has('Cache-Control')) {
            return $response;
        }

        $path = $request->path();
        
        // Cache images for 1 year
        if (preg_match('/\.(jpg|jpeg|png|gif|webp|ico|svg)$/i', $path)) {
            $response->headers->set('Cache-Control', 'public, max-age=31536000, immutable');
            return $response;
        }

        // Cache CSS and JS files for 1 week
        if (preg_match('/\.(css|js)$/i', $path)) {
            $response->headers->set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
            return $response;
        }

        // Cache fonts for 1 year
        if (preg_match('/\.(woff|woff2|ttf|otf|eot)$/i', $path)) {
            $response->headers->set('Cache-Control', 'public, max-age=31536000, immutable');
            return $response;
        }

        return $response;
    }
} 