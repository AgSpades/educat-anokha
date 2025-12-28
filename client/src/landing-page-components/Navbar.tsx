import React from 'react';
import ecaiLogo from '../assets/ecai.png';
import { navLinks } from '../data/landingPageData';

interface NavbarProps {
    darkMode: boolean;
    toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme }) => {
    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${darkMode ? 'bg-zinc-950/80 border-white/5' : 'bg-white/80 border-zinc-200'} backdrop-blur-md border-b`}>
            <div className='max-w-7xl mx-auto px-6 lg:px-8'>
                <div className='flex items-center justify-between h-20'>
                    {/* Logo */}
                    <div className='flex items-center gap-3 cursor-pointer group'>
                        <div className="relative">
                            <div className={`absolute inset-0 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-400'}`}></div>
                            <img src={ecaiLogo} alt="Educat-AI" className='relative h-10 w-auto' />
                        </div>
                        <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                            Educat<span className="text-indigo-500">AI</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className='hidden md:flex items-center space-x-8'>
                        {navLinks.map((item) => (
                            <a key={item.name} href={item.link} className={`text-sm font-medium transition-colors duration-300 ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-indigo-600'}`}>
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Right Side: Theme Toggle & CTA */}
                    <div className='flex items-center gap-4'>
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-colors duration-300 ${darkMode ? 'bg-white/5 hover:bg-white/10 text-yellow-400' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'}`}
                            aria-label="Toggle Theme"
                        >
                            {darkMode ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                            )}
                        </button>

                        <div className='hidden md:flex items-center gap-4'>
                            <button className={`text-sm font-medium transition-colors ${darkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-indigo-600'}`}>
                                Log In
                            </button>
                            <a href="#how-it-works" className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg ${darkMode ? 'bg-white text-zinc-950 hover:bg-zinc-100 shadow-white/5' : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-zinc-900/10'}`}>
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
