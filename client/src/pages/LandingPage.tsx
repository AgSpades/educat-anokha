import React, { useState, useEffect } from 'react';
import ecaiLogo from '../assets/ecai.png';

const LandingPage: React.FC = () => {
  // Theme Toggle Logic
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Default to dark
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'}`}>

      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 bg-indigo-500/30 dark:bg-indigo-500/20 mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 bg-violet-500/30 dark:bg-violet-500/20 mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 bg-blue-500/30 dark:bg-blue-600/20 mix-blend-multiply dark:mix-blend-screen"></div>
      </div>

      {/* Navigation */}
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
              {['Features', 'Why Us', 'How It Works'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className={`text-sm font-medium transition-colors duration-300 ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-indigo-600'}`}>
                  {item}
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
                <button className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg ${darkMode ? 'bg-white text-zinc-950 hover:bg-zinc-100 shadow-white/5' : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-zinc-900/10'}`}>
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8 relative z-10'>
          <div className='grid lg:grid-cols-2 gap-12 lg:gap-24 items-center'>

            {/* Left Content */}
            <div className='max-w-2xl animate-fade-in-up'>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border ${darkMode ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-100 text-indigo-600'}`}>
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                AI-Powered Architecture
              </div>

              <h1 className={`text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                Build your career <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-500">
                  with precision.
                </span>
              </h1>

              <p className={`text-lg leading-relaxed mb-8 max-w-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Stop guessing your next move. Our AI architects your unified career roadmap, verified instantly on the blockchain.
              </p>

              <div className='flex flex-col sm:flex-row gap-4'>
                <button className={`px-8 py-4 rounded-xl text-md font-bold transition-all transform hover:-translate-y-1 shadow-xl ${darkMode ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'}`}>
                  Generate Roadmap
                </button>
                <button className={`px-8 py-4 rounded-xl text-md font-medium border transition-all ${darkMode ? 'text-white border-white/10 hover:bg-white/5' : 'text-zinc-700 border-zinc-200 hover:bg-zinc-50'}`}>
                  View Demo
                </button>
              </div>
            </div>

            {/* Right Visual */}
            <div className='relative lg:h-[600px] w-full flex items-center justify-center p-8 animate-fade-in-up animation-delay-200'>
              {/* Decorative Elements */}
              <div className={`absolute inset-0 border rounded-full scale-110 opacity-20 ${darkMode ? 'border-indigo-500/20' : 'border-indigo-200'}`}></div>
              <div className={`absolute inset-0 border rounded-full scale-75 opacity-20 ${darkMode ? 'border-violet-500/20' : 'border-violet-200'}`}></div>

              <div className={`relative z-10 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02] border ${darkMode ? 'border-white/10 bg-zinc-900 shadow-black/50' : 'border-zinc-200 bg-white shadow-zinc-200/50'}`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent pointer-events-none"></div>
                <img
                  src={ecaiLogo}
                  alt="Platform Visualization"
                  className='w-full h-auto object-cover max-w-md mx-auto'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <div className={`border-y ${darkMode ? 'border-white/5 bg-white/[0.02]' : 'border-zinc-100 bg-zinc-50/50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 text-center opacity-60 hover:opacity-100 transition-opacity duration-500 ${darkMode ? 'grayscale' : 'grayscale-0'}`}>
            {['Trusted by 500+ users', '10k+ Roadmaps Generated', 'Blockchain Verified', 'AI Driven'].map((stat, i) => (
              <div key={i}>
                <p className={`text-sm font-bold tracking-wider uppercase ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Features */}
      <section id="features" className='py-32 relative'>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className='mb-20 text-center md:text-left'>
            <h2 className={`text-3xl lg:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>The future of <br className="hidden md:block" /> professional growth.</h2>
            <div className="w-24 h-1.5 bg-indigo-500 rounded-full mx-auto md:mx-0"></div>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {[
              { title: "Hyper-Personalized", desc: "No generic advice. We analyze your GitHub, LinkedIn, and goals to build a custom path.", icon: "🎯" },
              { title: "Immutable Proof", desc: "Your skills are minted as NFTs. verifiable proof of mastery that you own forever.", icon: "⛓️" },
              { title: "Dynamic Adaptation", desc: "The market changes? Your roadmap updates automatically to keep you ahead.", icon: "🔄" },
            ].map((feature, i) => (
              <div key={i} className={`group p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${darkMode ? 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/10' : 'bg-white border-zinc-100 shadow-xl shadow-zinc-200/40 hover:shadow-2xl hover:shadow-zinc-200/50'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-sm ${darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{feature.title}</h3>
                <p className={`leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Section: How It Works */}
      <section id="how-it-works" className={`py-32 ${darkMode ? 'bg-zinc-900/50' : 'bg-zinc-50'}`}>
        <div className='max-w-7xl mx-auto px-6 lg:px-8'>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-[2rem] blur-xl opacity-30"></div>
              <div className={`relative border rounded-[2rem] p-8 md:p-12 space-y-8 ${darkMode ? 'bg-zinc-950 border-white/10' : 'bg-white border-zinc-200 shadow-xl'}`}>
                {[
                  { title: "Connect Your Profile", desc: "Link your GitHub and LinkedIn. We ingest your history to understand your true starting point.", step: 1 },
                  { title: "Generate Roadmap", desc: "Our LLM constructs a step-by-step path, from current state to your dream role.", step: 2 },
                  { title: "Verify & Mint", desc: "Complete tasks, pass verifications, and mint your achievements on-chain.", step: 3 }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 shadow-lg ${darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-600 text-white'}`}>
                      {item.step}
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{item.title}</h4>
                      <p className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className={`text-3xl lg:text-5xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Intelligence meets <br /> infrastructure.</h2>
              <p className={`text-lg leading-relaxed mb-8 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Traditional learning platforms are disconnected from industry needs. We bridge the gap by combining real-time market data with your personal capabilities.
              </p>
              <div className="flex gap-4">
                {['Real-time Analysis', 'Skill Verification'].map((badge) => (
                  <div key={badge} className={`px-6 py-3 rounded-xl border text-sm font-medium ${darkMode ? 'bg-white/[0.05] border-white/10 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700 shadow-sm'}`}>
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
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
    </div>
  );
}

export default LandingPage;
