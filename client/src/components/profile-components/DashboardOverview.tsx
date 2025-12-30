import React from 'react';
// import { questions } from '../onboarding-components/OnboardingForm'; // Unused now

interface DashboardOverviewProps {
    darkMode: boolean;
    resumeName: string | null;
    setResumeName: (name: string | null) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ darkMode, resumeName, setResumeName }) => {

    return (
        <div className="animate-fade-in-up space-y-6 relative">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl mix-blend-multiply opacity-50 animate-blob pointer-events-none z-0"></div>
            <div className="absolute top-40 left-0 -ml-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl mix-blend-multiply opacity-50 animate-blob animation-delay-2000 pointer-events-none z-0"></div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">

                {/* Resume Upload Card */}
                <div className={`md:col-span-3 min-h-[400px] rounded-3xl p-12 border flex flex-col items-center justify-center gap-8 text-center transition-all hover:shadow-xl ${darkMode ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700' : 'bg-white border-zinc-200 hover:border-indigo-100'}`}>
                    <div className="flex flex-col items-center">
                        <div className={`w-24 h-24 mb-6 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${darkMode ? 'bg-zinc-800 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <h3 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Resume & CV</h3>
                        <p className={`text-lg max-w-lg mx-auto leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            {resumeName ? (
                                <span>Currently uploaded: <span className="font-semibold text-indigo-500">{resumeName}</span>. <br />Ready for job applications.</span>
                            ) : (
                                'Upload your resume to unlock personalized job recommendations and career path adjustments.'
                            )}
                        </p>
                    </div>

                    <label className={`group cursor-pointer px-8 py-4 rounded-xl font-bold text-lg border transition-all flex items-center gap-3 hover:-translate-y-1 shadow-lg shadow-indigo-500/20 ${darkMode ? 'bg-indigo-600 hover:bg-indigo-500 text-white border-transparent' : 'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent'}`}>
                        <svg className="w-6 h-6 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span>{resumeName ? 'Update Resume' : 'Upload New Resume'}</span>
                        <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setResumeName(e.target.files[0].name);
                                }
                            }}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
