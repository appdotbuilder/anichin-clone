import React, { ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface Props {
    children: ReactNode;
}

export default function AnimeLayout({ children }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Navigation Header */}
            <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">🎌</span>
                            </div>
                            <span className="text-xl font-bold text-white">AnimeStream</span>
                        </Link>

                        {/* Main Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link 
                                href="/" 
                                className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                            >
                                Home
                            </Link>
                            <Link 
                                href="/donghua" 
                                className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                            >
                                Donghua List
                            </Link>
                            <Link 
                                href="/bookmark" 
                                className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                            >
                                Bookmark
                            </Link>
                            <Link 
                                href="#" 
                                className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                            >
                                Schedule
                            </Link>
                            <Link 
                                href="#" 
                                className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                            >
                                Riwayat Menonton
                            </Link>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <div className="flex items-center space-x-4">
                                    <Link 
                                        href="/dashboard" 
                                        className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                                    >
                                        Dashboard
                                    </Link>
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link 
                                        href="/login" 
                                        className="text-gray-300 hover:text-orange-400 transition-colors duration-200"
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        href="/register" 
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 mt-16">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">🎌</span>
                                </div>
                                <span className="text-xl font-bold text-white">AnimeStream</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Platform streaming anime terbaik dengan koleksi donghua terlengkap dan update tercepat.
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="text-white font-semibold mb-4">Browse</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/donghua" className="text-gray-400 hover:text-orange-400">Donghua List</Link></li>
                                <li><Link href="/bookmark" className="text-gray-400 hover:text-orange-400">Bookmark</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-orange-400">Schedule</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-orange-400">Random</Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-white font-semibold mb-4">Genre</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="#" className="text-gray-400 hover:text-orange-400">Action</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-orange-400">Romance</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-orange-400">Comedy</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-orange-400">Drama</Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-white font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="#" className="text-gray-400 hover:text-orange-400">Contact Us</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-orange-400">DMCA</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-orange-400">Privacy Policy</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-orange-400">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                        <p className="text-gray-400 text-sm">
                            &copy; 2024 AnimeStream. All rights reserved. Built with ❤️ for anime fans.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}