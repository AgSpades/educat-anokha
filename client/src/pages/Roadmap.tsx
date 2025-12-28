import React from 'react';
import { useTheme } from '../hooks/useTheme';
import RoadmapNavbar from '../roadmap-components/RoadmapNavbar';
import RoadmapPath from '../roadmap-components/RoadmapPath';

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
        <div className={`min-h-screen font-sans transition-all duration-700 ease-in-out ${darkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'}`}>
            <RoadmapNavbar darkMode={darkMode} toggleTheme={toggleTheme} />

            <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Learning Journey</h1>
                    <p className={`text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Track your progress and see what's next on your path to mastery.</p>
                </div>

                <RoadmapPath nodes={nodes} darkMode={darkMode} />
            </main>
        </div>
    );
};

export default Roadmap;
