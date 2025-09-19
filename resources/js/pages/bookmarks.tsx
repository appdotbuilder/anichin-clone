import React from 'react';
import { Head } from '@inertiajs/react';
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

interface Bookmark {
    id: number;
    anime: Anime;
    created_at: string;
}

interface PaginationLink {
    url?: string;
    label: string;
    active: boolean;
}

interface Props {
    bookmarks: {
        data: Bookmark[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: PaginationLink[];
    };
    [key: string]: unknown;
}

export default function Bookmarks({ bookmarks }: Props) {
    return (
        <AnimeLayout>
            <Head title="💾 My Bookmarks - Saved Anime Collection" />
            
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        💾 My Bookmarks
                    </h1>
                    <p className="text-gray-400">
                        Koleksi anime favorit yang sudah kamu simpan
                    </p>
                </div>

                {/* Stats */}
                {bookmarks.total > 0 && (
                    <div className="mb-8">
                        <div className="bg-gray-800 rounded-lg p-4 border border-orange-500/20">
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="text-orange-400">📊</span>
                                    <span className="text-gray-300">Total Bookmarks:</span>
                                    <span className="text-white font-medium">{bookmarks.total}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-orange-400">📄</span>
                                    <span className="text-gray-300">Page:</span>
                                    <span className="text-white font-medium">{bookmarks.current_page} of {bookmarks.last_page}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Ad Banner */}
                <div className="bg-gray-800 rounded-lg p-6 text-center border border-orange-500/20 mb-8">
                    <div className="text-orange-400 text-sm font-medium">💾 Advertisement</div>
                    <div className="text-gray-400 mt-2">Bookmark Page Banner Ad - 728x90</div>
                </div>

                {/* Bookmarked Anime Grid */}
                {bookmarks.data.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                        {bookmarks.data.map((bookmark) => (
                            <AnimeCard 
                                key={bookmark.id} 
                                anime={bookmark.anime} 
                                className="relative"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-6">📚</div>
                        <h3 className="text-2xl font-semibold text-white mb-4">No bookmarks yet</h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Mulai menambahkan anime favorit ke bookmark untuk mengaksesnya dengan mudah nanti
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <span>🎬</span>
                                    <span>Browse anime</span>
                                </div>
                                <span>→</span>
                                <div className="flex items-center gap-2">
                                    <span>💾</span>
                                    <span>Click bookmark button</span>
                                </div>
                                <span>→</span>
                                <div className="flex items-center gap-2">
                                    <span>✨</span>
                                    <span>Access here anytime</span>
                                </div>
                            </div>
                            <a 
                                href="/donghua" 
                                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                            >
                                🔍 Browse Anime
                            </a>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {bookmarks.last_page > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-8">
                        {bookmarks.links.map((link, index) => {
                            if (link.label === 'pagination.previous') {
                                return (
                                    <a
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 ${
                                            !link.url ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        ← Prev
                                    </a>
                                );
                            }
                            
                            if (link.label === 'pagination.next') {
                                return (
                                    <a
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 ${
                                            !link.url ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        Next →
                                    </a>
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
                                <a
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg ${
                                        link.active
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                    </div>
                )}

                {/* Tips Section */}
                <div className="mt-12 bg-gray-800 rounded-lg p-6 border border-orange-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        💡 Tips & Tricks
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
                        <div>
                            <p className="mb-2">
                                <span className="text-orange-400">📱</span> Bookmark works without login - your data is saved in your browser
                            </p>
                            <p>
                                <span className="text-orange-400">🔄</span> Create an account to sync bookmarks across devices
                            </p>
                        </div>
                        <div>
                            <p className="mb-2">
                                <span className="text-orange-400">⚡</span> Quick bookmark by clicking the bookmark icon on any anime card
                            </p>
                            <p>
                                <span className="text-orange-400">🎯</span> Use filters on the Donghua List to find specific anime
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AnimeLayout>
    );
}