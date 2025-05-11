<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ResumeController extends Controller
{
    public function index()
    {
        return Inertia::render('Resume/Index');
    }
} 