import React from 'react';
import { Link } from 'react-router-dom';
import ecaiLogo from '../assets/ecai.png';
import { navLinks } from '../data/landingPageData';
import ThemeToggle from './ThemeToggle';

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
                        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />

                        <div className='hidden md:flex items-center gap-4'>
                            <Link to="/login" className={`text-sm font-medium transition-colors ${darkMode ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-indigo-600'}`}>
                                Log In
                            </Link>
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
