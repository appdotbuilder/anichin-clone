<?php

namespace Database\Seeders;

use App\Models\Anime;
use App\Models\Episode;
use Illuminate\Database\Seeder;

class AnimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create featured animes
        $featuredAnimes = Anime::factory()->count(5)->featured()->create();

        // Create popular animes
        $popularAnimes = Anime::factory()->count(10)->popular()->create();

        // Create regular animes
        $regularAnimes = Anime::factory()->count(20)->create();

        // Create some movies
        $movies = Anime::factory()->count(5)->movie()->create();

        // Create episodes for each anime
        $allAnimes = collect([$featuredAnimes, $popularAnimes, $regularAnimes, $movies])->flatten();

        foreach ($allAnimes as $anime) {
            $episodeCount = $anime->type === 'movie' ? 1 : random_int(1, min($anime->total_episodes, 24));
            
            for ($i = 1; $i <= $episodeCount; $i++) {
                Episode::factory()->create([
                    'anime_id' => $anime->id,
                    'episode_number' => $i,
                    'title' => "Episode {$i}: " . fake()->sentence(3),
                ]);
            }
        }
    }
}