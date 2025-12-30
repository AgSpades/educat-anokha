import React, { useEffect, useState } from 'react';
import { useThemeContext } from '../../contexts/ThemeContext';

interface RoadmapNode {
    id: string;
    title: string;
    status: 'completed' | 'current' | 'locked';
    description: string;
    position: { x: number; y: number };
    performance?: { score: number; grade: string; summary: string };
    details?: {
        topics: string[];
        estimatedDuration: string;
        skillsGained: string[];
    };
}

interface Roadmap3DProps {
    nodes: RoadmapNode[];
}

const Roadmap3D: React.FC<Roadmap3DProps> = ({ nodes }) => {
    const { darkMode } = useThemeContext();
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Track mouse for subtle parallax
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Default to 'current' node or first node if none selected
    const activeNodeId = hoveredNode || nodes.find(n => n.status === 'current')?.id || nodes[0].id;
    const activeNodeData = nodes.find(n => n.id === activeNodeId);

    return (
        <div className="relative w-full min-h-screen flex justify-center perspective-2000 overflow-x-hidden">

            {/* --- LEFT SIDEBAR (FIXED) --- */}
            <div className={`fixed left-8 top-32 w-80 hidden xl:flex flex-col gap-6 h-[calc(100vh-160px)] z-50`}>

                {/* Career Outcome Card (Static) */}
                <div className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl relative overflow-hidden group transition-all duration-300 ${darkMode ? 'bg-zinc-900/90 border-zinc-700/50' : 'bg-white/90 border-zinc-200'}`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-2xl rounded-full -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Target Outcome</span>
                        </div>
                        <h3 className={`text-xl font-black mb-1 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Senior AI Architect</h3>
                        <p className={`text-sm font-medium mb-4 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>$160k - $220k/yr</p>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold">
                                <span className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>Proficiency</span>
                                <span className="text-indigo-500">35%</span>
                            </div>
                            <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[35%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Context Card (Dynamic) */}
                <div className={`flex-1 p-6 rounded-3xl border shadow-xl backdrop-blur-xl transition-all duration-500 flex flex-col ${darkMode ? 'bg-zinc-900/80 border-zinc-700/50' : 'bg-white/80 border-zinc-200'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${darkMode ? 'bg-zinc-800 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                            {activeNodeData ? '🤖' : '🧠'}
                        </div>
                        <div>
                            <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                AI Architect Intelligence
                            </div>
                            <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-zinc-800'}`}>
                                {activeNodeData ? 'Module Analysis' : 'Strategic Overview'}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                        {activeNodeData ? (
                            <div className="animate-fade-in space-y-6">
                                {/* AI Summary */}
                                <div className={`p-4 rounded-xl border relative overflow-hidden ${darkMode ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'}`}>
                                    <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-indigo-500/20 blur-xl rounded-full"></div>
                                    <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>AI Strategy Note</h4>
                                    <p className={`text-xs leading-relaxed italic ${darkMode ? 'text-indigo-200' : 'text-indigo-800'}`}>
                                        "{activeNodeData.performance?.summary || "Focus on understanding the underlying patterns rather than memorizing syntax. This module is critical for advanced topics."}"
                                    </p>
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className={`p-3 rounded-xl border ${darkMode ? 'bg-zinc-800/50 border-zinc-700' : 'bg-zinc-50 border-zinc-100'}`}>
                                        <div className="text-[10px] opacity-60 mb-1">Complexity</div>
                                        <div className="flex gap-1 h-1.5 mt-1.5">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className={`flex-1 rounded-full ${i <= 3 ? 'bg-orange-400' : 'bg-zinc-200 dark:bg-zinc-700'}`}></div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={`p-3 rounded-xl border ${darkMode ? 'bg-zinc-800/50 border-zinc-700' : 'bg-zinc-50 border-zinc-100'}`}>
                                        <div className="text-[10px] opacity-60 mb-1">Market Demand</div>
                                        <div className="flex gap-1 h-1.5 mt-1.5">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className={`flex-1 rounded-full ${i <= 5 ? 'bg-emerald-400' : 'bg-zinc-200 dark:bg-zinc-700'}`}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Key Insight */}
                                <div>
                                    <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                        Why this matters
                                    </h4>
                                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                        Mastery of {activeNodeData.title} is often a distinguishing factor in technical interviews for top-tier tech companies.
                                    </p>
                                </div>

                                {activeNodeData.performance && (
                                    <div className={`pt-4 border-t ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <div className="text-[10px] opacity-60">Current Mastery</div>
                                                <div className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{activeNodeData.performance.score}%</div>
                                            </div>
                                            <div className={`text-sm font-bold px-2 py-1 rounded bg-emerald-500/10 text-emerald-500`}>
                                                Grade {activeNodeData.performance.grade}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="animate-fade-in text-center pt-10 px-4">
                                <div className="text-4xl mb-3 opacity-50">🚀</div>
                                <h3 className={`text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Ready to Analyze</h3>
                                <p className={`text-xs leading-relaxed ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                                    Hover over any learning module to generate real-time AI insights, complexity analysis, and strategic recommendations.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/* --- CENTER: 3D ROADMAP --- */}
            <div
                className="w-full max-w-4xl px-6 relative z-10 pb-64 transform-style-3d transition-transform duration-100 ease-out"
                style={{
                    transform: `rotateX(10deg) rotateY(${mousePos.x * 0.2}deg)`,
                }}
            >
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-transparent"></div>

                <div className="space-y-24 mt-20 relative transform-style-3d">
                    {nodes.map((node, index) => {
                        const isEven = index % 2 === 0;
                        const isCompleted = node.status === 'completed';
                        const isCurrent = node.status === 'current';
                        const isHovered = hoveredNode === node.id;

                        // 3D Pop Effect
                        const zTranslate = isHovered ? '30px' : '0px';
                        const scale = isHovered ? 1.05 : 1;

                        return (
                            <div
                                key={node.id}
                                className={`relative flex items-center justify-center transform-style-3d transition-all duration-500 ease-out`}
                                style={{
                                    transform: `translateZ(${zTranslate}) scale(${scale})`,
                                }}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                            >
                                {/* Connector Line to Main Spine */}
                                <div className={`absolute top-1/2 left-1/2 w-[50%] h-0.5 -translate-y-1/2 transform-style-3d -z-10
                                    ${isEven ? '-translate-x-full origin-right' : 'origin-left'}
                                    ${darkMode ? 'bg-zinc-800' : 'bg-zinc-300'}
                                    group-hover:bg-indigo-500 transition-colors duration-300
                                `}></div>

                                {/* Content Card */}
                                <div className={`w-[45%] transform-style-3d
                                    ${isEven ? '-mr-[50%]' : '-ml-[50%]'}
                                `}>
                                    <div className={`p-6 rounded-2xl border shadow-xl relative overflow-hidden backdrop-blur-sm
                                        ${isCompleted
                                            ? (darkMode ? 'bg-zinc-900/90 border-indigo-500/40' : 'bg-white/90 border-indigo-200')
                                            : isCurrent
                                                ? (darkMode ? 'bg-zinc-800 border-indigo-500 ring-2 ring-indigo-500/50' : 'bg-white border-indigo-500 ring-2 ring-indigo-500/30')
                                                : (darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200')
                                        }
                                        transition-all duration-300 group hover:shadow-2xl hover:shadow-indigo-500/20
                                    `}>
                                        {/* 3D Layer effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded
                                                ${isCompleted ? 'bg-emerald-500/20 text-emerald-500' : 'bg-zinc-500/20 text-zinc-500'}
                                            `}>
                                                Step 0{index + 1}
                                            </span>
                                            {isCurrent && <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>}
                                        </div>

                                        <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{node.title}</h3>
                                        <p className={`text-sm leading-relaxed line-clamp-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{node.description}</p>
                                    </div>
                                </div>

                                {/* Central Node marker */}
                                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 z-20 shadow-[0_0_15px_rgba(99,102,241,0.5)]
                                    ${isCompleted ? 'bg-indigo-500 border-indigo-900' : 'bg-zinc-900 border-zinc-700'}
                                `}></div>

                            </div>
                        );
                    })}
                </div>
            </div>


            {/* --- RIGHT SIDEBAR (FIXED) --- */}
            <div className={`fixed right-8 top-32 w-80 hidden xl:flex flex-col gap-6 h-[calc(100vh-160px)] z-50`}>
                <div className={`flex-1 p-6 rounded-3xl border shadow-xl backdrop-blur-xl flex flex-col transition-colors duration-300 ${darkMode ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white/90 border-zinc-100'}`}>
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-dashed border-zinc-200 dark:border-zinc-800">
                        <span className={`text-sm font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Deep Dive</span>
                        <div className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${activeNodeData?.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-indigo-500/10 text-indigo-500'}`}>
                            {activeNodeData?.status}
                        </div>
                    </div>

                    {activeNodeData ? (
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar animate-fade-in space-y-6">
                            <div>
                                <h2 className={`text-xl font-black mb-2 leading-tight ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                                    {activeNodeData.title}
                                </h2>
                                <p className={`text-xs leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                    {activeNodeData.description}
                                </p>
                            </div>

                            {/* Topics & Concepts */}
                            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-zinc-800/30 border-zinc-700/50' : 'bg-zinc-50 border-zinc-100'}`}>
                                <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                                    <span className="text-lg">📚</span> Core Concepts
                                </h4>
                                <ul className="space-y-2">
                                    {activeNodeData.details?.topics.map((topic, i) => (
                                        <li key={i} className={`flex items-start gap-2 text-xs ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                            <span className="mt-1 w-1 h-1 rounded-full bg-indigo-500 flex-shrink-0"></span>
                                            {topic}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Practical Application */}
                            <div>
                                <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                    Real-world Application
                                </h4>
                                <p className={`text-xs font-medium italic mb-3 ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
                                    "Essential for building scalable backend systems and optimizing database queries."
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {activeNodeData.details?.skillsGained.map((skill, i) => (
                                        <span key={i} className={`text-[10px] font-bold px-2 py-1 rounded border ${darkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-600'}`}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Prerequisites (Mocked) */}
                            <div>
                                <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                    Prerequisites
                                </h4>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${darkMode ? 'bg-zinc-800/50 border-zinc-700 text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-500'}`}>Basic Math</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${darkMode ? 'bg-zinc-800/50 border-zinc-700 text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-500'}`}>Logic 101</span>
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-center opacity-40">
                            <p>Hover over a step to view details</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Roadmap3D;
