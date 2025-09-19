<?php

namespace Database\Factories;

use App\Models\Anime;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bookmark>
 */
class BookmarkFactory extends Factory
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
            'session_id' => fake()->uuid(),
            'user_id' => null,
        ];
    }

    /**
     * Indicate that the bookmark belongs to a user.
     */
    public function forUser(): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => User::factory(),
            'session_id' => null,
        ]);
    }
}