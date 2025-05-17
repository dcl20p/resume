<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Analytics/Index', [
            'stats' => [
                'totalVisits' => 1234, // TODO: Implement actual analytics
                'todayVisits' => 56,
                'uniqueVisitors' => 789,
                'pageViews' => 2345,
                'bounceRate' => '45%',
                'avgSessionDuration' => '2m 30s',
                'topPages' => [
                    ['page' => '/', 'views' => 500],
                    ['page' => '/about', 'views' => 300],
                    ['page' => '/projects', 'views' => 200],
                ],
                'visitorsByCountry' => [
                    ['country' => 'Vietnam', 'visitors' => 800],
                    ['country' => 'United States', 'visitors' => 200],
                    ['country' => 'Japan', 'visitors' => 100],
                ],
                'visitorsByDevice' => [
                    ['device' => 'Desktop', 'visitors' => 600],
                    ['device' => 'Mobile', 'visitors' => 400],
                    ['device' => 'Tablet', 'visitors' => 100],
                ]
            ]
        ]);
    }
} 