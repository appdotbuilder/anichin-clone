<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Anime;
use App\Models\Episode;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index()
    {
        // Get featured anime
        $featured = Anime::with('episodes')
            ->featured()
            ->limit(5)
            ->get();

        // Get today's popular anime (most viewed today)
        $todayPopular = Anime::with('episodes')
            ->orderBy('view_count', 'desc')
            ->limit(12)
            ->get();

        // Get latest releases (recently added episodes)
        $latestReleases = Anime::with(['episodes' => function ($query) {
            $query->latest('created_at')->limit(1);
        }])
            ->whereHas('episodes', function ($query) {
                $query->where('created_at', '>=', now()->subDays(7));
            })
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        // Get movies
        $movies = Anime::movies()
            ->orderBy('rating', 'desc')
            ->limit(8)
            ->get();

        // Get upcoming anime
        $upcoming = Anime::upcoming()
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get();

        // Get recommendations (high rated anime)
        $recommendations = Anime::where('rating', '>=', 8.0)
            ->orderBy('rating', 'desc')
            ->limit(12)
            ->get();

        return Inertia::render('home', [
            'featured' => $featured,
            'todayPopular' => $todayPopular,
            'latestReleases' => $latestReleases,
            'movies' => $movies,
            'upcoming' => $upcoming,
            'recommendations' => $recommendations,
        ]);
    }
}