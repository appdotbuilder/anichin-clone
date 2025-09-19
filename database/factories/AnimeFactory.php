<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Anime>
 */
class AnimeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $animeNames = [
            'Attack on Titan', 'Death Note', 'One Piece', 'Naruto', 'Dragon Ball Z',
            'My Hero Academia', 'Demon Slayer', 'One Punch Man', 'Mob Psycho 100',
            'Jujutsu Kaisen', 'Tokyo Ghoul', 'Fullmetal Alchemist', 'Hunter x Hunter',
            'Bleach', 'Code Geass', 'Cowboy Bebop', 'Neon Genesis Evangelion',
            'Your Name', 'Spirited Away', 'Princess Mononoke'
        ];

        $genres = [
            ['Action', 'Adventure'], ['Drama', 'Supernatural'], ['Comedy', 'School'],
            ['Romance', 'Slice of Life'], ['Horror', 'Thriller'], ['Fantasy', 'Magic'],
            ['Sci-Fi', 'Mecha'], ['Sports', 'School'], ['Music', 'Drama']
        ];

        $studios = [
            'Studio Ghibli', 'Toei Animation', 'Madhouse', 'Studio Pierrot',
            'Bones', 'Wit Studio', 'Ufotable', 'A-1 Pictures', 'Trigger'
        ];

        $title = fake()->randomElement($animeNames);
        
        return [
            'title' => $title,
            'slug' => \Illuminate\Support\Str::slug($title),
            'synopsis' => fake()->paragraphs(3, true),
            'thumbnail' => 'https://via.placeholder.com/300x400/1a1a1a/ff4444?text=' . urlencode($title),
            'banner' => 'https://via.placeholder.com/1200x400/1a1a1a/ff4444?text=' . urlencode($title),
            'status' => fake()->randomElement(['ongoing', 'completed', 'upcoming']),
            'type' => fake()->randomElement(['tv', 'movie', 'ova', 'ona']),
            'studio' => fake()->randomElement($studios),
            'release_year' => fake()->numberBetween(2015, 2024),
            'genre' => json_encode(fake()->randomElement($genres)),
            'total_episodes' => fake()->numberBetween(12, 500),
            'rating' => fake()->randomFloat(1, 6.0, 9.9),
            'mal_id' => fake()->unique()->numberBetween(1000, 99999),
            'view_count' => fake()->numberBetween(100, 1000000),
            'is_featured' => fake()->boolean(20), // 20% chance of being featured
        ];
    }

    /**
     * Indicate that the anime is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
            'rating' => fake()->randomFloat(1, 8.0, 9.9),
            'view_count' => fake()->numberBetween(500000, 2000000),
        ]);
    }

    /**
     * Indicate that the anime is a movie.
     */
    public function movie(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'movie',
            'total_episodes' => 1,
        ]);
    }

    /**
     * Indicate that the anime is ongoing.
     */
    public function ongoing(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'ongoing',
        ]);
    }

    /**
     * Indicate that the anime is popular.
     */
    public function popular(): static
    {
        return $this->state(fn (array $attributes) => [
            'view_count' => fake()->numberBetween(1000000, 5000000),
            'rating' => fake()->randomFloat(1, 8.5, 9.9),
        ]);
    }
}