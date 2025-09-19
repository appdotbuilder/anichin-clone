<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\AnimeController;
use App\Http\Controllers\EpisodeController;
use App\Http\Controllers\BookmarkController;
use Illuminate\Support\Facades\Route;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page with anime content
Route::get('/', [HomeController::class, 'index'])->name('home');

// Anime routes
Route::get('/donghua', [AnimeController::class, 'index'])->name('anime.index');
Route::get('/donghua/{anime}', [AnimeController::class, 'show'])->name('anime.show');
Route::get('/donghua/{anime}/episode/{episode}', [EpisodeController::class, 'show'])->name('episode.show');

// Bookmark routes (works for both guests and authenticated users)
Route::get('/bookmark', [BookmarkController::class, 'index'])->name('bookmarks.index');
Route::post('/bookmark', [BookmarkController::class, 'store'])->name('bookmarks.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia\Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
