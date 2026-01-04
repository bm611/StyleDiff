import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, Dress01Icon, ImageUploadIcon, PencilEdit02Icon, SparklesIcon } from 'hugeicons-react';
import { supabase } from '../services/supabaseClient';
import { User } from '@supabase/supabase-js';
import { AuthModal } from './AuthModal';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    delay: number;
}

const LandingPage: React.FC = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [activeTab, setActiveTab] = useState(0);
    const [user, setUser] = useState<User | null>(null);
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        // Auth subscription
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        // Particles generation
        const generated: Particle[] = [];
        for (let i = 0; i < 150; i++) {
            generated.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 1,
                opacity: Math.random() * 0.6 + 0.15,
                delay: Math.random() * 8,
            });
        }
        setParticles(generated);

        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className="min-h-screen bg-[#fafafa] text-gray-900 overflow-hidden relative">
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Cormorant+Garamond:wght@400;500;600&display=swap" rel="stylesheet" />
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    25% { transform: translateY(-10px) translateX(5px); }
                    50% { transform: translateY(-5px) translateX(-5px); }
                    75% { transform: translateY(-15px) translateX(3px); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
                .delay-100 { animation-delay: 0.1s; opacity: 0; }
                .delay-200 { animation-delay: 0.2s; opacity: 0; }
                .delay-300 { animation-delay: 0.3s; opacity: 0; }
                .fancy-btn {
                    background: linear-gradient(135deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%);
                    background-size: 200% 200%;
                    position: relative;
                    overflow: hidden;
                }
                .fancy-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    animation: shimmer 3s infinite;
                }
                .fancy-btn:hover {
                    background-position: 100% 100%;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                }
                .step-card {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    background: rgba(255, 255, 255, 0.6);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(0, 0, 0, 0.04);
                    border-radius: 32px;
                    box-shadow: 
                        0 4px 24px -1px rgba(0, 0, 0, 0.02),
                        inset 0 1px 0 rgba(255, 255, 255, 0.8);
                    position: relative;
                    overflow: hidden;
                    height: 100%;
                }
                .step-card:hover {
                    transform: translateY(-8px);
                    background: #ffffff;
                    box-shadow: 
                        0 30px 60px -12px rgba(0, 0, 0, 0.12),
                        0 12px 24px -8px rgba(0, 0, 0, 0.06);
                    border-color: rgba(0, 0, 0, 0.12);
                }
                .card-gradient {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    transition: opacity 0.5s ease;
                    background: radial-gradient(800px circle at top right, var(--card-color), transparent 40%);
                    pointer-events: none;
                }
                .step-card:hover .card-gradient {
                    opacity: 0.1;
                }
                .card-icon-bg {
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    background: rgba(255,255,255,0.6);
                    border: 1px solid rgba(255,255,255,0.4);
                }
                .step-card:hover .card-icon-bg {
                    transform: scale(1.1) rotate(5deg);
                    background: white;
                    box-shadow: 0 12px 24px -8px rgba(0,0,0,0.1);
                    border-color: white;
                }
                .card-number {
                    font-family: 'Playfair Display', serif;
                    font-size: 5rem;
                    font-weight: 700;
                    color: rgba(0,0,0,0.03);
                    position: absolute;
                    bottom: -1rem;
                    right: -0.5rem;
                    line-height: 1;
                    transition: all 0.5s ease;
                    user-select: none;
                }
                .step-card:hover .card-number {
                    color: rgba(0,0,0,0.06);
                    transform: translateX(-10px) translateY(-10px);
                }
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slideOutLeft {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                }
                .card-enter {
                    animation: slideInRight 0.4s ease-out forwards;
                }
                .card-exit {
                    animation: slideOutLeft 0.3s ease-in forwards;
                }
                .tab-button {
                    transition: all 0.3s ease;
                    position: relative;
                    font-size: 1rem;
                    font-weight: 600;
                    padding: 0.75rem 1.5rem;
                    border-radius: 50px;
                    border: 1.5px solid rgba(0,0,0,0.1);
                    background: transparent;
                    color: rgba(0,0,0,0.5);
                    cursor: pointer;
                }
                .tab-button:hover {
                    border-color: rgba(0,0,0,0.2);
                    background: rgba(0,0,0,0.02);
                }
                .tab-button.active {
                    background: linear-gradient(135deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%);
                    color: white;
                    border-color: transparent;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                }
                .nav-btn {
                    border: 1.5px solid #1a1a1a;
                    border-radius: 9999px;
                    color: #1a1a1a;
                    background: transparent;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                }
                .nav-btn:hover {
                    background: #4A192C;
                    color: white;
                    border-color: #4A192C;
                    box-shadow: 0 4px 16px rgba(74, 25, 44, 0.25);
                    transform: translateY(-1px);
                }
                .floating-nav {
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.6);
                    box-shadow: 
                        0 4px 24px rgba(0, 0, 0, 0.06),
                        0 1px 2px rgba(0, 0, 0, 0.04),
                        inset 0 1px 0 rgba(255, 255, 255, 0.6);
                    transition: all 0.3s ease;
                }
                .floating-nav:hover {
                    box-shadow: 
                        0 8px 32px rgba(0, 0, 0, 0.1),
                        0 2px 4px rgba(0, 0, 0, 0.06),
                        inset 0 1px 0 rgba(255, 255, 255, 0.6);
                }
            `}</style>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="absolute rounded-full bg-blue-500"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            opacity: p.opacity,
                            animation: `float ${6 + p.delay}s ease-in-out infinite`,
                            animationDelay: `${p.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* Floating Navbar */}
            <div className="relative z-10 px-4 sm:px-6 pt-4 sm:pt-6">
                <nav className="floating-nav max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-full">
                    <div className="flex items-center gap-2">
                        <Dress01Icon size={22} />
                        <span className="text-lg sm:text-xl font-semibold tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>StyleDiff</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <a
                            href="https://github.com/bm611/StyleDiff"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-btn text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4"
                        >
                            <GithubIcon size={14} />
                            <span className="hidden sm:inline">GitHub</span>
                        </a>
                        {user ? (
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700 hidden sm:inline-block" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
                                    {user.user_metadata.full_name || user.email?.split('@')[0]}
                                </span>
                                <button
                                    onClick={() => supabase.auth.signOut()}
                                    className="nav-btn text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="nav-btn text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </nav>
            </div>

            {/* Hero Section */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
                <div className="animate-fade-in flex items-center justify-center gap-2 mb-8">
                    <Dress01Icon size={20} />
                    <span className="text-lg font-semibold text-gray-600 tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>StyleDiff</span>
                </div>

                <h1 className="animate-fade-in delay-100 text-5xl md:text-7xl font-medium tracking-tight mb-6 leading-[1.1]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Reimagine your <span className="italic">style</span>
                </h1>

                <p className="animate-fade-in delay-200 text-2xl md:text-3xl text-gray-400 font-normal mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
                    powered by imagination
                </p>

                <div className="animate-fade-in delay-300">
                    <Link
                        to="/app"
                        className="fancy-btn group relative px-10 py-4 rounded-full text-white text-sm font-medium tracking-wide uppercase transition-all duration-500 hover:scale-105 inline-block"
                        style={{ letterSpacing: '0.15em' }}
                    >
                        <span className="flex items-center justify-center transition-all duration-500 ease-out group-hover:-translate-y-[250%]">
                            Start Designing
                        </span>
                        <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out translate-y-[250%] group-hover:translate-y-0">
                            <span className="animate-bounce" style={{ animationDuration: '2s' }}>
                                <Dress01Icon size={24} />
                            </span>
                        </span>
                    </Link>
                </div>
            </div>

            {/* 3-Step Process Cards */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="step-card group" style={{ '--card-color': '#0ea5e9' } as React.CSSProperties}>
                        <div className="card-gradient"></div>
                        <div className="p-8 relative z-10 flex flex-col h-full">
                            <div className="card-icon-bg w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-sky-600 shadow-sm">
                                <ImageUploadIcon size={26} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Upload Your Look
                            </h3>
                            <p className="text-gray-500 leading-relaxed mb-4">
                                Start your transformation with a simple photo. We use it as the perfect canvas for your new style.
                            </p>
                            <span className="card-number">01</span>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="step-card group" style={{ '--card-color': '#a855f7' } as React.CSSProperties}>
                        <div className="card-gradient"></div>
                        <div className="p-8 relative z-10 flex flex-col h-full">
                            <div className="card-icon-bg w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-purple-600 shadow-sm">
                                <PencilEdit02Icon size={26} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Describe Changes
                            </h3>
                            <p className="text-gray-500 leading-relaxed mb-4">
                                Use text or reference images to guide the AI. Be as specific or as abstract as you like.
                            </p>
                            <span className="card-number">02</span>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="step-card group" style={{ '--card-color': '#eab308' } as React.CSSProperties}>
                        <div className="card-gradient"></div>
                        <div className="p-8 relative z-10 flex flex-col h-full">
                            <div className="card-icon-bg w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-amber-600 shadow-sm">
                                <SparklesIcon size={26} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Get Your Style
                            </h3>
                            <p className="text-gray-500 leading-relaxed mb-4">
                                Watch your new look emerge in seconds. Iterate, refine, and perfect your vision instantly.
                            </p>
                            <span className="card-number">03</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
