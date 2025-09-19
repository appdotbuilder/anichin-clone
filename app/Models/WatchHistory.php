<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\WatchHistory
 *
 * @property int $id
 * @property int $anime_id
 * @property int $episode_id
 * @property string|null $session_id
 * @property int|null $user_id
 * @property int $watch_progress
 * @property bool $completed
 * @property \Illuminate\Support\Carbon $last_watched_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Anime $anime
 * @property-read \App\Models\Episode $episode
 * @property-read \App\Models\User|null $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|WatchHistory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WatchHistory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WatchHistory query()
 * @method static \Illuminate\Database\Eloquent\Builder|WatchHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WatchHistory whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WatchHistory whereEpisodeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WatchHistory whereSessionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WatchHistory whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WatchHistory whereWatchProgress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WatchHistory whereCompleted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WatchHistory whereLastWatchedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WatchHistory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WatchHistory whereUpdatedAt($value)
 * @method static \Database\Factories\WatchHistoryFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class WatchHistory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'anime_id',
        'episode_id',
        'session_id',
        'user_id',
        'watch_progress',
        'completed',
        'last_watched_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'anime_id' => 'integer',
        'episode_id' => 'integer',
        'user_id' => 'integer',
        'watch_progress' => 'integer',
        'completed' => 'boolean',
        'last_watched_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the anime being watched.
     */
    public function anime(): BelongsTo
    {
        return $this->belongsTo(Anime::class);
    }

    /**
     * Get the episode being watched.
     */
    public function episode(): BelongsTo
    {
        return $this->belongsTo(Episode::class);
    }

    /**
     * Get the user who watched the episode.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}