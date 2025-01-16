<?php

use App\Http\Controllers\CDController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\LoanController;
use Illuminate\Support\Facades\Route;

Route::get('/cds', [CDController::class, 'index']);
Route::get('/clients', [ClientController::class, 'index']);
Route::get('/loans', [LoanController::class, 'index']);
