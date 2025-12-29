import React, { useState } from 'react';
import { useThemeContext } from '../contexts/ThemeContext';
import BackgroundGradients from '../landing-page-components/BackgroundGradients';
import { Link } from 'react-router-dom';

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: 'Full-time' | 'Contract' | 'Internship';
    salary: string;
    tags: string[];
    posted: string;
    matchScore: number;
    logoColor: string;
}

const Jobs: React.FC = () => {
    const { darkMode } = useThemeContext();
    const [filter, setFilter] = useState('Recommended');

    const jobsData: Record<string, Job[]> = {
        'Recommended': [
            {
                id: '1',
                title: 'Senior AI Engineer',
                company: 'NeuroTech Solutions',
                location: 'San Francisco, CA (Remote)',
                type: 'Full-time',
                salary: '$160k - $210k',
                tags: ['Python', 'PyTorch', 'System Design'],
                posted: '2 days ago',
                matchScore: 98,
                logoColor: 'from-blue-500 to-cyan-500'
            },
            {
                id: '2',
                title: 'Machine Learning Researcher',
                company: 'DeepMind',
                location: 'London, UK',
                type: 'Full-time',
                salary: '$180k - $250k',
                tags: ['TensorFlow', 'Research', 'Math'],
                posted: '5 hours ago',
                matchScore: 95,
                logoColor: 'from-purple-500 to-pink-500'
            },
            {
                id: '3',
                title: 'AI Product Manager',
                company: 'OpenAI',
                location: 'San Francisco, CA',
                type: 'Full-time',
                salary: '$190k - $240k',
                tags: ['Product', 'Strategy', 'LLMs'],
                posted: '1 day ago',
                matchScore: 92,
                logoColor: 'from-emerald-500 to-teal-500'
            }
        ],
        'Newest': [
            {
                id: '4',
                title: 'Junior Data Analyst',
                company: 'Stripe',
                location: 'Remote',
                type: 'Full-time',
                salary: '$90k - $120k',
                tags: ['SQL', 'Tableau', 'Analytics'],
                posted: '10 mins ago',
                matchScore: 88,
                logoColor: 'from-indigo-500 to-blue-500'
            },
            {
                id: '5',
                title: 'React Frontend Developer',
                company: 'Netflix',
                location: 'Los Gatos, CA',
                type: 'Full-time',
                salary: '$180k - $220k',
                tags: ['React', 'TypeScript', 'GraphQL'],
                posted: '1 hour ago',
                matchScore: 85,
                logoColor: 'from-red-500 to-orange-500'
            },
            {
                id: '6',
                title: 'Rust Backend Engineer',
                company: 'Discord',
                location: 'San Francisco, CA',
                type: 'Full-time',
                salary: '$170k - $200k',
                tags: ['Rust', 'Distributed Systems'],
                posted: '3 hours ago',
                matchScore: 82,
                logoColor: 'from-violet-500 to-purple-500'
            }
        ],
        'Remote': [
            {
                id: '7',
                title: 'Full Stack Engineer',
                company: 'GitLab',
                location: 'Remote (Worldwide)',
                type: 'Full-time',
                salary: '$130k - $180k',
                tags: ['Ruby', 'Vue.js', 'Async'],
                posted: '1 day ago',
                matchScore: 90,
                logoColor: 'from-orange-400 to-amber-500'
            },
            {
                id: '8',
                title: 'Technical Writer',
                company: 'Notion',
                location: 'Remote (US)',
                type: 'Contract',
                salary: '$80k - $110k',
                tags: ['Documentation', 'Markdown', 'Copy'],
                posted: '4 days ago',
                matchScore: 78,
                logoColor: 'from-slate-500 to-zinc-500'
            },
            {
                id: '9',
                title: 'Growth Marketing Manager',
                company: 'Linear',
                location: 'Remote (Europe)',
                type: 'Full-time',
                salary: '$100k - $140k',
                tags: ['Marketing', 'Growth', 'SaaS'],
                posted: '2 days ago',
                matchScore: 75,
                logoColor: 'from-pink-500 to-rose-500'
            }
        ],
        'Internships': [
            {
                id: '10',
                title: 'Software Engineering Intern',
                company: 'Google',
                location: 'Mountain View, CA',
                type: 'Internship',
                salary: '$50/hr',
                tags: ['Java', 'C++', 'Algorithms'],
                posted: '2 weeks ago',
                matchScore: 94,
                logoColor: 'from-blue-400 to-green-400'
            },
            {
                id: '11',
                title: 'Data Science Intern',
                company: 'Spotify',
                location: 'New York, NY',
                type: 'Internship',
                salary: '$45/hr',
                tags: ['Python', 'Data Viz', 'Pandas'],
                posted: '1 week ago',
                matchScore: 89,
                logoColor: 'from-green-500 to-emerald-500'
            },
            {
                id: '12',
                title: 'Product Design Intern',
                company: 'Airbnb',
                location: 'San Francisco, CA',
                type: 'Internship',
                salary: '$40/hr',
                tags: ['Figma', 'Prototyping', 'UX'],
                posted: '3 days ago',
                matchScore: 85,
                logoColor: 'from-rose-500 to-pink-500'
            }
        ]
    };

    return (
        <div className={`min-h-screen font-sans transition-all duration-700 ease-in-out relative flex flex-col ${darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
            <BackgroundGradients />

            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${darkMode ? 'bg-zinc-950/80 border-zinc-800' : 'bg-white/80 border-zinc-200'}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                    <Link to="/profile" className="flex items-center gap-2 group">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${darkMode ? 'bg-zinc-900 group-hover:bg-zinc-800' : 'bg-zinc-100 group-hover:bg-zinc-200'}`}>
                            <svg className={`w-5 h-5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </div>
                        <span className="font-semibold text-sm">Back to Profile</span>
                    </Link>
                    <div className="text-xl font-bold tracking-tight">
                        Recommended <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Jobs</span>
                    </div>
                    <div className="w-8"></div> {/* Spacer for center alignment */}
                </div>
            </nav>

            <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 py-24 md:py-28 relative z-10">

                {/* Header Section */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Finding your dream role</h1>
                    <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Based on your roadmap progress and skills, here are the top opportunities currated just for you.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2 animate-fade-in-up">
                    {['Recommended', 'Newest', 'Remote', 'Internships'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${filter === f
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                                : (darkMode ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400' : 'bg-white hover:bg-zinc-50 text-zinc-600 border border-zinc-200')
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Jobs List */}
                <div className="space-y-4">
                    {(jobsData[filter] || []).map((job, index) => (
                        <div
                            key={job.id}
                            className={`group relative p-6 rounded-3xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${darkMode
                                ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                                : 'bg-white border-zinc-200 hover:border-indigo-200 hover:shadow-indigo-500/5'
                                } animate-fade-in-up`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div className="flex items-center gap-5">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${job.logoColor} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                                        {job.company.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className={`text-xl font-bold mb-1 group-hover:text-indigo-500 transition-colors ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{job.title}</h3>
                                        <div className="flex flex-wrap items-center gap-2 text-sm">
                                            <span className={`font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{job.company}</span>
                                            <span className="w-1 h-1 rounded-full bg-zinc-500"></span>
                                            <span className={`${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>{job.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${darkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                                            }`}>
                                            {job.matchScore}% Match
                                        </span>
                                        <span className={`text-sm font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{job.posted}</span>
                                    </div>
                                    <button className="w-full md:w-auto px-6 py-2.5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all active:scale-95 shadow-lg shadow-indigo-600/20">
                                        Apply Now
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {job.tags.map((tag, i) => (
                                    <span key={i} className={`px-3 py-1 rounded-lg text-xs font-medium border ${darkMode
                                        ? 'bg-zinc-800/50 border-zinc-700 text-zinc-400'
                                        : 'bg-zinc-50 border-zinc-200 text-zinc-600'
                                        }`}>
                                        {tag}
                                    </span>
                                ))}
                                <span className={`ml-auto font-mono font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                    {job.salary}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}

export default Jobs;
