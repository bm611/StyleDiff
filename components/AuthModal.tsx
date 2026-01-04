import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Mail01Icon, ArrowRight01Icon, Loading03Icon, LockPasswordIcon, UserIcon } from 'hugeicons-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        },
                    },
                });
                if (error) throw error;
                setMessage('Account created! Please check your email to confirm.');
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                onClose();
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />
            
            <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-fade-in border border-gray-100">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2"
                >
                    ✕
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {isSignUp ? 'Join us to start designing' : 'Enter your details to sign in'}
                    </p>
                </div>

                {!message ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isSignUp && (
                            <div className="relative">
                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Full Name"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900"
                                    required={isSignUp}
                                />
                            </div>
                        )}
                        
                        <div className="relative">
                            <Mail01Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900"
                                required
                            />
                        </div>

                        <div className="relative">
                            <LockPasswordIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 outline-none transition-all bg-gray-50 text-gray-900"
                                required
                                minLength={6}
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1a1a1a] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loading03Icon className="animate-spin" size={20} />
                            ) : (
                                <>
                                    {isSignUp ? 'Sign Up' : 'Sign In'}
                                    <ArrowRight01Icon size={20} />
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                            <Mail01Icon size={32} />
                        </div>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <button
                            onClick={onClose}
                            className="text-gray-900 font-medium underline underline-offset-4 hover:text-black"
                        >
                            Close
                        </button>
                    </div>
                )}

                {!message && (
                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-500">
                            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                        </span>
                        <button
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setError(null);
                            }}
                            className="font-medium text-gray-900 hover:underline"
                        >
                            {isSignUp ? 'Sign In' : 'Sign Up'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};