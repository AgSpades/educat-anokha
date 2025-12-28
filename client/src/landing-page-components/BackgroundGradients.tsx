import React from 'react';

const BackgroundGradients: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 bg-indigo-500/30 dark:bg-indigo-500/20 mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 bg-violet-500/30 dark:bg-violet-500/20 mix-blend-multiply dark:mix-blend-screen"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 bg-blue-500/30 dark:bg-blue-600/20 mix-blend-multiply dark:mix-blend-screen"></div>
        </div>
    );
};

export default BackgroundGradients;
