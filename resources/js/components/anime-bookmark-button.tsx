import React, { useState } from 'react';
import { router } from '@inertiajs/react';

interface Props {
    animeId: number;
    isBookmarked?: boolean;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
}

export function AnimeBookmarkButton({ 
    animeId, 
    isBookmarked = false, 
    className = '', 
    size = 'md',
    showText = false 
}: Props) {
    const [bookmarked, setBookmarked] = useState(isBookmarked);
    const [loading, setLoading] = useState(false);

    const handleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (loading) return;
        
        setLoading(true);
        
        router.post('/bookmark', { anime_id: animeId }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                // Check if the response indicates bookmarked status
                const flashData = page.props.flash as Record<string, unknown>;
                if (flashData?.bookmarked !== undefined && typeof flashData.bookmarked === 'boolean') {
                    setBookmarked(flashData.bookmarked);
                } else {
                    setBookmarked(!bookmarked);
                }
            },
            onError: (errors) => {
                console.error('Bookmark error:', errors);
            },
            onFinish: () => {
                setLoading(false);
            }
        });
    };

    const sizeClasses = {
        sm: 'w-6 h-6 text-sm',
        md: 'w-8 h-8 text-base',
        lg: 'w-10 h-10 text-lg'
    };

    const iconSize = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };

    return (
        <button
            onClick={handleBookmark}
            disabled={loading}
            className={`
                inline-flex items-center justify-center gap-2 
                transition-colors duration-200
                ${sizeClasses[size]}
                ${bookmarked 
                    ? 'text-orange-400 hover:text-orange-300' 
                    : 'text-gray-400 hover:text-orange-400'
                }
                ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${className}
            `}
            title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
        >
            {loading ? (
                <div className={`animate-spin rounded-full border-2 border-gray-400 border-t-transparent ${iconSize[size]}`}></div>
            ) : (
                <svg 
                    className={iconSize[size]} 
                    fill={bookmarked ? 'currentColor' : 'none'} 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
                    />
                </svg>
            )}
            
            {showText && (
                <span className="text-sm font-medium">
                    {bookmarked ? 'Bookmarked' : 'Bookmark'}
                </span>
            )}
        </button>
    );
}