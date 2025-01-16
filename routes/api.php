<?php

use App\Http\Controllers\CDController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Test route
Route::get('test', function () {
    return response()->json(['message' => 'API is working!']);
});

// CD routes
Route::get('/cds', [CDController::class, 'index']);
