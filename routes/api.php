<?php

use App\Http\Controllers\CDController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\LoanController;
use Illuminate\Support\Facades\Route;

Route::apiResource('cds', CDController::class);
Route::apiResource('clients', ClientController::class);
Route::apiResource('loans', LoanController::class);
