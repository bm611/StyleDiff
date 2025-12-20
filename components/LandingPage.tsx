import React, { useEffect, useState } from 'react';
import { GithubIcon, Dress01Icon, ImageUploadIcon, PencilEdit02Icon, SparklesIcon } from 'hugeicons-react';

interface LandingPageProps {
    onStart: () => void;
    onSignIn: () => void;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    delay: number;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onSignIn }) => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
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
    }, []);

    return (
        <div className="min-h-screen bg-[#fafafa] text-gray-900 overflow-hidden relative">
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
                    background: white;
                    border: 1px solid rgba(0,0,0,0.06);
                    box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03);
                }
                .step-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06);
                    border-color: rgba(0,0,0,0.08);
                }
                .card-gradient {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 50%;
                    opacity: 0.5;
                    transition: opacity 0.4s ease;
                }
                .step-card:hover .card-gradient {
                    opacity: 0.7;
                }
                .gradient-blue {
                    background: linear-gradient(180deg, transparent 0%, rgba(56, 189, 248, 0.2) 50%, rgba(14, 165, 233, 0.3) 100%);
                }
                .gradient-purple {
                    background: linear-gradient(180deg, transparent 0%, rgba(192, 132, 252, 0.2) 50%, rgba(168, 85, 247, 0.3) 100%);
                }
                .gradient-gold {
                    background: linear-gradient(180deg, transparent 0%, rgba(234, 179, 8, 0.15) 50%, rgba(132, 204, 22, 0.25) 100%);
                }
                .card-number {
                    font-size: 4rem;
                    font-weight: 600;
                    color: rgba(0,0,0,0.04);
                    position: absolute;
                    bottom: 1rem;
                    right: 1.5rem;
                    line-height: 1;
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

            {/* Navbar */}
            <nav className="relative z-10 max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Dress01Icon size={24} />
                    <span className="text-xl font-semibold tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>StyleDiff</span>
                </div>
                <div className="flex items-center gap-3">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all font-medium"
                    >
                        <GithubIcon size={16} />
                        GitHub
                    </a>
                    <button
                        onClick={onSignIn}
                        className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all font-medium"
                    >
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
                <div className="animate-fade-in flex items-center justify-center gap-2 mb-8">
                    <Dress01Icon size={20} />
                    <span className="text-lg font-semibold text-gray-600 tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>StyleDiff</span>
                </div>

                <h1 className="animate-fade-in delay-100 text-5xl md:text-7xl font-medium tracking-tight mb-6 leading-[1.1]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Reimagine your style
                </h1>
                
                <p className="animate-fade-in delay-200 text-2xl md:text-3xl text-gray-400 font-normal mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
                    powered by imagination
                </p>

                <div className="animate-fade-in delay-300">
                    <button
                        onClick={onStart}
                        className="fancy-btn px-8 py-4 rounded-full text-white text-sm font-medium tracking-wide uppercase transition-all duration-500 hover:scale-105"
                        style={{ letterSpacing: '0.15em' }}
                    >
                        Start Designing
                    </button>
                </div>
            </div>

            {/* 3-Step Process Cards */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Card 1 - Upload */}
                    <div className="step-card rounded-2xl overflow-hidden relative h-56">
                        <div className="p-5 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center mb-3">
                                <ImageUploadIcon size={20} className="text-sky-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Upload Your Look
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Start with a photo of yourself as the base.
                            </p>
                        </div>
                        <div className="card-gradient gradient-blue"></div>
                        <span className="card-number">01</span>
                    </div>

                    {/* Card 2 - Describe */}
                    <div className="step-card rounded-2xl overflow-hidden relative h-56">
                        <div className="p-5 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-3">
                                <PencilEdit02Icon size={20} className="text-purple-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Describe Changes
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Tell us the style or add a reference image.
                            </p>
                        </div>
                        <div className="card-gradient gradient-purple"></div>
                        <span className="card-number">02</span>
                    </div>

                    {/* Card 3 - Generate */}
                    <div className="step-card rounded-2xl overflow-hidden relative h-56">
                        <div className="p-5 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
                                <SparklesIcon size={20} className="text-amber-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Get Your Style
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Receive your new look and iterate further.
                            </p>
                        </div>
                        <div className="card-gradient gradient-gold"></div>
                        <span className="card-number">03</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
