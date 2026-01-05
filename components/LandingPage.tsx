import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	GithubIcon,
	Dress01Icon,
	ImageUploadIcon,
	PencilEdit02Icon,
	SparklesIcon,
	Login01Icon,
	Logout01Icon
} from 'hugeicons-react';
import { supabase } from '../services/supabaseClient';
import { AuthModal } from './AuthModal';
import MyStyles from './MyStyles';
import { SavedDesign } from '../types';
import { getUserGeneratedDesigns } from '../services/storageService';
import { useAuth } from '../hooks/useAuth';
import ParticlesBackground from './ParticlesBackground';

const LandingPage: React.FC = () => {
	const { user } = useAuth();
	const [showAuthModal, setShowAuthModal] = useState(false);
	const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
	const [isLoadingDesigns, setIsLoadingDesigns] = useState(false);

	// Fetch user's saved designs
	useEffect(() => {
		if (user) {
			setIsLoadingDesigns(true);
			getUserGeneratedDesigns(user.id).then((designs) => {
				setSavedDesigns(designs);
				setIsLoadingDesigns(false);
			});
		} else {
			setSavedDesigns([]);
		}
	}, [user]);

	const refreshDesigns = () => {
		if (user) {
			getUserGeneratedDesigns(user.id).then(setSavedDesigns);
		}
	};

	return (
		<div className="min-h-screen bg-[#fafafa] text-gray-900 overflow-hidden relative">
			<AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
			
			<ParticlesBackground count={150} />

			{/* Floating Navbar */}
			<div className="relative z-10 px-4 sm:px-6 pt-4 sm:pt-6">
				<nav className="floating-nav max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-full">
					<div className="flex items-center gap-2">
						<Dress01Icon size={22} />
						<span
							className="text-lg sm:text-xl font-semibold tracking-wide"
							style={{ fontFamily: "'Cormorant Garamond', serif" }}
						>
							StyleDiff
						</span>
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
							<div className="flex items-center gap-3">
								<button
									onClick={() => supabase.auth.signOut()}
									className="nav-btn text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4"
								>
									<Logout01Icon size={14} />
									<span className="hidden sm:inline">Sign Out</span>
								</button>
							</div>
						) : (
							<button
								onClick={() => setShowAuthModal(true)}
								className="nav-btn text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4"
							>
								<Login01Icon size={14} />
								<span className="hidden sm:inline">Sign In</span>
							</button>
						)}
					</div>
				</nav>
			</div>

			{/* Hero Section */}
			<div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
				<div className="animate-fade-in flex items-center justify-center gap-2 mb-8">
					<Dress01Icon size={20} />
					<span
						className="text-lg font-semibold text-gray-600 tracking-wide"
						style={{ fontFamily: "'Cormorant Garamond', serif" }}
					>
						StyleDiff
					</span>
				</div>

				<h1
					className="animate-fade-in delay-100 text-5xl md:text-7xl font-medium tracking-tight mb-6 leading-[1.1]"
					style={{ fontFamily: "'Playfair Display', serif" }}
				>
					{user ? (
						<>
							{(user.user_metadata.full_name || user.email || 'there').split(' ')[0]}, reimagine
							your <span className="italic">style</span>
						</>
					) : (
						<>
							Reimagine your <span className="italic">style</span>
						</>
					)}
				</h1>

				<p
					className="animate-fade-in delay-200 text-2xl md:text-3xl text-gray-400 font-normal mb-12"
					style={{ fontFamily: "'Playfair Display', serif" }}
				>
					powered by AI
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

			{/* 3-Step Process Cards - Only for non-logged in users */}
			{!user && (
				<div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{/* Card 1 */}
						<div
							className="step-card group"
							style={{ '--card-color': '#0ea5e9' } as React.CSSProperties}
						>
							<div className="card-gradient"></div>
							<div className="p-8 relative z-10 flex flex-col h-full">
								<div className="card-icon-bg w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-sky-600 shadow-sm">
									<ImageUploadIcon size={26} />
								</div>
								<h3
									className="text-xl font-semibold text-gray-900 mb-3"
									style={{ fontFamily: "'Playfair Display', serif" }}
								>
									Upload Your Look
								</h3>
								<p className="text-gray-500 leading-relaxed mb-4">
									Start your transformation with a simple photo. We use it as the perfect canvas for
									your new style.
								</p>
								<span className="card-number">01</span>
							</div>
						</div>

						{/* Card 2 */}
						<div
							className="step-card group"
							style={{ '--card-color': '#a855f7' } as React.CSSProperties}
						>
							<div className="card-gradient"></div>
							<div className="p-8 relative z-10 flex flex-col h-full">
								<div className="card-icon-bg w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-purple-600 shadow-sm">
									<PencilEdit02Icon size={26} />
								</div>
								<h3
									className="text-xl font-semibold text-gray-900 mb-3"
									style={{ fontFamily: "'Playfair Display', serif" }}
								>
									Describe Changes
								</h3>
								<p className="text-gray-500 leading-relaxed mb-4">
									Use text or reference images to guide the AI. Be as specific or as abstract as you
									like.
								</p>
								<span className="card-number">02</span>
							</div>
						</div>

						{/* Card 3 */}
						<div
							className="step-card group"
							style={{ '--card-color': '#eab308' } as React.CSSProperties}
						>
							<div className="card-gradient"></div>
							<div className="p-8 relative z-10 flex flex-col h-full">
								<div className="card-icon-bg w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-amber-600 shadow-sm">
									<SparklesIcon size={26} />
								</div>
								<h3
									className="text-xl font-semibold text-gray-900 mb-3"
									style={{ fontFamily: "'Playfair Display', serif" }}
								>
									Get Your Style
								</h3>
								<p className="text-gray-500 leading-relaxed mb-4">
									Watch your new look emerge in seconds. Iterate, refine, and perfect your vision
									instantly.
								</p>
								<span className="card-number">03</span>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* My Styles Section - Only for logged in users */}
			{user && (
				<div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
					<MyStyles
						designs={savedDesigns}
						onRefresh={refreshDesigns}
						isLoading={isLoadingDesigns}
					/>
				</div>
			)}
		</div>
	);
};

export default LandingPage;