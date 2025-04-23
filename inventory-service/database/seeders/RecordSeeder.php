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
            ],
            [
                'title' => 'Be the Cowboy',
                'artist' => 'Mitski',
                'album' => 'Be the Cowboy',
                'release_year' => 2018,
                'genre' => 'Indie Rock',
                'condition' => 'Mint',
                'catalog_number' => 'DOC159',
                'label' => 'Dead Oceans',
                'description' => 'Fifth studio album by Mitski, featuring singles "Nobody" and "Geyser"',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/8/8d/Mitski_-_Be_the_Cowboy.png',
                'is_available' => true
            ],
            [
                'title' => 'Puberty 2',
                'artist' => 'Mitski',
                'album' => 'Puberty 2',
                'release_year' => 2016,
                'genre' => 'Indie Rock',
                'condition' => 'Very Good',
                'catalog_number' => 'DOC118',
                'label' => 'Dead Oceans',
                'description' => 'Fourth studio album by Mitski, featuring "Your Best American Girl"',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/4/48/Mitski_-_Puberty_2.jpg',
                'is_available' => true
            ],
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
                'title' => 'The Red',
                'artist' => 'Red Velvet',
                'album' => 'The Red',
                'release_year' => 2015,
                'genre' => 'K-pop',
                'condition' => 'Mint',
                'catalog_number' => 'SMK0650',
                'label' => 'SM Entertainment',
                'description' => 'First full-length studio album by Red Velvet, including their hit "Dumb Dumb"',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/0/04/Red_Velvet_The_Red.jpg',
                'is_available' => true
            ],
            [
                'title' => 'Perfect Velvet',
                'artist' => 'Red Velvet',
                'album' => 'Perfect Velvet',
                'release_year' => 2017,
                'genre' => 'K-pop/R&B',
                'condition' => 'Near Mint',
                'catalog_number' => 'SMK0866',
                'label' => 'SM Entertainment',
                'description' => 'Second full-length studio album by Red Velvet, featuring the single "Peek-a-Boo"',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/e/e4/Red_Velvet_Perfect_Velvet.jpg',
                'is_available' => true
            ],
            [
                'title' => 'The ReVe Festival: Finale',
                'artist' => 'Red Velvet',
                'album' => 'The ReVe Festival: Finale',
                'release_year' => 2019,
                'genre' => 'K-pop',
                'condition' => 'Very Good',
                'catalog_number' => 'SMK1025',
                'label' => 'SM Entertainment',
                'description' => 'Special album that concludes "The ReVe Festival" trilogy, with the lead single "Psycho"',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/a/a4/Red_Velvet_-_The_ReVe_Festival_Finale.jpg',
                'is_available' => true
            ],
            [
                'title' => 'Queendom',
                'artist' => 'Red Velvet',
                'album' => 'Queendom',
                'release_year' => 2021,
                'genre' => 'K-pop',
                'condition' => 'Mint',
                'catalog_number' => 'SMK1120',
                'label' => 'SM Entertainment',
                'description' => 'Red Velvet\'s first mini-album after a hiatus, featuring the upbeat title track "Queendom"',
                'cover_image' => 'https://upload.wikimedia.org/wikipedia/en/4/4b/Red_Velvet_-_Queendom.png',
                'is_available' => true
            ]
        ];

        foreach ($records as $record) {
            Record::create($record);
        }
    }
}
