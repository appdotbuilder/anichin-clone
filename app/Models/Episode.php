<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Episode
 *
 * @property int $id
 * @property int $anime_id
 * @property string $title
 * @property int $episode_number
 * @property string|null $synopsis
 * @property string|null $thumbnail
 * @property array|null $download_links
 * @property string|null $stream_url
 * @property int|null $duration
 * @property \Illuminate\Support\Carbon|null $aired_at
 * @property int $view_count
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Anime $anime
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\WatchHistory> $watchHistories
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Episode newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Episode newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Episode query()
 * @method static \Illuminate\Database\Eloquent\Builder|Episode whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Episode whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Episode whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Episode whereEpisodeNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Episode whereSynopsis($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Episode whereThumbnail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Episode whereDownloadLinks($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Episode whereStreamUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Episode whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Episode whereAiredAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Episode whereViewCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Episode whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Episode whereUpdatedAt($value)
 * @method static \Database\Factories\EpisodeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Episode extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'anime_id',
        'title',
        'episode_number',
        'synopsis',
        'thumbnail',
        'download_links',
        'stream_url',
        'duration',
        'aired_at',
        'view_count',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'anime_id' => 'integer',
        'episode_number' => 'integer',
        'download_links' => 'array',
        'duration' => 'integer',
        'aired_at' => 'datetime',
        'view_count' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the anime that owns the episode.
     */
    public function anime(): BelongsTo
    {
        return $this->belongsTo(Anime::class);
    }

    /**
     * Get the watch histories for the episode.
     */
    public function watchHistories(): HasMany
    {
        return $this->hasMany(WatchHistory::class);
    }
}