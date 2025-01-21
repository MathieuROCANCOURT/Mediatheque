<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void {
        // Clear cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create roles with web guard
        $userRole = Role::firstOrCreate([
            'name' => RolesEnum::User->value,
            'guard_name' => 'web'
        ]);

        $adminRole = Role::firstOrCreate([
            'name' => RolesEnum::Admin->value,
            'guard_name' => 'web'
        ]);

        // Create permissions with web guard
        $manageUsersPermission = Permission::firstOrCreate([
            'name' => PermissionsEnum::ManageUsers->value,
            'guard_name' => 'web'
        ]);

        $manageAdminPermission = Permission::firstOrCreate([
            'name' => PermissionsEnum::ManageAdmin->value,
            'guard_name' => 'web'
        ]);

        // Sync permissions
        $userRole->syncPermissions($manageUsersPermission);
        $adminRole->syncPermissions($manageAdminPermission);

        // Create test users
        if (!User::whereEmail('user@example.com')->exists()) {
            $user = User::factory()->create([
                'name' => 'User User',
                'email' => 'user@example.com',
            ]);
            $user->assignRole($userRole);
        }

        if (!User::whereEmail('admin@example.com')->exists()) {
            $admin = User::factory()->create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
            ]);
            $admin->assignRole($adminRole);
        }

        $this->call([
            CDsTableSeeder::class,
        ]);
    }
}
