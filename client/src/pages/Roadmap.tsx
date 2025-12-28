import React from 'react';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from '../landing-page-components/ThemeToggle';

interface RoadmapNode {
    id: string;
    title: string;
    status: 'completed' | 'current' | 'locked';
    description: string;
    position: { x: number; y: number };
}

const Roadmap: React.FC = () => {
    const { darkMode, toggleTheme } = useTheme();

    const nodes: RoadmapNode[] = [
        { id: '1', title: 'Python Basics', status: 'completed', description: 'Mastering syntax, loops, and functions.', position: { x: 50, y: 10 } },
        { id: '2', title: 'Data Structures', status: 'completed', description: 'Lists, dictionaries, sets, and tuples.', position: { x: 50, y: 30 } },
        { id: '3', title: 'Calculus for ML', status: 'completed', description: 'Derivatives, gradients, and optimization.', position: { x: 50, y: 50 } },
        { id: '4', title: 'Intro to AI', status: 'current', description: 'History, agents, and basic search algorithms.', position: { x: 50, y: 70 } },
        { id: '5', title: 'Neural Networks', status: 'locked', description: 'Perceptrons, backpropagation, and layers.', position: { x: 20, y: 90 } },
        { id: '6', title: 'Computer Vision', status: 'locked', description: 'CNNs, image processing, and detection.', position: { x: 80, y: 90 } },
    ];

    return (
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'}`}>
            {/* Simple Header */}
            <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${darkMode ? 'bg-zinc-950/80 border-zinc-800' : 'bg-white/80 border-zinc-200'}`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <a href="/profile" className="flex items-center gap-2 group">
                            <div className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-zinc-900 group-hover:bg-zinc-800' : 'bg-zinc-100 group-hover:bg-zinc-200'}`}>
                                <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </div>
                            <span className="font-bold text-lg">Back to Profile</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                            AI Engineer Path
                        </span>
                        <div className="hidden md:block w-px h-6 bg-zinc-200 dark:bg-zinc-800"></div>
                        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Learning Journey</h1>
                    <p className={`text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Track your progress and see what's next on your path to mastery.</p>
                </div>

                <div className="relative max-w-3xl mx-auto">
                    {/* Connection Line */}
                    <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-zinc-200 dark:bg-zinc-800 rounded-full">
                        <div className="absolute top-0 left-0 w-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ height: '65%' }}></div>
                    </div>

                    <div className="space-y-12 relative z-10">
                        {nodes.map((node, index) => (
                            <div
                                key={node.id}
                                className={`flex items-center gap-8 flex-row`}
                            >
                                {/* Left Side (for alignment on desktop) */}
                                <div className="flex-1 hidden md:block text-right">
                                    {index % 2 === 0 && (
                                        <div className={`inline-block p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl ${node.status === 'current'
                                            ? (darkMode ? 'bg-zinc-900 border-indigo-500 shadow-indigo-500/10' : 'bg-white border-indigo-500 shadow-indigo-500/10')
                                            : (darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200')
                                            }`}>
                                            <h3 className={`font-bold mb-1 ${node.status === 'current' ? 'text-indigo-500' : ''}`}>{node.title}</h3>
                                            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{node.description}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Center Node */}
                                <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-4 shrink-0 transition-transform hover:scale-110 z-20 ${node.status === 'completed' ? 'bg-indigo-500 border-indigo-500 text-white' :
                                    node.status === 'current' ? 'bg-white dark:bg-zinc-900 border-indigo-500 text-indigo-500 ring-4 ring-indigo-500/20' :
                                        (darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-600' : 'bg-zinc-100 border-zinc-300 text-zinc-400')
                                    }`}>
                                    {node.status === 'completed' ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    ) : (
                                        <span className="font-bold text-sm">{index + 1}</span>
                                    )}
                                </div>

                                {/* Right Side */}
                                <div className="flex-1 md:text-left">
                                    {index % 2 !== 0 ? (
                                        <div className={`inline-block p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl ${node.status === 'current'
                                            ? (darkMode ? 'bg-zinc-900 border-indigo-500 shadow-indigo-500/10' : 'bg-white border-indigo-500 shadow-indigo-500/10')
                                            : (darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200')
                                            }`}>
                                            <h3 className={`font-bold mb-1 ${node.status === 'current' ? 'text-indigo-500' : ''}`}>{node.title}</h3>
                                            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{node.description}</p>
                                        </div>
                                    ) : (
                                        /* Mobile Only Content for Even Nodes */
                                        <div className={`md:hidden inline-block p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl ${node.status === 'current'
                                            ? (darkMode ? 'bg-zinc-900 border-indigo-500 shadow-indigo-500/10' : 'bg-white border-indigo-500 shadow-indigo-500/10')
                                            : (darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200')
                                            }`}>
                                            <h3 className={`font-bold mb-1 ${node.status === 'current' ? 'text-indigo-500' : ''}`}>{node.title}</h3>
                                            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{node.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Roadmap;
