import React, { useState } from 'react';
import { useThemeContext } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import BackgroundGradients from '../components/landing-page-components/BackgroundGradients';
import ProfileNavbar from '../components/profile-components/ProfileNavbar';
import ProfileHeader from '../components/profile-components/ProfileHeader';
import DashboardOverview from '../components/profile-components/DashboardOverview';
import CourseExplorer from '../components/profile-components/CourseExplorer';
import ProfileSettings from '../components/profile-components/ProfileSettings';

import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
    const { darkMode, toggleTheme } = useThemeContext();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'settings'>('overview');

    // Profile State (Shared across Navbar, Header, Settings)
    const [name, setName] = useState(user?.name || 'John Doe');
    const [email, setEmail] = useState(user?.email || 'john@example.com');
    const [bio, setBio] = useState('Passionate learner exploring the world of technology.');

    React.useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);
    const [photo, setPhoto] = useState<string | null>(null);
    const [resumeName, setResumeName] = useState<string | null>(null);

    const getInitials = (n: string) => {
        return n.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className={`min-h-screen font-sans transition-all duration-700 ease-in-out relative flex flex-col ${darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
            <BackgroundGradients />

            <ProfileNavbar
                darkMode={darkMode}
                toggleTheme={toggleTheme}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                photo={photo}
                name={name}
                getInitials={getInitials}
            />

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-28 relative z-10">
                <ProfileHeader
                    darkMode={darkMode}
                    name={name}
                    photo={photo}
                    getInitials={getInitials}
                />

                {/* Content Tabs */}
                {activeTab === 'overview' && <DashboardOverview darkMode={darkMode} />}

                {activeTab === 'courses' && <CourseExplorer darkMode={darkMode} />}

                {activeTab === 'settings' && (
                    <ProfileSettings
                        darkMode={darkMode}
                        name={name} setName={setName}
                        email={email} setEmail={setEmail}
                        bio={bio} setBio={setBio}
                        photo={photo} setPhoto={setPhoto}
                        resumeName={resumeName} setResumeName={setResumeName}
                        getInitials={getInitials}
                    />
                )}
            </main>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-end animate-bounce-slow">
                {/* JOBS BUTTON */}
                <Link to="/jobs" className={`group relative flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:pr-5 ${darkMode ? 'bg-zinc-900/80 border-zinc-700 text-white hover:bg-zinc-800' : 'bg-white/80 border-zinc-200 text-zinc-900 hover:bg-zinc-50'}`}>
                    <span className="text-sm font-bold tracking-wide">Jobs</span>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-lg ring-2 ring-white/20 group-hover:shadow-emerald-500/50 transition-shadow">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                </Link>

                {/* ROADMAP BUTTON */}
                <Link to="/roadmap" className={`group relative flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:pr-5 ${darkMode ? 'bg-zinc-900/80 border-zinc-700 text-white hover:bg-zinc-800' : 'bg-white/80 border-zinc-200 text-zinc-900 hover:bg-zinc-50'}`}>
                    <span className="text-sm font-bold tracking-wide">My Roadmap</span>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg ring-2 ring-white/20 group-hover:shadow-indigo-500/50 transition-shadow">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-1.447-.894L15 7m0 13V7" /></svg>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Profile;
