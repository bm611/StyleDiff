import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, Dress01Icon, ImageUploadIcon, PencilEdit02Icon, SparklesIcon } from 'hugeicons-react';

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
                    background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
                    border: 2.5px solid #4A192C;
                    border-radius: 24px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.02);
                    backdrop-filter: blur(10px);
                }
                .step-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 16px 48px rgba(0,0,0,0.14), 0 8px 20px rgba(0,0,0,0.08);
                    border-color: #4A192C;
                    background: linear-gradient(135deg, #ffffff 0%, #ffffff 100%);
                }
                .card-gradient {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 150px;
                    height: 150px;
                    opacity: 0.3;
                    transition: all 0.4s ease;
                    border-radius: 50%;
                }
                .step-card:hover .card-gradient {
                    opacity: 0.5;
                    transform: scale(1.2);
                }
                .gradient-blue {
                    background: radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(14, 165, 233, 0) 100%);
                }
                .gradient-purple {
                    background: radial-gradient(circle, rgba(192, 132, 252, 0.4) 0%, rgba(168, 85, 247, 0) 100%);
                }
                .gradient-gold {
                    background: radial-gradient(circle, rgba(234, 179, 8, 0.3) 0%, rgba(132, 204, 22, 0) 100%);
                }
                .card-number {
                    font-size: 3.5rem;
                    font-weight: 700;
                    background: linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.05) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    position: absolute;
                    bottom: 1rem;
                    right: 1.5rem;
                    line-height: 1;
                    letter-spacing: -0.05em;
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
                    border: 2.5px solid #4A192C;
                    border-radius: 9999px;
                    color: #4A192C;
                    background: white;
                    transition: all 0.3s ease;
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
                    box-shadow: 0 4px 12px rgba(74, 25, 44, 0.2);
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
                        href="https://github.com/bm611/StyleDiff"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-btn"
                    >
                        <GithubIcon size={16} />
                        GitHub
                    </a>
                    <Link
                        to="/app"
                        className="nav-btn"
                    >
                        Sign In
                    </Link>
                </div>
            </nav>

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
                {/* Desktop Grid View */}
                <div className="hidden md:grid grid-cols-3 gap-5">
                    {/* Card 1 - Upload */}
                    <div className="step-card overflow-hidden relative h-56">
                        <div className="p-5 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center mb-4 shadow-sm">
                                <ImageUploadIcon size={24} className="text-sky-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Upload Your Look
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Start with a photo of yourself as the base.
                            </p>
                        </div>
                        <div className="card-gradient gradient-blue"></div>
                        <span className="card-number">01</span>
                    </div>

                    {/* Card 2 - Describe */}
                    <div className="step-card overflow-hidden relative h-56">
                        <div className="p-5 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4 shadow-sm">
                                <PencilEdit02Icon size={24} className="text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Describe Changes
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Tell us the style or add a reference image.
                            </p>
                        </div>
                        <div className="card-gradient gradient-purple"></div>
                        <span className="card-number">02</span>
                    </div>

                    {/* Card 3 - Generate */}
                    <div className="step-card overflow-hidden relative h-56">
                        <div className="p-5 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center mb-4 shadow-sm">
                                <SparklesIcon size={24} className="text-amber-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Get Your Style
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Receive your new look and iterate further.
                            </p>
                        </div>
                        <div className="card-gradient gradient-gold"></div>
                        <span className="card-number">03</span>
                    </div>
                </div>

                {/* Mobile Tab View */}
                <div className="md:hidden">
                    {/* Tab Buttons */}
                    <div className="flex gap-3 justify-center mb-6">
                        <button
                            onClick={() => setActiveTab(0)}
                            className={`tab-button ${activeTab === 0 ? 'active' : ''}`}
                        >
                            01
                        </button>
                        <button
                            onClick={() => setActiveTab(1)}
                            className={`tab-button ${activeTab === 1 ? 'active' : ''}`}
                        >
                            02
                        </button>
                        <button
                            onClick={() => setActiveTab(2)}
                            className={`tab-button ${activeTab === 2 ? 'active' : ''}`}
                        >
                            03
                        </button>
                    </div>

                    {/* Card Display */}
                    <div key={activeTab} className="card-enter">
                        {activeTab === 0 && (
                            <div className="step-card overflow-hidden relative h-56">
                                <div className="p-5 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center mb-4 shadow-sm">
                                        <ImageUploadIcon size={24} className="text-sky-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        Upload Your Look
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Start with a photo of yourself as the base.
                                    </p>
                                </div>
                                <div className="card-gradient gradient-blue"></div>
                                <span className="card-number">01</span>
                            </div>
                        )}
                        {activeTab === 1 && (
                            <div className="step-card overflow-hidden relative h-56">
                                <div className="p-5 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4 shadow-sm">
                                        <PencilEdit02Icon size={24} className="text-purple-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        Describe Changes
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Tell us the style or add a reference image.
                                    </p>
                                </div>
                                <div className="card-gradient gradient-purple"></div>
                                <span className="card-number">02</span>
                            </div>
                        )}
                        {activeTab === 2 && (
                            <div className="step-card overflow-hidden relative h-56">
                                <div className="p-5 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center mb-4 shadow-sm">
                                        <SparklesIcon size={24} className="text-amber-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        Get Your Style
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Receive your new look and iterate further.
                                    </p>
                                </div>
                                <div className="card-gradient gradient-gold"></div>
                                <span className="card-number">03</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
