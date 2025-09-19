import React from 'react';
import { Link } from '@inertiajs/react';
import { AnimeBookmarkButton } from '@/components/anime-bookmark-button';

interface Anime {
    id: number;
    title: string;
    slug: string;
    thumbnail: string;
    status: string;
    type: string;
    rating?: number;
    view_count: number;
    episodes: Episode[];
    [key: string]: unknown;
}

interface Episode {
    id: number;
    episode_number: number;
    aired_at: string;
}

interface Props {
    anime: Anime;
    showLatestEpisode?: boolean;
    showUpcoming?: boolean;
    className?: string;
}

export function AnimeCard({ anime, showLatestEpisode = false, showUpcoming = false, className = '' }: Props) {
    const latestEpisode = anime.episodes?.[anime.episodes.length - 1];
    
    return (
        <div className={`group relative bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20 ${className}`}>
            {/* Thumbnail */}
            <Link href={`/donghua/${anime.slug}`} className="block relative">
                <div className="aspect-[3/4] overflow-hidden">
                    <img
                        src={anime.thumbnail}
                        alt={anime.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                    />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-orange-500 text-white p-3 rounded-full">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                    {anime.status === 'ongoing' && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                            Ongoing
                        </span>
                    )}
                    {anime.status === 'completed' && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            Completed
                        </span>
                    )}
                    {anime.status === 'upcoming' && (
                        <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">
                            Upcoming
                        </span>
                    )}
                </div>

                {/* Rating */}
                {anime.rating && (
                    <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs px-2 py-1 rounded font-medium">
                        ⭐ {anime.rating}
                    </div>
                )}
            </Link>

            {/* Content */}
            <div className="p-3">
                {/* Title */}
                <Link href={`/donghua/${anime.slug}`} className="block">
                    <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-orange-400 transition-colors duration-200 mb-2">
                        {anime.title}
                    </h3>
                </Link>

                {/* Episode Info or View Count */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    {showLatestEpisode && latestEpisode ? (
                        <span>Episode {latestEpisode.episode_number}</span>
                    ) : showUpcoming ? (
                        <span>Coming Soon</span>
                    ) : (
                        <span>{anime.episodes.length} Episodes</span>
                    )}
                    <span>👁 {anime.view_count.toLocaleString()}</span>
                </div>

                {/* Type */}
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 capitalize">
                        {anime.type}
                    </span>
                    
                    {/* Bookmark Button */}
                    <AnimeBookmarkButton 
                        animeId={anime.id}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-700 rounded"
                        size="sm"
                    />
                </div>
            </div>
        </div>
    );
}