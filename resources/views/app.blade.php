<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }} - @yield('title', 'Portfolio')</title>
        <meta name="description" content="@yield('meta_description', 'Full Stack Developer with over 6 years of experience in web development. Passionate about creating modern, efficient, and user-friendly web applications.')">
        <meta name="author" content="@yield('meta_author', 'Thiều Sỹ Tùng')">

        <!-- Open Graph Meta Tags -->
        <meta property="og:title" content="@yield('og_title', 'Thiều Sỹ Tùng - Full Stack Developer')">
        <meta property="og:description" content="@yield('og_description', 'Full Stack Developer with over 6 years of experience in web development.')">
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:site_name" content="{{ config('app.name', 'Laravel') }}">
        <meta property="og:image" content="@yield('og_image', asset('images/cover/og-image.jpg'))">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:image:alt" content="@yield('og_image_alt', 'Thiều Sỹ Tùng - Full Stack Developer')">

        <!-- Twitter Card Meta Tags -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="@yield('twitter_title', 'Thiều Sỹ Tùng - Full Stack Developer')">
        <meta name="twitter:description" content="@yield('twitter_description', 'Full Stack Developer with over 6 years of experience in web development.')">
        <meta name="twitter:image" content="@yield('twitter_image', asset('images/cover/og-image.jpg'))">
        <meta name="twitter:image:alt" content="@yield('twitter_image_alt', 'Thiều Sỹ Tùng - Full Stack Developer')">

        <!-- Additional Meta Tags -->
        <meta name="keywords" content="@yield('meta_keywords', 'Full Stack Developer, Web Developer, PHP Developer, Laravel, Vue.js, React, JavaScript, Portfolio')">
        <meta name="robots" content="index, follow">
        <meta name="language" content="Vietnamese, English">
        <meta name="revisit-after" content="7 days">

        <!-- Canonical URL -->
        <link rel="canonical" href="{{ url()->current() }}">

        <!-- Favicon -->
        <link rel="icon" type="image/png" sizes="96x96" href="{{ asset('images/favicon/favicon-96x96.png') }}">
        <link rel="icon" type="image/svg+xml" href="{{ asset('images/favicon/favicon.svg') }}" />
        <link rel="shortcut icon" href="{{ asset('images/favicon/favicon.ico') }}" />
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('images/favicon/apple-touch-icon.png') }}">
        <meta name="apple-mobile-web-app-title" content="Portfolio" />
        <link rel="manifest" href="{{ asset('images/favicon/site.webmanifest') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
