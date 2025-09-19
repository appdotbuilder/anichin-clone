import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="🎌 AnimeStream - Premium Anime Streaming Platform">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gray-900 text-white">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4 p-6">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg border border-orange-500 bg-orange-500 px-6 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors duration-200"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg border border-gray-700 px-6 py-2 text-sm font-medium text-gray-300 hover:border-orange-500 hover:text-orange-400 transition-colors duration-200"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg border border-orange-500 bg-orange-500 px-6 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors duration-200"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow">
                    <main className="flex w-full max-w-6xl flex-col items-center text-center px-6">
                        {/* Logo and Brand */}
                        <div className="mb-8">
                            <div className="flex items-center justify-center space-x-4 mb-4">
                                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    <span className="text-white font-bold text-3xl">🎌</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold text-white">
                                    AnimeStream
                                </h1>
                            </div>
                            <p className="text-xl text-orange-400 font-medium">
                                Premium Anime Streaming Platform
                            </p>
                        </div>

                        {/* Hero Content */}
                        <div className="bg-gray-800 rounded-2xl p-8 md:p-12 mb-8 border border-gray-700 shadow-2xl max-w-4xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                🌟 Stream Unlimited Anime & Donghua
                            </h2>
                            
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Nikmati pengalaman streaming anime terbaik dengan koleksi donghua terlengkap, 
                                update episode tercepat, dan kualitas video HD. Tonton kapan saja, di mana saja!
                            </p>

                            {/* Features */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="text-left">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">🚀</span>
                                        <h3 className="text-lg font-semibold text-white">Update Tercepat</h3>
                                    </div>
                                    <p className="text-gray-400">Episode terbaru langsung tersedia setelah rilis</p>
                                </div>
                                
                                <div className="text-left">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">🎬</span>
                                        <h3 className="text-lg font-semibold text-white">Koleksi Lengkap</h3>
                                    </div>
                                    <p className="text-gray-400">Ribuan anime dan donghua dari berbagai genre</p>
                                </div>
                                
                                <div className="text-left">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">💾</span>
                                        <h3 className="text-lg font-semibold text-white">Bookmark & History</h3>
                                    </div>
                                    <p className="text-gray-400">Simpan anime favorit dan lanjutkan menonton</p>
                                </div>
                                
                                <div className="text-left">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">📱</span>
                                        <h3 className="text-lg font-semibold text-white">Multi Device</h3>
                                    </div>
                                    <p className="text-gray-400">Akses dari smartphone, tablet, atau komputer</p>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-orange-500/20"
                                >
                                    🎬 Mulai Streaming
                                </Link>
                                
                                {!auth.user && (
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105"
                                    >
                                        ✨ Daftar Gratis
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 w-full max-w-2xl">
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">1000+</div>
                                <div className="text-gray-400 text-sm">Anime Series</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">50K+</div>
                                <div className="text-gray-400 text-sm">Episodes</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">24/7</div>
                                <div className="text-gray-400 text-sm">Available</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-1">HD</div>
                                <div className="text-gray-400 text-sm">Quality</div>
                            </div>
                        </div>

                        {/* Footer */}
                        <footer className="text-center text-gray-400 text-sm">
                            <p>© 2024 AnimeStream. Platform streaming anime terbaik untuk para otaku Indonesia.</p>
                        </footer>
                    </main>
                </div>
            </div>
        </>
    );
}