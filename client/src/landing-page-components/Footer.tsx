import React from 'react';
import ecaiLogo from '../assets/ecai.png';

interface FooterProps {
    darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
    return (
        <footer className={`pt-24 pb-12 relative overflow-hidden ${darkMode ? 'border-t border-white/5 bg-black' : 'border-t border-zinc-200 bg-zinc-50'}`}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

            <div className='max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10'>
                <h2 className={`text-4xl lg:text-6xl font-bold mb-8 tracking-tighter ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    Ready to engineer your future?
                </h2>
                <p className={`text-xl mb-12 max-w-2xl mx-auto ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Join the thousands of developers who have stopped guessing and started building with Educat-AI.
                </p>

                <div className="flex justify-center gap-6 mb-24">
                    <button className={`px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl ${darkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/30'}`}>
                        Start Now - Free
                    </button>
                </div>

                <div className={`flex flex-col md:flex-row justify-between items-center pt-8 border-t ${darkMode ? 'border-white/5' : 'border-zinc-200'}`}>
                    <div className="flex items-center gap-2 mb-4 md:mb-0 opacity-70 hover:opacity-100 transition-opacity">
                        <img src={ecaiLogo} alt="Logo" className="h-6 w-auto" />
                        <span className={`font-bold ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>EducatAI</span>
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-zinc-600' : 'text-zinc-500'}`}>
                        © 2025 Educat-AI Inc. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
