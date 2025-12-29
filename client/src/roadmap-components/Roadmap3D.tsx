import React, { useEffect, useState } from 'react';
import { useThemeContext } from '../contexts/ThemeContext';

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
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Dynamic 3D positioning for a winding path
    // We'll ignore the incoming 'position' prop for the 3D view and calculate our own S-curve
    const nodes3D = nodes.map((node, i) => {
        // Zig-zag pattern
        const row = i;
        const isLeft = row % 2 === 0;
        const xOffset = isLeft ? -140 : 140; // Widened slightly
        const zOffset = row * 140; // POSITIVE: Flow Top to Bottom
        return { ...node, x: xOffset, z: zOffset, y: row * -40 }; // Elevate slightly as we go back
    });

    useEffect(() => {
        // Disable on mobile
        if (window.matchMedia("(max-width: 768px)").matches) return;

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const activeNodeData = nodes.find(n => n.id === hoveredNode) || nodes.find(n => n.status === 'current');

    // Dynamic Height Calculation:
    // Adjusted to 135px per node (taking perspective into account) to minimize empty space at bottom
    const dynamicHeight = Math.max(600, nodes.length * 135 + 50);

    return (
        <div
            className="relative w-full perspective-1000 overflow-hidden flex items-start justify-center xl:justify-start xl:pl-[500px] bg-transparent transition-all duration-500"
            style={{ height: `${dynamicHeight}px` }}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none sticky top-0 h-screen overflow-hidden">
                <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] mix-blend-screen opacity-20 ${darkMode ? 'bg-indigo-900' : 'bg-indigo-200'}`}></div>
                <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] mix-blend-screen opacity-20 ${darkMode ? 'bg-purple-900' : 'bg-purple-200'}`}></div>
            </div>

            {/* LEFT SIDEBAR: AI Context & Outcome */}
            <div className={`fixed left-10 top-1/2 -translate-y-1/2 z-[90] w-64 space-y-4 hidden xl:block`}>
                <div className={`p-5 rounded-2xl border shadow-lg backdrop-blur-xl ${darkMode ? 'bg-zinc-900/80 border-zinc-700' : 'bg-white/80 border-zinc-200'}`}>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-500">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        </div>
                        <span className={`text-sm font-bold uppercase tracking-wider ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>AI Analysis</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        Based on your profile, we've structured a path focusing on <span className="text-indigo-500 font-bold">Deep Learning</span>. Your strong math background allows for an accelerated pace in neural networks.
                    </p>
                </div>

                <div className={`p-5 rounded-2xl border shadow-lg backdrop-blur-xl relative overflow-hidden group ${darkMode ? 'bg-zinc-900/80 border-zinc-700' : 'bg-white/80 border-zinc-200'}`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10 blur-xl rounded-full -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Career Outcome</span>
                        </div>
                        <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Senior AI Architect</h3>
                        <p className={`text-xs mb-3 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Est. Salary: $160k - $220k</p>

                        <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-[35%] rounded-full"></div>
                        </div>
                        <div className="flex justify-between mt-1">
                            <span className="text-[10px] opacity-60">Progress</span>
                            <span className="text-[10px] font-bold text-indigo-500">35%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* EXPANDED RIGHT SIDEBAR - Level Details */}
            <div className={`fixed right-0 top-32 bottom-0 z-[100] w-96 p-8 border-l backdrop-blur-3xl overflow-y-auto transition-transform duration-500 ease-in-out
                ${activeNodeData ? 'translate-x-0' : 'translate-x-full'}
                ${darkMode ? 'bg-zinc-950/80 border-zinc-800' : 'bg-white/80 border-zinc-200'}
            `}>
                {activeNodeData ? (
                    <div className="animate-fade-in-right space-y-8">
                        {/* Header */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-lg ${activeNodeData.status === 'completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                    activeNodeData.status === 'current' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' :
                                        'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                                    }`}>
                                    {activeNodeData.status}
                                </span>
                                <span className="text-xs font-mono opacity-50">#0{nodes.findIndex(n => n.id === activeNodeData.id) + 1}</span>
                            </div>
                            <h2 className={`text-3xl font-extrabold mb-3 leading-tight ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                                {activeNodeData.title}
                            </h2>
                            <p className={`text-base leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                {activeNodeData.description}
                            </p>
                        </div>

                        {/* AI Stats / Duration */}
                        {activeNodeData.details && (
                            <div className="flex items-center gap-4 py-4 border-y border-dashed border-zinc-300 dark:border-zinc-800">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">⏱️</span>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold opacity-50">Duration</p>
                                        <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{activeNodeData.details.estimatedDuration}</p>
                                    </div>
                                </div>
                                {activeNodeData.performance && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">🏆</span>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold opacity-50">Score</p>
                                            <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{activeNodeData.performance.score}/100</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Topics Covered */}
                        {activeNodeData.details && (
                            <div>
                                <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Topics
                                </h4>
                                <ul className="space-y-3">
                                    {activeNodeData.details.topics.map((topic, i) => (
                                        <li key={i} className={`flex items-start gap-3 text-sm group ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                                            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ring-2 ring-indigo-500/20 group-hover:bg-indigo-500 transition-colors ${darkMode ? 'bg-zinc-800' : 'bg-zinc-300'}`}></div>
                                            {topic}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Skills Gained */}
                        {activeNodeData.details && (
                            <div>
                                <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Skills Gained
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {activeNodeData.details.skillsGained.map((skill, i) => (
                                        <span key={i} className={`text-xs font-medium px-2.5 py-1 rounded-full border ${darkMode ? 'bg-zinc-800/50 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-600'
                                            }`}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* AI Feedback Section (If Completed) */}
                        {activeNodeData.performance && (
                            <div className={`p-5 rounded-2xl border relative overflow-hidden ${darkMode ? 'bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/30' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100'}`}>
                                <div className="absolute top-0 right-0 p-3 opacity-20">
                                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-base">🤖</span>
                                    <span className={`text-xs font-bold uppercase ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>AI Analysis</span>
                                </div>
                                <p className={`text-sm italic leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                    "{activeNodeData.performance.summary}"
                                </p>
                                <div className={`mt-3 pt-3 border-t flex justify-between items-center ${darkMode ? 'border-indigo-500/20' : 'border-indigo-200'}`}>
                                    <span className="text-xs font-medium opacity-60">Performance Metric</span>
                                    <span className={`font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Grade: {activeNodeData.performance.grade}</span>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50">
                        <div className="text-4xl mb-4">👀</div>
                        <p className="text-sm font-medium">Hover over a learning node to view detailed curriculum and stats.</p>
                    </div>
                )}
            </div>

            {/* 3D World Container */}
            <div
                className="relative transform-3d transition-transform duration-200 ease-out mt-32"
                style={{
                    transform: `translateY(0px) rotateX(${25 + mousePosition.y * 5}deg) rotateZ(${mousePosition.x * 2}deg) scale(0.9)`
                }}
            >
                {/* Connecting Path (SVG Line) */}
                <svg className="absolute top-0 left-0 overflow-visible w-px h-px pointer-events-none" style={{ transform: 'translateZ(-10px)' }}>
                    {nodes3D.map((node, i) => {
                        if (i === nodes3D.length - 1) return null;
                        const nextNode = nodes3D[i + 1];
                        return (
                            <path
                                key={`path-${i}`}
                                d={`M${node.x} ${node.z} L${nextNode.x} ${nextNode.z}`}
                                stroke={darkMode ? "rgba(99, 102, 241, 0.5)" : "rgba(99, 102, 241, 0.3)"}
                                strokeWidth="4"
                                strokeDasharray="8 8"
                                fill="none"
                                className="animate-pulse-slow"
                            />
                        );
                    })}
                </svg>

                {/* Nodes */}
                {nodes3D.map((node, index) => (
                    <div
                        key={node.id}
                        className="absolute transform-3d transition-all duration-300 ease-out hover:scale-105 cursor-pointer group"
                        style={{
                            transform: `translate3d(${node.x}px, ${node.z}px, ${index * 10}px)`,
                            left: 0,
                            top: 0
                        }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        {/* Node Platform */}
                        <div
                            className={`relative w-24 h-24 transform-3d -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 shadow-2xl backdrop-blur-md transition-colors duration-300 flex items-center justify-center
                                ${node.status === 'completed' ? (darkMode ? 'bg-indigo-900/80 border-indigo-500 shadow-indigo-500/40' : 'bg-indigo-100 border-indigo-500 shadow-indigo-500/30') :
                                    node.status === 'current' ? (darkMode ? 'bg-white border-white shadow-white/50' : 'bg-white border-indigo-600 shadow-indigo-600/40') :
                                        (darkMode ? 'bg-zinc-900/50 border-zinc-700 opacity-60' : 'bg-zinc-100 border-zinc-300 opacity-60')
                                }
                                ${hoveredNode === node.id ? 'ring-4 ring-indigo-500/30' : ''}
                            `}
                        >
                            {/* Icon / Number */}
                            <span className={`text-2xl font-bold ${node.status === 'completed' ? 'text-indigo-300' :
                                node.status === 'current' ? (darkMode ? 'text-indigo-900' : 'text-indigo-600') :
                                    'text-zinc-500'
                                }`}>
                                {node.status === 'completed' ? '✓' : index + 1}
                            </span>

                            {/* Pulse effect for current node */}
                            {node.status === 'current' && (
                                <div className="absolute inset-0 rounded-2xl animate-ping opacity-30 bg-indigo-500"></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Roadmap3D;
