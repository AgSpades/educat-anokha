import React, { useState } from 'react';

interface ProfileSettingsProps {
    darkMode: boolean;
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    bio: string;
    setBio: (bio: string) => void;
    photo: string | null;
    setPhoto: (photo: string | null) => void;
    resumeName: string | null;
    setResumeName: (name: string | null) => void;
    getInitials: (name: string) => string;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
    darkMode,
    name, setName,
    email, setEmail,
    bio, setBio,
    photo, setPhoto,
    resumeName, setResumeName,
    getInitials
}) => {
    const [isSaving, setIsSaving] = useState(false);

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
    );
};

export default ProfileSettings;
