<?php

use App\Http\Controllers\CDController;
use App\Http\Controllers\LoanController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/api/cds', [CDController::class, 'index']);
    Route::get('/api/loans', [LoanController::class, 'index']);
    Route::post('/api/loans', [LoanController::class, 'store']);
});
