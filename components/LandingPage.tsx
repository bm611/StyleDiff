import React from 'react';

interface LandingPageProps {
    onStart: () => void;
    onSignIn: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onSignIn }) => {
    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]"></div>
            </div>

            {/* Navbar */}
            <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        S
                    </div>
                    <span className="text-xl font-bold tracking-tight">StyleDiff</span>
                </div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={onSignIn}
                        className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={onStart}
                        className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
                    >
                        Try for Free
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8 animate-fade-in-up">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                    Now available in Beta v1.0
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight animate-fade-in-up delay-100">
                    Reimagine your style <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                        with AI precision.
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
                    Upload a photo. Describe a look. We map high-fashion textures and fabrics to your image while preserving 100% of your identity.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
                    <button
                        onClick={onStart}
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-105 flex items-center justify-center gap-2 group"
                    >
                        Start Designing
                        <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </button>
                    <button
                        onClick={() => window.open('https://github.com', '_blank')}
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-lg backdrop-blur-sm transition-all flex items-center justify-center gap-2"
                    >
                        <i className="fa-brands fa-github"></i>
                        Star on GitHub
                    </button>
                </div>

                {/* Floating UI Mockup */}
                <div className="mt-20 relative mx-auto max-w-5xl rounded-2xl p-2 bg-gradient-to-b from-white/10 to-transparent animate-fade-in-up delay-500">
                    <div className="rounded-xl overflow-hidden bg-[#0F0F0F] border border-white/10 shadow-2xl">
                        <div className="aspect-video relative overflow-hidden flex items-center justify-center bg-grid-white/[0.05]">
                            <div className="text-center">
                                <div className="inline-block p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-4">
                                    <i className="fa-solid fa-wand-magic-sparkles text-4xl text-indigo-400"></i>
                                </div>
                                <p className="text-gray-500 text-sm">Interactive Demo Preview</p>
                            </div>
                            {/* Decorative floating elements */}
                            <div className="absolute top-10 left-10 p-3 rounded-lg bg-[#1A1A1A] border border-white/5 shadow-xl animate-float">
                                <div className="w-20 h-2 bg-white/10 rounded mb-2"></div>
                                <div className="w-12 h-2 bg-white/10 rounded"></div>
                            </div>
                            <div className="absolute bottom-10 right-10 p-3 rounded-lg bg-[#1A1A1A] border border-white/5 shadow-xl animate-float animation-delay-2000">
                                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                    <i className="fa-solid fa-shirt text-indigo-400 text-xs"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Grid */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon="fa-fingerprint"
                        title="Identity Locked"
                        desc="Our algorithms ensure facial features and body type remain untouched. Only the clothing changes."
                    />
                    <FeatureCard
                        icon="fa-bolt"
                        title="Real-time Rendering"
                        desc="Generate high-resolution style transfers in seconds, not minutes. Powered by Gemini 2.5."
                    />
                    <FeatureCard
                        icon="fa-layer-group"
                        title="Texture Mapping"
                        desc="Realistic fabric physics. Silk looks like silk, wool looks like wool. No more plastic clothes."
                    />
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-white/5 py-10 bg-black">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-500 text-sm">© 2024 StyleDiff Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><i className="fa-brands fa-twitter"></i></a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><i className="fa-brands fa-linkedin"></i></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard: React.FC<{ icon: string, title: string, desc: string }> = ({ icon, title, desc }) => (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <i className={`fa-solid ${icon} text-indigo-400 text-xl`}></i>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
);

export default LandingPage;
