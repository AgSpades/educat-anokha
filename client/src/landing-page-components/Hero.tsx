import React from 'react';
import ecaiLogo from '../assets/ecai.png';

interface HeroProps {
    darkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ darkMode }) => {
    return (
        <section className='relative pt-24 pb-16 lg:pt-36 lg:pb-24 overflow-hidden'>
            <div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10'>
                <div className='grid lg:grid-cols-2 gap-12 lg:gap-24 items-center'>

                    {/* Left Content */}
                    {/* Left Content */}
                    <div className='max-w-2xl'>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border animate-fade-in-up ${darkMode ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                            AI-Powered Architecture
                        </div>

                        <h1 className={`text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in-up animation-delay-100 opacity-0 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                            Build your career <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-500">
                                with precision.
                            </span>
                        </h1>

                        <p className={`text-lg leading-relaxed mb-8 max-w-lg animate-fade-in-up animation-delay-200 opacity-0 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Stop guessing your next move. Our AI architects your unified career roadmap, verified instantly on the blockchain.
                        </p>

                        <div className='flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300 opacity-0'>
                            <a href="#how-it-works" className={`inline-block text-center px-8 py-4 rounded-xl text-md font-bold transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-2xl ${darkMode ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'}`}>
                                Generate Roadmap
                            </a>
                            <a href="#features" className={`inline-block text-center px-8 py-4 rounded-xl text-md font-medium border transition-all hover:-translate-y-1 ${darkMode ? 'text-white border-white/10 hover:bg-white/5' : 'text-zinc-700 border-zinc-200 hover:bg-zinc-50'}`}>
                                View Demo
                            </a>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className='relative lg:h-[600px] w-full flex items-center justify-center p-8 animate-fade-in-up animation-delay-400 opacity-0'>
                        <img
                            src={ecaiLogo}
                            alt="Platform Visualization"
                            className='w-full h-auto object-cover max-w-[250px] mx-auto transition-transform duration-500 hover:scale-[1.02]'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
