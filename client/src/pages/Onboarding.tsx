import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import BackgroundGradients from '../landing-page-components/BackgroundGradients';
import ThemeToggle from '../landing-page-components/ThemeToggle';
import ecaiLogo from '../assets/ecai.png';

interface Question {
    id: number;
    text: string;
    options: string[];
}

const questions: Question[] = [
    {
        id: 1,
        text: "What field interests you the most?",
        options: ["Software Development", "Data Science", "Design", "Product Management", "Marketing"]
    },
    {
        id: 2,
        text: "How do you prefer to solve problems?",
        options: ["Analyzing data", "Writing code", "Visualizing solutions", "Leading teams", "Communicating ideas"]
    },
    {
        id: 3,
        text: "What is your preferred work environment?",
        options: ["Remote", "Office", "Hybrid", "Outdoor"]
    },
    {
        id: 4,
        text: "What are your strongest skills?",
        options: ["Logic & Math", "Creativity", "Communication", "Organization", "Leadership"]
    },
    {
        id: 5,
        text: "What is your long-term career goal?",
        options: ["Founder/Entrepreneur", "Technical Expert", "Corporate Leader", "Freelancer", "Researcher"]
    }
];

const Onboarding: React.FC = () => {
    const { darkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const handleOptionSelect = (questionId: number, option: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: option
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the answers to a backend
        console.log("Submitted answers:", answers);
        // For now, redirect to home or dashboard
        navigate('/');
    };

    const isComplete = questions.every(q => answers[q.id]);

    return (
        <div className={`min-h-screen font-sans transition-all duration-700 ease-in-out relative overflow-hidden flex items-center justify-center ${darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
            <BackgroundGradients />

            {/* Theme Toggle - Fixed Position */}
            <div className="fixed top-4 right-4 z-50 animate-fade-in animation-delay-500 opacity-0">
                <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
            </div>

            <div className="relative z-10 w-full max-w-2xl px-6 py-12 md:px-8">
                {/* Logo */}
                <div className="flex justify-center mb-8 animate-fade-in-up opacity-0">
                    <div className='flex items-center gap-3 cursor-pointer group'>
                        <div className="relative">
                            <div className={`absolute inset-0 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-400'}`}></div>
                            <img src={ecaiLogo} alt="Educat-AI" className='relative h-10 w-auto' />
                        </div>
                        <span className={`font-bold text-2xl tracking-tight transition-colors duration-300 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                            Educat<span className="text-indigo-500">AI</span>
                        </span>
                    </div>
                </div>

                {/* Card */}
                <div className={`rounded-2xl shadow-xl backdrop-blur-md border p-8 animate-scale-in animation-delay-200 opacity-0 ${darkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white/80 border-zinc-200'}`}>
                    <div className="text-center mb-8">
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Let's get to know you</h2>
                        <p className={`mt-2 text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Help us customize your career path</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {questions.map((q, index) => (
                            <div key={q.id} className="animate-fade-in-up" style={{ animationDelay: `${300 + index * 100}ms` }}>
                                <label className={`block text-lg font-medium mb-4 ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
                                    {index + 1}. {q.text}
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {q.options.map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => handleOptionSelect(q.id, option)}
                                            className={`px-4 py-3 rounded-xl border text-left transition-all duration-200 
                                                ${answers[q.id] === option
                                                    ? 'bg-indigo-500 border-indigo-500 text-white ring-2 ring-indigo-500/20'
                                                    : darkMode
                                                        ? 'bg-zinc-950/50 border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-800'
                                                        : 'bg-white border-zinc-200 hover:border-indigo-500/50 hover:bg-zinc-50'
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="pt-4 animate-fade-in-up" style={{ animationDelay: `${800}ms` }}>
                            <button
                                type="submit"
                                disabled={!isComplete}
                                className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg 
                                    ${isComplete
                                        ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5 cursor-pointer'
                                        : 'bg-zinc-500 cursor-not-allowed opacity-50'
                                    }`}
                            >
                                Complete Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Onboarding;
