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
            'author' => 'Michael Jackson',
            'category' => 'Pop',
        ]);

        CD::create([
            'title' => 'Back in Black',
            'author' => 'AC/DC',
            'category' => 'Rock',
        ]);

        CD::create([
            'title' => 'Kind of Blue',
            'author' => 'Miles Davis',
            'category' => 'Jazz',
        ]);
    }
}
