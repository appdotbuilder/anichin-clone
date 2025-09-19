import React from 'react';
import { Head } from '@inertiajs/react';
import AnimeLayout from '@/components/anime-layout';
import { HeroSection } from '@/components/hero-section';
import { AnimeSection } from '@/components/anime-section';
import { AnimeCard } from '@/components/anime-card';

interface Anime {
    id: number;
    title: string;
    slug: string;
    thumbnail: string;
    banner?: string;
    status: string;
    type: string;
    rating?: number;
    view_count: number;
    genres: string[];
    episodes: Episode[];
    [key: string]: unknown;
}

interface Episode {
    id: number;
    episode_number: number;
    title: string;
    aired_at: string;
}

interface Props {
    featured: Anime[];
    todayPopular: Anime[];
    latestReleases: Anime[];
    movies: Anime[];
    upcoming: Anime[];
    recommendations: Anime[];
    [key: string]: unknown;
}

export default function Home({ 
    featured, 
    todayPopular, 
    latestReleases, 
    movies, 
    upcoming, 
    recommendations 
}: Props) {
    return (
        <AnimeLayout>
            <Head title="🎌 Streaming Anime - Watch Latest Donghua Online" />
            
            {/* Hero Section with Featured Anime */}
            <HeroSection animes={featured} />
            
            {/* Ad Banner */}
            <div className="container mx-auto px-4 mb-8">
                <div className="bg-gray-800 rounded-lg p-8 text-center border border-orange-500/20">
                    <div className="text-orange-400 text-sm font-medium">📺 Advertisement</div>
                    <div className="text-gray-400 mt-2">Banner Ad Space - 728x90</div>
                </div>
            </div>

            <div className="container mx-auto px-4 space-y-12">
                {/* Today's Popular */}
                <AnimeSection 
                    title="🔥 Terpopuler Hari Ini" 
                    subtitle="Anime paling banyak ditonton hari ini"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {todayPopular.map((anime) => (
                            <AnimeCard key={anime.id} anime={anime} />
                        ))}
                    </div>
                </AnimeSection>

                {/* Latest Releases */}
                <AnimeSection 
                    title="✨ Rilisan Terbaru" 
                    subtitle="Episode terbaru yang baru saja dirilis"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {latestReleases.map((anime) => (
                            <AnimeCard key={anime.id} anime={anime} showLatestEpisode />
                        ))}
                    </div>
                </AnimeSection>

                {/* Native Ad */}
                <div className="bg-gray-800 rounded-lg p-6 border border-orange-500/20">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🎯</span>
                        </div>
                        <div>
                            <div className="text-orange-400 text-sm font-medium">Sponsored Content</div>
                            <div className="text-white font-semibold">Native Banner Advertisement</div>
                            <div className="text-gray-400 text-sm">Premium anime streaming experience</div>
                        </div>
                    </div>
                </div>

                {/* Movies */}
                <AnimeSection 
                    title="🎬 Movie" 
                    subtitle="Film anime terbaik untuk ditonton"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {movies.map((anime) => (
                            <AnimeCard key={anime.id} anime={anime} />
                        ))}
                    </div>
                </AnimeSection>

                {/* Upcoming */}
                <AnimeSection 
                    title="📅 Upcoming Donghua" 
                    subtitle="Anime yang akan segera tayang"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {upcoming.map((anime) => (
                            <AnimeCard key={anime.id} anime={anime} showUpcoming />
                        ))}
                    </div>
                </AnimeSection>

                {/* Recommendations */}
                <AnimeSection 
                    title="⭐ Rekomendasi" 
                    subtitle="Anime dengan rating tinggi yang wajib ditonton"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {recommendations.map((anime) => (
                            <AnimeCard key={anime.id} anime={anime} />
                        ))}
                    </div>
                </AnimeSection>

                {/* Bottom Ad */}
                <div className="bg-gray-800 rounded-lg p-8 text-center border border-orange-500/20 mb-8">
                    <div className="text-orange-400 text-sm font-medium">📱 Advertisement</div>
                    <div className="text-gray-400 mt-2">Bottom Banner Ad Space - 728x90</div>
                </div>
            </div>
        </AnimeLayout>
    );
}