import React from 'react';

interface ProfileHeaderProps {
    darkMode: boolean;
    name: string;
    photo: string | null;
    getInitials: (name: string) => string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ darkMode, name, photo, getInitials }) => {
    return (
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
    );
};

export default ProfileHeader;
