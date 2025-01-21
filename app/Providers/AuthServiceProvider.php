<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    public function boot(): void {
        // Define abilities
        Gate::define('access-admin', function ($user) {
            return $user->hasRole('admin');
        });

        Gate::define('access-user', function ($user) {
            return $user->hasRole('user');
        });
    }
}
