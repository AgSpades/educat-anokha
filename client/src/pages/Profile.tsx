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
}

const mockCourses: Course[] = [
    {
        id: 1,
        title: "Full Stack Web Development",
        description: "Master modern web technologies including React, Node.js, and TypeScript.",
        level: "Intermediate",
        duration: "12 weeks",
        tags: ["Development", "Web"]
    },
    {
        id: 2,
        title: "Data Science Fundamentals",
        description: "Learn how to analyze data, create visualizations, and build ML models.",
        level: "Beginner",
        duration: "8 weeks",
        tags: ["Data Science", "Analytics"]
    },
    {
        id: 3,
        title: "UI/UX Design Masterclass",
        description: "Design beautiful and functional user interfaces using Figma and design principles.",
        level: "Intermediate",
        duration: "10 weeks",
        tags: ["Design", "UI/UX"]
    },
    {
        id: 4,
        title: "Product Management 101",
        description: "Learn the lifecycle of a product from conception to launch.",
        level: "Beginner",
        duration: "6 weeks",
        tags: ["Product", "Management"]
    }
];

const Profile: React.FC = () => {
    const { darkMode, toggleTheme } = useTheme();
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState<string | null>(null);
    const [resumeName, setResumeName] = useState<string | null>(null);


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

    const handleSave = () => {
        // Here you would typically save to backend
        console.log("Saving profile...");
    };

    return (
        <div className={`min-h-screen font-sans transition-all duration-700 ease-in-out relative flex flex-col ${darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
            <BackgroundGradients />

            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${darkMode ? 'bg-zinc-950/80 border-white/10' : 'bg-white/80 border-zinc-200'}`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={ecaiLogo} alt="Educat-AI" className="h-8 w-auto" />
                        <span className={`font-bold text-xl tracking-tight hidden sm:block ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                            Educat<span className="text-indigo-500">AI</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
                        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                            {photo ? <img src={photo} alt="Profile" className="h-full w-full rounded-full object-cover" /> : 'JD'}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-28 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column - Profile Info */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className={`rounded-2xl shadow-lg border p-6 backdrop-blur-sm ${darkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white/80 border-zinc-200'}`}>
                            <div className="flex flex-col items-center text-center">
                                <div className="relative group mb-4">
                                    <div className={`h-32 w-32 rounded-full overflow-hidden border-4 ${darkMode ? 'border-zinc-800' : 'border-zinc-100'} shadow-xl`}>
                                        {photo ? (
                                            <img src={photo} alt="Profile" className="h-full w-full object-cover" />
                                        ) : (
                                            <div className={`h-full w-full flex items-center justify-center text-4xl font-bold ${darkMode ? 'bg-zinc-800 text-zinc-600' : 'bg-zinc-100 text-zinc-400'}`}>
                                                JD
                                            </div>
                                        )}
                                    </div>
                                    <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-indigo-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <input type="file" id="photo-upload" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                                    </label>
                                </div>
                                <h2 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>John Doe</h2>
                                <p className={`text-sm mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Aspiring Developer</p>

                                <div className="w-full space-y-4 text-left">
                                    <div>
                                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                                            Bio
                                        </label>
                                        <textarea
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            placeholder="Tell us about yourself..."
                                            rows={4}
                                            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20 ${darkMode ? 'bg-zinc-950/50 border-zinc-800 text-white focus:border-indigo-500' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-indigo-500'}`}
                                        />
                                    </div>

                                    <div>
                                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                                            Resume
                                        </label>
                                        <div className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-300 hover:border-indigo-500/50 text-center ${darkMode ? 'border-zinc-800 bg-zinc-950/30' : 'border-zinc-300 bg-zinc-50'}`}>
                                            <input type="file" id="resume-upload" className="hidden" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
                                            <label htmlFor="resume-upload" className="cursor-pointer block text-sm">
                                                {resumeName ? (
                                                    <span className="text-indigo-500 font-medium break-all">{resumeName}</span>
                                                ) : (
                                                    <>
                                                        <span className="text-indigo-500 font-medium">Upload a file</span>
                                                        <span className={`block mt-1 text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>PDF, DOC up to 5MB</span>
                                                    </>
                                                )}
                                            </label>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSave}
                                        className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-500/20 cursor-pointer"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Recommended Courses */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="mb-2">
                            <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Recommended For You</h2>
                            <p className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Based on your interests in Software Development and Logic</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mockCourses.map((course) => (
                                <div key={course.id} className={`group rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${darkMode ? 'bg-zinc-900/50 border-zinc-800 hover:border-indigo-500/30' : 'bg-white border-zinc-200 hover:border-indigo-500/30'}`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                                            {course.level}
                                        </span>
                                        <span className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                            {course.duration}
                                        </span>
                                    </div>
                                    <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{course.title}</h3>
                                    <p className={`text-sm mb-6 line-clamp-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                        {course.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex gap-2">
                                            {course.tags.map(tag => (
                                                <span key={tag} className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>#{tag}</span>
                                            ))}
                                        </div>
                                        <button className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-zinc-800 hover:bg-indigo-600 text-white' : 'bg-zinc-100 hover:bg-indigo-600 hover:text-white text-zinc-900'}`}>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Profile;
