<?php

namespace Database\Seeders;

use App\Models\Record;
use Illuminate\Database\Seeder;

class RecordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sample vinyl records for testing
        $records = [
            [
                'title' => 'Thriller',
                'artist' => 'Michael Jackson',
                'album' => 'Thriller',
                'release_year' => 1982,
                'genre' => 'Pop',
                'condition' => 'Very Good',
                'catalog_number' => 'EPC85930',
                'label' => 'Epic',
                'description' => 'Classic album featuring hits like Billie Jean and Beat It',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png',
                'is_available' => true
            ],
            [
                'title' => 'The Dark Side of the Moon',
                'artist' => 'Pink Floyd',
                'album' => 'The Dark Side of the Moon',
                'release_year' => 1973,
                'genre' => 'Progressive Rock',
                'condition' => 'Mint',
                'catalog_number' => 'SHVL804',
                'label' => 'Harvest',
                'description' => 'Iconic album with experimental rock and philosophical lyrics',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png',
                'is_available' => true
            ],
            [
                'title' => 'Kind of Blue',
                'artist' => 'Miles Davis',
                'album' => 'Kind of Blue',
                'release_year' => 1959,
                'genre' => 'Jazz',
                'condition' => 'Good',
                'catalog_number' => 'CL1355',
                'label' => 'Columbia',
                'description' => 'The best-selling jazz record of all time',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/9/9c/MilesDavisKindofBlue.jpg',
                'is_available' => true
            ],
            [
                'title' => 'Abbey Road',
                'artist' => 'The Beatles',
                'album' => 'Abbey Road',
                'release_year' => 1969,
                'genre' => 'Rock',
                'condition' => 'Very Good',
                'catalog_number' => 'PCS7088',
                'label' => 'Apple Records',
                'description' => 'The eleventh studio album by the Beatles, featuring the famous zebra crossing cover',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg',
                'is_available' => true
            ],
            [
                'title' => 'Nevermind',
                'artist' => 'Nirvana',
                'album' => 'Nevermind',
                'release_year' => 1991,
                'genre' => 'Grunge',
                'condition' => 'Near Mint',
                'catalog_number' => 'DGC24425',
                'label' => 'DGC',
                'description' => 'Breakout album featuring Smells Like Teen Spirit that defined the grunge era',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg',
                'is_available' => true
            ],
            [
                'title' => 'Rumours',
                'artist' => 'Fleetwood Mac',
                'album' => 'Rumours',
                'release_year' => 1977,
                'genre' => 'Rock',
                'condition' => 'Good',
                'catalog_number' => 'K56344',
                'label' => 'Warner Bros.',
                'description' => 'Grammy-winning album featuring hits like Dreams and Go Your Own Way',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG',
                'is_available' => true
            ],
            [
                'title' => 'Back in Black',
                'artist' => 'AC/DC',
                'album' => 'Back in Black',
                'release_year' => 1980,
                'genre' => 'Hard Rock',
                'condition' => 'Very Good',
                'catalog_number' => 'SD16018',
                'label' => 'Atlantic',
                'description' => 'One of the best-selling albums of all time, recorded after the death of lead singer Bon Scott',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/commons/9/92/ACDC_Back_in_Black.png',
                'is_available' => true
            ],
            [
                'title' => 'Purple Rain',
                'artist' => 'Prince',
                'album' => 'Purple Rain',
                'release_year' => 1984,
                'genre' => 'Pop/Rock',
                'condition' => 'Mint',
                'catalog_number' => '925110-1',
                'label' => 'Warner Bros.',
                'description' => 'Soundtrack to the film of the same name, featuring hits like When Doves Cry',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/9/9c/Princepurplerain.jpg',
                'is_available' => true
            ],
            [
                'title' => 'OK Computer',
                'artist' => 'Radiohead',
                'album' => 'OK Computer',
                'release_year' => 1997,
                'genre' => 'Alternative Rock',
                'condition' => 'Near Mint',
                'catalog_number' => 'NODATA724385522612',
                'label' => 'Parlophone',
                'description' => 'Critically acclaimed album exploring themes of alienation in modern society',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/a/a1/Radiohead.okcomputer.albumart.jpg',
                'is_available' => true
            ],
            [
                'title' => 'Appetite for Destruction',
                'artist' => 'Guns N\' Roses',
                'album' => 'Appetite for Destruction',
                'release_year' => 1987,
                'genre' => 'Hard Rock',
                'condition' => 'Good',
                'catalog_number' => '24148',
                'label' => 'Geffen',
                'description' => 'Debut album with classics Sweet Child O\' Mine and Welcome to the Jungle',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/6/60/GunsnRosesAppetiteforDestructionalbumcover.jpg',
                'is_available' => true
            ],
            [
                'title' => 'Blue Train',
                'artist' => 'John Coltrane',
                'album' => 'Blue Train',
                'release_year' => 1958,
                'genre' => 'Jazz',
                'condition' => 'Very Good',
                'catalog_number' => 'BLP1577',
                'label' => 'Blue Note',
                'description' => 'Hard bop jazz album considered one of Coltrane\'s finest works',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/0/0c/John_Coltrane_-_Blue_Train.jpg',
                'is_available' => true
            ],
            [
                'title' => 'London Calling',
                'artist' => 'The Clash',
                'album' => 'London Calling',
                'release_year' => 1979,
                'genre' => 'Punk Rock',
                'condition' => 'Good',
                'catalog_number' => 'CLASH3',
                'label' => 'CBS',
                'description' => 'Double album that expanded the band\'s musical palette beyond punk',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/0/00/TheClashLondonCallingalbumcover.jpg',
                'is_available' => true
            ]
        ];

        foreach ($records as $record) {
            Record::create($record);
        }
    }
}
