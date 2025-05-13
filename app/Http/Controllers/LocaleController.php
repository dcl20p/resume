<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class LocaleController extends Controller
{
    public function get()
    {
        return response()->json([
            'success' => true,
            'locale' => App::getLocale()
        ]);
    }

    public function update(Request $request)
    {
        $locale = $request->input('locale');
        
        if (!in_array($locale, ['en', 'vi'])) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid locale'
            ], 400);
        }

        App::setLocale($locale);

        return response()->json([
            'success' => true,
            'message' => 'Locale updated successfully'
        ]);
    }
} 