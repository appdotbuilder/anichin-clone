<?php

namespace Database\Factories;

use App\Models\Anime;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Episode>
 */
class EpisodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'anime_id' => Anime::factory(),
            'title' => fake()->sentence(3),
            'episode_number' => fake()->numberBetween(1, 50),
            'synopsis' => fake()->paragraph(),
            'thumbnail' => 'https://via.placeholder.com/300x200/1a1a1a/ff4444?text=Episode',
            'download_links' => [
                [
                    'quality' => '1080p',
                    'url' => fake()->url(),
                    'size' => '500MB'
                ],
                [
                    'quality' => '720p',
                    'url' => fake()->url(),
                    'size' => '300MB'
                ],
                [
                    'quality' => '480p',
                    'url' => fake()->url(),
                    'size' => '150MB'
                ]
            ],
            'stream_url' => fake()->url(),
            'duration' => fake()->numberBetween(20, 30), // minutes
            'aired_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'view_count' => fake()->numberBetween(100, 100000),
        ];
    }
}