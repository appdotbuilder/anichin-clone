import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { AnimeBookmarkButton } from '@/components/anime-bookmark-button';

interface Anime {
    id: number;
    title: string;
    slug: string;
    synopsis?: string;
    banner?: string;
    thumbnail: string;
    rating?: number;
    genres: string[];
    status: string;
    episodes: Episode[];
    [key: string]: unknown;
}

interface Episode {
    id: number;
    episode_number: number;
}

interface Props {
    animes: Anime[];
}

export function HeroSection({ animes }: Props) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (animes.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % animes.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [animes.length]);

    if (!animes.length) return null;

    const currentAnime = animes[currentSlide];
    const latestEpisode = currentAnime.episodes?.[currentAnime.episodes.length - 1];

    return (
        <div className="relative h-[500px] overflow-hidden">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${currentAnime.banner || currentAnime.thumbnail})`,
                }}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-4 flex items-center">
                <div className="max-w-2xl">
                    {/* Badge */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            ⭐ Featured
                        </span>
                        <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                            {currentAnime.status === 'ongoing' ? '📺 Ongoing' : 
                             currentAnime.status === 'completed' ? '✅ Completed' : '🔜 Upcoming'}
                        </span>
                        {currentAnime.rating && (
                            <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                ⭐ {currentAnime.rating}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        {currentAnime.title}
                    </h1>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {currentAnime.genres.slice(0, 4).map((genre, index) => (
                            <span 
                                key={index}
                                className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>

                    {/* Synopsis */}
                    {currentAnime.synopsis && (
                        <p className="text-gray-300 text-lg mb-6 line-clamp-3">
                            {currentAnime.synopsis.slice(0, 200)}
                            {currentAnime.synopsis.length > 200 ? '...' : ''}
                        </p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href={`/donghua/${currentAnime.slug}`}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                        >
                            🎬 Watch Now
                        </Link>
                        
                        {latestEpisode && (
                            <Link
                                href={`/donghua/${currentAnime.slug}/episode/${latestEpisode.id}`}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                            >
                                ▶️ Episode {latestEpisode.episode_number}
                            </Link>
                        )}

                        <AnimeBookmarkButton 
                            animeId={currentAnime.id}
                            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                        />
                    </div>
                </div>
            </div>

            {/* Slide Indicators */}
            {animes.length > 1 && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {animes.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                                index === currentSlide ? 'bg-orange-500' : 'bg-gray-500'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}