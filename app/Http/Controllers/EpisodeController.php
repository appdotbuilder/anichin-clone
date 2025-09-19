<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Anime;
use App\Models\Episode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EpisodeController extends Controller
{
    /**
     * Display the specified episode.
     */
    public function show(Anime $anime, Episode $episode)
    {
        $episode->load('anime');

        // Verify episode belongs to anime
        if ($episode->anime_id !== $anime->id) {
            abort(404);
        }

        // Increment view count
        $episode->increment('view_count');
        $anime->increment('view_count');

        // Get all episodes for this anime
        /** @var \Illuminate\Database\Eloquent\Collection<int, Episode> $episodes */
        $episodes = $anime->episodes()
            ->orderBy('episode_number', 'asc')
            ->get();

        // Get previous and next episodes
        $currentIndex = 0;
        foreach ($episodes as $index => $ep) {
            /** @var Episode $ep */
            if ($ep->id === $episode->id) {
                $currentIndex = $index;
                break;
            }
        }

        $previousEpisode = $currentIndex > 0 ? $episodes[$currentIndex - 1] : null;
        $nextEpisode = $currentIndex < $episodes->count() - 1 ? $episodes[$currentIndex + 1] : null;

        return Inertia::render('anime/episode', [
            'anime' => $anime,
            'episode' => $episode,
            'episodes' => $episodes,
            'previousEpisode' => $previousEpisode,
            'nextEpisode' => $nextEpisode,
        ]);
    }
}