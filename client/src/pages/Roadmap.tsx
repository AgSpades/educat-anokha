import React from 'react';
import { useThemeContext } from '../contexts/ThemeContext';
import RoadmapNavbar from '../components/roadmap-components/RoadmapNavbar';
import Roadmap3D from '../components/roadmap-components/Roadmap3D';
import RoadmapPath from '../components/roadmap-components/RoadmapPath';

interface RoadmapNode {
    id: string;
    title: string;
    status: 'completed' | 'current' | 'locked';
    description: string;
    position: { x: number; y: number };
    performance?: { score: number; grade: string; summary: string }; // New AI Performance Metric
    details?: {
        topics: string[];
        estimatedDuration: string;
        skillsGained: string[];
    };
}

const Roadmap: React.FC = () => {
    const { darkMode, toggleTheme } = useThemeContext();

    const nodes: RoadmapNode[] = [
        {
            id: '1',
            title: 'Python Basics',
            status: 'completed',
            description: 'Mastering syntax, loops, and functions.',
            position: { x: 50, y: 10 },
            performance: { score: 98, grade: 'A+', summary: 'Exceptional coding speed.' },
            details: {
                topics: ['Variables & Data Types', 'Control Flow (If/Else, Loops)', 'Functions & Modules', 'File I/O'],
                estimatedDuration: '2 Weeks',
                skillsGained: ['Problem Solving', 'Scripting', 'Code Organization']
            }
        },
        {
            id: '2',
            title: 'Data Structures',
            status: 'completed',
            description: 'Lists, dictionaries, sets, and tuples.',
            position: { x: 50, y: 30 },
            performance: { score: 92, grade: 'A', summary: 'Solid logic, minor optimization needed.' },
            details: {
                topics: ['Arrays & Linked Lists', 'Hash Maps & Sets', 'Trees & Graphs', 'Sorting Algorithms'],
                estimatedDuration: '3 Weeks',
                skillsGained: ['Algorithmic Thinking', 'Data Efficiency', 'Memory Management']
            }
        },
        {
            id: '3',
            title: 'Calculus for ML',
            status: 'completed',
            description: 'Derivatives, gradients, and optimization.',
            position: { x: 50, y: 50 },
            performance: { score: 88, grade: 'B+', summary: 'Good grasp of gradients.' },
            details: {
                topics: ['Derivatives & Integrals', 'Partial Differentiation', 'Gradient Descent', 'Chain Rule'],
                estimatedDuration: '4 Weeks',
                skillsGained: ['Mathematical Modeling', 'Optimization Logic', 'Backprop Math']
            }
        },
        {
            id: '4',
            title: 'Intro to AI',
            status: 'current',
            description: 'History, agents, and basic search algorithms.',
            position: { x: 50, y: 70 },
            details: {
                topics: ['History of AI', 'Intelligent Agents', 'BFS & DFS Search', 'A* Algorithm'],
                estimatedDuration: '2 Weeks',
                skillsGained: ['Search Logic', 'Agent Design', 'Heuristic Analysis']
            }
        },
        {
            id: '5',
            title: 'Neural Networks',
            status: 'locked',
            description: 'Perceptrons, backpropagation, and layers.',
            position: { x: 20, y: 90 },
            details: {
                topics: ['Perceptrons', 'Activation Functions', 'Backpropagation', 'Optimizers (Adam, SGD)'],
                estimatedDuration: '4 Weeks',
                skillsGained: ['Model Architecture', 'Training Loops', 'Hyperparameter Tuning']
            }
        },
        {
            id: '6',
            title: 'Computer Vision',
            status: 'locked',
            description: 'CNNs, image processing, and detection.',
            position: { x: 80, y: 90 },
            details: {
                topics: ['Convolutional Layers', 'Pooling & Stride', 'Object Detection (YOLO)', 'Image Segmentation'],
                estimatedDuration: '5 Weeks',
                skillsGained: ['Image Analysis', 'Feature Extraction', 'Visual Data Processing']
            }
        },
        {
            id: '7',
            title: 'NLP Fundamentals',
            status: 'locked',
            description: 'Tokenization, embeddings, and transformers.',
            position: { x: 50, y: 110 },
            details: {
                topics: ['Tokenization', 'Word Embeddings', 'RNNs & LSTMs', 'Transformer Architecture'],
                estimatedDuration: '5 Weeks',
                skillsGained: ['Text Processing', 'Sentiment Analysis', 'Sequence Modeling']
            }
        },
        {
            id: '8',
            title: 'Reinforcement Learning',
            status: 'locked',
            description: 'Q-Learning, policies, and reward systems.',
            position: { x: 20, y: 130 },
            details: {
                topics: ['Markov Decision Processes', 'Q-Learning', 'Policy Gradients', 'Deep Q-Networks'],
                estimatedDuration: '6 Weeks',
                skillsGained: ['Reward Engineering', 'Agent Policies', 'Dynamic Environments']
            }
        },
        {
            id: '9',
            title: 'Generative AI',
            status: 'locked',
            description: 'GANs, diffusion models, and LLMs.',
            position: { x: 80, y: 130 },
            details: {
                topics: ['GANs', 'Variational Autoencoders', 'Diffusion Models', 'Large Language Models'],
                estimatedDuration: '4 Weeks',
                skillsGained: ['Content Generation', 'Model Fine-tuning', 'Prompt Engineering']
            }
        },
        {
            id: '10',
            title: 'AI Ethics & Safety',
            status: 'locked',
            description: 'Bias, fairness, and alignment problems.',
            position: { x: 50, y: 150 },
            details: {
                topics: ['Algorithmic Bias', 'Fairness Metrics', 'AI Alignment', 'Safety Protocols'],
                estimatedDuration: '2 Weeks',
                skillsGained: ['Ethical Auditing', 'Risk Assessment', 'Responsible AI']
            }
        },
    ];

    return (
        <div className={`min-h-screen font-sans transition-all duration-700 ease-in-out ${darkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'}`}>
            <RoadmapNavbar darkMode={darkMode} toggleTheme={toggleTheme} />

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Learning Journey</h1>
                    <p className={`text-lg ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Track your progress and see what's next on your path to mastery.</p>
                </div>

                {/* Desktop 3D Map */}
                <div className="hidden lg:block mb-12">
                    <Roadmap3D nodes={nodes} />
                </div>

                {/* Mobile/Tablet List View */}
                <div className="lg:hidden">
                    <RoadmapPath nodes={nodes} darkMode={darkMode} />
                </div>
            </main>
        </div>
    );
};

export default Roadmap;
