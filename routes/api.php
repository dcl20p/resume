<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use Illuminate\Http\Request;
use App\Http\Controllers\LocaleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('contact', [ContactController::class, 'store'])->middleware('throttle:5,1');

Route::get('/locale', [LocaleController::class, 'get']);
Route::post('/locale', [LocaleController::class, 'update']); 