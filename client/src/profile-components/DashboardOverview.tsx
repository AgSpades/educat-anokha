import React, { useState } from 'react';
// import { questions } from '../onboarding-components/OnboardingForm'; // Unused now

interface DashboardOverviewProps {
    darkMode: boolean;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ darkMode }) => {
    // Goals State
    const [dailyGoals, setDailyGoals] = useState([
        { text: "Complete Neural Networks Module", done: false },
        { text: "Review React Hooks Notes", done: true },
        { text: "Practice Python for 30 mins", done: false }
    ]);

    // Preferences State REMOVED

    const toggleGoal = (index: number) => {
        const newGoals = [...dailyGoals];
        newGoals[index].done = !newGoals[index].done;
        setDailyGoals(newGoals);
    };

    return (
        <div className="animate-fade-in-up space-y-6 relative">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl mix-blend-multiply opacity-50 animate-blob pointer-events-none z-0"></div>
            <div className="absolute top-40 left-0 -ml-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl mix-blend-multiply opacity-50 animate-blob animation-delay-2000 pointer-events-none z-0"></div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">

                {/* Main Focus Card - Spans Full Width */}
                <div className={`md:col-span-3 rounded-3xl p-6 md:p-8 relative overflow-hidden border transition-all hover:shadow-lg group ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 tracking-wide ${darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                                        CURRENT MODULE
                                    </span>
                                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Introduction to AI</h3>
                                    <p className={`mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Next Lesson: Neural Networks Architecture</p>
                                </div>
                                <div className={`h-12 w-12 rounded-full flex items-center justify-center border ${darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-white border-zinc-100 text-zinc-900 shadow-sm'}`}>
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                            </div>

                            <div className="space-y-2 mb-8">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className={`${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Course Progress</span>
                                    <span className={`${darkMode ? 'text-white' : 'text-zinc-900'}`}>45%</span>
                                </div>
                                <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-600 w-[45%] rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className={`px-6 py-2.5 rounded-lg font-semibold text-white transition-all hover:bg-indigo-700 active:scale-95 bg-indigo-600 shadow-sm`}>
                                Continue Learning
                            </button>
                        </div>
                    </div>
                </div>

                {/* Activity Chart */}
                <div className={`md:col-span-1 rounded-3xl p-6 border flex flex-col justify-between ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <div>
                        <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Weekly Activity</h3>
                        <div className="flex items-end justify-between h-40 gap-2 mt-4">
                            {[
                                { day: 'M', h: 'h-10', val: '2h' },
                                { day: 'T', h: 'h-16', val: '3h' },
                                { day: 'W', h: 'h-12', val: '2.5h' },
                                { day: 'T', h: 'h-24', val: '5h' },
                                { day: 'F', h: 'h-14', val: '3.5h' },
                                { day: 'S', h: 'h-8', val: '1.5h' },
                                { day: 'S', h: 'h-6', val: '1h' },
                            ].map((item, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className={`w-full ${item.h} rounded-t-md transition-all hover:opacity-80 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-600'}`}></div>
                                    <span className={`text-[10px] font-medium ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>{item.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Daily Goals */}
                <div className={`md:col-span-1 rounded-3xl p-6 border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Today's Goals</h3>
                    <div className="space-y-3">
                        {dailyGoals.map((goal, i) => (
                            <div
                                key={i}
                                onClick={() => toggleGoal(i)}
                                className={`p-3 rounded-xl flex items-start gap-3 transition-colors cursor-pointer group ${darkMode ? 'bg-zinc-950/50 hover:bg-zinc-800/50' : 'bg-zinc-50 hover:bg-zinc-100'}`}
                            >
                                <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${goal.done
                                    ? 'bg-indigo-500 border-indigo-500'
                                    : (darkMode ? 'border-zinc-700 group-hover:border-indigo-500/50' : 'border-zinc-300 group-hover:border-indigo-400')
                                    }`}>
                                    {goal.done && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                </div>
                                <span className={`text-sm transition-colors ${goal.done ? (darkMode ? 'text-zinc-500 line-through' : 'text-zinc-400 line-through') : (darkMode ? 'text-zinc-300' : 'text-zinc-700')}`}>
                                    {goal.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills Radar (Mock List) */}
                <div className={`md:col-span-1 rounded-3xl p-6 border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Skill Growth</h3>
                    <div className="space-y-4">
                        {[
                            { name: "Frontend Dev", level: 75 },
                            { name: "Machine Learning", level: 40 },
                            { name: "UI Design", level: 60 },
                        ].map((skill, i) => (
                            <div key={i}>
                                <div className="flex justify-between mb-1 text-sm font-medium">
                                    <span className={darkMode ? 'text-zinc-300' : 'text-zinc-700'}>{skill.name}</span>
                                    <span className={`${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{skill.level}%</span>
                                </div>
                                <div className={`h-2 w-full rounded-full overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                                    <div className={`h-full bg-indigo-600 transition-all duration-1000`} style={{ width: `${skill.level}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* REMOVED CAREER PROFILE FROM HERE */}

            </div>
        </div>
    );
};

export default DashboardOverview;
