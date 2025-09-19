<?php

namespace Database\Factories;

use App\Models\Anime;
use App\Models\Episode;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WatchHistory>
 */
class WatchHistoryFactory extends Factory
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
            'episode_id' => Episode::factory(),
            'session_id' => fake()->uuid(),
            'user_id' => null,
            'watch_progress' => fake()->numberBetween(0, 1800), // 0 to 30 minutes in seconds
            'completed' => fake()->boolean(30), // 30% chance of being completed
            'last_watched_at' => fake()->dateTimeBetween('-1 week', 'now'),
        ];
    }

    /**
     * Indicate that the watch history belongs to a user.
     */
    public function forUser(): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => User::factory(),
            'session_id' => null,
        ]);
    }

    /**
     * Indicate that the episode was completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'completed' => true,
            'watch_progress' => fake()->numberBetween(1500, 1800), // Almost full episode
        ]);
    }
}