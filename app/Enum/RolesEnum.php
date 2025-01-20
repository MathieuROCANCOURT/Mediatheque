<?php

namespace App\Enum;
enum RolesEnum: string
{
    case Admin = 'admin';
    case User = 'user';

    public static function labels(): array {
        return [
            self::Admin->value => __('Admin'),
            self::User->value => __('User'),
        ];
    }

    public function label(): string {
        return match ($this) {
            self::Admin => __('Admin'),
            self::User => __('User'),
        };
    }
}
