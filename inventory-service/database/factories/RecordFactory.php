<?php

namespace Database\Factories;

use App\Models\Record;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecordFactory extends Factory
{
    protected $model = Record::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'artist' => $this->faker->name,
            'album' => $this->faker->sentence(2),
            'release_year' => $this->faker->numberBetween(1950, 2023),
            'genre' => $this->faker->randomElement(['Rock', 'Jazz', 'Pop', 'Classical', 'Hip Hop', 'Electronic']),
            'condition' => $this->faker->randomElement(['Mint', 'Near Mint', 'Very Good', 'Good', 'Fair', 'Poor']),
            'catalog_number' => $this->faker->unique()->bothify('???###'),
            'label' => $this->faker->company,
            'cover_image' => $this->faker->imageUrl(300, 300),
            'description' => $this->faker->paragraph(),
            'is_available' => $this->faker->boolean(80), // 80% chance of being available
        ];
    }
}
