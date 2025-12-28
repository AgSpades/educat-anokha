import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import BackgroundGradients from '../landing-page-components/BackgroundGradients';
import ThemeToggle from '../landing-page-components/ThemeToggle';
import ecaiLogo from '../assets/ecai.png';

const Login: React.FC = () => {
    const { darkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login and redirect to onboarding
        navigate('/onboarding');
    };

    return (
        <div className={`min-h-screen font-sans transition-all duration-700 ease-in-out relative overflow-hidden flex items-center justify-center ${darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
            <BackgroundGradients />

            {/* Theme Toggle - Fixed Position */}
            <div className="fixed top-4 right-4 z-50 animate-fade-in animation-delay-500 opacity-0">
                <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
            </div>

            <div className="relative z-10 w-full max-w-md px-6 py-12 md:px-8">
                {/* Logo */}
                <div className="flex justify-center mb-8 animate-fade-in-up opacity-0">
                    <a href="/" className='flex items-center gap-3 cursor-pointer group'>
                        <div className="relative">
                            <div className={`absolute inset-0 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-400'}`}></div>
                            <img src={ecaiLogo} alt="Educat-AI" className='relative h-10 w-auto' />
                        </div>
                        <span className={`font-bold text-2xl tracking-tight transition-colors duration-300 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                            Educat<span className="text-indigo-500">AI</span>
                        </span>
                    </a>
                </div>

                {/* Card */}
                <div className={`rounded-2xl shadow-xl backdrop-blur-md border p-8 animate-scale-in animation-delay-200 opacity-0 ${darkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white/80 border-zinc-200'}`}>
                    <div className="text-center mb-8">
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Welcome Back</h2>
                        <p className={`mt-2 text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Sign in to resume your learning journey</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="animate-fade-in-up animation-delay-300 opacity-0">
                            <label htmlFor="email" className={`block text-sm font-medium mb-2 text-left ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 focus:scale-[1.01] ${darkMode ? 'bg-zinc-950/50 border-zinc-800 text-white focus:border-indigo-500' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-indigo-500'}`}
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="animate-fade-in-up animation-delay-400 opacity-0">
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className={`block text-sm font-medium text-left ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>Password</label>
                                <a href="#" className="text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    required
                                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 focus:scale-[1.01] ${darkMode ? 'bg-zinc-950/50 border-zinc-800 text-white focus:border-indigo-500' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-indigo-500'}`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors ${darkMode ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200'}`}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 animate-fade-in-up animation-delay-500 opacity-0"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="my-8 flex items-center gap-4 animate-fade-in opacity-0 animation-delay-600">
                        <div className={`flex-1 h-px ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
                        <span className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Or continue with</span>
                        <div className={`flex-1 h-px ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 animate-fade-in-up animation-delay-700 opacity-0">
                        <button className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] ${darkMode ? 'border-zinc-800 bg-zinc-900 text-white' : 'border-zinc-200 bg-white text-zinc-700'}`}>
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            <span className="text-sm font-medium">Google</span>
                        </button>
                        <button className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] ${darkMode ? 'border-zinc-800 bg-zinc-900 text-white' : 'border-zinc-200 bg-white text-zinc-700'}`}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                            <span className="text-sm font-medium">GitHub</span>
                        </button>
                    </div>

                    <div className="mt-8 text-center animate-fade-in opacity-0 animation-delay-700">
                        <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Don't have an account?{' '}
                            <a href="/register" className="font-semibold text-indigo-500 hover:text-indigo-600 transition-colors">Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
