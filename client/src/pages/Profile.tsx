import React, { useState } from 'react';
import { useThemeContext } from '../contexts/ThemeContext';
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

            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-28 relative z-10">
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
        </div>
    );
}

export default Profile;
