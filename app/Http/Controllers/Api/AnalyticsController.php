<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\Analytics\Period;
use Spatie\Analytics\Facades\Analytics;

class AnalyticsController extends Controller
{
    public function getData()
    {
        try {
            $period = Period::days(30);

            // Get visitors and page views for last 30 days
            $visitorsAndPageViews = Analytics::fetchVisitorsAndPageViews($period);
            
            // Get total visitors and pageviews
            $totalVisits = Analytics::fetchTotalVisitorsAndPageViews($period)->sum('visitors');
            $todayVisits = Analytics::fetchTotalVisitorsAndPageViews(Period::days(1))->sum('visitors');
            $pageViews = Analytics::fetchTotalVisitorsAndPageViews($period)->sum('pageViews');

            // Get most visited pages
            $topPages = Analytics::fetchMostVisitedPages($period, 10)
                ->map(function ($page) {
                    return [
                        'name' => $page['pageTitle'],
                        'value' => $page['screenPageViews']
                    ];
                });

            // Get top referrers
            $topReferrers = Analytics::fetchTopReferrers($period, 10)
                ->map(function ($referrer) {
                    return [
                        'name' => $referrer['pageReferrer'],
                        'value' => $referrer['screenPageViews']
                    ];
                });

            // Get user types (new vs returning)
            $userTypes = Analytics::fetchUserTypes($period)
                ->map(function ($type) {
                    return [
                        'name' => $type['newVsReturning'],
                        'value' => $type['activeUsers']
                    ];
                });

            // Get top browsers
            $topBrowsers = Analytics::fetchTopBrowsers($period, 10)
                ->map(function ($browser) {
                    return [
                        'name' => $browser['browser'],
                        'value' => $browser['screenPageViews']
                    ];
                });

            // Get top countries
            $topCountries = Analytics::fetchTopCountries($period, 10)
                ->map(function ($country) {
                    return [
                        'name' => $country['country'],
                        'value' => $country['screenPageViews']
                    ];
                });

            // Get top operating systems
            $topOperatingSystems = Analytics::fetchTopOperatingSystems($period, 10)
                ->map(function ($os) {
                    return [
                        'name' => $os['operatingSystem'],
                        'value' => $os['screenPageViews']
                    ];
                });

            // Get daily visitors and pageviews
            $dailyStats = Analytics::fetchVisitorsAndPageViewsByDate($period)
                ->map(function ($item) {
                    return [
                        'date' => $item['date'],
                        'visitors' => $item['activeUsers'],
                        'pageViews' => $item['screenPageViews']
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => [
                    'totalVisits' => $totalVisits,
                    'todayVisits' => $todayVisits,
                    'pageViews' => $pageViews,
                    'topPages' => $topPages,
                    'topReferrers' => $topReferrers,
                    'userTypes' => $userTypes,
                    'topBrowsers' => $topBrowsers,
                    'topCountries' => $topCountries,
                    'topOperatingSystems' => $topOperatingSystems,
                    'dailyStats' => $dailyStats
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Analytics Error: ' . $e->getMessage(), [
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch analytics data',
                'error' => config('app.debug') ? $e->getMessage() : 'An error occurred while fetching analytics data'
            ], 500);
        }
    }
}
