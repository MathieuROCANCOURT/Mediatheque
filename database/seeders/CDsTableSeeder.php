<?php

namespace Database\Seeders;

use App\Models\CD;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class CDsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $albums = [
            [
                'title' => 'Thriller',
                'artist' => 'Michael Jackson',
                'year' => 1982,
                'category' => 'Pop',
            ],
            [
                'title' => 'Back in Black',
                'artist' => 'AC/DC',
                'year' => 1980,
                'category' => 'Rock',
            ],
            [
                'title' => 'The Dark Side of the Moon',
                'artist' => 'Pink Floyd',
                'year' => 1973,
                'category' => 'Rock',
            ],
            [
                'title' => 'The Bodyguard',
                'artist' => 'Whitney Houston',
                'year' => 1992,
                'category' => 'R&B',
            ],
            [
                'title' => 'Rumours',
                'artist' => 'Fleetwood Mac',
                'year' => 1977,
                'category' => 'Rock',
            ],
            [
                'title' => '21',
                'artist' => 'Adele',
                'year' => 2011,
                'category' => 'Pop',
            ],
            [
                'title' => 'Abbey Road',
                'artist' => 'The Beatles',
                'year' => 1969,
                'category' => 'Rock',
            ],
            [
                'title' => 'Kind of Blue',
                'artist' => 'Miles Davis',
                'year' => 1959,
                'category' => 'Jazz',
            ],
            [
                'title' => 'The Eminem Show',
                'artist' => 'Eminem',
                'year' => 2002,
                'category' => 'Hip-Hop',
            ],
            [
                'title' => 'Hotel California',
                'artist' => 'Eagles',
                'year' => 1976,
                'category' => 'Rock',
            ],
        ];

        foreach ($albums as $album) {
            CD::create([
                'title' => $album['title'],
                'artist' => $album['artist'],
                'year' => $album['year'],
                'category' => $album['category'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
