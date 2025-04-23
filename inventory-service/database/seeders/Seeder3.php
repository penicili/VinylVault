<?php

namespace Database\Seeders;

use App\Models\Record;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Seeder3 extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $records = [
            // Mitski albums (3)
            [
                'title' => 'Laurel Hell',
                'artist' => 'Mitski',
                'album' => 'Laurel Hell',
                'release_year' => 2022,
                'genre' => 'Indie Pop/Synth-pop',
                'condition' => 'Near Mint',
                'catalog_number' => 'DOC245',
                'label' => 'Dead Oceans',
                'description' => 'Sixth studio album by Mitski with singles "Working for the Knife" and "The Only Heartbreaker"',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/f/f1/Mitski_-_Laurel_Hell.jpg',
                'is_available' => true
            ],
            [
                'title' => 'Bury Me at Makeout Creek',
                'artist' => 'Mitski',
                'album' => 'Bury Me at Makeout Creek',
                'release_year' => 2014,
                'genre' => 'Indie Rock',
                'condition' => 'Very Good',
                'catalog_number' => 'DOL027',
                'label' => 'Double Double Whammy',
                'description' => 'Third studio album by Mitski featuring a rawer rock sound compared to her earlier work',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/3/33/Mitski_-_Bury_Me_at_Makeout_Creek.jpg',
                'is_available' => true
            ],
            [
                'title' => 'The Land Is Inhospitable and So Are We',
                'artist' => 'Mitski',
                'album' => 'The Land Is Inhospitable and So Are We',
                'release_year' => 2023,
                'genre' => 'Indie Folk/Americana',
                'condition' => 'Mint',
                'catalog_number' => 'DOC289',
                'label' => 'Dead Oceans',
                'description' => 'Seventh studio album featuring the singles "Bug Like an Angel" and "Star"',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/e/ed/Mitski_-_The_Land_Is_Inhospitable_and_So_Are_We.png',
                'is_available' => true
            ],
            
            // Red Velvet albums (2)
            [
                'title' => 'The ReVe Festival: Day 1',
                'artist' => 'Red Velvet',
                'album' => 'The ReVe Festival: Day 1',
                'release_year' => 2019,
                'genre' => 'K-pop',
                'condition' => 'Near Mint',
                'catalog_number' => 'SMK0985',
                'label' => 'SM Entertainment',
                'description' => 'First part of Red Velvet\'s "The ReVe Festival" trilogy, featuring the hit single "Zimzalabim"',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/a/a0/Red_Velvet_-_The_ReVe_Festival_Day_1.jpg',
                'is_available' => true
            ],
            [
                'title' => 'The Velvet',
                'artist' => 'Red Velvet',
                'album' => 'The Velvet',
                'release_year' => 2016,
                'genre' => 'K-pop/R&B',
                'condition' => 'Excellent',
                'catalog_number' => 'SMK0754',
                'label' => 'SM Entertainment',
                'description' => 'Second mini-album by Red Velvet, showcasing their smooth "velvet" concept with the lead single "One of These Nights"',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/a/a5/The_Velvet.jpg',
                'is_available' => true
            ]
        ];

        foreach ($records as $record) {
            Record::create($record);
        }

        $this->command->info('Added 5 Mitski and Red Velvet albums to the database.');
    }
}
