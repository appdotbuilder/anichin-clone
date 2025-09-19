<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Anime;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimeController extends Controller
{
    /**
     * Display a listing of anime.
     */
    public function index(Request $request)
    {
        $query = Anime::with('episodes');

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by type
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Search by title
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Sort
        $sortBy = $request->get('sort', 'latest');
        switch ($sortBy) {
            case 'popular':
                $query->orderBy('view_count', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            case 'title':
                $query->orderBy('title', 'asc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
        }

        $animes = $query->paginate(24);

        return Inertia::render('anime/index', [
            'animes' => $animes,
            'filters' => $request->only(['status', 'type', 'search', 'sort']),
        ]);
    }

    /**
     * Display the specified anime.
     */
    public function show(Anime $anime)
    {
        $anime->load(['episodes' => function ($query) {
            $query->orderBy('episode_number', 'asc');
        }]);

        // Increment view count
        $anime->increment('view_count');

        // Get related anime (same genres)
        $genres = $anime->genres;
        $related = collect();
        
        if (!empty($genres)) {
            $related = Anime::where('id', '!=', $anime->id)
                ->where(function ($query) use ($genres) {
                    foreach ($genres as $genre) {
                        $query->orWhere('genre', 'like', '%' . $genre . '%');
                    }
                })
                ->limit(12)
                ->get();
        }

        return Inertia::render('anime/show', [
            'anime' => $anime,
            'related' => $related,
        ]);
    }
}