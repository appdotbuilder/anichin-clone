<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

/**
 * App\Models\Anime
 *
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string|null $synopsis
 * @property string|null $thumbnail
 * @property string|null $banner
 * @property string $status
 * @property string $type
 * @property string|null $studio
 * @property int|null $release_year
 * @property string|null $genre
 * @property int|null $total_episodes
 * @property float|null $rating
 * @property int|null $mal_id
 * @property int $view_count
 * @property bool $is_featured
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Episode> $episodes
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Bookmark> $bookmarks
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\WatchHistory> $watchHistories
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Anime newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Anime newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Anime query()
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereSynopsis($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereThumbnail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereBanner($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereStudio($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereReleaseYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereGenre($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereTotalEpisodes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereMalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereViewCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Anime featured()
 * @method static \Illuminate\Database\Eloquent\Builder|Anime ongoing()
 * @method static \Illuminate\Database\Eloquent\Builder|Anime completed()
 * @method static \Illuminate\Database\Eloquent\Builder|Anime upcoming()
 * @method static \Illuminate\Database\Eloquent\Builder|Anime movies()
 * @method static \Illuminate\Database\Eloquent\Builder|Anime popular()
 * @method static \Database\Factories\AnimeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Anime extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'synopsis',
        'thumbnail',
        'banner',
        'status',
        'type',
        'studio',
        'release_year',
        'genre',
        'total_episodes',
        'rating',
        'mal_id',
        'view_count',
        'is_featured',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'release_year' => 'integer',
        'total_episodes' => 'integer',
        'rating' => 'decimal:1',
        'mal_id' => 'integer',
        'view_count' => 'integer',
        'is_featured' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($anime) {
            if (empty($anime->slug)) {
                $anime->slug = Str::slug($anime->title);
            }
        });
    }

    /**
     * Get the episodes for the anime.
     */
    public function episodes(): HasMany
    {
        return $this->hasMany(Episode::class);
    }

    /**
     * Get the bookmarks for the anime.
     */
    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class);
    }

    /**
     * Get the watch histories for the anime.
     */
    public function watchHistories(): HasMany
    {
        return $this->hasMany(WatchHistory::class);
    }

    /**
     * Scope a query to only include featured anime.
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope a query to only include ongoing anime.
     */
    public function scopeOngoing($query)
    {
        return $query->where('status', 'ongoing');
    }

    /**
     * Scope a query to only include completed anime.
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Scope a query to only include upcoming anime.
     */
    public function scopeUpcoming($query)
    {
        return $query->where('status', 'upcoming');
    }

    /**
     * Scope a query to only include movies.
     */
    public function scopeMovies($query)
    {
        return $query->where('type', 'movie');
    }

    /**
     * Scope a query to order by popularity.
     */
    public function scopePopular($query)
    {
        return $query->orderBy('view_count', 'desc');
    }

    /**
     * Get genres as array.
     */
    public function getGenresAttribute(): array
    {
        return $this->genre ? json_decode($this->genre, true) : [];
    }

    /**
     * Set genres from array.
     */
    public function setGenresAttribute($value): void
    {
        $this->attributes['genre'] = is_array($value) ? json_encode($value) : $value;
    }

    /**
     * Get route key name for model binding.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}