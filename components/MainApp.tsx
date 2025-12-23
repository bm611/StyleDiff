import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Dress01Icon, 
    ImageUploadIcon, 
    PencilEdit02Icon, 
    SparklesIcon, 
    ArrowRight01Icon,
    ArrowLeft01Icon,
    Download01Icon,
    Share01Icon,
    RefreshIcon,
    Home01Icon
} from 'hugeicons-react';
import Dropzone from './Dropzone';
import { AppState, GenerationRecord } from '../types';
import { editFashionImage } from '../services/geminiService';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    delay: number;
}

const INITIAL_PROMPTS = [
    "Change the outfit to a vintage Chanel tweed suit in pastel pink.",
    "Swap the shirt for a sleek charcoal grey turtleneck sweater.",
    "Replace current clothes with a bohemian floral maxi dress.",
    "Style with high-end streetwear: oversized hoodie and techwear pants.",
    "Dress the subject in a classic black tuxedo with a velvet bowtie."
];

export const MainApp: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [state, setState] = useState<AppState>({
        sourceImage: null,
        referenceImage: null,
        isGenerating: false,
        prompt: '',
        history: [],
        currentResult: null,
        error: null
    });

    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const generated: Particle[] = [];
        for (let i = 0; i < 80; i++) { // Fewer particles than landing page
            generated.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 1,
                opacity: Math.random() * 0.4 + 0.1,
                delay: Math.random() * 8,
            });
        }
        setParticles(generated);
    }, []);

    const handleGenerate = async () => {
        if (!state.sourceImage || !state.prompt) {
            setState(prev => ({ ...prev, error: "Please provide a photo and a description." }));
            return;
        }

        setState(prev => ({ ...prev, isGenerating: true, error: null }));
        setCurrentStep(3); // Move to result step immediately to show loading state

        try {
            const resultUrl = await editFashionImage(
                state.sourceImage,
                state.prompt,
                state.referenceImage || undefined
            );

            const newRecord: GenerationRecord = {
                id: Date.now().toString(),
                sourceUrl: state.sourceImage,
                resultUrl,
                prompt: state.prompt,
                timestamp: Date.now()
            };

            setState(prev => ({
                ...prev,
                isGenerating: false,
                currentResult: resultUrl,
                history: [newRecord, ...prev.history].slice(0, 20)
            }));
        } catch (err: any) {
            setState(prev => ({
                ...prev,
                isGenerating: false,
                error: err.message || "Something went wrong while generating. Please try again."
            }));
            setCurrentStep(2); // Go back to step 2 on error
        }
    };

    const handleReset = () => {
        setState(prev => ({
            ...prev,
            sourceImage: null,
            referenceImage: null,
            currentResult: null,
            prompt: '',
            error: null
        }));
        setCurrentStep(1);
    };

    const nextStep = () => {
        if (currentStep === 1 && !state.sourceImage) return;
        if (currentStep === 2 && !state.prompt) return;
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="animate-fade-in max-w-lg mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-medium mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Upload Your Look</h2>
                            <p className="text-gray-500">Start with a clear photo of yourself. Full body or upper body shots work best.</p>
                        </div>
                        <Dropzone
                            label="Upload Source Image"
                            icon={ImageUploadIcon}
                            previewUrl={state.sourceImage}
                            onImageSelected={(base64) => setState(prev => ({ ...prev, sourceImage: base64, currentResult: null }))}
                            aspectRatio="aspect-[3/4]"
                            className="bg-white shadow-sm"
                        />
                        {state.sourceImage && (
                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={nextStep}
                                    className="fancy-btn px-8 py-3 rounded-full text-white text-sm font-medium tracking-wide uppercase flex items-center gap-2 hover:scale-105 transition-transform"
                                >
                                    Next Step <ArrowRight01Icon size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                );
            case 2:
                return (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                         <div className="text-center mb-8">
                            <h2 className="text-3xl font-medium mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Define Your Style</h2>
                            <p className="text-gray-500">Describe the new outfit you want to wear.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={state.prompt}
                                        onChange={(e) => setState(prev => ({ ...prev, prompt: e.target.value }))}
                                        placeholder="E.g., A navy blue tailored wool coat with a white turtleneck..."
                                        className="w-full h-40 rounded-xl bg-white border border-gray-200 p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none shadow-sm"
                                    />
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {INITIAL_PROMPTS.slice(0, 3).map((p, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setState(prev => ({ ...prev, prompt: p }))}
                                                className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full transition-colors border border-gray-200"
                                            >
                                                {p.length > 40 ? p.substring(0, 40) + '...' : p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Reference Image (Optional)</label>
                                <Dropzone
                                    label="Upload Reference"
                                    icon={PencilEdit02Icon}
                                    previewUrl={state.referenceImage}
                                    onImageSelected={(base64) => setState(prev => ({ ...prev, referenceImage: base64 }))}
                                    aspectRatio="aspect-square"
                                    className="h-full bg-white shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="mt-10 flex items-center justify-between border-t border-gray-100 pt-6">
                            <button
                                onClick={prevStep}
                                className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-full font-medium transition-colors flex items-center gap-2"
                            >
                                <ArrowLeft01Icon size={18} /> Back
                            </button>
                            <button
                                onClick={handleGenerate}
                                disabled={!state.prompt}
                                className={`fancy-btn px-8 py-3 rounded-full text-white text-sm font-medium tracking-wide uppercase flex items-center gap-2 transition-all ${
                                    !state.prompt ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                                }`}
                            >
                                <SparklesIcon size={18} /> Generate Look
                            </button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="animate-fade-in max-w-5xl mx-auto text-center">
                        {state.isGenerating ? (
                            <div className="py-20">
                                <div className="w-24 h-24 mx-auto mb-8 relative">
                                    <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
                                    <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin"></div>
                                </div>
                                <h2 className="text-2xl font-medium mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Weaving your new style...</h2>
                                <p className="text-gray-500">Gemini is processing your look with precision.</p>
                            </div>
                        ) : state.error ? (
                            <div className="py-20">
                                <div className="inline-block p-4 rounded-full bg-red-50 text-red-500 mb-4">
                                    <span className="text-2xl">!</span>
                                </div>
                                <h2 className="text-2xl font-medium mb-3 text-gray-900">Oops! Something went wrong</h2>
                                <p className="text-gray-500 mb-8">{state.error}</p>
                                <button
                                    onClick={() => setCurrentStep(2)}
                                    className="px-6 py-2.5 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
                                    <img src={state.currentResult!} alt="Generated Result" className="w-full h-auto object-cover" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-gray-900 border border-gray-200">
                                        GENERATED LOOK
                                    </div>
                                </div>

                                <div className="text-left space-y-8">
                                    <div>
                                        <h2 className="text-4xl font-medium mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>It suits you perfectly.</h2>
                                        <p className="text-gray-600 text-lg leading-relaxed">
                                            Here is your reimagined look based on your description: <span className="italic text-gray-800">"{state.prompt}"</span>
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        <button
                                            onClick={() => {
                                                const link = document.createElement('a');
                                                link.href = state.currentResult!;
                                                link.download = `stylediff-${Date.now()}.png`;
                                                link.click();
                                            }}
                                            className="flex-1 min-w-[140px] px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Download01Icon size={18} /> Download
                                        </button>
                                        <button
                                            onClick={handleReset}
                                            className="flex-1 min-w-[140px] px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                        >
                                            <RefreshIcon size={18} /> Start Over
                                        </button>
                                    </div>

                                    {/* Comparison Miniatures */}
                                    <div className="pt-8 border-t border-gray-100">
                                        <p className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Transformation</p>
                                        <div className="flex gap-4">
                                            <div className="w-20 h-28 rounded-lg overflow-hidden border border-gray-200 opacity-60">
                                                <img src={state.sourceImage!} alt="Original" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex items-center text-gray-300">
                                                <ArrowRight01Icon size={20} />
                                            </div>
                                            <div className="w-20 h-28 rounded-lg overflow-hidden border border-blue-500 shadow-md">
                                                <img src={state.currentResult!} alt="Result" className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

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
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
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

            {/* Header */}
            <header className="relative z-10 max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors relative z-20">
                    <Dress01Icon size={24} />
                    <span className="text-xl font-semibold tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>StyleDiff</span>
                </Link>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 text-sm font-medium z-10">
                   <div className="flex items-center bg-white rounded-full p-1 border border-gray-100 shadow-sm">
                       <div className={`px-4 py-1.5 rounded-full transition-all ${currentStep === 1 ? 'bg-gray-900 text-white' : 'text-gray-400'}`}>1</div>
                       <div className="w-8 h-px bg-gray-200 mx-1"></div>
                       <div className={`px-4 py-1.5 rounded-full transition-all ${currentStep === 2 ? 'bg-gray-900 text-white' : 'text-gray-400'}`}>2</div>
                       <div className="w-8 h-px bg-gray-200 mx-1"></div>
                       <div className={`px-4 py-1.5 rounded-full transition-all ${currentStep === 3 ? 'bg-gray-900 text-white' : 'text-gray-400'}`}>3</div>
                   </div>
                </div>

                 <Link to="/" className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 relative z-20">
                    <Home01Icon size={20} />
                 </Link>
            </header>

            {/* Main Content */}
            <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 min-h-[600px] flex flex-col justify-center">
                {renderStepContent()}
            </main>
        </div>
    );
};
