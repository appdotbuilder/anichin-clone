import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AnimeLayout from '@/components/anime-layout';
import { AnimeCard } from '@/components/anime-card';

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

interface PaginationLink {
    url?: string;
    label: string;
    active: boolean;
}

interface Props {
    animes: {
        data: Anime[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: PaginationLink[];
    };
    filters: {
        status?: string;
        type?: string;
        search?: string;
        sort?: string;
    };
    [key: string]: unknown;
}

export default function AnimeIndex({ animes, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleFilter = (key: string, value: string) => {
        router.get('/donghua', { 
            ...filters, 
            [key]: value,
            page: 1 // Reset to first page when filtering
        }, { 
            preserveState: true,
            replace: true 
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/donghua', { 
            ...filters, 
            search: searchTerm,
            page: 1
        }, { 
            preserveState: true,
            replace: true 
        });
    };

    const handlePageChange = (url: string) => {
        if (url) {
            router.get(url, {}, { preserveState: true });
        }
    };

    return (
        <AnimeLayout>
            <Head title="🎌 Donghua List - Complete Anime Collection" />
            
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">📚 Donghua List</h1>
                    <p className="text-gray-400">
                        Jelajahi koleksi lengkap anime dan donghua terbaru
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-8 space-y-4">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="max-w-md">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cari anime..."
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-2 text-gray-400 hover:text-orange-400"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-4">
                        {/* Status Filter */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleFilter('status', '')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    !filters.status ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                All Status
                            </button>
                            <button
                                onClick={() => handleFilter('status', 'ongoing')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    filters.status === 'ongoing' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                📺 Ongoing
                            </button>
                            <button
                                onClick={() => handleFilter('status', 'completed')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    filters.status === 'completed' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                ✅ Completed
                            </button>
                            <button
                                onClick={() => handleFilter('status', 'upcoming')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    filters.status === 'upcoming' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                🔜 Upcoming
                            </button>
                        </div>

                        {/* Type Filter */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleFilter('type', '')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    !filters.type ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                All Types
                            </button>
                            <button
                                onClick={() => handleFilter('type', 'tv')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    filters.type === 'tv' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                📺 TV
                            </button>
                            <button
                                onClick={() => handleFilter('type', 'movie')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    filters.type === 'movie' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                🎬 Movie
                            </button>
                        </div>

                        {/* Sort Filter */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleFilter('sort', 'latest')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    filters.sort === 'latest' || !filters.sort ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                🆕 Latest
                            </button>
                            <button
                                onClick={() => handleFilter('sort', 'popular')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    filters.sort === 'popular' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                🔥 Popular
                            </button>
                            <button
                                onClick={() => handleFilter('sort', 'rating')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    filters.sort === 'rating' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                ⭐ Rating
                            </button>
                            <button
                                onClick={() => handleFilter('sort', 'title')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    filters.sort === 'title' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                🔤 A-Z
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Info */}
                <div className="mb-6 flex justify-between items-center">
                    <p className="text-gray-400">
                        Showing {animes.data.length} of {animes.total} anime
                    </p>
                </div>

                {/* Ad Banner */}
                <div className="bg-gray-800 rounded-lg p-6 text-center border border-orange-500/20 mb-8">
                    <div className="text-orange-400 text-sm font-medium">📺 Advertisement</div>
                    <div className="text-gray-400 mt-2">List Page Banner Ad - 728x90</div>
                </div>

                {/* Anime Grid */}
                {animes.data.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                        {animes.data.map((anime) => (
                            <AnimeCard key={anime.id} anime={anime} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">😔</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No anime found</h3>
                        <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                    </div>
                )}

                {/* Pagination */}
                {animes.last_page > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-8">
                        {animes.links.map((link, index) => {
                            if (link.label === 'pagination.previous') {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => link.url && handlePageChange(link.url)}
                                        disabled={!link.url}
                                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        ← Prev
                                    </button>
                                );
                            }
                            
                            if (link.label === 'pagination.next') {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => link.url && handlePageChange(link.url)}
                                        disabled={!link.url}
                                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next →
                                    </button>
                                );
                            }
                            
                            if (!link.url && link.label === '...') {
                                return (
                                    <span key={index} className="px-4 py-2 text-gray-400">
                                        ...
                                    </span>
                                );
                            }
                            
                            return (
                                <button
                                    key={index}
                                    onClick={() => link.url && handlePageChange(link.url)}
                                    className={`px-4 py-2 rounded-lg ${
                                        link.active
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                                >
                                    {link.label}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </AnimeLayout>
    );
}