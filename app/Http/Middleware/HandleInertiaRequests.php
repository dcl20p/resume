<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'meta' => [
                'title' => config('app.name', 'Laravel'),
                'description' => 'Full Stack Developer with over 6 years of experience in web development. Passionate about creating modern, efficient, and user-friendly web applications.',
                'author' => 'Thiều Sỹ Tùng',
                'keywords' => 'Full Stack Developer, Web Developer, PHP Developer, Laravel, Vue.js, React, JavaScript, Portfolio',
                'og_title' => 'Thiều Sỹ Tùng - Full Stack Developer',
                'og_description' => 'Full Stack Developer with over 6 years of experience in web development.',
                'og_image' => asset('images/cover/og-image.jpg'),
                'og_image_alt' => 'Thiều Sỹ Tùng - Full Stack Developer',
                'twitter_title' => 'Thiều Sỹ Tùng - Full Stack Developer',
                'twitter_description' => 'Full Stack Developer with over 6 years of experience in web development.',
                'twitter_image' => asset('images/cover/og-image.jpg'),
                'twitter_image_alt' => 'Thiều Sỹ Tùng - Full Stack Developer',
            ],
        ];
    }
}
