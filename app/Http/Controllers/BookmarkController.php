<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Anime;
use App\Models\Bookmark;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookmarkController extends Controller
{
    /**
     * Display bookmarked anime.
     */
    public function index(Request $request)
    {
        $sessionId = session()->getId();
        $userId = auth()->id();

        $query = Bookmark::with('anime.episodes')
            ->where(function ($query) use ($sessionId, $userId) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->where('session_id', $sessionId);
                }
            })
            ->latest();

        $bookmarks = $query->paginate(24);

        return Inertia::render('bookmarks', [
            'bookmarks' => $bookmarks,
        ]);
    }

    /**
     * Toggle bookmark for anime.
     */
    public function store(Request $request)
    {
        $request->validate([
            'anime_id' => 'required|exists:animes,id',
        ]);

        $sessionId = session()->getId();
        $userId = auth()->id();

        $bookmark = Bookmark::where('anime_id', $request->anime_id)
            ->where(function ($query) use ($sessionId, $userId) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->where('session_id', $sessionId);
                }
            })
            ->first();

        if ($bookmark) {
            $bookmark->delete();
            $message = 'Anime removed from bookmarks';
            $bookmarked = false;
        } else {
            Bookmark::create([
                'anime_id' => $request->anime_id,
                'session_id' => $userId ? null : $sessionId,
                'user_id' => $userId,
            ]);
            $message = 'Anime added to bookmarks';
            $bookmarked = true;
        }

        return back()->with([
            'success' => $message,
            'bookmarked' => $bookmarked,
        ]);
    }
}