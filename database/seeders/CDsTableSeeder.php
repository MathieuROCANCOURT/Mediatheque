<?php

namespace Database\Seeders;

use App\Models\CD;
use Illuminate\Database\Seeder;

class CDsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CD::create([
            'title' => 'Thriller',
            'artist' => 'Michael Jackson',
            'year' => 2020,
            'category' => 'Pop',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        CD::create([
            'title' => 'Back in Black',
            'artist' => 'AC/DC',
            'year' => 1988,
            'category' => 'Rock',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        CD::create([
            'title' => 'Kind of Blue',
            'artist' => 'Miles Davis',
            'year' => 1975,
            'category' => 'Jazz',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
