<?php

namespace Database\Seeders;

use App\Models\Record;
use Illuminate\Database\Seeder;

class AdditionalRecordsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $records = [
            [
                'title' => 'Blonde',
                'artist' => 'Frank Ocean',
                'album' => 'Blonde',
                'release_year' => 2016,
                'genre' => 'R&B/Soul',
                'condition' => 'Mint',
                'catalog_number' => 'BLND001',
                'label' => 'Boys Don\'t Cry',
                'description' => 'Second studio album by American singer Frank Ocean',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg',
                'is_available' => true
            ],
            [
                'title' => 'Pet Sounds',
                'artist' => 'The Beach Boys',
                'album' => 'Pet Sounds',
                'release_year' => 1966,
                'genre' => 'Psychedelic Pop',
                'condition' => 'Good',
                'catalog_number' => 'T2458',
                'label' => 'Capitol Records',
                'description' => 'Innovative album featuring complex arrangements and studio techniques',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/b/bb/PetSoundsCover.jpg',
                'is_available' => true
            ],
            [
                'title' => 'To Pimp a Butterfly',
                'artist' => 'Kendrick Lamar',
                'album' => 'To Pimp a Butterfly',
                'release_year' => 2015,
                'genre' => 'Hip Hop',
                'condition' => 'Near Mint',
                'catalog_number' => 'B0022735-01',
                'label' => 'Top Dawg Entertainment',
                'description' => 'Critically acclaimed album incorporating elements of jazz, funk, and spoken word',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png',
                'is_available' => true
            ],
            [
                'title' => 'Loveless',
                'artist' => 'My Bloody Valentine',
                'album' => 'Loveless',
                'release_year' => 1991,
                'genre' => 'Shoegaze',
                'condition' => 'Very Good',
                'catalog_number' => 'CAD1002',
                'label' => 'Creation Records',
                'description' => 'Pioneering shoegaze album known for its distinctive sound walls and distortion',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/4/4b/My_Bloody_Valentine_-_Loveless.png',
                'is_available' => true
            ],
            [
                'title' => 'Vespertine',
                'artist' => 'Björk',
                'album' => 'Vespertine',
                'release_year' => 2001,
                'genre' => 'Electronic/Avant-garde',
                'condition' => 'Mint',
                'catalog_number' => '572 932-2',
                'label' => 'One Little Indian',
                'description' => 'Fourth album by Icelandic artist Björk, featuring intimate, microbeat-based arrangements',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/3/3f/Bjork_Vespertine.png',
                'is_available' => true
            ]
        ];

        foreach ($records as $record) {
            Record::create($record);
        }
    }
}
