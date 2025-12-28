import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import BackgroundGradients from '../landing-page-components/BackgroundGradients';
import ThemeToggle from '../landing-page-components/ThemeToggle';
import ecaiLogo from '../assets/ecai.png';

interface Course {
    id: number;
    title: string;
    description: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    tags: string[];
    image: string;
    progress?: number;
}

const mockCourses: Course[] = [
    {
        id: 1,
        title: "Full Stack Web Development",
        description: "Master modern web technologies including React, Node.js, and TypeScript.",
        level: "Intermediate",
        duration: "12 weeks",
        tags: ["Development", "Web"],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 2,
        title: "Data Science Fundamentals",
        description: "Learn how to analyze data, create visualizations, and build ML models.",
        level: "Beginner",
        duration: "8 weeks",
        tags: ["Data Science", "Analytics"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 3,
        title: "UI/UX Design Masterclass",
        description: "Design beautiful and functional user interfaces using Figma and design principles.",
        level: "Intermediate",
        duration: "10 weeks",
        tags: ["Design", "UI/UX"],
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 4,
        title: "Product Management 101",
        description: "Learn the lifecycle of a product from conception to launch.",
        level: "Beginner",
        duration: "6 weeks",
        tags: ["Product", "Management"],
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600"
    }
];



const Profile: React.FC = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'settings'>('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Goals State
    const [dailyGoals, setDailyGoals] = useState([
        { text: "Complete Neural Networks Module", done: false },
        { text: "Review React Hooks Notes", done: true },
        { text: "Practice Python for 30 mins", done: false }
    ]);

    const toggleGoal = (index: number) => {
        const newGoals = [...dailyGoals];
        newGoals[index].done = !newGoals[index].done;
        setDailyGoals(newGoals);
    };

    // Profile State
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john@example.com');
    const [bio, setBio] = useState('Passionate learner exploring the world of technology.');
    const [photo, setPhoto] = useState<string | null>(null);
    const [resumeName, setResumeName] = useState<string | null>('John_Doe_CV.pdf');
    const [isSaving, setIsSaving] = useState(false);

    const getInitials = (n: string) => {
        return n.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            alert('Profile updated successfully!');
        }, 1000);
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResumeName(e.target.files[0].name);
        }
    };

    return (
        <div className={`min-h-screen font-sans transition-all duration-700 ease-in-out relative flex flex-col ${darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
            <BackgroundGradients />

            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${darkMode ? 'bg-zinc-950/80 border-white/10' : 'bg-white/80 border-zinc-200'}`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <img src={ecaiLogo} alt="Educat-AI" className="h-8 w-auto" />
                        <span className={`font-bold text-xl tracking-tight hidden sm:block ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                            Educat<span className="text-indigo-500">AI</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-1">
                            {['overview', 'courses', 'settings'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 
                                        ${activeTab === tab
                                            ? (darkMode ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-900')
                                            : (darkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900')
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 hidden md:block"></div>
                        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white/10 hidden md:flex">
                            {photo ? <img src={photo} alt="Profile" className="h-full w-full rounded-full object-cover" /> : getInitials(name)}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className='md:hidden p-2 rounded-lg transition-colors'
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={darkMode ? "white" : "black"} className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={darkMode ? "white" : "black"} className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className={`px-6 pt-2 pb-6 space-y-4 border-t ${darkMode ? 'bg-zinc-950/95 border-white/5' : 'bg-white/95 border-zinc-200'}`}>
                        {['overview', 'courses', 'settings'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab as any);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`block w-full text-left text-base font-medium py-2 transition-colors capitalize ${activeTab === tab
                                    ? (darkMode ? 'text-white' : 'text-zinc-900')
                                    : (darkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-indigo-600')}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-28 relative z-10">
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className={`h-24 w-24 rounded-2xl overflow-hidden shadow-2xl ring-4 ${darkMode ? 'ring-zinc-900' : 'ring-white'}`}>
                            {photo ? (
                                <img src={photo} alt="Profile" className="h-full w-full object-cover" />
                            ) : (
                                <div className={`h-full w-full flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-indigo-500 to-purple-600 text-white`}>
                                    {getInitials(name)}
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Welcome back, {name.split(' ')[0]}!</h1>
                            <p className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Computer Science Student • Level 4</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className={`px-5 py-3 rounded-2xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'} backdrop-blur-sm`}>
                            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>12</div>
                            <div className={`text-xs uppercase tracking-wider font-semibold ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Hours Learned</div>
                        </div>
                        <div className={`px-5 py-3 rounded-2xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'} backdrop-blur-sm`}>
                            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>2</div>
                            <div className={`text-xs uppercase tracking-wider font-semibold ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Certificates</div>
                        </div>
                    </div>
                </div>

                {/* Content Tabs */}
                {activeTab === 'overview' && (
                    <div className="animate-fade-in-up space-y-6 relative">
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl mix-blend-multiply opacity-50 animate-blob pointer-events-none z-0"></div>
                        <div className="absolute top-40 left-0 -ml-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl mix-blend-multiply opacity-50 animate-blob animation-delay-2000 pointer-events-none z-0"></div>

                        {/* Bento Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">

                            {/* Main Focus Card - Spans Full Width */}
                            <div className={`md:col-span-3 rounded-3xl p-8 relative overflow-hidden border transition-all hover:shadow-lg group ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
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
                                        <a href="/roadmap" className={`px-6 py-2.5 rounded-lg font-semibold border transition-all active:scale-95 flex items-center justify-center gap-2 ${darkMode ? 'border-zinc-700 hover:bg-zinc-800 text-white' : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700'}`}>
                                            View Roadmap
                                        </a>
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

                        </div>
                    </div>
                )}

                {activeTab === 'courses' && (
                    <div className="animate-fade-in-up">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Explore Courses</h2>
                            <div className="flex gap-2">
                                <select className={`px-4 py-2 rounded-lg text-sm border outline-none ${darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`}>
                                    <option>All Levels</option>
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Reusing Course Cards with more horizontal space */}
                            {[...mockCourses, ...mockCourses].map((course, i) => (
                                <div key={i} className={`flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                                                {course.level}
                                            </span>
                                        </div>
                                        <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{course.title}</h3>
                                        <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{course.description}</p>
                                        <div className="mt-auto">
                                            <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors shadow-lg shadow-indigo-500/20">
                                                Enroll Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="max-w-3xl mx-auto animate-fade-in-up">
                        <div className={`rounded-3xl p-8 border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                            <h2 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Profile Settings</h2>

                            <div className="space-y-8">
                                {/* Photo Upload Section */}
                                <div className="flex items-center gap-6 pb-8 border-b border-dashed border-zinc-200 dark:border-zinc-800">
                                    <div className="relative group">
                                        <div className={`h-24 w-24 rounded-full overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'} flex items-center justify-center`}>
                                            {photo ? <img src={photo} className="h-full w-full object-cover" /> : (
                                                <span className={`text-2xl font-bold ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>{getInitials(name)}</span>
                                            )}
                                        </div>
                                        <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                                            <span className="text-xs font-medium">Change</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                                        </label>
                                    </div>
                                    <div>
                                        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Profile Photo</h3>
                                        <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Recommended: Square JPG, PNG. Max 1MB.</p>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>Full Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/20 ${darkMode ? 'bg-zinc-950/50 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'}`}
                                            />
                                        </div>
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>Email</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/20 ${darkMode ? 'bg-zinc-950/50 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'}`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>Bio</label>
                                        <textarea
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            rows={4}
                                            className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/20 ${darkMode ? 'bg-zinc-950/50 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'}`}
                                        />
                                    </div>

                                    <div>
                                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>Resume / CV</label>
                                        <div className={`relative dashed-border border-2 rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all ${darkMode ? 'border-zinc-800 hover:bg-zinc-900' : 'border-zinc-300 hover:bg-zinc-50'}`}>
                                            <div className="h-10 w-10 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-500 mb-3">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                            </div>
                                            {resumeName ? (
                                                <span className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{resumeName}</span>
                                            ) : (
                                                <div>
                                                    <span className="font-medium text-indigo-500 cursor-pointer hover:underline">Click to upload</span>
                                                    <span className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}> or drag and drop</span>
                                                </div>
                                            )}
                                            <label className="absolute inset-0 cursor-pointer">
                                                <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'}`}>
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className={`px-6 py-2.5 rounded-xl font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5 ${isSaving ? 'opacity-70 cursor-wait' : ''}`}
                                    >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Profile;
