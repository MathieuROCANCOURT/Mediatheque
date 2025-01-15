<?php

namespace App\Enum;

enum PermissionsEnum: string {
    case ManageAdmin = 'manage_admin';
    case ManageUsers = 'manage_users';
}
