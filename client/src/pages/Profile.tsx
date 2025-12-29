import React, { useState } from 'react';
import { useThemeContext } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import BackgroundGradients from '../landing-page-components/BackgroundGradients';
import ProfileNavbar from '../profile-components/ProfileNavbar';
import ProfileHeader from '../profile-components/ProfileHeader';
import DashboardOverview from '../profile-components/DashboardOverview';
import CourseExplorer from '../profile-components/CourseExplorer';
import ProfileSettings from '../profile-components/ProfileSettings';

const Profile: React.FC = () => {
    const { darkMode, toggleTheme } = useThemeContext();
    const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'settings'>('overview');

    // Profile State (Shared across Navbar, Header, Settings)
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john@example.com');
    const [bio, setBio] = useState('Passionate learner exploring the world of technology.');
    const [photo, setPhoto] = useState<string | null>(null);
    const [resumeName, setResumeName] = useState<string | null>('John_Doe_CV.pdf');

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

            {/* Floating Roadmap Button - Accessible everywhere in Profile */}
            <div className="fixed bottom-8 right-8 z-50 animate-bounce-slow">
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
