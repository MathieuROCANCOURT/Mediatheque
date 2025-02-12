<?php

use App\Http\Controllers\LoanController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CDController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/api/cds', [CDController::class, 'index']);
    Route::post('api/cds', [CDController::class, 'store']);
    Route::post('/api/loans/return', [LoanController::class, 'returnCDs']);
    Route::delete('api/cds', [CDController::class, 'destroy']);
    Route::get('/api/loans', [LoanController::class, 'index']);
    Route::post('/api/loans', [LoanController::class, 'store']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/loans', function () {
        return Inertia::render('Loans');
    })->name('loans');
});


require __DIR__.'/auth.php';
